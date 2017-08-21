using RC.AppSecurity.Services;
using RC.SWI.Entities;
using RC.SWI.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.Services.Services
{
    public class SWIService
    {
        private readonly SWIRepository db;
        private readonly UserService userService;
        private readonly CompanyService companyService;

        private DocumentService docService;

        public SWIService()
        {
            db = new SWIRepository();
            docService = new DocumentService();
            userService = new UserService();
            companyService = new CompanyService();
        }

        public async Task<List<SWIMasterVM>> GetMasters()
        {
            var result = await db.SWIMasters.ToListAsync();
            return result.Select(swi => new SWIMasterVM(swi)).ToList();
        }

        public async Task<SWIMasterVM> GetMaster(Guid Id)
        {
            return new SWIMasterVM(await db.SWIMasters.FindAsync(Id));
        }

        public async Task<List<SWIMasterVM>> SearchMasters(int swiNumber = 0, string title = "")
        {
            //Build the query based on optional params
            var query = db.SWIMasters.AsQueryable();
            if (swiNumber > 0) query = query.Where(m => m.SWINumber == swiNumber);
            if (!string.IsNullOrEmpty(title)) query = query.Where(m => m.Title.Contains(title));

            //Get the results
            var results = await query.ToListAsync();
            return results.Select(r => new SWIMasterVM(r)).ToList();
        }

        public async Task<SWIMasterVM> CreateMaster(CreateSWIMasterVM createMaster)
        {
            // Get the user details from the app security system
            var user = await userService.GetUser(createMaster.username);
            if (user == null) throw new Exception("User not found in the app security database. SWI Master cannot be created");

            // Get the site details from the SWI repository based on the user
            var site = await db.Sites.Where(s => s.AppSecurityCompanyId == user.Company.Id).FirstOrDefaultAsync();
            if (site == null) throw new Exception("Could not find a site matching the users default company in the App Security system");

            //Create SWIMaster 
            var master = new SWIMaster();
            master.Id = Guid.NewGuid();
            master.SWIType = await db.SWITypes.FindAsync(createMaster.TypeId);
            master.Title = createMaster.Title;
            master.IsPublic = false;
            master.CreatedBy = user.Username;
            master.CreatedOn = DateTime.Now;
            db.SWIMasters.Add(master);

            //Create SWIRevision and attach it to the SWIMaster
            var rev = new SWIRevision();
            rev.Id = Guid.NewGuid();
            rev.RevisionNumber = 1;
            rev.Released = false;
            rev.AppVersion = createMaster.AppVersion;
            rev.CreatedOn = DateTime.Now;
            rev.ModifiedOn = DateTime.Now;
            master.SWIRevisions.Add(rev);

            //Create the default site permission for the SWIMaster based on the users default site
            var permission = new SWIMasterSitePermission();
            permission.Id = Guid.NewGuid();
            permission.Site =  site;
            permission.GrantedBy = master.CreatedBy;
            permission.GrantedOn = DateTime.Now;
            permission.IsOwner = true;
            permission.CanManage = true;
            permission.CanAuthor = true;
            permission.CanRead = true;
            master.SWIMasterSitePermissions.Add(permission);

            if (createMaster.SWIFile != null)
            {
                //Setup the create document reuest
                var createDocument = new CreateDocumentVM();
                createDocument.AppVersion = createMaster.AppVersion;
                createDocument.DocumentTypeId = (await db.DocumentTypes.Where(t => t.IsSWI == true).FirstOrDefaultAsync()).Id;
                createDocument.Name = createMaster.Title;
                createDocument.Username = createMaster.username;
                createDocument.File = Encoding.UTF8.GetBytes(createMaster.SWIFile);

                //Request the new document from the document service
                var doc = await docService.Create(createDocument);
                //Attach the new document to the SWI Revision
                rev.Document = await db.Documents.FindAsync(doc.Id);
            }

            //Save Changes to the database
            await db.SaveChangesAsync();

            var finalResult = await GetMaster(master.Id);

            //Returnt the SWIMaster View Model to the client
            return finalResult;
        }

        public async Task<SWIMasterVM> UpRev(CreateSWIRevisionVM createRev)
        {
            //Get SWIMaster from database
            var master = await db.SWIMasters.FindAsync(createRev.SWIMasterId);
            if (master == null)
                throw new Exception("Invalid SWI Master");

            //Check to see if the last revision is released
            var lastRev = master.SWIRevisions.Where(rv => rv.RevisionNumber == master.SWIRevisions.Max(r => r.RevisionNumber)).FirstOrDefault();
            if (lastRev != null && lastRev.Released == false)
                throw new Exception("Cannot create a new revision until the current revision has been released");

            //Create new SWIRevision and attach to SWIMaster
            var rev = new SWIRevision();
            rev.Id = Guid.NewGuid();
            rev.AppVersion = createRev.AppVersion;
            rev.RevisionNumber = master.SWIRevisions.Max(r => r.RevisionNumber) + 1;
            rev.CreatedOn = DateTime.Now;
            rev.ModifiedOn = DateTime.Now;
            rev.Released = false;

            //Set the new SWIRevision on the SWIMaster
            master.SWIRevisions.Add(rev);

            //Save Changes
            await db.SaveChangesAsync();

            //Return the SWIMaster View Model to the client
            return new SWIMasterVM(master);
        }

        public async Task<SWIMasterVM> AttatchSWIFile(Guid swiRevisionId, string clientHash, byte[] swiFile, string username)
        {
            //Get the SWIRevision
            var revision = await db.SWIRevisions.FindAsync(swiRevisionId);
            //Validate revision is not null
            if (revision == null) throw new Exception("SWI Revision could not be found");

            if (revision.Document == null)
            {
                //Create a document and link it to the SWIRevision
                var createDoc = new CreateDocumentVM();
                createDoc.Name = revision.SWIMaster.Title;
                createDoc.AppVersion = revision.AppVersion;
                createDoc.DocumentTypeId = (await db.DocumentTypes.Where(dt => dt.IsSWI == true).FirstOrDefaultAsync()).Id;
                createDoc.Username = username;
                createDoc.ClientHash = clientHash;
                createDoc.File = swiFile;

                //Submit the request to the doc service
                var newDoc = await docService.Create(createDoc);
                //Set the revison document to the newly created doc
                revision.Document = await db.Documents.FindAsync(newDoc.Id);
            }
            else
            {
                //There is already a document. Just update it using the document service function
                //Encode the file as UTF-8 byte array
                await docService.AttatchFile(revision.Document.Id, swiFile, clientHash);
            }
            revision.ModifiedOn = DateTime.Now;
            await db.SaveChangesAsync();
            //Return the latest version of the SWIMaster
            return new SWIMasterVM(await db.SWIMasters.FindAsync(revision.SWIMaster.Id));
        }
    }
}
