using SharpRaven;
using SharpRaven.Data;
using System;
using System.Configuration;
using System.Diagnostics;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace RC.SWI.Repository.WebApi.Config
{
    public static class LoggingConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Services.Add(typeof(IExceptionLogger), new TraceExceptionLogger());
        }
    }

    public class TraceExceptionLogger : ExceptionLogger
    {
        private RavenClient _ravenClient;
        public TraceExceptionLogger()
        {
            string sentryServerUrl = ConfigurationManager.AppSettings["SentryLoggingServer"];
            if (sentryServerUrl == null) throw new Exception("SentryLoggingServer App Setting could not be retreived from the configuration file");
            _ravenClient = new RavenClient(sentryServerUrl);
        }

        public override void Log(ExceptionLoggerContext context)
        {
            Trace.TraceError(context.ExceptionContext.Exception.ToString());
            _ravenClient.Capture(new SentryEvent(context.ExceptionContext.Exception));
            base.Log(context);
        }
    }
}