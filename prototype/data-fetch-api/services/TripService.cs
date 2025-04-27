using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class TripService : ITripService
    {
        private readonly AppDbContext _context;

        public TripService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Rit>> GetTripOverview()
        {
            try
            {
                return await _context.Ritten.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Fout met het ophalen van ritten uit de database: " + ex.Message);
                return new List<Rit>();
            }
        }

        public async Task AddTrip(Rit rit)
        {
            try
            {
                await _context.Ritten.AddAsync(rit);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Fout met het toevoegen van een rit: " + ex.Message);
            }
        }
    }
}
