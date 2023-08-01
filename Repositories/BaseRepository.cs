using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ZooEtc.Repositories
{
    public abstract class BaseRepository //abstract class cannot be instituted on its own
    {
        private readonly string _connectionString; //holds info on how to connect to the database such as server name, database name, auth

        public BaseRepository(IConfiguration configuration) //constructure used to access the apps configuration settingsg
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection"); //assign defaultConnection to _connectionString
        }

        protected SqlConnection Connection //creates and returns sqlconnection object
        {
            get
            {
                return new SqlConnection(_connectionString);
            }
        }
    }
}

//allows other repositories to to access the database connection string