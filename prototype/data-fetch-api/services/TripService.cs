using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class TripService : ITripService
    {
        private readonly AppDbContext _context;
        private readonly IVehicleService _vehicleService;

        public TripService(AppDbContext context, IVehicleService vehicleService)
        {
            _context = context;
            _vehicleService = vehicleService;
        }

        public async Task<List<TripOverview>> GetTripOverview()
        {
            try
            {
                var ritten = await _context.Ritten
                    .Include(r => r.Vehicle)
                    .Distinct()
                    .Where(r => r.Vehicle != null)
                    .Select(r => new TripOverview
                    {
                        RitId = r.RitId,
                        RitNummer = r.RitNummer,
                        Datum = r.Datum,
                        AfstandKm = r.AfstandKm,
                        BrandstofVerbruikL = r.BrandstofVerbruikL,
                        DuurMinuten = r.DuurMinuten,
                        VoertuigId = r.Vehicle.VoertuigId.ToString(),
                        Kenteken = r.Vehicle.Kenteken,
                        Merk = r.Vehicle.Merk,
                        Model = r.Vehicle.Model,
                        BrandstofType = r.Vehicle.BrandstofType
                    })
                    .ToListAsync();

                return ritten;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Fout met ophalen van ritten: " + ex.Message);
                return new List<TripOverview>();
            }
        }

        public async Task AddTrip(TripCreateDto rit)
        {
            if (_context.Voertuigen.Any(v => v.VoertuigId == rit.VehicleVoertuigId))
            {
                try
                {
                    Trip NewTrip = rit.ToTrip();
                    {
                        await _context.Ritten.AddAsync(NewTrip);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Fout met het toevoegen van een rit: " + ex.Message);
                }
            }
            else
            {
                throw new Exception($"De voertuig met voertuig ID: {rit.VehicleVoertuigId} bestaat niet");
            }
        }

    }
}
