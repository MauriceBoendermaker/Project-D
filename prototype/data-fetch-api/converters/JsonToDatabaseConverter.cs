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
            var json = await File.ReadAllTextAsync(brandstofDataPath);
            var vehicles = JsonSerializer.Deserialize<List<Vehicle>>(json);

            if (vehicles == null)
            {
                Console.WriteLine("Geen voertuigen gevonden in het JSON bestand.");
                return;
            }

            foreach (var vehicle in vehicles)
            {
                _context.Voertuigen.Add(vehicle);
            }

            await _context.SaveChangesAsync();

            foreach (var vehicle in vehicles)
            {
                if (vehicle.Ritten != null && vehicle.Ritten.Count > 0)
                {
                    var voertuigEntity = await _context.Voertuigen
                        .FirstOrDefaultAsync(v => v.Kenteken == vehicle.Kenteken);

                    if (voertuigEntity != null)
                    {
                        foreach (var rit in vehicle.Ritten)
                        {
                            rit.RitId = 0;
                            rit.VehicleVoertuigId = voertuigEntity.VoertuigId;
                            _context.Ritten.Add(rit);
                        }
                    }
                    else
                    {
                        Console.WriteLine($"Voertuig met kenteken {vehicle.Kenteken} niet gevonden.");
                    }
                }
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Voertuigen en ritten succesvol geïmporteerd.");
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
                var voertuigEntity = await _context.Voertuigen
                    .FirstOrDefaultAsync(v => v.Kenteken == shipmentImport.VehicleId);

                if (voertuigEntity == null)
                {
                    Console.WriteLine($"Voertuig niet gevonden voor zending met shipment_id {shipmentImport.ShipmentId}");
                    continue;
                }

                var shipment = new Shipment
                {
                    ShipmentId = shipmentImport.ShipmentId,
                    VoertuigId = voertuigEntity.VoertuigId,
                    Destination = shipmentImport.Destination,
                    MaxCapacityKg = shipmentImport.MaxCapacityKg,
                    CurrentLoadKg = shipmentImport.CurrentLoadKg,
                    EmptyKilometers = shipmentImport.EmptyKilometers,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Zendingen.Add(shipment);
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
