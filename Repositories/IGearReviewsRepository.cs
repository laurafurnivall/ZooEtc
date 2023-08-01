using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface IGearReviewsRepository
    {
        void Add(GearReviews gearReview);
        void Delete(int id);
        List<GearReviews> GetAll();
        GearReviews GetById(int id);
        void Update(GearReviews gearReview);
        List<GearReviews> GetByUserId(int id);
    }
}