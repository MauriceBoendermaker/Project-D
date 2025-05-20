using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace data_fetch_api.Migrations
{
    /// <inheritdoc />
    public partial class Tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Medewerkers",
                table: "Medewerkers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Locaties",
                table: "Locaties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Klanten",
                table: "Klanten");

            migrationBuilder.RenameTable(
                name: "Medewerkers",
                newName: "Employees");

            migrationBuilder.RenameTable(
                name: "Locaties",
                newName: "Locations");

            migrationBuilder.RenameTable(
                name: "Klanten",
                newName: "Customers");

            migrationBuilder.RenameColumn(
                name: "VoertuigId",
                table: "Employees",
                newName: "VehicleId");

            migrationBuilder.RenameColumn(
                name: "Naam",
                table: "Employees",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Beschikbaar",
                table: "Employees",
                newName: "Available");

            migrationBuilder.RenameColumn(
                name: "MedewerkerId",
                table: "Employees",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "voertuig_id",
                table: "Zendingen",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employees",
                table: "Employees",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locations",
                table: "Locations",
                column: "LocatieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Customers",
                table: "Customers",
                column: "CustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Locations",
                table: "Locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employees",
                table: "Employees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Customers",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "voertuig_id",
                table: "Zendingen");

            migrationBuilder.RenameTable(
                name: "Locations",
                newName: "Locaties");

            migrationBuilder.RenameTable(
                name: "Employees",
                newName: "Medewerkers");

            migrationBuilder.RenameTable(
                name: "Customers",
                newName: "Klanten");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Medewerkers",
                newName: "VoertuigId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Medewerkers",
                newName: "Naam");

            migrationBuilder.RenameColumn(
                name: "Available",
                table: "Medewerkers",
                newName: "Beschikbaar");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Medewerkers",
                newName: "MedewerkerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locaties",
                table: "Locaties",
                column: "LocatieId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medewerkers",
                table: "Medewerkers",
                column: "MedewerkerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Klanten",
                table: "Klanten",
                column: "CustomerId");
        }
    }
}
