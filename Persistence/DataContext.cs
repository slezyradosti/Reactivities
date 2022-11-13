using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options): base (options)
        {

        }

        public DbSet<Activity> Activities { get; set; }
    }
}
