using System;
using System.Linq;
using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class SWIRevisionDTO
    {
        public Guid Id { get; set; }
        public int RevisionNumber { get; set; }
        public bool Released { get; set; }
        public bool IsLatest { get; set; }
        public string AppVersion { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public DocumentDTO Document { get; set; }
        public string SwiFileId { get; set; }

        public SWIRevisionDTO(SWIRevision revision, bool includeFile = false)
        {
            if (revision == null) return;
            Id = revision.Id;
            RevisionNumber = revision.RevisionNumber;
            Released = revision.Released;
            AppVersion = revision.AppVersion;
            CreatedOn = revision.CreatedOn;
            ModifiedOn = revision.ModifiedOn;
            SwiFileId = revision.SwiFileId;
            Document = new DocumentDTO(revision.Document, includeFile);
            IsLatest = revision.SWIMaster.SWIRevisions.Any(rev => rev.RevisionNumber > revision.RevisionNumber) == false;
        }
    }
}
