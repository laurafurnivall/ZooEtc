using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Security.Cryptography;
using ZooEtc.Models;
using ZooEtc.Utils;

namespace ZooEtc.Repositories
{
    public class GearReviewsRepository : BaseRepository, IGearReviewsRepository
    {
        public GearReviewsRepository(IConfiguration configuration) : base(configuration) { }

        public List<GearReviews> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT gr.Id, gr.UserId, gr.GearId, gr.ReviewDate, gr.Longevity, gr.Versatility, gr.Comfort, gr.Comments, gr.isApproved,
                                               g.Id AS GearGearId, g.Title, g.[Description], g.PurchaseUrl, g.ImageUrl
                                        FROM GearReviews gr
                                        JOIN Gear g ON g.Id = gr.GearId";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var gearReviews = new List<GearReviews>();
                        while (reader.Read())
                        {
                            gearReviews.Add(new GearReviews()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                GearId = DbUtils.GetInt(reader, "GearId"),
                                ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                Longevity = DbUtils.GetInt(reader, "Longevity"),
                                Versatility = DbUtils.GetInt(reader, "Versatility"),
                                Comfort = DbUtils.GetInt(reader, "Comfort"),
                                Comments = DbUtils.GetString(reader, "Comments"),
                                isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                                Gear = new Gear()
                                {
                                    Id = DbUtils.GetInt(reader, "GearGearId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    PurchaseUrl = DbUtils.GetString(reader, "PurchaseUrl"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                                }
                            });
                        }
                        return gearReviews;
                    }
                }
            }
        }

        public GearReviews GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT gr.Id, gr.UserId, gr.GearId, gr.ReviewDate, gr.Longevity, gr.Versatility, gr.Comfort, gr.Comments, gr.isApproved,
                                               g.Id AS GearGearId, g.Title, g.[Description], g.PurchaseUrl, g.ImageUrl
                                        FROM GearReviews gr
                                        JOIN Gear g ON g.Id = gr.GearId
                                        WHERE gr.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        GearReviews gearReview = null;
                        while (reader.Read())
                        {
                            gearReview = new GearReviews()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                GearId = DbUtils.GetInt(reader, "GearId"),
                                ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                Longevity = DbUtils.GetInt(reader, "Longevity"),
                                Versatility = DbUtils.GetInt(reader, "Versatility"),
                                Comfort = DbUtils.GetInt(reader, "Comfort"),
                                Comments = DbUtils.GetString(reader, "Comments"),
                                isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                                Gear = new Gear()
                                {
                                    Id = DbUtils.GetInt(reader, "GearGearId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    PurchaseUrl = DbUtils.GetString(reader, "PurchaseUrl"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl")
                                }
                            };
                        }
                        return gearReview;
                    }
                }
            }
        }

        public void Add(GearReviews gearReview)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO GearReviews (UserId, GearId, ReviewDate, Longevity, Versatility, Comfort, Comments, isApproved)
                                            OUTPUT INSERTED.Id
                                            VALUES (@UserId, @GearId, @ReviewDate, @Longevity, @Versatility, @Comfort, @Comments, @isApproved)";
                    DbUtils.AddParameter(cmd, "@UserId", gearReview.UserId);
                    DbUtils.AddParameter(cmd, "@GearId", gearReview.GearId);
                    DbUtils.AddParameter(cmd, "@ReviewDate", gearReview.ReviewDate);
                    DbUtils.AddParameter(cmd, "@Longevity", gearReview.Longevity);
                    DbUtils.AddParameter(cmd, "@Versatility", gearReview.Versatility);
                    DbUtils.AddParameter(cmd, "@Comfort", gearReview.Comfort);
                    DbUtils.AddParameter(cmd, "@Comments", gearReview.Comments);
                    DbUtils.AddParameter(cmd, "@isApproved", gearReview.isApproved);

                    gearReview.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(GearReviews gearReview)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE GearReviews
                                        SET UserId = @UserId,
                                            GearId = @GearId,
                                            ReviewDate = @ReviewDate,
                                            Longevity = @Longevity,
                                            Versatility = @Versatility,
                                            Comfort = @Comfort,
                                            Comments = @Comments,
                                            isApproved = @isApproved
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@UserId", gearReview.UserId);
                    DbUtils.AddParameter(cmd, "@GearId", gearReview.GearId);
                    DbUtils.AddParameter(cmd, "@ReviewDate", gearReview.ReviewDate);
                    DbUtils.AddParameter(cmd, "@Longevity", gearReview.Longevity);
                    DbUtils.AddParameter(cmd, "@Versatility", gearReview.Versatility);
                    DbUtils.AddParameter(cmd, "@Comfort", gearReview.Comfort);
                    DbUtils.AddParameter(cmd, "@Comments", gearReview.Comments);
                    DbUtils.AddParameter(cmd, "@isApproved", gearReview.isApproved);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM GearReviews WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
