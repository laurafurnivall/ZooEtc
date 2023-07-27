using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;

namespace ZooEtc.Repositories
{
    public class JobListingsRepository : BaseRepository, IJobListingsRepository
    {
        public JobListingsRepository(IConfiguration configuration) : base(configuration) { }

        public List<JobListings> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id AS JobId, j.UserId, j.ZooId, j.[Title], j.PostingDate, j.RemovalDate, j.[Description], j.Salary, j.JobUrl, j.isApproved,
                                        z.Id as ZooZooId, z.ZooName, z.[Address], z.City, z.State, z.PhoneNumber, z.ZooImgUrl, z.ZooUrl, z.[Description] AS ZooDescription
                                        FROM JobListings j
                                        JOIN Zoos z ON j.ZooId = z.Id
                                        ORDER BY j.PostingDate";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var jobs = new List<JobListings>();
                        while (reader.Read())
                        {
                            jobs.Add(new JobListings()
                            {
                                Id = DbUtils.GetInt(reader, "JobId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ZooId = DbUtils.GetInt(reader, "ZooId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                PostingDate = DbUtils.GetDateTime(reader, "PostingDate"),
                                RemovalDate = DbUtils.GetDateTime(reader, "RemovalDate"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Salary = DbUtils.GetString(reader, "Salary"),
                                JobUrl = DbUtils.GetString(reader, "JobUrl"),
                                isApproved = reader.GetBoolean(reader.GetOrdinal("isApproved")),
                                Zoo = new Zoos()
                                {
                                    Id = DbUtils.GetInt(reader, "ZooZooId"),
                                    ZooName = DbUtils.GetString(reader,"ZooName"),
                                    Address = DbUtils.GetString(reader,"Address"),
                                    City = DbUtils.GetString(reader,"City"),
                                    State = DbUtils.GetString(reader,"State"),
                                    PhoneNumber = DbUtils.GetString(reader,"PhoneNumber"),
                                    ZooImgUrl = DbUtils.GetString(reader,"ZooImgUrl"),
                                    ZooUrl = DbUtils.GetString(reader,"ZooUrl"),
                                    Description = DbUtils.GetString(reader, "ZooDescription"),
                                },
                            });
                        }
                        return jobs;
                    }
                }
            }
        }

        public JobListings GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT j.Id AS JobId, j.UserId, j.ZooId, j.[Title], j.PostingDate, j.RemovalDate, j.[Description], j.Salary, j.JobUrl, j.isApproved,
                                        z.Id as ZooZooId, z.ZooName, z.[Address], z.City, z.State, z.PhoneNumber, z.ZooImgUrl, z.ZooUrl, z.[Description] AS ZooDescription
                                        FROM JobListings j
                                        JOIN Zoos z ON j.ZooId = z.Id
                                        WHERE j.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        JobListings job = null;
                        while (reader.Read())
                        {
                            job = new JobListings()
                            {
                                Id = DbUtils.GetInt(reader, "JobId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                ZooId = DbUtils.GetInt(reader, "ZooId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                PostingDate = DbUtils.GetDateTime(reader, "PostingDate"),
                                RemovalDate = DbUtils.GetDateTime(reader, "RemovalDate"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Salary = DbUtils.GetString(reader, "Salary"),
                                JobUrl = DbUtils.GetString(reader, "JobUrl"),
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
                                    Description = DbUtils.GetString(reader, "ZooDescription"),
                                }
                            };
                        }
                    return job;
                    }
                }
            }
        }

        public void Add(JobListings job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO JobListings (UserId, ZooId, [Title], PostingDate, RemovalDate, [Description], Salary, JobUrl, isApproved)
                                        OUTPUT INSERTED.Id
                                        VALUES (@UserId, @ZooId, @Title, @PostingDate, @RemovalDate, @Description, @Salary, @JobUrl, @isApproved)";

                    DbUtils.AddParameter(cmd, "@UserId", job.UserId);
                    DbUtils.AddParameter(cmd, "@ZooId", job.ZooId);
                    DbUtils.AddParameter(cmd, "@Title", job.Title);
                    DbUtils.AddParameter(cmd, "@PostingDate", job.PostingDate);
                    DbUtils.AddParameter(cmd, "@RemovalDate", job.RemovalDate);
                    DbUtils.AddParameter(cmd, "@Description", job.Description);
                    DbUtils.AddParameter(cmd, "@Salary", job.Salary);
                    DbUtils.AddParameter(cmd, "@JobUrl", job.JobUrl);
                    DbUtils.AddParameter(cmd, "@isApproved", job.isApproved);

                    job.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(JobListings job)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Joblistings
                                        SET UserId = @UserId,
                                            ZooId = @ZooId,
                                            Title = @Title,
                                            PostingDate = @PostingDate,
                                            RemovalDate = @RemovalDate,
                                            Description = @Description,
                                            Salary = @Salary,
                                            JobUrl = @JobUrl,
                                            isApproved = @isApproved
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", job.Id);
                    DbUtils.AddParameter(cmd, "@UserId", job.UserId);
                    DbUtils.AddParameter(cmd, "@ZooId", job.ZooId);
                    DbUtils.AddParameter(cmd, "@Title", job.Title);
                    DbUtils.AddParameter(cmd, "@PostingDate", job.PostingDate);
                    DbUtils.AddParameter(cmd, "@RemovalDate", job.RemovalDate);
                    DbUtils.AddParameter(cmd, "@Description", job.Description);
                    DbUtils.AddParameter(cmd, "@Salary", job.Salary);
                    DbUtils.AddParameter(cmd, "@JobUrl", job.JobUrl);
                    DbUtils.AddParameter(cmd, "@isApproved", job.isApproved);

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
                    cmd.CommandText = "DELETE FROM JobListings WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
