using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using RC.SWI.Repository.WebApi.Helpers;
using RC.SWI.Repository.WebAPI.Filters;
using RC.SWI.Services;
using RC.SWI.Services.Interfaces;
using RC.SWI.ViewModels;
using RC.SWI.ViewModels.ViewModels;

namespace RC.SWI.Repository.WebApi.Controllers
{
    [RoutePrefix("api/v1/documents")]
    [RequiresPermission("CanCreateSWI")]
    public class DocumentsController : ApiController
    {
        private readonly IDocumentService _docService;

        public DocumentsController(IDocumentService docService)
        {
            //Call the concrete class for now. Need to wire up DI eventually
            _docService = docService;
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var result = await _docService.All();
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Get(int id)
        {
            var result = await _docService.Get(id);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create([FromBody] CreateDocumentVM document)
        {
            try
            {
                var result = await _docService.Create(document);
                if (result == null)
                    return BadRequest("Could not create document");

                return Ok(result);
            }
            catch (System.Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        [HttpPost]
        [Route("{id:int}/checkout")]
        public async Task<IHttpActionResult> CheckOut(int id)
        {
            var result = await _docService.CheckOut(id, Request.GetUsername());
            if (result == null) return BadRequest("Could not be checked out");
            return Ok(result);
        }

        [HttpPost]
        [Route("{id:int}/checkin")]
        public async Task<IHttpActionResult> CheckIn([FromBody] CheckInRequest request)
        {
            var result = await _docService.CheckIn(request, Request.GetUsername());
            if (result == null) return BadRequest("Could not be checked in");
            return Ok(result);
        }

        [HttpPost]
        [Route("{id:int}/attatchfile")]
        public async Task<IHttpActionResult> AttatchFile(int id, [FromUri] string message)
        {
            using (StreamReader sr = new StreamReader(await Request.Content.ReadAsStreamAsync(), Encoding.UTF8))
            {
                var fileBinary = Encoding.UTF8.GetBytes(await sr.ReadToEndAsync());
                var result = await _docService.AttatchFile(id, fileBinary, Request.GetUsername(), null, message);
                return Ok(result);
            }
        }

        [HttpPost]
        [Route("{id:int}/linkpart")]
        public async Task<IHttpActionResult> LinkToPart(int id, [FromBody] DocumentPartLinkVM partLink)
        {
            try
            {
                if (partLink == null)
                    return BadRequest("Part link request is invalid");

                var result = await this._docService.LinkToPart(id, partLink, Request.GetUsername());

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Part link failed - " + ex.Message);
                throw;
            }
        }
    }
}
