using System.Text.Json;
using Models;

namespace Services
{
    public class JsonShipmentService : IJsonSHipmentService
    {
        private string Path = "data/Zending_data.json";
        public async Task<IEnumerable<Zending>?> GetAllShipments()
        {
            // Read the JSON data
            try
            {
                var ShipmentData = await File.ReadAllTextAsync(Path);
                IEnumerable<Zending>? Shipments = JsonSerializer.Deserialize<IEnumerable<Zending>>(ShipmentData);
                return Shipments;
            }
            catch (JsonException)
            {
                Console.WriteLine("Json Is invalid");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error has occured: {ex.Message}");
                return null;
            }



        }

        public async Task<int> GetAverageLoadDegree()
        {
            // try
            // {
            //     IEnumerable<Zending>? Shipments = await this.GetAllShipments();
            //     if (Shipments != null)
            //     {

            //     }


            // }
            throw new NotImplementedException();
        }

        public async Task<int> GetEmptyMiles()
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetLoadDegree()
        {
            throw new NotImplementedException();
        }

        public async Task<int> GetMaxCapacity()
        {
            throw new NotImplementedException();
        }

    }

}