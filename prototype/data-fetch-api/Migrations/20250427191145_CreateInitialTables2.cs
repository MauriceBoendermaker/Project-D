using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data_fetch_api.Migrations
{
    /// <inheritdoc />
    public partial class CreateInitialTables2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VehicleId",
                table: "Zendingen");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Zendingen",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VoertuigId",
                table: "Zendingen",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Zendingen_VoertuigId",
                table: "Zendingen",
                column: "VoertuigId");

            migrationBuilder.AddForeignKey(
                name: "FK_Zendingen_Voertuigen_VoertuigId",
                table: "Zendingen",
                column: "VoertuigId",
                principalTable: "Voertuigen",
                principalColumn: "VoertuigId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Zendingen_Voertuigen_VoertuigId",
                table: "Zendingen");

            migrationBuilder.DropIndex(
                name: "IX_Zendingen_VoertuigId",
                table: "Zendingen");

            migrationBuilder.DropColumn(
                name: "VoertuigId",
                table: "Zendingen");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedAt",
                table: "Zendingen",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "VehicleId",
                table: "Zendingen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
