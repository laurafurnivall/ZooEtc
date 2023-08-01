using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Repositories;
using ZooEtc.Models;

namespace ZooEtc.Controllers //manages direct flow of data between server and client side
{
    [Route("api/[controller]")] //route template
    [ApiController]
    public class GearController : ControllerBase
    {
        private readonly IGearRepository _gearRepository;

        public GearController(IGearRepository gearRepository) //constructor, takes repository as parameter, implementing dependency injection
        {
            _gearRepository = gearRepository;
        }

        [HttpGet] //attribute routes  that map to http methods
        public IActionResult Get() //handle http requests, interact with repository to perform crud
        {
            return Ok(_gearRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _gearRepository.GetById(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost("add")]
        public IActionResult Post(Gear item)
        {
            _gearRepository.Add(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

        [HttpPut("update/{id}")]
        public IActionResult Put(int id, Gear item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _gearRepository.Update(item);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _gearRepository.Delete(id);
            return NoContent();
        }
    }
}
