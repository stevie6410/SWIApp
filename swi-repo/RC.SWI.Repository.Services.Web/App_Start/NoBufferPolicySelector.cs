using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.WebHost;

namespace RC.SWI.Repository.Services.Web.App_Start
{
    public class NoBufferPolicySelector : WebHostBufferPolicySelector
    {
        public override bool UseBufferedInputStream(object hostContext)
        {
            var context = hostContext as HttpContextBase;

            if (context != null)
            {
                if (string.Equals(context.Request.RequestContext.RouteData.Values["controller"].ToString(), "documents", StringComparison.InvariantCultureIgnoreCase))
                    return false;
            }

            return true;
        }

        public override bool UseBufferedOutputStream(HttpResponseMessage response)
        {
            return base.UseBufferedOutputStream(response);
        }
    }
}