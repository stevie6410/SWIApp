using System;
using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class SWIMasterSitePermissionDTO
    {
        public Guid Id { get; set; }
        public Guid SWIMasterId { get; set; }
        public SiteDTO Site { get; set; }
        public bool CanRead { get; set; }
        public bool CanAuthor { get; set; }
        public bool CanManage { get; set; }
        public bool IsOwner { get; set; }
        public string GrantedBy { get; set; }
        public DateTime GrantedOn { get; set; }
        public string Notes { get; set; }

        public SWIMasterSitePermissionDTO(SWIMasterSitePermission sitePermission)
        {
            if (sitePermission == null) return;
            Id = sitePermission.Id;
            SWIMasterId = sitePermission.SWIMaster.Id;
            Site = new SiteDTO(sitePermission.Site);
            CanRead = sitePermission.CanRead;
            CanAuthor = sitePermission.CanAuthor;
            CanManage = sitePermission.CanManage;
            IsOwner = sitePermission.IsOwner;
            GrantedBy = sitePermission.GrantedBy;
            GrantedOn = sitePermission.GrantedOn;
            Notes = sitePermission.Notes;
        }
    }
}