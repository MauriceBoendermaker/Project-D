using System.Text.Json;

namespace Services
{
    public class JsonFuelService : IFuelService
    {
        public async Task<IEnumerable<Vehicle>?> GetAllVehicles()
        {
            try
            {
                string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");

                IEnumerable<Vehicle>? Vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);

                return Vehicles;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return default;
            }
        }


        public async Task<int> GetVehicleAverage(string VehicleId)
        {
            try
            {
                int total = 0;
                string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");

                IEnumerable<Vehicle>? Vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);
                if (Vehicles == null) return total;

                var Vehicle = Vehicles.FirstOrDefault(x => x.VoertuigId == VehicleId);
                if (Vehicle == null || Vehicle.Ritten == null) return total;

                foreach (Rit rit in Vehicle.Ritten)
                {
                    total += rit.BrandstofVerbruikL;
                }
                return total / Vehicle.Ritten.Count;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return default;
            }
        }

        public async Task<int> GetRitCost(string VehicleId, string RitId)
        {
            try
            {
                int cost = 0;
                string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");

                IEnumerable<Vehicle>? Vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);
                if (Vehicles == null) return cost;

                var Vehicle = Vehicles.FirstOrDefault(x => x.VoertuigId == VehicleId);
                if (Vehicle == null || Vehicle.Ritten == null) return cost;

                var Rit = Vehicle.Ritten.FirstOrDefault(x => x.RitId == RitId);
                return Convert.ToInt32(Rit.BrandstofVerbruikL * 1.8690); // Prijs diesel gemmideld 1,8690 incl. BTW (1,5446 excl.) ANWB.nl geraadpleegd 07.04.2025
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return default;
            }
        }
    }
}