using RC.SWI.Entities;
using RC.SWI.ViewModels;
using RC.SWI.ViewModels.ViewModels;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace RC.SWI.Services.Services
{
    public class AppCatalogService
    {
        private readonly SWIRepository db;

        public AppCatalogService()
        {
            db = new SWIRepository();
        }

        public async Task<AppCatalogVM> Get()
        {
            var appConfig = db.AppConfigurations.Where(x => x.IsGlobal == true).FirstOrDefault();
            if(appConfig == null)
            {
                return null;
            }


            var catalog = new AppCatalogVM();
            catalog.Id = appConfig.Id;
            catalog.RepositoryUrl = appConfig.AppSettings.Where(p => p.Name == "RepositoryURL").FirstOrDefault().Value;
            catalog.HSIcons = appConfig.HealthAndSafetyIcons.Select(hs => new HSIconVM(hs)).ToList();
            catalog.Sites = (await db.Sites.ToListAsync()).Select(s => new SiteVM(s)).ToList();
            catalog.Categories = (await db.SWITypes.ToListAsync()).Select(t => new SWITypeVM(t)).ToList();
            catalog.Version = appConfig.Version;
            catalog.Settings = (await db.AppSettings.ToListAsync()).Select(s => new SettingVM(s)).ToList();
            return catalog;
        }

        public async Task<bool> CheckVersion(int currentVersion)
        {
            var appConfig = await db.AppConfigurations.Where(a => a.IsGlobal == true).FirstAsync();
            return (appConfig.Version == currentVersion);    
        }
    }
}
