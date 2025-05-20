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
                await _context.Database.ExecuteSqlRawAsync("DELETE FROM Ritten");
            }
            catch (Exception)
            {
                Console.WriteLine("Tabel 'Ritten' bestaat niet, overslaan.");
            }

            try
            {
                await _context.Database.ExecuteSqlRawAsync("DELETE FROM Voertuigen");
            }
            catch (Exception)
            {
                Console.WriteLine("Tabel 'Voertuigen' bestaat niet, overslaan.");
            }

            var json = await File.ReadAllTextAsync(brandstofDataPath);
            var vehicles = JsonSerializer.Deserialize<List<Vehicle>>(json);

            if (vehicles == null)
            {
                Console.WriteLine("Geen voertuigen gevonden in het JSON bestand.");
                return;
            }

            foreach (var vehicle in vehicles)
            {
                var newVehicle = new Vehicle
                {
                    LicensePlate = vehicle.LicensePlate,
                    Brand = vehicle.Brand,
                    Model = vehicle.Model,
                    FuelType = vehicle.FuelType,
                    MaximumCapacity = vehicle.MaximumCapacity,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Vehicles.Add(newVehicle);
                await _context.SaveChangesAsync();

                if (vehicle.Trips != null)
                {
                    foreach (var rit in vehicle.Trips)
                    {
                        var newRit = new Trip
                        {
                            TripNumber = rit.TripNumber,
                            Date = rit.Date,
                            DistanceKm = rit.DistanceKm,
                            Time = rit.Time,
                            FuelUsage = rit.FuelUsage,
                            DestinationId = rit.DestinationId,
                            CustomerId = rit.CustomerId,
                            DriverId = rit.DriverId,
                            VehicleId = newVehicle.VehicleId,
                            CreatedAt = DateTime.UtcNow
                        };
                    _context.Trips.Add(newRit);
                    }
                }
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Voertuigen en ritten succesvol geïmporteerd zonder dubbele entries.");
        }

        public async Task ImportShipmentsAsync(string shipmentDataPath)
        {
            var json = await File.ReadAllTextAsync(shipmentDataPath);
            var shipmentImports = JsonSerializer.Deserialize<List<ShipmentImport>>(json);

            if (shipmentImports == null)
            {
                Console.WriteLine("Geen zendingen gevonden in het JSON bestand.");
                return;
            }

            foreach (var shipmentImport in shipmentImports)
            {
                var voertuigEntity = await _context.Vehicles
                    .FirstOrDefaultAsync(v => v.LicensePlate == shipmentImport.VehicleId);

                if (voertuigEntity == null)
                {
                    Console.WriteLine($"Voertuig niet gevonden voor zending met shipment_id {shipmentImport.ShipmentId}");
                    continue;
                }

                var shipment = new Shipment
                {
                    ShipmentId = shipmentImport.ShipmentId,
                    VehicleId = voertuigEntity.VehicleId,
                    Destination = shipmentImport.Destination,
                    MaxCapacityKg = shipmentImport.MaxCapacityKg,
                    CurrentLoadKg = shipmentImport.CurrentLoadKg,
                    EmptyKilometers = shipmentImport.EmptyKilometers,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Shipments.Add(shipment);
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Zendingen succesvol geïmporteerd.");
        }
    }

    public class ShipmentImport
    {
        public int ShipmentId { get; set; }
        public string VehicleId { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public int MaxCapacityKg { get; set; }
        public int CurrentLoadKg { get; set; }
        public int EmptyKilometers { get; set; }
    }
}
