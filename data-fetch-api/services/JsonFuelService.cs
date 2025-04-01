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

                foreach (Rit rit in Vehicle.Ritten){
                    total += rit.BrandstofVerbruikL;
                }
                return total/Vehicle.Ritten.Count;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return default;
            }
        }
    }
}