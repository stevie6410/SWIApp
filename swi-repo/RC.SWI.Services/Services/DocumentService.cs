using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;
using RC.SWI.Common.ExtMethods;
using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;

namespace RC.SWI.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly SWIRepository _db;

        public DocumentService()
        {
            _db = new SWIRepository();
        }

        public async Task<List<DocumentSimpleDTO>> All() => (await _db.Documents.ToListAsync()).Select(doc => new DocumentSimpleDTO(doc)).ToList();

        public async Task<DocumentDTO> Get(int id) => new DocumentDTO(await _db.Documents.Include(d => d.DocumentFile).SingleOrDefaultAsync(d => d.Id == id));

        public async Task<DocumentDTO> Create(CreateDocumentDTO docUpdate)
        {
            var doc = docUpdate.ToDocument();
            _db.Documents.Add(doc);
            doc.DocumentChanges.Add(BuildDocumentChange(docUpdate.Username, "Create Document", docUpdate.Message));

            await _db.SaveChangesAsync();

            await AttatchFile(doc.Id, docUpdate.File, docUpdate.Username, docUpdate.ClientHash, docUpdate.Message);

            await CheckOut(doc.Id, docUpdate.Username);

            return new DocumentDTO(doc, true);
        }

        public Task<DocumentDTO> Update(DocumentUpdateDTO doc)
        {
            throw new NotImplementedException();
        }

        public async Task<DocumentDTO> CheckOut(int id, string username)
        {
            var doc = await _db.Documents.FindAsync(id);
            if (doc == null) throw new Exception("Document could not be found");

            doc.CheckedOut = true;
            doc.CheckedOutBy = username;
            doc.CheckedOutOn = DateTime.UtcNow;

            // Create a document change
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Checked Out"));

            await _db.SaveChangesAsync();

            return new DocumentDTO(doc);
        }

        public async Task<DocumentDTO> CheckIn(CheckInRequestDTO request, string username)
        {
            var doc = await _db.Documents.FindAsync(request.DocId);
            if (doc == null) throw new Exception("Document could not be found");

            doc.CheckedOut = false;
            doc.CheckedOutBy = null;
            doc.CheckedOutOn = null;

            // Create a document change
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Checked In", request.Message));

            await _db.SaveChangesAsync();

            return new DocumentDTO(doc);
        }

        public async Task<DocumentDTO> AttatchFile(int docId, byte[] file, string username, string clientHash = null,
            string notes = null)
        {
            //Get the document from the db
            var doc = await _db.Documents.FindAsync(docId);
            if (doc == null) throw new Exception("Could not find document for Id: " + docId);
            
            // Build the document file
            var docFile = doc.DocumentFile ?? new DocumentFile();
            docFile.Data = file.Compress();
            docFile.FileSize = docFile.Data.Length;
            docFile.Hash = docFile.Data.ToFileHash();
            docFile.ClientHash = clientHash;
            docFile.Timestamp = DateTime.Now;
            // Attach the document file to the document
            doc.DocumentFile = docFile;

            // Create a document change
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Attach File", notes));

            await _db.SaveChangesAsync();

            return new DocumentDTO(doc);
        }

        public Task<DocumentDTO> LinkToDocument(DocumentUpdateDTO a, DocumentUpdateDTO b, string notes)
        {
            throw new NotImplementedException();
        }

        public async Task<DocumentPartLinkDTO> LinkToPart(int docId, DocumentPartLinkDTO partLink, string username)
        {
            //Get the document from the database
            var doc = await _db.Documents.FindAsync(docId);
            if (doc == null)
                throw new Exception("Document could not be found. Id: " + docId);

            //Check that the part and revision combination did not already exist
            if (doc.DocumentPartLinks.Any(pl => pl.PartNumber == partLink.PartNumber.ToUpper() && pl.Revision == partLink.Revision.ToUpper()))
                throw new Exception($"There is already a part link for {partLink.PartNumber} at revision {partLink.Revision}");

            //Create the new part link
            var newPartLink = new DocumentPartLink
            {
                PartNumber = partLink.PartNumber,
                Revision = partLink.Revision
            };
            if (partLink.ErpSystemId.HasValue) newPartLink.ErpSystemId = partLink.ErpSystemId;

            // Create document change record
            var message = $"Linked to part {newPartLink.PartNumber} at revision {newPartLink.Revision}";
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Link To part", message));

            //Attach the new part link to the document
            doc.DocumentPartLinks.Add(newPartLink);

            //Save changes to the database
            await _db.SaveChangesAsync();

            //Return the view model of the updated document
            return new DocumentPartLinkDTO(newPartLink);
        }

        private static DocumentChanx BuildDocumentChange(string username, string operation, string message = null)
        {
            var change = new DocumentChanx
            {
                ChangedOn = DateTime.UtcNow,
                ChangedBy = username,
                ChangeOperation = operation,
                ChangeNotes = message
            };
            return change;
        }
    }
}