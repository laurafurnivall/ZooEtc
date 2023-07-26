using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface ITypeRepository
    {
        void Add(Types type);
        void Delete(int id);
        List<Types> GetAll();
        Types GetById(int id);
        void Update(Types type);
    }
}