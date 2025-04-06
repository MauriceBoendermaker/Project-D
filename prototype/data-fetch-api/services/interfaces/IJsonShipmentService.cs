using Models;

public interface IJsonSHipmentService
{
    Task<IEnumerable<Zending>?> GetAllShipments();
    Task<int> GetMaxCapacity(int ZendingId);
    Task<int> GetTotalEmptyMiles();
    Task<double> GetAverageLoadDegree();
    Task<double> GetLoadDegree(int ZendingId);
    Task<Dictionary<int, double>?> GetTotalLoadDegree();
}