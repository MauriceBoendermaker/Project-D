using Microsoft.AspNetCore.Mvc;
using Services;

namespace Controllers{
    [Route("api/brandstof")]
    [ApiController]
    public class FuelController : ControllerBase
    {
        private readonly IFuelService _fuelService;

        public FuelController(IFuelService fuelService)
        {
            _fuelService = fuelService;
        }

        [HttpGet("voertuigen")]
        public async Task<IActionResult> GetVehicles()
        {
            var result = await _fuelService.GetAllVehicles();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound("Geen voertuigen gevonden");
        }

        [HttpGet("gemiddelde/{VehicleId}")]
        public async Task<IActionResult> GetVehicleAverage([FromRoute] string VehicleId)
        {
            var result = await _fuelService.GetVehicleAverage(VehicleId);
            if (result != 0)
            {
                return Ok($"gemiddelde brandstof per rit voor {VehicleId}: {result} Liter");
            }
            return NotFound("Voertuig bestaat niet of geen ritten");
        }
    }
}