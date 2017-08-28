using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services
{
    public abstract class AppCatalogService : IAppCatalogService
    {
        private readonly SWIRepository _db;

        protected AppCatalogService()
        {
            _db = new SWIRepository();
        }

        public async Task<AppCatalogDTO> Get()
        {
            var appConfig = _db.AppConfigurations.FirstOrDefault(x => x.IsGlobal);
            if (appConfig == null) return null;
            var catalog = new AppCatalogDTO
            {
                Id = appConfig.Id,
                RepositoryUrl = appConfig.AppSettings.FirstOrDefault(p => p.Name == "RepositoryURL")?.Value,
                HSIcons = appConfig.HealthAndSafetyIcons.Select(hs => new HSIconDTO(hs)).ToList(),
                Sites = (await _db.Sites.ToListAsync()).Select(s => new SiteDTO(s)).ToList(),
                Categories = (await _db.SWITypes.ToListAsync()).Select(t => new SWITypeDTO(t)).ToList(),
                Version = appConfig.Version,
                Settings = (await _db.AppSettings.ToListAsync()).Select(s => new SettingDTO(s)).ToList()
            };
            return catalog;
        }

        public async Task<bool> CheckVersion(int currentVersion)
        {
            var appConfig = await _db.AppConfigurations.Where(a => a.IsGlobal).FirstAsync();
            return appConfig.Version == currentVersion;
        }
    }
}