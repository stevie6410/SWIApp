using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using RC.SWI.Repository.WebApi.Helpers;
using RC.SWI.Repository.WebAPI.Filters;
using RC.SWI.Services;
using RC.SWI.Services.Interfaces;
using RC.SWI.ViewModels;

namespace RC.SWI.Repository.WebApi.Controllers
{
    [RoutePrefix("api/v1/swi")]
    public class SwiController : ApiController
    {
        private readonly ISwiService _swiService;
        
        public SwiController(ISwiService swiService)
        {
            _swiService = swiService;
        }

        /// <summary>
        /// Gets all SWI Master records from the repository
        /// </summary>
        [HttpGet]
        [ResponseType(typeof(IList<SWIMasterVM>))]
        [Route("master")]
        public async Task<IHttpActionResult> GetMasters()
        {
            var result = await _swiService.GetMasters();
            //throw new Exception("Steve Test Exception");
            return Ok(result);
        }

        /// <summary>
        /// Gets a single SWI Master record from the repository
        /// </summary>
        /// <param name="id">The SWI Master ID</param>
        [HttpGet]
        [ResponseType(typeof(SWIMasterVM))]
        [Route("master/{id:Guid}")]
        public async Task<IHttpActionResult> GetMaster(Guid id)
        {
            var result = await _swiService.GetMaster(id);
            //if (result == null)
            //    return BadRequest("Could not find SWI");
            return Ok(result);
        }

        [HttpGet]
        [ResponseType(typeof(List<SWIMasterVM>))]
        [Route("master/search")]
        public async Task<IHttpActionResult> SearchMasters([FromUri] int swiNumber = 0, [FromUri] string title = "")
        {
            var result = await _swiService.SearchMasters(swiNumber, title);
            return Ok(result);
        }

        /// <summary>
        /// Creates a new SWI Master and Revision
        /// </summary>
        /// <param name="createMaster">A create master object</param>
        /// <returns>SWI Master</returns>
        [HttpPost]
        [Route("master")]
        [ResponseType(typeof(SWIMasterVM))]
        [RequiresPermission("CanCreateSWI")]
        public async Task<IHttpActionResult> CreateMaster(CreateSWIMasterVM createMaster)
        {
            var result = await _swiService.CreateMaster(createMaster);
            if (result == null)
                return BadRequest("Master could not be created");

            return Ok(result);
        }

        [HttpPost]
        [Route("master/{id:Guid}/revision")]
        [ResponseType(typeof(SWIMasterVM))]
        [RequiresPermission("CanCreateSWI")]
        public async Task<IHttpActionResult> UpRev(Guid id, [FromBody] CreateSWIRevisionVM createRevision)
        {
            createRevision.SWIMasterId = id;
            var result = await _swiService.UpRev(createRevision);
            if (result == null)
                return BadRequest("Could not up rev");

            return Ok(result);
        }

        [HttpPost]
        [Route("master/{id:Guid}/revision/{revId:Guid}/attatchswi/{clientHash}")]
        [ResponseType(typeof(SWIMasterVM))]
        [RequiresPermission("CanCreateSWI")]
        public async Task<IHttpActionResult> AttatchSwiFile(Guid id, Guid revId, string clientHash, [FromUri] string message)
        {
            using (StreamReader sr = new StreamReader(await Request.Content.ReadAsStreamAsync(), Encoding.UTF8))
            {
                var fileBinary = Encoding.UTF8.GetBytes(await sr.ReadToEndAsync());
                var result = await _swiService.AttatchSwiFile(revId, clientHash, fileBinary, Request.GetUsername(), message);
                return Ok(result);
            }
        }
    }
}
