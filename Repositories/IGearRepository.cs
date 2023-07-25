using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface IGearRepository
    {
        void Add(Gear item);
        void Delete(int id);
        List<Gear> GetAll();
        Gear GetById(int id);
        void Update(Gear item);
    }
}