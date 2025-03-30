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
    }
}