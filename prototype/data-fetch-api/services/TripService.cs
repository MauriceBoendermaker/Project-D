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

        public async Task<List<Vehicle>> GetAvailableVehicles(DateTime datetime)
        {
            try
            {
                if (datetime == null)
                {
                    return await _context.Vehicles.ToListAsync();
                }
                var busyVehicleIds = await _context.Trips
                    .Where(t => t.Date.HasValue && t.Date.Value.Date == datetime.Date)
                    .Select(t => t.VehicleId)
                    .Distinct()
                    .ToListAsync();

                var availableVehicles = await _context.Vehicles
                    .Where(v => !busyVehicleIds.Contains(v.VehicleId))
                    .ToListAsync();

                return availableVehicles;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Fout bij ophalen van beschikbare voertuigen: " + ex.Message);
                return new List<Vehicle>();
            }
        }




    }
}
