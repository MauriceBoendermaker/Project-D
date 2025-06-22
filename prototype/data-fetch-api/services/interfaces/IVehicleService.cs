using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface IVehicleService
    {
        Task<List<Vehicle>> GetAllVehiclesAsync();
        Task<Vehicle?> GetVehicleByIdAsync(int voertuigId);
        Task AddVehicleAsync(Vehicle Vehicle);
    }
}
