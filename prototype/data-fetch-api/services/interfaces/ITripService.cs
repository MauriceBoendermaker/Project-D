using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ITripService
    {
        Task<List<Rit>> GetTripOverview();
        Task AddTrip(Rit rit);
    }
}
