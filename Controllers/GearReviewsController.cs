using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Models;
using ZooEtc.Repositories;

namespace ZooEtc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GearReviewsController : ControllerBase
    {
        private readonly IGearReviewsRepository _repository;

        public GearReviewsController(IGearReviewsRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var review = _repository.GetById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost("add")]
        public IActionResult Post(GearReviews review)
        {
            _repository.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }

        [HttpPut("update/{id}")]
        public IActionResult Put(int id, GearReviews review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            _repository.Update(review);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _repository.Delete(id);
            return NoContent();
        }
    }
}
