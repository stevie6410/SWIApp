﻿using RC.SWI.Services.Services;
using RC.SWI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RC.SWI.Repository.Services.Web.Controllers
{
    [RoutePrefix("api/v1/standardtools")]
    public class StandardToolsController : ApiController
    {
        private readonly StandardToolingService stdTooling;

        public StandardToolsController()
        {
            stdTooling = new StandardToolingService();
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var results = await stdTooling.Get();
            if (results == null)
                return BadRequest("Could not find standard tooling records");
            return Ok(results);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> GetSingle(int id)
        {
            var result = await stdTooling.Get(id);
            if (result == null)
                return BadRequest("Could not find standard tooling for id " + id.ToString());
            return Ok(result);
        }

        [HttpPost]
        public async Task<IHttpActionResult> Create([FromBody] CreateStandardToolVM tool)
        {
            var result = await stdTooling.Create(tool);
            if (result == null) return BadRequest("Could not create Standard Tool");
            return Ok(result);
        }

        [HttpPut]
        public async Task<IHttpActionResult> Update([FromBody]StandardToolVM tool)
        {
            var result = await stdTooling.Update(tool);
            if (result == null) return null;
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IHttpActionResult> Delete(int id)
        {
            var result = await stdTooling.Delete(id);
            if (result == false) return BadRequest("Could not delete standard tool with Id " + id.ToString());
            return Ok(result);
        }
    }
}