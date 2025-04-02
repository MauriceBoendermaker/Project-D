namespace Services{
    public interface IFuelService
    {
        Task<IEnumerable<Vehicle>?> GetAllVehicles();
        Task<int> GetVehicleAverage(string VehicleId);
    }
}