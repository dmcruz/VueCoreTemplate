using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VueCore.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VueCore.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginCreds creds)
        {
            Console.WriteLine("API login: {0} {1}", creds.Username, creds.Password);
            if (ValidateUser(creds))
            {
                UserInfo userInfo = new UserInfo
                {
                    Username = creds.Username,
                    Name = creds.Username == "dmcruz" ? "Donut" : creds.Username.ToUpper()
                };

                string authScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                var principal = GetPrincipal(userInfo, authScheme);

                await HttpContext.SignInAsync(authScheme, principal, new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(5)
                });

                return Json(userInfo);
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return StatusCode(200);
        }

        private ClaimsPrincipal GetPrincipal(UserInfo userInfo, string authScheme)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userInfo.Username),
                new Claim(ClaimTypes.Name, userInfo.Name),
                new Claim(ClaimTypes.Role, "User")
            };
            return new ClaimsPrincipal(new ClaimsIdentity(claims, authScheme));
        }

        [Authorize]
        [HttpGet]
        [Route("user")]
        public IActionResult GetUser()
        {
            var claimUsername = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            var claimName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            if (claimUsername != null)
            {
                return Json(new UserInfo()
                {
                    Username = claimUsername.Value,
                    Name = claimName.Value
                });
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        [Route("test/{id}")]
        public string test(string id)
        {
            return string.Format("authorized test {0}", id);
        }

        [HttpGet]
        [Route("pubtest/{id}")]
        public string pubtest(string id)
        {
            return string.Format("test {0}", id);

        }

        private bool ValidateUser(LoginCreds creds)
        {
            if (creds.Username == "dmcruz" || creds.Username == "aaa")
                return true;
            return false;
        }
    }
}
