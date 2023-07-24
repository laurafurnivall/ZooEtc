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

        [HttpPost("add")]
        public IActionResult Post(Zoos zoo)
        {
            _zooRepository.Add(zoo);
            return CreatedAtAction("Get", new {id =  zoo.Id}, zoo);
        }
    }
}
