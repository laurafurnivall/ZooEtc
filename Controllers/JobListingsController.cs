using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ZooEtc.Repositories;
using ZooEtc.Models;

namespace ZooEtc.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobListingsController : ControllerBase
    {
        private readonly IJobListingsRepository _jobListingsRepository;

        public JobListingsController(IJobListingsRepository jobListingsRepository)
        {
            _jobListingsRepository = jobListingsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_jobListingsRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var job = _jobListingsRepository.GetById(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpPost("add")]
        public IActionResult Post(JobListings job)
        {
            _jobListingsRepository.Add(job);
            return CreatedAtAction("Get", new { id = job.Id }, job);
        }

        [HttpPut("update/{id}")]
        public IActionResult Put(int id, JobListings job)
        {
            if (id != job.Id)
            {
                return BadRequest();
            }

            _jobListingsRepository.Update(job);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _jobListingsRepository.Delete(id);
            return NoContent();
        }
    }
}
