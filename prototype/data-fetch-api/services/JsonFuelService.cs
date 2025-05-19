using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services
{
    public class JsonFuelService : IFuelService
    {

        private readonly AppDbContext _context;
        private readonly IFuelService _fuelService;

        public JsonFuelService(AppDbContext context, IFuelService fuelService){
            _context = context;
            _fuelService = fuelService;

        }
        public async Task<IEnumerable<Vehicle>?> GetAllVehiclesAsync()
        {
            try
            {
                //var vehicles = await _context.Vehicles;
                return _context.Voertuigen;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading JSON: {ex.Message}");
                return null;
            }
        }

        public async Task<int> GetVehicleAverageAsync(int voertuigId)
        {
            // try
            // {
            //     string jsonVehicles = await File.ReadAllTextAsync("data/brandstof_data.json");
            //     var vehicles = JsonSerializer.Deserialize<IEnumerable<Vehicle>>(jsonVehicles);

            //     if (vehicles == null) return 0;

            //     var vehicle = vehicles.FirstOrDefault(v => v.VoertuigId == voertuigId);
            //     if (vehicle == null || vehicle.Ritten == null || vehicle.Ritten.Count == 0) return 0;

            //     int totaalVerbruik = vehicle.Ritten.Sum(rit => rit.BrandstofVerbruikL);
            //     return totaalVerbruik / vehicle.Ritten.Count;
            // }
            // catch (Exception ex)
            // {
            //     Console.WriteLine($"Error calculating average: {ex.Message}");
            //     return 0;
            // }
            return 0;
        }

        public async Task<int> GetRitCostAsync(int voertuigId, int ritId)
        {
            try
            {
                Vehicle vehicle = _context.Voertuigen.FirstOrDefault(v => Convert.ToInt32(v.VoertuigNummer) == voertuigId);

                var rit = _context.Ritten.Where(r => Convert.ToInt32(r.RitNummer) == ritId).FirstOrDefault(r=> Convert.ToInt32(r.VehicleVoertuigId) == voertuigId);
                if (vehicle == null || rit == null) return 0;

                double cost = 0.0;
                double kmNaarL = 0.31; // Gemiddeld 31 liter per 100km voor vrachtwagens scania.com geraadpleegd 19.05.2025
                switch (vehicle.brandstof_type){
                    case "Diesel":
                        cost = rit.AfstandKm * kmNaarL * 1.718; // Prijs diesel gemiddeld 1,718 incl. BTW  ANWB.nl geraadpleegd 19.05.2025
                        break;
                    case "Elektrisch":
                        cost = rit.AfstandKm * 0.4; //"Op dit moment is de actuele stroomprijs gemiddeld € 0,25 per kWh (mei 2025)" ANWB.nl // km naar kwh 160 per 100km etruckacademy.nl geraadpleegd 19.05.2025
                        break;
                    case "Benzine":
                        cost = rit.AfstandKm * kmNaarL * 1.887; // Prijs benzine gemiddeld 1,887 incl. BTW ANWB.nl geraadpleegd 19.05.2025
                        break;
                    case "Hybride":
                        cost = rit.AfstandKm * (kmNaarL * 1.718 + 0.4)/2; // gemiddelde van diesel en elektrisch
                        break;
                    case "Anders":
                        cost = rit.BrandstofVerbruikL * 1.718; // diesel
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
    }
}
