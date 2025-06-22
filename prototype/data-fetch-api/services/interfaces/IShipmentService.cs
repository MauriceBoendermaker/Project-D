using Models;

namespace Services
{
    public interface IShipmentService
    {
        Task<IEnumerable<Shipment>?> GetAllShipments();
        Task<int> GetMaxCapacity(int shipmentId);
        Task<int> GetTotalEmptyKilometers();
        Task<double> GetAverageLoadDegree();
        Task<double> GetLoadDegree(int shipmentId);
        Task<List<LoadDegree>?> GetTotalLoadDegree();
    }
}
