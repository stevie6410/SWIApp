using System.Threading.Tasks;
using RC.SWI.Common.DTO;

namespace RC.SWI.Services.Interfaces
{
    public interface IAppCatalogService
    {
        Task<bool> CheckVersion(int currentVersion);
        Task<AppCatalogDTO> Get();
    }
}