using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.Repository.WebApi.Helpers
{
    public static class TokenExtentionMethods
    {
        
        public static string GetToken(this HttpRequestMessage request)
        {
            IEnumerable<string> tokenValues;
            var tokens = request.Headers.TryGetValues("token", out tokenValues); ;

            if (tokenValues == null)
                throw new Exception("Token missing from request header");

            var token = tokenValues.FirstOrDefault();

            if (token == null)
                throw new Exception("Token missing from request header");

            if (token.TokenIsExpired())
            {
                var jwtToken = token.SerializeToJwtToken();
                var validTo = jwtToken.ValidTo;
                var now = DateTime.Now;
                throw new Exception(string.Format("Token created on {0} and expires on {1} and current time is {2}", jwtToken.ValidFrom, jwtToken.ValidTo, DateTime.Now));
            }

            return token;
        }

        public static string GetUsername(this HttpRequestMessage request)
        {
            var token = request.GetToken();
            return token.GetUsernameFromToken();            
        }

        public static JwtSecurityToken SerializeToJwtToken(this string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (tokenHandler.CanReadToken(token) == false) throw new Exception("Invalid token cannot be read");
            var decodedToken = tokenHandler.ReadJwtToken(token);
            return decodedToken;
        }

        public static bool TokenIsExpired(this string token)
        {
            var jwtToken = token.SerializeToJwtToken();
            var validTo = jwtToken.ValidTo.ToUniversalTime();
            if (validTo > DateTime.UtcNow) return false;
            return true;
        }

        public static string GetUsernameFromToken(this string token)
        {
            var jwtToken = token.SerializeToJwtToken();
            var usernameClaim = jwtToken.Claims.Where(c => c.Type == "unique_name").FirstOrDefault();
            var username = usernameClaim.Value;
            return username;
        }
    }
}
