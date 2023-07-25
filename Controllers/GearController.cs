using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Repositories;
using ZooEtc.Models;

namespace ZooEtc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GearController : ControllerBase
    {
        private readonly IGearRepository _gearRepository;

        public GearController(IGearRepository gearRepository)
        {
            _gearRepository = gearRepository;
        }

        [HttpGet]
        public IActionResult Get()
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
