using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeKeyOfActivityAppusers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAppusers_AspNetUsers_AppUserId",
                table: "ActivityAppusers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityAppusers",
                table: "ActivityAppusers");

            migrationBuilder.DropIndex(
                name: "IX_ActivityAppusers_AppUserId",
                table: "ActivityAppusers");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ActivityAppusers");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "ActivityAppusers",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityAppusers",
                table: "ActivityAppusers",
                columns: new[] { "AppUserId", "ActivityId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAppusers_AspNetUsers_AppUserId",
                table: "ActivityAppusers",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAppusers_AspNetUsers_AppUserId",
                table: "ActivityAppusers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityAppusers",
                table: "ActivityAppusers");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "ActivityAppusers",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ActivityAppusers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityAppusers",
                table: "ActivityAppusers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAppusers_AppUserId",
                table: "ActivityAppusers",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAppusers_AspNetUsers_AppUserId",
                table: "ActivityAppusers",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
