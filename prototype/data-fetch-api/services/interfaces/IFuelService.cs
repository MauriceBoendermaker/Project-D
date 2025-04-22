namespace Services
{
    public interface IFuelService
    {
        Task<IEnumerable<Vehicle>?> GetAllVehicles();
        Task<int> GetVehicleAverage(string VehicleId);
        Task<int> GetRitCost(string VehicleId, string RitId);
    }
}