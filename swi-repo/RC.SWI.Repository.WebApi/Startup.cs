using System.Reflection;
using Owin;
using System.Web.Http;
using RC.SWI.Repository.WebApi.Config;
using System.Web.Http.Cors;
using Ninject;
using Ninject.Syntax;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using RC.SWI.Services;
using RC.SWI.Services.Interfaces;

namespace RC.SWI.Repository.WebApi
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Create a new configuration
            var config = new HttpConfiguration();

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

            // Use WebAPI with Ninject
            app
                .UseNinjectMiddleware(CreateKernel)
                .UseNinjectWebApi(config);
        }

        private static StandardKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            RegisterServices(kernel);
            kernel.Load(Assembly.GetExecutingAssembly());
            return kernel;
        }

        private static void RegisterServices(IBindingRoot kernel)
        {
            kernel.Bind<ISwiService>().To<SwiService>();
            kernel.Bind<IStandardToolingService>().To<StandardToolingService>();
            kernel.Bind<INotificationService>().To<NotificationService>();
            kernel.Bind<IDocumentWatcherService>().To<DocumentWatcherService>();
            kernel.Bind<IDocumentService>().To<DocumentService>();
            kernel.Bind<IAppCatalogService>().To<AppCatalogService>();
        }
    }

}