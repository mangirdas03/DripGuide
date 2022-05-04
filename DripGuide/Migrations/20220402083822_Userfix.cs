using Microsoft.EntityFrameworkCore.Migrations;

namespace DripGuide.Migrations
{
    public partial class Userfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "Age",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Name",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "Password",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "User");

            migrationBuilder.AddColumn<sbyte>(
                name: "Role",
                table: "User",
                type: "tinyint",
                nullable: false,
                defaultValue: (sbyte)0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "Users");

            migrationBuilder.CreateIndex(
                name: "Age",
                table: "Users",
                column: "Age");

            migrationBuilder.CreateIndex(
                name: "Email",
                table: "Users",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "Name",
                table: "Users",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "Password",
                table: "Users",
                column: "Password");
        }
    }
}
