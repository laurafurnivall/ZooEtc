using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.SqlClient;

namespace ZooEtc.Repositories
{
    public class ZooRepository : BaseRepository, IZooRepository
    {
        public ZooRepository(IConfiguration configuration) : base(configuration) { }

        public List<Zoos> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, ZooName, [Address], [City], [State], [PhoneNumber], ZooImgUrl, ZooUrl, [Description]
                                        FROM Zoos ";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var zoos = new List<Zoos>();
                        while(reader.Read())
                        {
                            zoos.Add(new Zoos()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ZooName = DbUtils.GetString(reader,"ZooName"),
                                Address = DbUtils.GetString(reader,"Address"),
                                City = DbUtils.GetString(reader,"City"),
                                State = DbUtils.GetString(reader,"State"),
                                PhoneNumber = DbUtils.GetString(reader,"PhoneNumber"),
                                ZooImgUrl = DbUtils.GetString(reader,"ZooImgUrl"),
                                ZooUrl = DbUtils.GetString(reader,"ZooUrl"),
                                Description = DbUtils.GetString(reader,"Description")
                            });
                        }

                        return zoos;
                    }
                }
            }
        }

        public Zoos GetById(int id) 
        { 
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT z.Id, z.ZooName, z.[Address], z.[City], z.[State], z.[PhoneNumber], z.ZooImgUrl, z.ZooUrl, z.[Description],
                                        zr.Id AS ZooReviewId, zr.UserId, zr.ZooId, zr.ReviewDate, zr.AnimalCare, zr.Culture, zr.ConservationInitiative, zr.Salary, zr.Benefits, zr.Leadership, zr.Inclusivity, zr.Comments, zr.isApproved
                                        FROM Zoos z
                                        LEFT JOIN ZooReviews zr ON z.Id = zr.ZooId
                                        WHERE z.Id = @id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        Zoos zoo = null;
                        while(reader.Read())
                        {
                            if (zoo == null)
                            {
                                zoo = new Zoos()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    ZooName = DbUtils.GetString(reader, "ZooName"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    ZooImgUrl = DbUtils.GetString(reader, "ZooImgUrl"),
                                    ZooUrl = DbUtils.GetString(reader, "ZooUrl"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    ZooReviews = new List<ZooReviews>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "ZooReviewId"))
                            {
                                zoo.ZooReviews.Add(new ZooReviews()
                                {
                                    Id = DbUtils.GetInt(reader, "ZooReviewId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    ZooId = id,
                                    ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                    AnimalCare = DbUtils.GetInt(reader, "AnimalCare"),
                                    Culture = DbUtils.GetInt(reader, "Culture"),
                                    ConservationInitiative = DbUtils.GetInt(reader, "ConservationInitiative"),
                                    Salary = DbUtils.GetInt(reader, "Salary"),
                                    Benefits = DbUtils.GetInt(reader, "Benefits"),
                                    Leadership = DbUtils.GetInt(reader, "Leadership"),
                                    Inclusivity = DbUtils.GetInt(reader, "Inclusivity"),
                                    Comments = DbUtils.GetString(reader, "Comments"),
                                    isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved"))
                                });
                            }
                        }
                        return zoo;
                    }
                }
            } 
        }

        public void Add(Zoos zoo) 
        { 
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Zoos (ZooName,[Address], City, State, PhoneNumber, ZooImgUrl, ZooUrl, [Description])
                                        OUTPUT INSERTED.Id
                                        VALUES (@ZooName, @Address, @City, @State, @PhoneNumber, @ZooImgUrl, @ZooUrl, @Description)";
                    DbUtils.AddParameter(cmd, "@ZooName", zoo.ZooName);
                    DbUtils.AddParameter(cmd, "@Address", zoo.Address);
                    DbUtils.AddParameter(cmd, "@City", zoo.City);
                    DbUtils.AddParameter(cmd, "@State", zoo.State);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", zoo.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@ZooImgUrl", zoo.ZooImgUrl);
                    DbUtils.AddParameter(cmd, "@ZooUrl", zoo.ZooUrl);
                    DbUtils.AddParameter(cmd, "@Description", zoo.Description);

                    zoo.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Zoos zoo) { throw new NotImplementedException(); }

        public void Delete(int id) { throw new NotImplementedException(); }
    }
}
