using System.Threading.Tasks;
using System.Web.Http;
using RC.SWI.Repository.WebAPI.Filters;
using RC.SWI.Services;
using RC.SWI.Services.Interfaces;
using RC.SWI.ViewModels;

namespace RC.SWI.Repository.WebApi.Controllers
{

    [RoutePrefix("api/v1/standardtools")]
    public class StandardToolsController : ApiController
    {
        private readonly IStandardToolingService _stdTooling;

        public StandardToolsController(IStandardToolingService toolingService)
        {
            _stdTooling = toolingService;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var results = await _stdTooling.Get();
            if (results == null)
                return BadRequest("Could not find standard tooling records");
            return Ok(results);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetSingle(int id)
        {
            var result = await _stdTooling.Get(id);
            if (result == null)
                return BadRequest("Could not find standard tooling for id " + id.ToString());
            return Ok(result);
        }

        [HttpGet]
        [Route("search")]
        public async Task<IHttpActionResult> Search(string term = "", string toolNumber = "", string hasCarePoint = "", string hasLinkedSwi = "")
        {
            var result = await _stdTooling.Search(term, toolNumber, hasCarePoint, hasLinkedSwi);
            if (result == null)
                return BadRequest("Could not find any results");
            return Ok(result);
        }

        [RequiresPermission("CanCreateSWI")]
        [HttpPost]
        public async Task<IHttpActionResult> Create([FromBody] CreateStandardToolVM tool)
        {
            var result = await _stdTooling.Create(tool);
            if (result == null) return BadRequest("Could not create Standard Tool");
            return Ok(result);
        }

        [RequiresPermission("CanCreateSWI")]
        [HttpPut]
        public async Task<IHttpActionResult> Update([FromBody]StandardToolVM tool)
        {
            var result = await _stdTooling.Update(tool);
            if (result == null) return BadRequest("Could not update standard tool");
            return Ok(result);
        }

        [RequiresPermission("CanCreateSWI")]
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await _stdTooling.Delete(id);
            if (result == false) return BadRequest("Could not delete standard tool with Id " + id.ToString());
            return Ok(result);
        }
    }
}
