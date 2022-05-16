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
        private User FindUserById(int id)
        {
            return _context.Users.FirstOrDefault(e => e.Id == id);
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
            int itemsPerPage = 12;
            if (query != "")
            {
                pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).Count() / (decimal)itemsPerPage);
                Response.Headers.Add("Page-Count", pageCount.ToString());
                posts = await _context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).OrderBy(e => e.Title).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();
            }
            else
            {
                pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Count() / (decimal)itemsPerPage);
                Response.Headers.Add("Page-Count", pageCount.ToString());
                posts = await _context.Posts.Where(e => !e.Status.Equals(0)).OrderBy(e => e.Title).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();
            }

            return Ok(posts);
        }


        // GET: api/<PostController>
        [Route("/api/Posts/pending/{pageNumber}")]
        [HttpGet]
        public async Task<IActionResult> GetPending([FromRoute] int pageNumber)
        {
            List<Post> posts = new List<Post>();
            int pageCount = 0;
            int itemsPerPage = 8;

            pageCount = (int)Math.Ceiling(_context.Posts.Where(e => e.Status.Equals(0)).Count() / (decimal)itemsPerPage);
            Response.Headers.Add("Page-Count", pageCount.ToString());
            posts = await _context.Posts.Where(e => e.Status.Equals(0)).OrderBy(e => e.Id).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();

            return Ok(posts);
        }

        [Route("/api/Posts/confirm/{id}")]
        [HttpPost]
        public async Task<IActionResult> ConfirmPost([FromRoute] int id, [FromBody] PostDTO post)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var existingPost = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));
                if (existingPost != null)
                {
                    existingPost.Status = 1;
                    existingPost.Title = post.Title;
                    existingPost.Description = post.Description;
                    existingPost.Description2 = post.Description2;
                    existingPost.Price = post.Price;
                    existingPost.Material = post.Material;
                    existingPost.ReleaseDate = post.ReleaseDate;
                    existingPost.StyleCode = post.StyleCode;
                    existingPost.Colorway = post.Colorway;
                    existingPost.FK_Brand = post.FK_Brand;
                    existingPost.FK_User = userId;
                    existingPost.Image = post.Image;
                    existingPost.SubmitDate = DateTime.Now;
                    _context.Posts.Update(existingPost);
                    await _context.SaveChangesAsync();
                    return Ok("Post confirmed.");
                }
                else return NotFound("Post not found.");
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }



        // GET api/<PostController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            //post.ReleaseDate = post.ReleaseDate.ToString("MM/dd/yyyy");
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
                var user = FindUserById(userId);

                int status = 0;
                if(user.Role == true)
                    status = 1;

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
                    Status = status,
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
