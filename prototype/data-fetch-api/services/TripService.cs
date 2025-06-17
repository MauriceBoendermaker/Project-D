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
                var ritten = await _context.Trips
                    .Include(r => r.Vehicle)
                    .Distinct()
                    .Where(r => r.Vehicle != null)
                    .Select(r => new TripOverview
                    {
                        TripId = r.Id,
                        Date = r.Date,
                        DistanceKm = r.DistanceKm,
                        FuelUsage = r.FuelUsage,
                        Time = r.Time,
                        VehicleId = r.Vehicle.VehicleId.ToString(),
                        LicensePlate = r.Vehicle.LicensePlate,
                        Brand = r.Vehicle.Brand,
                        Model = r.Vehicle.Model,
                        FuelType = r.Vehicle.FuelType
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
            if (_context.Vehicles.Any(v => v.VehicleId == rit.VehicleId))
            {
                try
                {
                    Trip NewTrip = rit.ToTrip();
                    {
                        await _context.Trips.AddAsync(NewTrip);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception)
                {
                    throw new Exception("Een onverwachte fout is opgetreden");
                }
            }
            else
            {
                throw new Exception($"De voertuig met voertuig ID: {rit.VehicleId} bestaat niet");
            }
        }

    }
}
