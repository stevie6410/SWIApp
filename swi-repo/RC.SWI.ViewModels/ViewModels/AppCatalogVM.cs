using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels.ViewModels
{
    public class AppCatalogVM
    {
        public int Id { get; set; }
        public string RepositoryUrl { get; set; }
        public int Version { get; set; }
        public List<SWITypeVM> Categories { get; set; }
        public List<SiteVM> Sites { get; set; }
        public List<UserVM> Users { get; set; }
        public List<RoleVM> Roles { get; set; }
        public List<HSIconVM> HSIcons { get; set; }
        public List<SettingVM> Settings { get; set; } 
    }
}
