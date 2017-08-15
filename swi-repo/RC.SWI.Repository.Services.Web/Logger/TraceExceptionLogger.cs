using SharpRaven;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http.ExceptionHandling;
using System.Configuration;
using SharpRaven.Data;

namespace RC.SWI.Repository.Services.Web.Logger
{
    public class TraceExceptionLogger : ExceptionLogger
    {
        private RavenClient ravenClient;
        public TraceExceptionLogger()
        {
            string sentryServerURL = ConfigurationManager.AppSettings["SentryLoggingServer"];
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