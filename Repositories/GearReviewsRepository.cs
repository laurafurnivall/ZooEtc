using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public class GearReviewsRepository : BaseRepository
    {
        public GearReviewsRepository(IConfiguration configuration) : base(configuration) { }

        public List<GearReviews> GetAll()
        {

        }

        public GearReviews GetById(int id)
        {

        }

        public void Add(GearReviews gearReview)
        {

        }

        public void Update(GearReviews gearReview)
        {

        }

        public void Delete(int id)
        {

        }
    }
}
