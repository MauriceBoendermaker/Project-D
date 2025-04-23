using System.Text.Json;
using Converters;
using Models;

namespace Services
{
    public class TripService : ITripService
    {
        private string Path = "data/brandstof_data.json";

        public async Task<List<Trip>> GetTripOverview()
        {
            try
            {
                var json = await File.ReadAllTextAsync(Path);
                var trips = JsonSerializer.Deserialize<List<Trip>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    Converters = { new FlexibleDateTimeConverter() }
                });

                return trips ?? new List<Trip>();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Fout met het uitlezen van trip overview: " + ex.Message);
                return new List<Trip>();
            }
        }
    }
}
