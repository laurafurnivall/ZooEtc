using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface IJobListingsRepository
    {
        void Add(JobListings job);
        void Delete(int id);
        List<JobListings> GetAll();
        JobListings GetById(int id);
        void Update(JobListings job);
    }
}