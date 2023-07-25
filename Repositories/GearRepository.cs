﻿using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Data.SqlClient;
using System.Security.Authentication;

namespace ZooEtc.Repositories
{
    public class GearRepository : BaseRepository, IGearRepository
    {
        public GearRepository(IConfiguration configuration) : base(configuration) { }

        public List<Gear> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Title], [Description], PurchaseUrl, ImageUrl
                                        FROM Gear";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var items = new List<Gear>();
                        while (reader.Read())
                        {
                            items.Add(new Gear()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                PurchaseUrl = DbUtils.GetString(reader, "PurchaseUrl"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                            });
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
                    cmd.CommandText = @"SELECT g.Id, g.[Title], g.[Description], g.PurchaseUrl, g.ImageUrl,
                                        gr.Id AS GearReviewId, gr.UserId, gr.GearId, gr.ReviewDate, gr.Longevity, gr.Versatility, gr.Comfort, gr.Comments, gr.isApproved
                                        FROM Gear g
                                        LEFT JOIN GearReviews gr ON g.Id = gr.GearId
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
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    PurchaseUrl = DbUtils.GetString(reader, "PurchaseUrl"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    GearReviews = new List<GearReviews>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "GearReviewId"))
                            {
                                item.GearReviews.Add(new GearReviews()
                                {
                                    Id = DbUtils.GetInt(reader, "GearReviewId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    GearId = id,
                                    ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                    Longevity = DbUtils.GetInt(reader, "Longevity"),
                                    Versatility = DbUtils.GetInt(reader, "Versatility"),
                                    Comfort = DbUtils.GetInt(reader, "Comfort"),
                                    Comments = DbUtils.GetString(reader, "Comments"),
                                    isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved"))
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
