using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ITripService
    {
        Task<List<TripOverview>> GetTripOverview();
        Task AddTrip(Trip rit);
    }
}
