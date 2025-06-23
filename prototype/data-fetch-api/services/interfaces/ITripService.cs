using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ITripService
    {
        Task<List<TripOverview>> GetTripOverview();
        Task AddTrip(TripCreateDto rit);
        Task<List<Vehicle>> GetAvailableVehicles(DateTime datetime);
    }
}
