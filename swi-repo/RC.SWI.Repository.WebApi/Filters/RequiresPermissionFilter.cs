using RC.AppSecurity.Services;
using RC.AppSecurity.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace RC.SWI.Repository.WebAPI.Filters
{
    public class RequiresPermissionAttribute : FilterAttribute, IAuthorizationFilter
    {
        private readonly UserService userService;
        private readonly string _requiredPermission;

        public RequiresPermissionAttribute(string requiredPermission)
        {
            _requiredPermission = requiredPermission;
            userService = new UserService();
        }

        public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            var request = actionContext.Request;
            IEnumerable<string> tokenValues;
            var tokens = request.Headers.TryGetValues("token", out tokenValues); ;

            if (tokenValues == null)
                return request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Token missing");

            var token = tokenValues.FirstOrDefault();

            if (token == null)
                return request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Token missing");

            if (TokenIsExpired(token))
            {
                var jwtToken = GetToken(token);
                var validTo = jwtToken.ValidTo;
                var now = DateTime.Now;
                return request.CreateErrorResponse(HttpStatusCode.Unauthorized, string.Format("Token created on {0} and expires on {1} and current time is {2}", jwtToken.ValidFrom, jwtToken.ValidTo, DateTime.Now));
            }

            if ((await HasPermission(token, _requiredPermission)) == false)
                return request.CreateErrorResponse(HttpStatusCode.Unauthorized, string.Format("User does not have permission {0}", _requiredPermission));

            return actionContext.Response ?? await continuation();
        }

        private async Task<bool> HasPermission(string token, string requiredPermission)
        {
            var permissions = await GetUserPermissionsFromToken(token);
            var matchedPermissions = permissions.Contains(requiredPermission);
            return matchedPermissions;
        }

        private JwtSecurityToken GetToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (tokenHandler.CanReadToken(token) == false) throw new Exception("Invalid token cannot be read");
            var decodedToken = tokenHandler.ReadJwtToken(token);
            return decodedToken;
        }

        async private Task<List<string>> GetUserPermissionsFromToken(string token)
        {
            var jwtToken = GetToken(token);
            var usernameClaim = jwtToken.Claims.Where(c => c.Type == "unique_name").FirstOrDefault();
            var username = usernameClaim.Value;

            UserVM user = await userService.GetUser(username);
            var app = user.Applications.Where(x => x.AppId == "SWIAPP").FirstOrDefault();
            return app.UserPermissions.Select(up => up.Name).ToList();
        }

        private bool TokenIsExpired(string token)
        {
            var jwtToken = GetToken(token);
            var validTo = jwtToken.ValidTo.ToUniversalTime();
            if (validTo > DateTime.UtcNow) return false;
            return true;
        }
    }
}