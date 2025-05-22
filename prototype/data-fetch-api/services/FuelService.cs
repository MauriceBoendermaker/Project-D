using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class FuelService : IFuelService
    {

        private readonly AppDbContext _context;

        public FuelService(AppDbContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<Vehicle>?> GetAllVehiclesAsync()
        {
            try
            {
                return await _context.Vehicles.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading Database: {ex.Message}");
                return null;
            }
        }

        public async Task<IEnumerable<Trip>?> GetAllTripsAsync()
        {
            try
            {
                return await _context.Trips.ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading Database: {ex.Message}");
                return null;
            }
        }

        public async Task<int> GetVehicleAverageAsync(int voertuigId)
        {
            try
            {
                var vehicles = await GetAllVehiclesAsync();

                if (vehicles == null) return 0;

                var vehicle = vehicles.FirstOrDefault(v => v.VehicleId == voertuigId);
                if (vehicle == null || vehicle.Trips == null || vehicle.Trips.Count == 0) return 0;

                int totaalVerbruik = vehicle.Trips.Sum(rit => rit.FuelUsage);
                return totaalVerbruik / vehicle.Trips.Count;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating average: {ex.Message}");
                return 0;
            }
        }

        public async Task<int> GetRitCostAsync(string voertuigId, string ritId)
        {
            try
            {
                IEnumerable<Vehicle>? vehicles = await GetAllVehiclesAsync();

                if (vehicles == null) return 0;

                Vehicle? vehicle = vehicles.FirstOrDefault(v => v.VehicleNumber == voertuigId);

                var rit = _context.Trips.Where(r => r.TripNumber == ritId).FirstOrDefault(r => r.VehicleId == vehicle.VehicleId);
                if (vehicle == null || rit == null) return 0;

                double cost = 0.0;
                double kmNaarL = 0.31; // Gemiddeld 31 liter per 100km voor vrachtwagens scania.com geraadpleegd 19.05.2025
                switch (vehicle.FuelType)
                {
                    case "Diesel":
                        cost = rit.DistanceKm * kmNaarL * 1.718; // Prijs diesel gemiddeld 1,718 incl. BTW  ANWB.nl geraadpleegd 19.05.2025
                        break;
                    case "Elektrisch":
                        cost = rit.DistanceKm * 0.4; //"Op dit moment is de actuele stroomprijs gemiddeld € 0,25 per kWh (mei 2025)" ANWB.nl // km naar kwh 160 per 100km etruckacademy.nl geraadpleegd 19.05.2025
                        break;
                    case "Benzine":
                        cost = rit.DistanceKm * kmNaarL * 1.887; // Prijs benzine gemiddeld 1,887 incl. BTW ANWB.nl geraadpleegd 19.05.2025
                        break;
                    case "Hybride":
                        cost = rit.DistanceKm * (kmNaarL * 1.718 + 0.4) / 2; // gemiddelde van diesel en elektrisch
                        break;
                    case "Anders":
                        cost = rit.DistanceKm * kmNaarL * 1.718; // diesel
                        break;
                    default:
                        break;
                }
                return Convert.ToInt32(cost);


            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error calculating rit cost: {ex.Message}");
                return 0;
            }
        }

        //TODO:
        // public async GetAllTripCostsAsync()
        // {

        // }
    }
}
