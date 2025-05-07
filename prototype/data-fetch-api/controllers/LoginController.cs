using Microsoft.AspNetCore.Mvc;
using Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Controllers
{

    [ApiController]
    [Route("api/login")]
    public class AuthController : ControllerBase
    {
        private const string Username = "username";
        private const string Password = "password";
        private const string jwtSecret = "super_secret_key_that_is_long_enough_123!";


        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Username == Username && request.Password == Password)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(jwtSecret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, request.Username) }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwt = tokenHandler.WriteToken(token);

                return Ok(new { token = jwt });
            }

            else return Unauthorized("Invalid credentials");

        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
