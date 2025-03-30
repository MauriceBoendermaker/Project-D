namespace Services{
    public interface IFuelService
    {
        Task<IEnumerable<Vehicle>?> GetAllVehicles();
    }
}