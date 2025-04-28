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
            return await _context.Voertuigen.ToListAsync();
        }

        public async Task<Vehicle?> GetVehicleByIdAsync(int voertuigId)
        {
            return await _context.Voertuigen.FirstOrDefaultAsync(v => v.VoertuigId == voertuigId);
        }
    }
}
