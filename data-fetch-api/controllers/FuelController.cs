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
    }
}