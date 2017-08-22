using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using RC.SWI.ViewModels.Interfaces;
using RC.SWI.Common.ExtMethods;
using RC.SWI.ViewModels.Mappings;
using RC.SWI.ViewModels;
using RC.AppSecurity.Services;
using RC.SWI.ViewModels.ViewModels;

namespace RC.SWI.Services
{
    public class DocumentService
    {
        private readonly SWIRepository db;

        public DocumentService()
        {
            db = new SWIRepository();
        }

        public async Task<List<DocumentSimpleVM>> All()
        {
            //Get the documents from the DB, but map to the view model and return as a list
            var docs = await db.Documents.ToListAsync();
            var result = docs.Select(doc => new DocumentSimpleVM(doc)).ToList();
            return result;
        }

        public async Task<IDocumentVM> Get(int id)
        {
            var doc = await db.Documents
                .Include(d => d.DocumentFile)
                .Where(d => d.Id == id)
                .SingleOrDefaultAsync();

            return new DocumentVM(doc, true);
        }

        public async Task<IDocumentVM> Create(CreateDocumentVM docUpdate)
        {
            var doc = docUpdate.ToDocument();
            db.Documents.Add(doc);
            doc.DocumentChanges.Add(BuildDocumentChange(docUpdate.Username, "Create Document", docUpdate.Message));

            await db.SaveChangesAsync();

            await AttatchFile(doc.Id, docUpdate.File, docUpdate.Username, docUpdate.ClientHash, docUpdate.Message);

            await CheckOut(doc.Id, docUpdate.Username);

            return new DocumentVM(doc, true);
        }

        public Task<IDocumentVM> Update(IDocuemntUpdateVM doc)
        {
            throw new NotImplementedException();
        }

        public async Task<IDocumentVM> CheckOut(int id, string username)
        {
            var doc = await db.Documents.FindAsync(id);
            if (doc == null) throw new Exception("Document could not be found");

            doc.CheckedOut = true;
            doc.CheckedOutBy = username;
            doc.CheckedOutOn = DateTime.UtcNow;

            // Create a document change
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Checked Out"));

            await db.SaveChangesAsync();

            return new DocumentVM(doc);
        }

        public async Task<IDocumentVM> CheckIn(CheckInRequest request, string username)
        {
            var doc = await db.Documents.FindAsync(request.DocId);
            if (doc == null) throw new Exception("Document could not be found");

            doc.CheckedOut = false;
            doc.CheckedOutBy = null;
            doc.CheckedOutOn = null;

            // Create a document change
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Checked In", request.Message));

            await db.SaveChangesAsync();

            return new DocumentVM(doc);
        }

        public async Task<IDocumentVM> AttatchFile(int docId, byte[] file, string username, string clientHash = null, string notes = null)
        {
            //Get the document from the db
            var doc = await db.Documents.FindAsync(docId);
            if (doc != null)
            {
                // Build the document file
                DocumentFile docFile;
                docFile = (doc.DocumentFile == null) ? new DocumentFile() : doc.DocumentFile;
                docFile.Data = file.Compress();
                docFile.FileSize = docFile.Data.Length;
                docFile.Hash = docFile.Data.ToFileHash();
                docFile.ClientHash = clientHash;
                docFile.Timestamp = DateTime.Now;
                // Attach the document file to the document
                doc.DocumentFile = docFile;

                // Create a document change
                doc.DocumentChanges.Add(BuildDocumentChange(username, "Attach File", notes));

                await db.SaveChangesAsync();

                return new DocumentVM(doc);
            }
            else
            {
                throw new Exception("Could not find document for Id: " + docId.ToString());
            }
        }

        public Task<IDocumentVM> LinkToDocument(IDocuemntUpdateVM a, IDocuemntUpdateVM b, string notes)
        {
            throw new NotImplementedException();
        }

        public async Task<DocumentPartLinkVM> LinkToPart(int docId, DocumentPartLinkVM partLink, string username)
        {
            //Get the document from the database
            var doc = await db.Documents.FindAsync(docId);
            if (doc == null)
                throw new Exception("Document could not be found. Id: " + docId.ToString());

            //Check that the part and revision combination did not already exist
            if (doc.DocumentPartLinks.Where(pl => pl.PartNumber == partLink.PartNumber.ToUpper() && pl.Revision == partLink.Revision.ToUpper()).Any())
                throw new Exception(string.Format("There is already a part link for {0} at revision {1}", partLink.PartNumber, partLink.Revision));

            //Create the new part link
            var newPartLink = new DocumentPartLink();
            newPartLink.PartNumber = partLink.PartNumber;
            newPartLink.Revision = partLink.Revision;
            if (partLink.ErpSystemId.HasValue) newPartLink.ErpSystemId = partLink.ErpSystemId;

            // Create document change record
            var message = string.Format("Linked to part {0} at revision {1}", newPartLink.PartNumber, newPartLink.Revision);
            doc.DocumentChanges.Add(BuildDocumentChange(username, "Link To part", message));

            //Attach the new part link to the document
            doc.DocumentPartLinks.Add(newPartLink);

            //Save changes to the database
            await db.SaveChangesAsync();

            //Return the view model of the updated document
            return new DocumentPartLinkVM(newPartLink);
        }

        private DocumentChanx BuildDocumentChange(string username, string operation, string message = null)
        {
            var change = new DocumentChanx();
            change.ChangedOn = DateTime.UtcNow;
            change.ChangedBy = username;
            change.ChangeOperation = operation;
            change.ChangeNotes = message;
            return change;
        }
    }
}
