using System.Text.Json;
using Models;

namespace Services
{
    public class JsonFuelService : IFuelService
    {
        public async Task<IEnumerable<Vehicle>?> GetAllVehiclesAsync()
        {
            try
            {
                string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");
                var vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);
                return vehicles;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return null;
            }
        }

        public async Task<int> GetVehicleAverageAsync(int voertuigId)
        {
            try
            {
                string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");
                var vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);

                if (vehicles == null) return 0;

                var vehicle = vehicles.FirstOrDefault(v => v.VoertuigId == voertuigId);
                if (vehicle == null || vehicle.Ritten == null || vehicle.Ritten.Count == 0) return 0;

                int totaalVerbruik = vehicle.Ritten.Sum(rit => rit.BrandstofVerbruikL);
                return totaalVerbruik / vehicle.Ritten.Count;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating average: {ex.Message}");
                return 0;
            }
        }

        public async Task<int> GetRitCostAsync(int voertuigId, int ritId)
        {
            try
            {
                string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");
                var vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);

                if (vehicles == null) return 0;

                var vehicle = vehicles.FirstOrDefault(v => v.VoertuigId == voertuigId);
                if (vehicle == null || vehicle.Ritten == null) return 0;

                var rit = vehicle.Ritten.FirstOrDefault(r => r.RitId == ritId);
                if (rit == null) return 0;

                return Convert.ToInt32(rit.BrandstofVerbruikL * 1.8690); // Prijs diesel gemmideld 1,8690 incl. BTW (1,5446 excl.) ANWB.nl geraadpleegd 07.04.2025
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating rit cost: {ex.Message}");
                return 0;
            }
        }
    }
}
