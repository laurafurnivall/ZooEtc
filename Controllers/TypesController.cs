using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Repositories;
using ZooEtc.Models;

namespace ZooEtc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypesController : ControllerBase
    {
        private readonly ITypeRepository _typeRepository;

        public TypesController(ITypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_typeRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var type = _typeRepository.GetById(id);
            if (type == null)
            {
                return NotFound();
            }
            return Ok(type);
        }

        [HttpPost("add")]
        public IActionResult Post(Types type)
        {
            _typeRepository.Add(type);
            return CreatedAtAction("Get", new { id = type.Id }, type);
        }

        [HttpPut("update/{id}")]
        public IActionResult Put(int id, Types type)
        {
            if (id != type.Id)
            {
                return BadRequest();
            }

            _typeRepository.Update(type);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _typeRepository.Delete(id);
            return NoContent();
        }
    }
}
