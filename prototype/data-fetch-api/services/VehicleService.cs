using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class VehicleService : IVehicleService
    {
        private readonly AppDbContext _context;

        public VehicleService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Vehicle>> GetAllVehiclesAsync()
        {
            try
            {

                return await _context.Vehicles.ToListAsync();
            }
            catch (Exception ex)
            {
                // Log the exception (not implemented here)
                throw new Exception("Er is een fout opgetreden bij het ophalen van voertuigen.", ex);
            }
        }

        public async Task<Vehicle?> GetVehicleByIdAsync(int voertuigId)
        {
            return await _context.Vehicles.FirstOrDefaultAsync(v => v.VehicleId == voertuigId);
        }

        public async Task AddVehicleAsync(Vehicle vehicle)
        {
            await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
        }
    }
}
