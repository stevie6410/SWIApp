using Swashbuckle.Application;
using Swashbuckle.Swagger;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;

namespace RC.SWI.Repository.WebApi.Config
{
    public static class SwaggerConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config
                .EnableSwagger(c =>
                {
                    c.OperationFilter<AddAuthTokenHeaderParameter>();
                    c.SingleApiVersion("v1", "RC.SWI.Repository.Services.Web");
                    c.PrettyPrint();
                })
                .EnableSwaggerUi(c => 
                {

                });
        }
    }

    public class AddAuthTokenHeaderParameter : IOperationFilter
    {
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            if (operation.parameters == null)
                operation.parameters = new List<Parameter>();

            HeaderParameter p = new HeaderParameter();
            p.name = "token";
            p.@in = "header";
            p.type = "string";
            p.required = false;

            operation.parameters.Add(p);
        }

        class HeaderParameter : Parameter { }
    }
}