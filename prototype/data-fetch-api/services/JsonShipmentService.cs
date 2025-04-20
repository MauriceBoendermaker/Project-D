using System.Text.Json;
using Models;

namespace Services
{
    public class JsonShipmentService : IJsonShipmentService
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

        public async Task<double> GetAverageLoadDegree()
        {
            try
            {
                IEnumerable<Zending>? Shipments = await this.GetAllShipments();
                if (Shipments != null)
                {
                    double TotalLoadDegree = Shipments.Select(x => (double)x.CurrentLoadKg / x.MaxCapacityKg).Sum();
                    double AverageLoadDegree = double.Round(TotalLoadDegree / Shipments.Count(), 4);
                    return AverageLoadDegree;
                }
                return -1;
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Shipments is null");
                return -1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return -1;
            }
        }

        public async Task<int> GetTotalEmptyMiles()
        {
            try
            {
                IEnumerable<Zending>? Shipments = await this.GetAllShipments();
                if (Shipments != null)
                {
                    int TotalEmptyMiles = Shipments.Select(x => x.EmptyKilometers).Sum();
                    return TotalEmptyMiles;
                }
                return -1;
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Shipments is null (List is empty)");
                return -1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }
        }

        public async Task<double> GetLoadDegree(int ZendingId)
        {
            try
            {
                IEnumerable<Zending>? Shipments = await this.GetAllShipments();
                if (Shipments != null)
                {
                    Zending? Shipment = Shipments.FirstOrDefault(x => x.ShipmentId == ZendingId);
                    return Shipment == null ? -1 : double.Round((double)Shipment.CurrentLoadKg / Shipment.MaxCapacityKg, 4);
                }
                return -1;

            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Shipments is null (List is empty)");
                return -1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }
        }

        public async Task<int> GetMaxCapacity(int ZendingId)
        {
            try
            {
                IEnumerable<Zending>? Shipments = await this.GetAllShipments();
                if (Shipments != null)
                {
                    Zending? Shipment = Shipments.FirstOrDefault(x => x.ShipmentId == ZendingId);
                    return Shipment == null ? -1 : Shipment.MaxCapacityKg;
                }
                return -1;

            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Shipments is null (List is empty)");
                return -1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }
        }

    }

}
