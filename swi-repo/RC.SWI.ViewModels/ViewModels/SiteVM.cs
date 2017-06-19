using RC.SWI.Entities;
using RC.SWI.ViewModels.Interfaces;

namespace RC.SWI.ViewModels
{
    public class SiteVM : ISiteVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string SiteADSecurityGroup { get; set; }

        public SiteVM(Site site)
        {
            if (site != null)
            {
                Id = site.Id;
                Name = site.Name;
                Description = site.Description;
                SiteADSecurityGroup = site.SiteADSecurityGroup;
            }
        }
    }
}
