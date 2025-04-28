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
                    Kenteken = vehicle.Kenteken,
                    Merk = vehicle.Merk,
                    Model = vehicle.Model,
                    BrandstofType = vehicle.BrandstofType,
                    MaximaleCapaciteitKg = vehicle.MaximaleCapaciteitKg,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Voertuigen.Add(newVehicle);
                await _context.SaveChangesAsync();

                if (vehicle.Ritten != null)
                {
                    foreach (var rit in vehicle.Ritten)
                    {
                        var newRit = new Trip
                        {
                            RitNummer = rit.RitNummer,
                            Datum = rit.Datum,
                            AfstandKm = rit.AfstandKm,
                            DuurMinuten = rit.DuurMinuten,
                            BrandstofVerbruikL = rit.BrandstofVerbruikL,
                            BestemmingId = rit.BestemmingId,
                            KlantId = rit.KlantId,
                            ChauffeurId = rit.ChauffeurId,
                            VehicleVoertuigId = newVehicle.VoertuigId,
                            CreatedAt = DateTime.UtcNow
                        };
                        _context.Ritten.Add(newRit);
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
