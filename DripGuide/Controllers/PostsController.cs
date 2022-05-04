using DripGuide.Helpers;
using DripGuide.Models;
using DripGuide.Viewmodels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DripGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DripContext _context;
        private readonly JwtService _jwtservice;

        public PostsController(DripContext context, JwtService jwtservice)
        {
            _context = context;
            _jwtservice = jwtservice;
        }


        // GET: api/<PostController>
        [HttpGet]
        public async IAsyncEnumerable<Post> Get()
        {
            var posts = _context.Posts;

            await foreach (var post in posts)
            {
                if (post.Status != 0)
                {
                    yield return post;
                }
            }
        }


        [Route("/api/Posts/Suggestions/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetSuggestions([FromRoute] string query)
        {
            //int pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Count() / (decimal)3);
            //Response.Headers.Add("Page-Count", pageCount.ToString());
            var posts = await _context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).OrderBy(e => e.Title).Take(10).ToListAsync();

            return Ok(posts);
        }


        // GET: api/<PostController>
        [Route("/api/Posts/Page/{pageNumber}/{query?}")]
        [HttpGet]
        public async Task<IActionResult> GetPage([FromRoute] int pageNumber, string query="")
        {
            List<Post> posts = new List<Post>();
            int pageCount = 0;

            if (query != "")
            {
                pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).Count() / (decimal)3);
                Response.Headers.Add("Page-Count", pageCount.ToString());
                posts = await _context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).OrderBy(e => e.Id).Skip(3 * (pageNumber - 1)).Take(3).ToListAsync();
            }
            else
            {
                pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Count() / (decimal)3);
                Response.Headers.Add("Page-Count", pageCount.ToString());
                posts = await _context.Posts.Where(e => !e.Status.Equals(0)).OrderBy(e => e.Id).Skip(3 * (pageNumber - 1)).Take(3).ToListAsync();
            }

            return Ok(posts);
        }



        [Route("/api/Posts/pending")]
        [HttpGet]
        public async IAsyncEnumerable<Post> GetPending()
        {
            var posts = _context.Posts;

            await foreach (var post in posts)
            {
                if (post.Status == 0)
                {
                    yield return post;
                }
            }
        }
        [Route("/api/Posts/confirm/{id}")]
        [HttpPost]
        public async Task<IActionResult> ConfirmPost(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));
            if (post != null)
            {
                post.Status = 1;
                _context.Posts.Update(post);
                await _context.SaveChangesAsync();
                return Ok("Post confirmed.");
            }
            else return NotFound("Post not found.");
        }



        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            return Ok(post);
        }

        // POST api/<PostController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PostDTO post)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var newPost = new Post
                {
                    Title = post.Title,
                    Description = post.Description,
                    Description2 = post.Description2,
                    Material = post.Material,
                    StyleCode = post.StyleCode,
                    Colorway = post.Colorway,
                    ReleaseDate = post.ReleaseDate,
                    Price = post.Price,
                    Image = post.Image,

                    FK_User = userId,
                    SubmitDate = DateTime.Now,
                    Status = 0,
                    FK_Brand = post.FK_Brand
                };
                _context.Posts.Add(newPost);
                await _context.SaveChangesAsync();

                return Created("Created!", newPost);

                //return Ok(user);
            }
            catch (Exception)
            {

                return Unauthorized();
            }

            
        }




        // PUT api/<PostController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));
            if (post != null)
            {
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
                return Ok("Post removed.");
            }
            else return NotFound("Post not found.");
        }
    }
}
