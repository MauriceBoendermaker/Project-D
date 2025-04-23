using Models;

namespace Services
{
    public interface ITripService
    {
        Task<List<Trip>> GetTripOverview();
    }
}
