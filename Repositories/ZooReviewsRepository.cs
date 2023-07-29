using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using ZooEtc.Models;
using ZooEtc.Utils;

namespace ZooEtc.Repositories
{
    public class ZooReviewsRepository : BaseRepository, IZooReviewsRepository
    {
        public ZooReviewsRepository(IConfiguration configuration) : base(configuration) { }

        public List<ZooReviews> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT zr.Id, zr.UserId, zr.ZooId, zr.ReviewDate, zr.AnimalCare, zr.Culture, zr.ConservationInitiative, zr.Salary, zr.Benefits, zr.Leadership, zr.Inclusivity, zr.Comments, zr.isApproved,
                                               z.Id as ZooZooId, z.ZooName, z.[Address], z.City, z.State, z.PhoneNumber, z.ZooImgUrl, z.ZooUrl, z.[Description] AS ZooDescription
                                        FROM ZooReviews zr
                                        JOIN Zoos z ON zr.ZooId = z.Id";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var reviews = new List<ZooReviews>();
                        while (reader.Read())
                        {
                            reviews.Add(new ZooReviews()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ZooId = DbUtils.GetInt(reader, "ZooId"),
                                ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                AnimalCare = DbUtils.GetInt(reader, "AnimalCare"),
                                Benefits = DbUtils.GetInt(reader, "Benefits"),
                                Culture = DbUtils.GetInt(reader, "Culture"),
                                ConservationInitiative = DbUtils.GetInt(reader, "ConservationInitiative"),
                                Salary = DbUtils.GetInt(reader, "Salary"),
                                Leadership = DbUtils.GetInt(reader, "Leadership"),
                                Inclusivity = DbUtils.GetInt(reader, "Inclusivity"),
                                Comments = DbUtils.GetString(reader, "Comments"),
                                isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                                Zoo = new Zoos()
                                {
                                    Id = DbUtils.GetInt(reader, "ZooZooId"),
                                    ZooName = DbUtils.GetString(reader, "ZooName"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    ZooImgUrl = DbUtils.GetString(reader, "ZooImgUrl"),
                                    ZooUrl = DbUtils.GetString(reader, "ZooUrl"),
                                    Description = DbUtils.GetString(reader, "ZooDescription")
                                }
                            });
                        }
                        return reviews;
                    }
                }
            }
        }

        public ZooReviews GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT zr.Id, zr.UserId, zr.ZooId, zr.ReviewDate, zr.AnimalCare, zr.Culture, zr.ConservationInitiative, zr.Salary, zr.Benefits, zr.Leadership, zr.Inclusivity, zr.Comments, zr.isApproved,
                                               z.Id as ZooZooId, z.ZooName, z.[Address], z.City, z.State, z.PhoneNumber, z.ZooImgUrl, z.ZooUrl, z.[Description] AS ZooDescription
                                        FROM ZooReviews zr
                                        JOIN Zoos z ON zr.ZooId = z.Id
                                        WHERE zr.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        ZooReviews review = null;
                        while (reader.Read())
                        {
                            review = new ZooReviews()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ZooId = DbUtils.GetInt(reader, "ZooId"),
                                ReviewDate = DbUtils.GetString(reader, "ReviewDate"),
                                AnimalCare = DbUtils.GetInt(reader, "AnimalCare"),
                                Benefits = DbUtils.GetInt(reader,"Benefits"),
                                Culture = DbUtils.GetInt(reader, "Culture"),
                                ConservationInitiative = DbUtils.GetInt(reader, "ConservationInitiative"),
                                Salary = DbUtils.GetInt(reader, "Salary"),
                                Leadership = DbUtils.GetInt(reader, "Leadership"),
                                Inclusivity = DbUtils.GetInt(reader, "Inclusivity"),
                                Comments = DbUtils.GetString(reader, "Comments"),
                                isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                                Zoo = new Zoos()
                                {
                                    Id = DbUtils.GetInt(reader, "ZooZooId"),
                                    ZooName = DbUtils.GetString(reader, "ZooName"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    ZooImgUrl = DbUtils.GetString(reader, "ZooImgUrl"),
                                    ZooUrl = DbUtils.GetString(reader, "ZooUrl"),
                                    Description = DbUtils.GetString(reader, "ZooDescription")
                                }
                            };
                        }
                        return review;
                    }
                }
            }
        }

        public void Add(ZooReviews zooReviews)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ZooReviews (UserId, ZooId, ReviewDate, AnimalCare, Culture, ConservationInitiative, Salary, Benefits, Leadership, Inclusivity, Comments, isApproved)
                                        OUTPUT INSERTED.Id
                                        VALUES (@UserId, @ZooId, @ReviewDate, @AnimalCare, @Culture, @ConservationInitiative, @Salary, @Benefits, @Leadership, @Inclusivity, @Comments, @isApproved)";

                    DbUtils.AddParameter(cmd, "@UserId", zooReviews.UserId);
                    DbUtils.AddParameter(cmd, "@ZooId", zooReviews.ZooId);
                    DbUtils.AddParameter(cmd, "@ReviewDate", zooReviews.ReviewDate);
                    DbUtils.AddParameter(cmd, "@AnimalCare", zooReviews.AnimalCare);
                    DbUtils.AddParameter(cmd, "@Culture", zooReviews.Culture);
                    DbUtils.AddParameter(cmd, "@ConservationInitiative", zooReviews.ConservationInitiative);
                    DbUtils.AddParameter(cmd, "@Salary", zooReviews.Salary);
                    DbUtils.AddParameter(cmd, "Benefits", zooReviews.Benefits);
                    DbUtils.AddParameter(cmd, "@Leadership", zooReviews.Leadership);
                    DbUtils.AddParameter(cmd, "@Inclusivity", zooReviews.Inclusivity);
                    DbUtils.AddParameter(cmd, "@Comments", zooReviews.Comments);
                    DbUtils.AddParameter(cmd, "@isApproved", zooReviews.isApproved);

                    zooReviews.Id = (int)cmd.ExecuteScalar();

                }
            }

        }

        public void Update(ZooReviews zooReviews)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE ZooReviews
                                        SET UserId = @UserId,
                                            ZooId = @ZooId,
                                            ReviewDate = @ReviewDate,
                                            AnimalCare = @AnimalCare,
                                            Culture = @Culture,
                                            ConservationInitiative = @ConservationInitiative,
                                            Salary = @Salary,
                                            Benefits = @Benefits,
                                            Leadership = @Leadership,
                                            Inclusivity = @Inclusivity,
                                            Comments = @Comments,
                                            isApproved = @isApproved
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", zooReviews.Id);
                    DbUtils.AddParameter(cmd, "@UserId", zooReviews.UserId);
                    DbUtils.AddParameter(cmd, "@ZooId", zooReviews.ZooId);
                    DbUtils.AddParameter(cmd, "@ReviewDate", zooReviews.ReviewDate);
                    DbUtils.AddParameter(cmd, "@AnimalCare", zooReviews.AnimalCare);
                    DbUtils.AddParameter(cmd, "@Culture", zooReviews.Culture);
                    DbUtils.AddParameter(cmd, "@ConservationInitiative", zooReviews.ConservationInitiative);
                    DbUtils.AddParameter(cmd, "@Salary", zooReviews.Salary);
                    DbUtils.AddParameter(cmd, "Benefits", zooReviews.Benefits);
                    DbUtils.AddParameter(cmd, "@Leadership", zooReviews.Leadership);
                    DbUtils.AddParameter(cmd, "@Inclusivity", zooReviews.Inclusivity);
                    DbUtils.AddParameter(cmd, "@Comments", zooReviews.Comments);
                    DbUtils.AddParameter(cmd, "@isApproved", zooReviews.isApproved);

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
                    cmd.CommandText = "DELETE FROM ZooReviews WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
