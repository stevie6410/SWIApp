using Owin;
using System.Web.Http;
using RC.SWI.Repository.WebApi.Config;
using System.Web.Http.Cors;

namespace RC.SWI.Repository.WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Create a new configuration
            HttpConfiguration config = new HttpConfiguration();

            // Routes
            config.MapHttpAttributeRoutes();

            // Logging
            LoggingConfig.Register(config);
            
            // JSON Formatter
            JsonFormatterConfig.Register(config);
            
            // Swagger
            SwaggerConfig.Register(config);

            // Cors
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            
            // Use WebAPI
            app.UseWebApi(config);
        }
    }
}