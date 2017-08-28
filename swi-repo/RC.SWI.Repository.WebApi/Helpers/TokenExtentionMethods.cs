using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;

namespace RC.SWI.Repository.WebApi.Helpers
{
    public static class TokenExtentionMethods
    {
        private static string GetToken(this HttpRequestMessage request)
        {
            IEnumerable<string> tokenValues;
            var tokens = request.Headers.TryGetValues("token", out tokenValues); ;

            if (tokenValues == null)
                throw new Exception("Token missing from request header");

            var token = tokenValues.FirstOrDefault();

            if (token == null)
                throw new Exception("Token missing from request header");

            if (!token.TokenIsExpired()) return token;
            var jwtToken = token.SerializeToJwtToken();
            throw new Exception($"Token created on {jwtToken.ValidFrom} and expires on {jwtToken.ValidTo} and current time is {DateTime.Now}");
        }

        public static string GetUsername(this HttpRequestMessage request)
        {
            var token = request.GetToken();
            return token.GetUsernameFromToken();            
        }

        private static JwtSecurityToken SerializeToJwtToken(this string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            if (tokenHandler.CanReadToken(token) == false) throw new Exception("Invalid token cannot be read");
            var decodedToken = tokenHandler.ReadJwtToken(token);
            return decodedToken;
        }

        private static bool TokenIsExpired(this string token)
        {
            var jwtToken = token.SerializeToJwtToken();
            var validTo = jwtToken.ValidTo.ToUniversalTime();
            return validTo <= DateTime.UtcNow;
        }

        private static string GetUsernameFromToken(this string token)
        {
            var jwtToken = token.SerializeToJwtToken();
            var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name");
            var username = usernameClaim?.Value;
            return username;
        }
    }
}
