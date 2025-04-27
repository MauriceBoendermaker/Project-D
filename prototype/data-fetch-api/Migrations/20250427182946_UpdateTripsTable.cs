using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data_fetch_api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTripsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VoertuigNummer",
                table: "Voertuigen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RitNummer",
                table: "Ritten",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VoertuigNummer",
                table: "Voertuigen");

            migrationBuilder.DropColumn(
                name: "RitNummer",
                table: "Ritten");
        }
    }
}
