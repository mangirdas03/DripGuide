using DripGuide.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DripGuide.Viewmodels;
using BCryptNet = BCrypt.Net.BCrypt;
using DripGuide.Helpers;
using Microsoft.AspNetCore.Http;

namespace DripGuide.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DripContext _context;
        private readonly JwtService _jwtservice;

        public AuthController(DripContext context, JwtService jwtservice)
        {
            _context = context;
            _jwtservice = jwtservice;
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }


        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("Added!");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, User user)
        {
            user.Id = id;

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            //return NoContent();
            return user;
        }


        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }




        ///////////////////////////////////////////////////


        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDTO registerdto)
        {
            //string mySalt = BCryptNet.GenerateSalt();
            var user = new User
            {
                Name = registerdto.Name,
                Password = BCryptNet.HashPassword(registerdto.Password),
                Age = registerdto.Age,
                Email = registerdto.Email,
                Role = false
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Created("Created!", user);
        }




        [HttpPost("login")]
        public IActionResult Login(LoginDTO logindto)
        {

            User user = FindUserByName(logindto.Name);

            if(user == null) return BadRequest("User not found!");

            if (!BCryptNet.Verify(logindto.Password, user.Password))
            {
                return BadRequest("Invalid credentials!");
            }

            var jwt = _jwtservice.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(user);
        }

        private User FindUserByName(string name)
        {
            return _context.Users.FirstOrDefault(e => e.Name == name);
        }
        private User FindUserById(int id)
        {
            return _context.Users.FirstOrDefault(e => e.Id == id);
        }


        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);

                return Ok(user);
            }
            catch (Exception)
            {

                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok("Logged out");
        }


        [HttpGet("test")]
        public IActionResult Test()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);


                return Ok("Test puslapis.");
            }
            catch (Exception)
            {

                return Unauthorized();
            }
        }


        [HttpGet("wtf")]
        public IActionResult Wtf()
        {
            return Ok("wtf");
        }

    }
}
