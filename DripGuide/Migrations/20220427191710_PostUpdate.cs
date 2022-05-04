using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DripGuide.Migrations
{
    public partial class PostUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Post",
                newName: "SubmitDate");

            migrationBuilder.AddColumn<string>(
                name: "Colorway",
                table: "Post",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Material",
                table: "Post",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Price",
                table: "Post",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReleaseDate",
                table: "Post",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "StyleCode",
                table: "Post",
                type: "nvarchar(100)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Colorway",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "Material",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "ReleaseDate",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "StyleCode",
                table: "Post");

            migrationBuilder.RenameColumn(
                name: "SubmitDate",
                table: "Post",
                newName: "Date");
        }
    }
}
