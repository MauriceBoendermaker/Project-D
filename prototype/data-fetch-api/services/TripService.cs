using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{
    public class TripService : ITripService
    {
        private readonly AppDbContext _context;

        public TripService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Vehicle>> GetTripOverview()
        {
            try
            {
                return await _context.Voertuigen.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Fout met het ophalen van trips uit de database: " + ex.Message);
                return new List<Vehicle>();
            }
        }
    }
}