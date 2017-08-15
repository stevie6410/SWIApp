using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using RC.SWI.Repository.Services.Web.Attributes;
using RC.SWI.Services;
using RC.SWI.ViewModels;
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace RC.SWI.Repository.Services.Web.Controllers
{
    [RoutePrefix("api/v1/documents")]
    [RequiresPermission("CanCreateSWI")]
    public class DocumentsController : ApiController
    {
        private readonly DocumentService docService;

        public DocumentsController()
        {
            //Call the concrete class for now. Need to wire up DI eventually
            docService = new DocumentService();
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var result = await docService.All();
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Get(int id)
        {
            var result = await docService.Get(id);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Post([FromBody] CreateDocumentVM document)
        {
            try
            {
                var result = await docService.Create(document);
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
        [Route("{id:int}/attatchfile")]
        public async Task<IHttpActionResult> AttatchFile(int id)
        {
            using (StreamReader sr = new StreamReader(await Request.Content.ReadAsStreamAsync(), Encoding.UTF8))
            {
                var fileBinary = Encoding.UTF8.GetBytes(await sr.ReadToEndAsync());
                var result = await docService.AttatchFile(id, fileBinary);
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

                var result = await this.docService.LinkToPart(id, partLink);
                
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
