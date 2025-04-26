using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data_fetch_api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Voertuigen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VoertuigId = table.Column<string>(type: "TEXT", nullable: true),
                    Kenteken = table.Column<string>(type: "TEXT", nullable: true),
                    Merk = table.Column<string>(type: "TEXT", nullable: true),
                    Model = table.Column<string>(type: "TEXT", nullable: true),
                    BrandstofType = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voertuigen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zendingen",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ShipmentId = table.Column<int>(type: "INTEGER", nullable: false),
                    VehicleId = table.Column<string>(type: "TEXT", nullable: false),
                    Destination = table.Column<string>(type: "TEXT", nullable: false),
                    MaxCapacityKg = table.Column<int>(type: "INTEGER", nullable: false),
                    CurrentLoadKg = table.Column<int>(type: "INTEGER", nullable: false),
                    EmptyKilometers = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zendingen", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ritten",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RitId = table.Column<string>(type: "TEXT", nullable: true),
                    Datum = table.Column<string>(type: "TEXT", nullable: true),
                    AfstandKm = table.Column<int>(type: "INTEGER", nullable: false),
                    BrandstofVerbruikL = table.Column<int>(type: "INTEGER", nullable: false),
                    GemiddeldVerbruikPer100Km = table.Column<int>(type: "INTEGER", nullable: false),
                    VehicleId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ritten", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ritten_Voertuigen_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Voertuigen",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ritten_VehicleId",
                table: "Ritten",
                column: "VehicleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ritten");

            migrationBuilder.DropTable(
                name: "Zendingen");

            migrationBuilder.DropTable(
                name: "Voertuigen");
        }
    }
}
