using RC.SWI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RC.SWI.ViewModels
{
    public class SWIMasterVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int SWINumber { get; set; }
        public bool IsPublic { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Type { get; set; }
        public List<SWIRevisionVM> SWIRevisions { get; set; }
        public List<SWIMasterSitePermissionVM> SitePermissions { get; set; }

        public SWIMasterVM(SWIMaster master, bool includeFile = false)
        {
            if (master != null)
            {
                Id = master.Id;
                Title = master.Title;
                SWINumber = master.SWINumber;
                Type = master.SWIType.Name;
                IsPublic = master.IsPublic;
                SWIRevisions = master.SWIRevisions.Select(r => new SWIRevisionVM(r, includeFile)).ToList();
                SitePermissions = master.SWIMasterSitePermissions.Select(p => new SWIMasterSitePermissionVM(p)).ToList();
            }
        }
    }
}
