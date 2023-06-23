using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options): base (options)
        {

        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAppuser> ActivityAppusers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAppuser>(entity =>
            {
                entity.HasKey(aa => new { aa.AppUserId, aa.ActivityId });

                entity
                    .HasOne(u => u.AppUser)
                    .WithMany(a => a.Activities)
                    .HasForeignKey(aa => aa.AppUserId);

                entity
                    .HasOne(a => a.Activity)
                    .WithMany(u => u.Appusers)
                    .HasForeignKey(aa => aa.ActivityId);
            });
        }
    }
}
