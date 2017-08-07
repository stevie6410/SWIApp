using System.Web;
using System.Web.Mvc;

namespace RC.SWI.Repository.Services.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
