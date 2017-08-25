using SharpRaven;
using SharpRaven.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Web;
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
        private RavenClient ravenClient;
        public TraceExceptionLogger()
        {
            string sentryServerURL = ConfigurationManager.AppSettings["SentryLoggingServer"];
            if (sentryServerURL == null) throw new Exception("SentryLoggingServer App Setting could not be retreived from the configuration file");
            ravenClient = new RavenClient(sentryServerURL);
        }

        public override void Log(ExceptionLoggerContext context)
        {
            Trace.TraceError(context.ExceptionContext.Exception.ToString());
            ravenClient.Capture(new SentryEvent(context.ExceptionContext.Exception));
            base.Log(context);
        }
    }
}