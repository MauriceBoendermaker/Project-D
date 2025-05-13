using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IFuelService
    {
        Task<IEnumerable<Vehicle>?> GetAllVehiclesAsync();
        Task<int> GetVehicleAverageAsync(int voertuigId);
        Task<int> GetRitCostAsync(string voertuigId, string ritId);
    }
}
