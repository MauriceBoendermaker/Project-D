using Models;

public interface IJsonShipmentService
{
    Task<IEnumerable<Zending>?> GetAllShipments();
    Task<int> GetMaxCapacity(int ZendingId);
    Task<int> GetTotalEmptyMiles();
    Task<double> GetAverageLoadDegree();
    Task<double> GetLoadDegree(int ZendingId);
}
