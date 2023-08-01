using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Models;
using ZooEtc.Repositories;

namespace ZooEtc.Controllers //manages direct floow of data between server and client side
{
    [Route("api/[controller]")] //route template
    [ApiController]
    public class GearReviewsController : ControllerBase //inheritance of methods,etc from controller base (bad request, not found examples)
    {
        private readonly IGearReviewsRepository _repository; //creating a dependency of of the repo and injecting it in using the below constructor

        public GearReviewsController(IGearReviewsRepository repository) //utitlizing a repo without
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult Get() //retrieve/read all gear items 
        {
            return Ok(_repository.GetAll());
        }

        [HttpGet("{id}")] // retrieve/read one gear item -> gear/{id}
        public IActionResult Get(int id)
        {
            var review = _repository.GetById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        [HttpPost("add")] // create new gear item -> gear/add
        public IActionResult Post(GearReviews review)
        {
            _repository.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }

        [HttpPut("update/{id}")] //update item -> gear/update/{id}
        public IActionResult Put(int id, GearReviews review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            _repository.Update(review);
            return NoContent();
        }

        [HttpDelete("delete/{id}")] //delete item -> gear/delete/{id}
        public IActionResult Delete(int id)
        {
            _repository.Delete(id);
            return NoContent();
        }
    }
}
