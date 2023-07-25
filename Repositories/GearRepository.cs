using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.SqlClient;

namespace ZooEtc.Repositories
{
    public class GearRepository : BaseRepository
    {
        public GearRepository(IConfiguration configuration) : base(configuration) { }
    }

    public List<Gear> GetAll()
    {
       
    }
}
