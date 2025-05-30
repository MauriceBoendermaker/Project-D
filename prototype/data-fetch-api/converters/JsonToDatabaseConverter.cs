using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{
    public class JsonToDatabaseConverter
    {
        private readonly AppDbContext _context;

        public JsonToDatabaseConverter(AppDbContext context)
        {
            _context = context;
        }

        public async Task ImportVehiclesAndTripsAsync(string brandstofDataPath)
        {
            try
            {
                await _context.Database.ExecuteSqlRawAsync("DELETE FROM Trips");
            }
            catch (Exception)
            {
                Console.WriteLine("Tabel 'Trips' bestaat niet, overslaan.");
            }

            try
            {
                await _context.Database.ExecuteSqlRawAsync("DELETE FROM Vehicles");
            }
            catch (Exception)
            {
                Console.WriteLine("Tabel 'Vehicles' bestaat niet, overslaan.");
            }

            var json = await File.ReadAllTextAsync(brandstofDataPath);
            var vehicles = JsonSerializer.Deserialize<List<Vehicle>>(json);

            if (vehicles == null)
            {
                Console.WriteLine("Geen voertuigen gevonden in het JSON bestand.");
                return;
            }

            await _context.Vehicles.AddRangeAsync(vehicles);
            int AffectedRows = await _context.SaveChangesAsync();
            Console.WriteLine(" Voertuigen en ritten succesvol geïmporteerd zonder dubbele entries.");
        }

        public async Task ImportShipmentsAsync(string shipmentDataPath)
        {
            var json = await File.ReadAllTextAsync(shipmentDataPath);
            var shipmentImports = JsonSerializer.Deserialize<List<Shipment>>(json);

            if (shipmentImports == null)
            {
                Console.WriteLine("Geen zendingen gevonden in het JSON bestand.");
                return;
            }

            // foreach (var shipmentImport in shipmentImports)
            // {
            //     var voertuigEntity = await _context.Vehicles
            //         .FirstOrDefaultAsync(v => v.LicensePlate == shipmentImport.VehicleId);

            //     if (voertuigEntity == null)
            //     {
            //         Console.WriteLine($"Voertuig niet gevonden voor zending met shipment_id {shipmentImport.ShipmentId}");
            //         continue;
            //     }

            //     var shipment = new Shipment
            //     {
            //         ShipmentId = shipmentImport.ShipmentId,
            //         VehicleId = voertuigEntity.VehicleId,
            //         Destination = shipmentImport.Destination,
            //         MaxCapacityKg = shipmentImport.MaxCapacityKg,
            //         CurrentLoadKg = shipmentImport.CurrentLoadKg,
            //         EmptyKilometers = shipmentImport.EmptyKilometers,
            //         CreatedAt = DateTime.UtcNow
            //     };

            //     _context.Shipments.Add(shipment);
            // }


            await _context.AddRangeAsync(shipmentImports);
            await _context.SaveChangesAsync();
            Console.WriteLine("Zendingen succesvol geïmporteerd.");
        }
    }


}
