using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IFuelService
    {
        Task<List<Vehicle>?> GetAllVehiclesAsync();
        Task<IEnumerable<Trip>?> GetAllTripsAsync();
        Task<int> GetVehicleAverageAsync(int voertuigId);
        Task<int> GetRitCostAsync(int vehicleId, int ritId);
        Task<int> GetRitCostAsync(int vehicleId, int TripId, List<Vehicle> vehicles);
        Task<IEnumerable<TripCost>?> GetAllTripCostsAsync();
    }
}
