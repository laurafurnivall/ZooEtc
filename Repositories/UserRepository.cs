using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;

namespace ZooEtc.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<Users> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.UserName, u.Email, u.isAdmin
                                        FROM Users u";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var users = new List<Users>();
                        while (reader.Read())
                        {
                            users.Add(new Users()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader,"FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader,"FirstName"),
                                LastName = DbUtils.GetString(reader,"LastName"),
                                UserName = DbUtils.GetString(reader,"UserName"),
                                Email = DbUtils.GetString(reader,"Email"),
                                IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin")),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public Users GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.UserName, u.Email, u.isAdmin
                                        FROM Users u
                                        WHERE u.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    Users user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin")),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public Users GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT u.Id, u.FirebaseUserId, u.FirstName, u.LastName, u.UserName, u.Email, u.isAdmin
                                        FROM Users u
                                        WHERE u.FirebaseUserId = @FirebaseUserId";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    Users user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = firebaseUserId,
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            IsAdmin = reader.GetBoolean(reader.GetOrdinal("isAdmin")),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(Users users)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Users (FirebaseUserId, FirstName, LastName, UserName, Email, isAdmin)
                                        OUTPUT INSERTED.Id
                                        VALUES (@FirebaseIserId, @FirstName, @LastName, @UserName, @Email, @isAdmin)";
                    DbUtils.AddParameter(cmd, "@FireBaseUserId", users.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", users.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", users.LastName);
                    DbUtils.AddParameter(cmd, "@UserName", users.UserName);
                    DbUtils.AddParameter(cmd, "@Email", users.Email);
                    DbUtils.AddParameter(cmd, "@isAdmin", users.IsAdmin);

                    users.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Users users)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Users
                                        SET [FirstName] = @FirstName,
                                            [LastName] = @LastName,
                                            [UserName] = @UserName,
                                            [Email] = @Email,
                                            isAdmin = @isAdmin
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@FirstName", users.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", users.LastName);
                    DbUtils.AddParameter(cmd, "@UserName", users.UserName);
                    DbUtils.AddParameter(cmd, "@Email", users.Email);
                    DbUtils.AddParameter(cmd, "@isAdmin", users.IsAdmin);
                    DbUtils.AddParameter(cmd, "@Id", users.Id);

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
                    cmd.CommandText = @"DELETE FROM Users WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery ();
                }
            }
        }
    }
}
