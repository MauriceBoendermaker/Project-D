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
                if (vehicle.Ritten != null)
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
                }
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Voertuigen en ritten succesvol geïmporteerd.");
        }

        public async Task ImportShipmentsAsync(string shipmentDataPath)
        {
            var json = await File.ReadAllTextAsync(shipmentDataPath);
            var shipments = JsonSerializer.Deserialize<List<Shipment>>(json);

            if (shipments == null)
            {
                Console.WriteLine("Geen zendingen gevonden in het JSON bestand.");
                return;
            }

            foreach (var shipment in shipments)
            {
                _context.Zendingen.Add(shipment);
            }

            await _context.SaveChangesAsync();
            Console.WriteLine("Zendingen succesvol geïmporteerd.");
        }
    }
}
