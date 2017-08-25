using RC.SWI.Services.Services;
using System.Threading.Tasks;
using System.Web.Http;

namespace RC.SWI.Repository.Services.Web.Controllers
{
    [RoutePrefix("api/v1/appcatalog")]
    public class AppCatalogController : ApiController
    {
        private readonly AppCatalogService appCatalog;

        public AppCatalogController()
        {
            appCatalog = new AppCatalogService();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> GetAppCatalog()
        {
            var result = await appCatalog.Get();
            if (result == null)
                return BadRequest("Could not get app catalog");

            return Ok(result);
        }

        [HttpGet]
        [Route("checkversion/{currentVersion:int}")]
        public async Task<IHttpActionResult> CheckVersion(int currentVersion)
        {
            var result = await appCatalog.CheckVersion(currentVersion);
            return Ok(result);
        }

    }
}
