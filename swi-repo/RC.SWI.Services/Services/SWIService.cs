using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using RC.AppSecurity.Services;
using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services
{
    public class SWIService : ISWIService
    {
        private readonly SWIRepository _db;
        private readonly UserService _userService;
        private readonly IDocumentService _docService;

        public SWIService(IDocumentService docService)
        {
            _db = new SWIRepository();
            _docService = docService;
            _userService = new UserService();
        }

        public async Task<List<SWIMasterDTO>> GetMasters() => (await _db.SWIMasters.ToListAsync()).Select(swi => new SWIMasterDTO(swi)).ToList();

        public async Task<SWIMasterDTO> GetMaster(Guid id) => new SWIMasterDTO(await _db.SWIMasters.FindAsync(id));
    
        public async Task<List<SWIMasterDTO>> SearchMasters(int swiNumber = 0, string title = "")
        {
            //Build the query based on optional params
            var query = _db.SWIMasters.AsQueryable();
            if (swiNumber > 0) query = query.Where(m => m.SWINumber == swiNumber);
            if (!string.IsNullOrEmpty(title)) query = query.Where(m => m.Title.Contains(title));

            //Get the results
            var results = await query.ToListAsync();
            return results.Select(r => new SWIMasterDTO(r)).ToList();
        }

        public async Task<SWIMasterDTO> CreateMaster(CreateSWIMasterDTO createMaster)
        {
            // Get the user details from the app security system
            var user = await _userService.GetUser(createMaster.username);
            if (user == null)
                throw new Exception("User not found in the app security database. SWI Master cannot be created");

            // Get the site details from the SWI repository based on the user
            var site = await _db.Sites.Where(s => s.AppSecurityCompanyId == user.Company.Id).FirstOrDefaultAsync();
            if (site == null)
                throw new Exception(
                    "Could not find a site matching the users default company in the App Security system");

            //Check that the title does not already exist
            var hasMatchingTitle = await _db.SWIMasters.Where(m => m.Title == createMaster.Title).AnyAsync();
            if (hasMatchingTitle) throw new Exception("An SWI already has this title in the repository");

            // Create SWIMaster 
            var master = new SWIMaster
            {
                Id = Guid.NewGuid(),
                SWIType = await _db.SWITypes.FindAsync(createMaster.TypeId),
                Title = createMaster.Title,
                IsPublic = false,
                CreatedBy = user.Username,
                CreatedOn = DateTime.UtcNow
            };
            _db.SWIMasters.Add(master);

            // Create SWIRevision and attach it to the SWIMaster
            var rev = new SWIRevision
            {
                Id = Guid.NewGuid(),
                RevisionNumber = 1,
                Released = false,
                AppVersion = createMaster.AppVersion,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                SwiFileId = createMaster.SWIFileId
            };
            master.SWIRevisions.Add(rev);

            // Create the default site permission for the SWIMaster based on the users default site
            var permission = new SWIMasterSitePermission
            {
                Id = Guid.NewGuid(),
                Site = site,
                GrantedBy = master.CreatedBy,
                GrantedOn = DateTime.UtcNow,
                IsOwner = true,
                CanManage = true,
                CanAuthor = true,
                CanRead = true
            };
            master.SWIMasterSitePermissions.Add(permission);

            // Save Changes to the database
            await _db.SaveChangesAsync();

            // Get a fresh copy of the master from the datasbe to return 
            var finalResult = await GetMaster(master.Id);

            // Return the SWIMaster View Model to the client
            return finalResult;
        }

        public async Task<SWIMasterDTO> UpRev(CreateSWIRevisionDTO createRev)
        {
            // Get SWIMaster from database
            var master = await _db.SWIMasters.FindAsync(createRev.SWIMasterId);
            if (master == null)
                throw new Exception("Invalid SWI Master");

            // Check to see if the last revision is released
            var lastRev = master.SWIRevisions.FirstOrDefault(rv => rv.RevisionNumber == master.SWIRevisions.Max(r => r.RevisionNumber));
            if (lastRev != null && lastRev.Released == false)
                throw new Exception("Cannot create a new revision until the current revision has been released");

            // Create new SWIRevision and attach to SWIMaster
            var rev = new SWIRevision
            {
                Id = Guid.NewGuid(),
                AppVersion = createRev.AppVersion,
                RevisionNumber = master.SWIRevisions.Max(r => r.RevisionNumber) + 1,
                CreatedOn = DateTime.UtcNow,
                ModifiedOn = DateTime.UtcNow,
                SwiFileId = createRev.SwiFileId,
                Released = false
            };

            // Set the new SWIRevision on the SWIMaster
            master.SWIRevisions.Add(rev);

            // Save Changes
            await _db.SaveChangesAsync();

            // Return the SWIMaster View Model to the client
            return new SWIMasterDTO(master);
        }

        public async Task<SWIMasterDTO> AttatchSwiFile(Guid swiRevisionId, string clientHash, byte[] swiFile, string username, string message)
        {
            //Get the SWIRevision
            var revision = await _db.SWIRevisions.FindAsync(swiRevisionId);
            //Validate revision is not null
            if (revision == null) throw new Exception("SWI Revision could not be found");

            if (revision.Document == null)
            {
                //Create a document and link it to the SWIRevision
                var createDoc = new CreateDocumentVM
                {
                    Name = revision.SWIMaster.Title,
                    AppVersion = revision.AppVersion,
                    DocumentTypeId = (await _db.DocumentTypes.Where(dt => dt.IsSWI).FirstOrDefaultAsync()).Id,
                    Username = username,
                    ClientHash = clientHash,
                    File = swiFile
                };

                //Submit the request to the doc service
                var newDoc = await _docService.Create(createDoc);
                //Set the revison document to the newly created doc
                revision.Document = await _db.Documents.FindAsync(newDoc.Id);
            }
            else
            {
                //There is already a document. Just update it using the document service function
                //Encode the file as UTF-8 byte array
                await _docService.AttatchFile(revision.Document.Id, swiFile, username, clientHash, message);
            }
            revision.ModifiedOn = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            //Return the latest version of the SWIMaster
            return new SWIMasterDTO(await _db.SWIMasters.FindAsync(revision.SWIMaster.Id));
        }
    }
}