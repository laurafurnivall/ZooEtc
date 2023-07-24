using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Repositories;
using ZooEtc.Models;

namespace ZooEtc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZoosController : ControllerBase
    {
        private readonly IZooRepository _zooRepository;

        public ZoosController(IZooRepository zooRepository)
        {
            _zooRepository = zooRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_zooRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var zoo = _zooRepository.GetById(id);
            if (zoo == null)
            {
                return NotFound();
            }
            return Ok(zoo);
        }

        [HttpPost("add")]
        public IActionResult Post(Zoos zoo)
        {
            _zooRepository.Add(zoo);
            return CreatedAtAction("Get", new {id =  zoo.Id}, zoo);
        }

        [HttpPut("update/{id}")]
        public IActionResult Put(int id, Zoos zoo)
        {
            if (id != zoo.Id)
            {
                return BadRequest();
            }

            _zooRepository.Update(zoo);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _zooRepository.Delete(id);
            return NoContent();
        }
    }
}
