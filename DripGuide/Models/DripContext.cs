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
        public DbSet<Post> Posts { set; get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>().HasKey(u => u.Id).HasName("PK_User");

            modelBuilder.Entity<User>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Name).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Password).HasColumnType("nvarchar(150)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Email).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Age).HasColumnType("int");
            modelBuilder.Entity<User>().Property(u => u.Role).HasColumnType("tinyint");




            modelBuilder.Entity<Post>().ToTable("Post");
            modelBuilder.Entity<Post>().HasKey(u => u.Id).HasName("PK_Post");
            modelBuilder.Entity<Post>().Property(u => u.Id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();

            modelBuilder.Entity<Post>().Property(u => u.Title).HasColumnType("nvarchar(100)").IsRequired();
            modelBuilder.Entity<Post>().Property(u => u.Description).HasColumnType("nvarchar(500)");
            modelBuilder.Entity<Post>().Property(u => u.Description2).HasColumnType("nvarchar(300)");

            modelBuilder.Entity<Post>().Property(u => u.FK_User).HasColumnType("int");
            modelBuilder.Entity<Post>().HasIndex(e => e.FK_User, "fk_user");
            modelBuilder.Entity<Post>().Property(u => u.FK_Brand).HasColumnType("int");
            modelBuilder.Entity<Post>().HasIndex(e => e.FK_Brand, "fk_brand");

            modelBuilder.Entity<Post>().Property(u => u.SubmitDate).HasColumnType("datetime");
            modelBuilder.Entity<Post>().Property(u => u.Status).HasColumnType("int");

            modelBuilder.Entity<Post>().Property(u => u.Material).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.Price).HasColumnType("int");
            modelBuilder.Entity<Post>().Property(u => u.ReleaseDate).HasColumnType("datetime");
            modelBuilder.Entity<Post>().Property(u => u.StyleCode).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.Colorway).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.Image).HasColumnType("nvarchar(200)");
        }
    }
}
