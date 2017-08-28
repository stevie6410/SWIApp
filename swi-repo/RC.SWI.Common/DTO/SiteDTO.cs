using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class SiteDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SiteADSecurityGroup { get; set; }

        public SiteDTO(Site site)
        {
            if (site == null) return;
            Id = site.Id;
            Name = site.Name;
            Description = site.Description;
            SiteADSecurityGroup = site.SiteADSecurityGroup;
        }
    }
}
