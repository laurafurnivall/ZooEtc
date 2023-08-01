using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.SqlClient;
using System.Security.Authentication;
using System.Linq;

namespace ZooEtc.Repositories
{
    public class GearRepository : BaseRepository, IGearRepository //inherits BaseRepository, allowing usage of connection string, IGearRepository, an interface, defines the methods that must be implemented
    {// contains methods for connecting to database and querying data, basic CRUD
        public GearRepository(IConfiguration configuration) : base(configuration) { } //access app config settings, passes the config settings through

        public List<Gear> GetAll() //retrieve all the gear records in the database
        {
            using (var conn = Connection) // create the connection
            {
                conn.Open(); //opens the connection
                using (var cmd = conn.CreateCommand()) //creates a new sqlcommand which is used to execute sql commands in the database
                {
                    cmd.CommandText = @"SELECT g.Id AS GearId, g.[Title], g.[Description], g.PurchaseUrl, g.ImageUrl,
                                               gr.Id AS GearReviewId, gr.UserId, gr.GearId AS GearReviewGearId, gr.ReviewDate, gr.Longevity, gr.Versatility, gr.Comfort, gr.Comments, gr.isApproved,
                                               gt.Id AS GearTypeId, gt.GearId AS GearTypeGearId, gt.TypeId AS GearTypeTypeId,
                                               t.Id AS TypeId, t.Type
                                        FROM Gear g
                                        LEFT JOIN GearReviews gr ON g.Id = gr.GearId
                                        LEFT JOIN GearTypes gt ON g.Id = gt.GearId
                                        LEFT JOIN Types t on t.Id = gt.TypeId
                                        ORDER BY g.Title";
                    using (var reader = cmd.ExecuteReader()) //executes the command and returns the sqldatareader object
                    {
                        var items = new List<Gear>();
                        while (reader.Read())
                        {
                            var gearId = DbUtils.GetInt(reader, "GearId");
                            var existingGear = items.FirstOrDefault(g => g.Id == gearId);
                            if (existingGear == null) 
                            {
                                existingGear = new Gear()
                                {
                                    Id = DbUtils.GetInt(reader, "GearId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    PurchaseUrl = DbUtils.GetString(reader, "PurchaseUrl"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    GearReviews = new List<GearReviews>(),
                                    Types = new List<Types>(),
                                };
                                items.Add(existingGear);
                            }
                            if (DbUtils.IsNotDbNull(reader, "GearReviewId") && existingGear.GearReviews.All(r => r.Id != DbUtils.GetInt(reader, "GearReviewId")))
                            {
                                existingGear.GearReviews.Add(new GearReviews()
                                {
                                    Id = DbUtils.GetInt(reader, "GearReviewId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    GearId = DbUtils.GetInt(reader, "GearReviewGearId"),
                                    ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                    Longevity = DbUtils.GetInt(reader, "Longevity"),
                                    Versatility = DbUtils.GetInt(reader, "Versatility"),
                                    Comfort = DbUtils.GetInt(reader, "Comfort"),
                                    Comments = DbUtils.GetString(reader, "Comments"),
                                    isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved"))
                                });
                            }
                            if(DbUtils.IsNotDbNull(reader, "TypeId"))
                            {
                                existingGear.Types.Add(new Types()
                                {
                                    Id = DbUtils.GetInt(reader, "TypeId"),
                                    Type = DbUtils.GetString(reader, "Type")
                                });
                            } 
                        }
                        return items;
                    }
                }
            }
        }

        public Gear GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT g.Id AS GearId, g.[Title], g.[Description], g.PurchaseUrl, g.ImageUrl,
                                               gr.Id AS GearReviewId, gr.UserId, gr.GearId AS GearReviewGearId, gr.ReviewDate, gr.Longevity, gr.Versatility, gr.Comfort, gr.Comments, gr.isApproved,
                                               gt.Id AS GearTypeId, gt.GearId AS GearTypeGearId, gt.TypeId AS GearTypeTypeId,
                                               t.Id AS TypeId, t.Type
                                        FROM Gear g
                                        LEFT JOIN GearReviews gr ON g.Id = gr.GearId
                                        LEFT JOIN GearTypes gt ON g.Id = gt.GearId
                                        LEFT JOIN Types t on t.Id = gt.TypeId
                                        Where g.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        Gear item = null;
                        while (reader.Read())
                        {
                            if (item == null)
                            {
                                item = new Gear()
                                {
                                    Id = DbUtils.GetInt(reader, "GearId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    PurchaseUrl = DbUtils.GetString(reader, "PurchaseUrl"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    GearReviews = new List<GearReviews>(),
                                    Types = new List<Types>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "GearReviewId") && item.GearReviews.All(r => r.Id != DbUtils.GetInt(reader, "GearReviewId")))
                            {
                                item.GearReviews.Add(new GearReviews()
                                {
                                    Id = DbUtils.GetInt(reader, "GearReviewId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    GearId = DbUtils.GetInt(reader, "GearReviewGearId"),
                                    ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                    Longevity = DbUtils.GetInt(reader, "Longevity"),
                                    Versatility = DbUtils.GetInt(reader, "Versatility"),
                                    Comfort = DbUtils.GetInt(reader, "Comfort"),
                                    Comments = DbUtils.GetString(reader, "Comments"),
                                    isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved"))
                                });
                            }
                            if (DbUtils.IsNotDbNull(reader, "TypeId"))
                            {
                                item.Types.Add(new Types()
                                {
                                    Id = DbUtils.GetInt(reader, "TypeId"),
                                    Type = DbUtils.GetString(reader, "Type")
                                });
                            }
                        }
                        return item;
                    }
                }
            }
        }

        public void Add(Gear item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Gear ([Title], [Description], PurchaseUrl, ImageUrl)
                                        OUTPUT INSERTED.Id
                                        VALUES (@Title, @Description, @PurchaseUrl, @ImageUrl)";
                    DbUtils.AddParameter(cmd, "@Title", item.Title);
                    DbUtils.AddParameter(cmd, "@Description", item.Description);
                    DbUtils.AddParameter(cmd, "@PurchaseUrl", item.PurchaseUrl);
                    DbUtils.AddParameter(cmd, "@ImageUrl", item.ImageUrl);

                    item.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Gear item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Gear
                                        SET Title = @Title,
                                            Description = @Description,
                                            PurchaseUrl = @PurchaseUrl,
                                            ImageUrl = @ImageUrl
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", item.Id);
                    DbUtils.AddParameter(cmd, "@Title", item.Title);
                    DbUtils.AddParameter(cmd, "@Description", item.Description);
                    DbUtils.AddParameter(cmd, "@PurchaseUrl", item.PurchaseUrl);
                    DbUtils.AddParameter(cmd, "@ImageUrl", item.ImageUrl);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var connection = Connection)
            {
                connection.Open();
                using (var cmd = connection.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Gear WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }


}
