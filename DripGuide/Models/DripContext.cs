using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DripGuide.Models;

namespace DripGuide.Models
{
    public class DripContext : DbContext
    {
        public DripContext(DbContextOptions<DripContext> options) : base(options)
        {

        }

        public DbSet<User> Users { set; get; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<User>().HasKey(u => u.Id).HasName("PK_User");
            modelBuilder.Entity<User>().HasIndex(u => u.Name).HasDatabaseName("Name");
            modelBuilder.Entity<User>().HasIndex(u => u.Password).HasDatabaseName("Password");
            modelBuilder.Entity<User>().HasIndex(u => u.Email).HasDatabaseName("Email");
            modelBuilder.Entity<User>().HasIndex(u => u.Age).HasDatabaseName("Age");

            modelBuilder.Entity<User>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Name).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Password).HasColumnType("nvarchar(150)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Email).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Age).HasColumnType("int");

        }
    }
}
