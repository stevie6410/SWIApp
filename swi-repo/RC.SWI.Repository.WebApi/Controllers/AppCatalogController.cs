using System.Threading.Tasks;
using System.Web.Http;
using RC.SWI.Services;
using RC.SWI.Services.Interfaces;

namespace RC.SWI.Repository.WebApi.Controllers
{
    [RoutePrefix("api/v1/appcatalog")]
    public class AppCatalogController : ApiController
    {
        private readonly IAppCatalogService _appCatalog;

        public AppCatalogController(IAppCatalogService appCatalogService)
        {
            _appCatalog = appCatalogService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAppCatalog()
        {
            var result = await _appCatalog.Get();
            if (result == null)
                return BadRequest("Could not get app catalog");

            return Ok(result);
        }

        [HttpGet]
        [Route("checkversion/{currentVersion:int}")]
        public async Task<IHttpActionResult> CheckVersion(int currentVersion)
        {
            var result = await _appCatalog.CheckVersion(currentVersion);
            return Ok(result);
        }

    }
}
