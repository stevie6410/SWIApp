using System.Collections.Generic;

namespace RC.SWI.ViewModels.ViewModels
{
    public class AppCatalogVm : IAppCatalogVM
    {
        public int Id { get; set; }
        public string RepositoryUrl { get; set; }
        public int Version { get; set; }
        public List<SWITypeVM> Categories { get; set; }
        public List<SiteVM> Sites { get; set; }
        public List<HSIconVM> HSIcons { get; set; }
        public List<SettingVM> Settings { get; set; } 
    }
}
