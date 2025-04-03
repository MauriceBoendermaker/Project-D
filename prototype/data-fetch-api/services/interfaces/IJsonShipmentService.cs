using Models;

public interface IJsonSHipmentService
{
    Task<IEnumerable<Zending>?> GetAllShipments();
    Task<int> GetMaxCapacity();
    Task<int> GetEmptyMiles();
    Task<int> GetAverageLoadDegree();
    Task<int> GetLoadDegree();

}