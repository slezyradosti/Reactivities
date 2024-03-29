﻿using Domain;
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
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }

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

            builder.Entity<Photo>()
                .HasOne(p => p.AppUser)
                .WithMany(a => a.Photos)
                .HasForeignKey(pp => pp.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(a => a.Activity)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(entity =>
            {
                entity.HasKey(k => new { k.ObserverId, k.TargetId });

                entity.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.NoAction);
            });
        }
    }
}
