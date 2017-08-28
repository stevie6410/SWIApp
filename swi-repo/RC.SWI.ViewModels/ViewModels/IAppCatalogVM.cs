using System.Collections.Generic;

namespace RC.SWI.ViewModels.ViewModels
{
    public interface IAppCatalogVM
    {
        List<SWITypeVM> Categories { get; set; }
        List<HSIconVM> HSIcons { get; set; }
        int Id { get; set; }
        string RepositoryUrl { get; set; }
        List<SettingVM> Settings { get; set; }
        List<SiteVM> Sites { get; set; }
        int Version { get; set; }
    }
}