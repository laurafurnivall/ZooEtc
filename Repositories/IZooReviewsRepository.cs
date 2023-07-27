using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface IZooReviewsRepository
    {
        void Add(ZooReviews zooReviews);
        void Delete(int id);
        List<ZooReviews> GetAll();
        ZooReviews GetById(int id);
        void Update(ZooReviews zooReviews);
    }
}