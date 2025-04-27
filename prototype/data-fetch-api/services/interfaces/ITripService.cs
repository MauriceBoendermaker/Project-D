using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ITripService
    {
        Task<List<Trip>> GetTripOverview();
        Task AddTrip(Trip rit);
    }
}
