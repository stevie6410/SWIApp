using System;
using System.Collections.Generic;
using System.Linq;
using RC.SWI.Entities;
using RC.SWI.ViewModels;

namespace RC.SWI.Common.DTO
{
    public class SWIMasterDTO
    {
        public Guid Id { get; }
        public string Title { get; }
        public int SWINumber { get; }
        public bool IsPublic { get; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Type { get; }
        public List<SWIRevisionDTO> SWIRevisions { get; set; }
        public List<SWIMasterSitePermissionDTO> SitePermissions { get; set; }
        public SWIRevisionDTO LatestRevision { get { return SWIRevisions.OrderByDescending(r => r.RevisionNumber).Take(1).ToList().FirstOrDefault(); } }

        public SWIMasterDTO(SWIMaster master, bool includeFile = false)
        {
            if (master == null) return;
            Id = master.Id;
            Title = master.Title;
            SWINumber = master.SWINumber;
            Type = master.SWIType.Name;
            IsPublic = master.IsPublic;
            SWIRevisions = master.SWIRevisions.Select(r => new SWIRevisionDTO(r, includeFile)).ToList();
            SitePermissions = master.SWIMasterSitePermissions.Select(p => new SWIMasterSitePermissionDTO(p)).ToList();
        }
    }
}
