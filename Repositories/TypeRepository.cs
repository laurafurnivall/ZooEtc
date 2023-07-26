using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using ZooEtc.Models;
using ZooEtc.Utils;

namespace ZooEtc.Repositories
{
    public class TypeRepository : BaseRepository, ITypeRepository
    {
        public TypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Types> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Type]
                                        FROM Types";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var types = new List<Types>();
                        while (reader.Read())
                        {
                            types.Add(new Types()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Type = DbUtils.GetString(reader, "Type"),
                            });
                        }
                        return types;
                    }
                }
            }
        }

        public Types GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, [Type]
                                        FROM Types
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        Types type = null;
                        while (reader.Read())
                        {
                            if (type == null)
                            {
                                type = new Types()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Type = DbUtils.GetString(reader, "Type")
                                };
                            }
                        }
                        return type;
                    }
                }
            }
        }

        public void Add(Types type)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Types ([Type])
                                        OUTPUT INSERTED.Id
                                        VALUES (@Type)";
                    DbUtils.AddParameter(cmd, "@Type", type.Type);

                    type.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Types type)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Types
                                        SET [Type] = @Type
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", type.Id);
                    DbUtils.AddParameter(cmd, "@Type", type.Type);

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
                    cmd.CommandText = "DELETE FROM Types WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
