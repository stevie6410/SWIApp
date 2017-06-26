using RC.SWI.Entities;
using System;

namespace RC.SWI.ViewModels
{
    public class SWIMasterSitePermissionVM
    {
        public Guid Id { get; set; }
        public Guid SWIMasterId { get; set; }
        public SiteVM Site { get; set; }
        public bool CanRead { get; set; }
        public bool CanAuthor { get; set; }
        public bool CanManage { get; set; }
        public bool IsOwner { get; set; }
        public string GrantedBy { get; set; }
        public DateTime GrantedOn { get; set; }
        public string Notes { get; set; }

        public SWIMasterSitePermissionVM(SWIMasterSitePermission sitePermission)
        {
            if (sitePermission != null)
            {
                Id = sitePermission.Id;
                SWIMasterId = sitePermission.SWIMaster.Id;
                Site = new SiteVM(sitePermission.Site);
                CanRead = sitePermission.CanRead;
                CanAuthor = sitePermission.CanAuthor;
                CanManage = sitePermission.CanManage;
                IsOwner = sitePermission.IsOwner;
                GrantedBy = new UserVM(sitePermission.GrantedBy).FullName;
                GrantedOn = sitePermission.GrantedOn;
                Notes = sitePermission.Notes;
            }
        }
    }
}