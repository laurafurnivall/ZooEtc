using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface IZooRepository
    {
        void Add(Zoos zoo);
        void Delete(int id);
        Zoos GetById(int id);
        List<Zoos> GetAll();
        void Update(Zoos zoo);
    }
}