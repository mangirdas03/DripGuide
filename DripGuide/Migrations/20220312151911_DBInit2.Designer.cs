// <auto-generated />
using DripGuide.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DripGuide.Migrations
{
    [DbContext(typeof(DripContext))]
    [Migration("20220312151911_DBInit2")]
    partial class DBInit2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.15");

            modelBuilder.Entity("DripGuide.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(150)");

                    b.HasKey("Id")
                        .HasName("PK_User");

                    b.HasIndex("Age")
                        .HasDatabaseName("Age");

                    b.HasIndex("Email")
                        .HasDatabaseName("Email");

                    b.HasIndex("Name")
                        .HasDatabaseName("Name");

                    b.HasIndex("Password")
                        .HasDatabaseName("Password");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
