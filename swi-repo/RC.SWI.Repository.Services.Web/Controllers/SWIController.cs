using RC.SWI.Services.Services;
using RC.SWI.ViewModels;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace RC.SWI.Repository.Services.Web.Controllers
{
    [RoutePrefix("api/v1/swi")]
    public class SWIController : ApiController
    {
        private readonly SWIService swiService;

        public SWIController()
        {
            swiService = new SWIService();
        }

        [HttpGet]
        [Route("master")]
        public async Task<IHttpActionResult> GetMasters()
        {
            var result = await swiService.GetMasters();
            return Ok(result);
        }

        [HttpGet]
        [Route("master/{id:Guid}")]
        public async Task<IHttpActionResult> GetMaster(Guid Id)
        {
            var result = await swiService.GetMaster(Id);
            if (result == null)
                return BadRequest("Could not find SWI");
            return Ok(result);
        }

        [HttpPost]
        [Route("master")]
        public async Task<IHttpActionResult> CreateMaster(CreateSWIMasterVM createMaster)
        {
            var result = await swiService.CreateMaster(createMaster);
            if (result == null)
                return BadRequest("Master could not be created");

            return Ok(result);
        }

        [HttpPost]
        [Route("master/{id:Guid}/revision")]
        public async Task<IHttpActionResult> UpRev(Guid id, [FromBody] CreateSWIRevisionVM createRevision)
        {
            createRevision.SWIMasterId = id;
            var result = await swiService.UpRev(createRevision);
            if (result == null)
                return BadRequest("Could not up rev");

            return Ok(result);
        }

        [HttpPost]
        [Route("master/{id:Guid}/revision/{revId:Guid}/attatchswi/{clientHash}")]
        public async Task<IHttpActionResult> AttatchSWIFile(Guid id, Guid revId, string clientHash)
        {
            using (StreamReader sr = new StreamReader(await Request.Content.ReadAsStreamAsync(), Encoding.UTF8))
            {
                var fileBinary = Encoding.UTF8.GetBytes(await sr.ReadToEndAsync());
                var result = await swiService.AttatchSWIFile(revId, clientHash, fileBinary);
                return Ok(result);
            }
        }
    }
}
