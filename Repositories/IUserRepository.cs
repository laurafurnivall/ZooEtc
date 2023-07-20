using System.Collections.Generic;
using ZooEtc.Models;

namespace ZooEtc.Repositories
{
    public interface IUserRepository
    {
        void Add(Users users);
        void Delete(int id);
        List<Users> GetAll();
        Users GetByFirebaseUserId(string firebaseUserId);
        Users GetById(int id);
        void Update(Users users);
    }
}