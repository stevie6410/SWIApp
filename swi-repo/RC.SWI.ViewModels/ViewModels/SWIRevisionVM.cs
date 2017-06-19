using RC.SWI.Entities;
using System;
using System.Linq;

namespace RC.SWI.ViewModels
{
    public class SWIRevisionVM
    {
        public Guid Id { get; set; }
        public int RevisionNumber { get; set; }
        public bool Released { get; set; }
        public bool IsLatest { get; set; }
        public string AppVersion { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public DocumentVM Document { get; set; }

        public SWIRevisionVM(SWIRevision revision, bool includeFile = false)
        {
            Id = revision.Id;
            RevisionNumber = revision.RevisionNumber;
            Released = revision.Released;
            AppVersion = revision.AppVersion;
            CreatedOn = revision.CreatedOn;
            ModifiedOn = revision.ModifiedOn;
            Document = new DocumentVM(revision.Document, includeFile);
            IsLatest = revision.SWIMaster.SWIRevisions.Where(rev => rev.RevisionNumber > revision.RevisionNumber).Any() == false;
        }
    }
}
