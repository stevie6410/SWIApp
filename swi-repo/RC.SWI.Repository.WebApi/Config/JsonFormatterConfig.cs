using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace RC.SWI.Repository.WebApi.Config
{
    public static class JsonFormatterConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Clear any existing formatters
            config.Formatters.Clear();

            // Configure formatter for JSON
            config.Formatters.Add(new JsonMediaTypeFormatter());
            
            var json = config.Formatters.JsonFormatter;
            // Ignore reference loops 
            json.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            // Use camel case name resolver for Javascript style property names (e.g propName vs PropName)
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}