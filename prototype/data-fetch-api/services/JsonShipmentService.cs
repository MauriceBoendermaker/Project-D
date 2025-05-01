using System.Text.Json;
using Models;

namespace Services
{
    public class JsonShipmentService : IJsonShipmentService
    {
        private readonly string Path = "data/Zending_data.json";

        public virtual async Task<IEnumerable<Shipment>?> GetAllShipments()
        {
            try
            {
                var shipmentData = await File.ReadAllTextAsync(Path);
                var shipments = JsonSerializer.Deserialize<IEnumerable<Shipment>>(shipmentData);
                Console.WriteLine(shipments.ToString());
                return shipments;
            }
            catch (JsonException)
            {
                Console.WriteLine("JSON ongeldig");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("fout bij lezen JSON");
                return null;
            }
        }

        public async Task<int> GetMaxCapacity(int shipmentId)
        {
            var shipments = await GetAllShipments();
            if (shipments == null) return -1;

            var shipment = shipments.FirstOrDefault(x => x.ShipmentId == shipmentId);
            return shipment != null ? shipment.MaxCapacityKg : -1;
        }

        public async Task<int> GetTotalEmptyKilometers()
        {
            var shipments = await GetAllShipments();
            if (shipments == null) return -1;

            return shipments.Sum(x => x.EmptyKilometers);
        }

        public async Task<double> GetAverageLoadDegree()
        {
            var shipments = await GetAllShipments();
            if (shipments == null || !shipments.Any()) return -1;

            double totalLoadDegree = shipments.Sum(x => (double)x.CurrentLoadKg / x.MaxCapacityKg);
            return Math.Round(totalLoadDegree / shipments.Count(), 4);
        }

        public async Task<double> GetLoadDegree(int shipmentId)
        {
            var shipments = await GetAllShipments();
            if (shipments == null) return -1;

            var shipment = shipments.FirstOrDefault(x => x.ShipmentId == shipmentId);
            if (shipment == null) return -1;

            return Math.Round((double)shipment.CurrentLoadKg / shipment.MaxCapacityKg, 4);
        }

        public async Task<List<LoadDegree>?> GetTotalLoadDegree()
        {
            var shipments = await GetAllShipments();
            if (shipments == null || !shipments.Any()) return null;

            var loadDegrees = shipments.Select(x => new LoadDegree
            {
                ShipmentId = x.ShipmentId,
                Degree = Math.Round((double)x.CurrentLoadKg / x.MaxCapacityKg, 4)
            }).ToList();

            return loadDegrees;
        }
    }
}
