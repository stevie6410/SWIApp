using RC.AppSecurity.Services;
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
using System.Web.UI;

namespace RC.SWI.Repository.WebAPI.Filters
{
    public class RequiresPermissionAttribute : FilterAttribute, IAuthorizationFilter
    {
        private readonly UserService _userService;
        private readonly string _requiredPermission;

        public RequiresPermissionAttribute(string requiredPermission)
        {
            _requiredPermission = requiredPermission;
            _userService = new UserService();
        }

        public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            var request = actionContext.Request;
            IEnumerable<string> tokenValues;
            request.Headers.TryGetValues("token", out tokenValues); ;

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
                return request.CreateErrorResponse(HttpStatusCode.Unauthorized,
                    $"Token created on {jwtToken.ValidFrom} and expires on {jwtToken.ValidTo} and current time is {DateTime.Now}");
            }

            if ((await HasPermission(token, _requiredPermission)) == false)
                return request.CreateErrorResponse(HttpStatusCode.Unauthorized,
                    $"User does not have permission {_requiredPermission}");

            return actionContext.Response ?? await continuation();
        }

        private async Task<bool> HasPermission(string token, string requiredPermission)
        {
            var permissions = await GetUserPermissionsFromToken(token);
            var matchedPermissions = permissions.Contains(requiredPermission);
            return matchedPermissions;
        }

        private async Task<List<string>> GetUserPermissionsFromToken(string token)
        {
            var jwtToken = GetToken(token);
            var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name");
            var username = usernameClaim?.Value;

            var user = await _userService.GetUser(username);
            if (user == null) throw new ArgumentNullException(nameof(user));
            var app = user.Applications.FirstOrDefault(x => x.AppId == "SWIAPP");
            return app?.UserPermissions?.Select(up => up.Name).ToList();
        }

        private static JwtSecurityToken GetToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (tokenHandler.CanReadToken(token) == false) throw new Exception("Invalid token cannot be read");
            var decodedToken = tokenHandler.ReadJwtToken(token);
            return decodedToken;
        }

        private static bool TokenIsExpired(string token)
        {
            var jwtToken = GetToken(token);
            var validTo = jwtToken.ValidTo.ToUniversalTime();
            return validTo <= DateTime.UtcNow;
        }
    }
}