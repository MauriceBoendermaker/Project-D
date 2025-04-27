using Models;

namespace Services
{
    public interface IJsonShipmentService
    {
        Task<IEnumerable<Shipment>?> GetAllShipments();
        Task<int> GetMaxCapacity(int shipmentId);
        Task<int> GetTotalEmptyMiles();
        Task<double> GetAverageLoadDegree();
        Task<double> GetLoadDegree(int shipmentId);
        Task<List<LoadDegree>?> GetTotalLoadDegree();
    }
}
