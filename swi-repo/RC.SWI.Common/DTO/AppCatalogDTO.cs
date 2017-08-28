using System.Collections.Generic;
namespace RC.SWI.Common.DTO
{
    public class AppCatalogDTO
    {
        public int Id { get; set; }
        public string RepositoryUrl { get; set; }
        public int Version { get; set; }
        public List<SWITypeDTO> Categories { get; set; }
        public List<SiteDTO> Sites { get; set; }
        public List<HSIconDTO> HSIcons { get; set; }
        public List<SettingDTO> Settings { get; set; } 
    }
}
