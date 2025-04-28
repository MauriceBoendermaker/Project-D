using Microsoft.AspNetCore.Mvc;
using Services;
using System.Threading.Tasks;

namespace Controllers
{
    [ApiController]
    [Route("api/voertuigen")]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVehicles()
        {
            var voertuigen = await _vehicleService.GetAllVehiclesAsync();
            if (voertuigen == null || voertuigen.Count == 0)
            {
                return NotFound(new { error = "Geen voertuigen gevonden." });
            }
            return Ok(voertuigen);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleById([FromRoute] int id)
        {
            var voertuig = await _vehicleService.GetVehicleByIdAsync(id);
            if (voertuig == null)
            {
                return NotFound(new { error = $"Voertuig met ID {id} niet gevonden." });
            }
            return Ok(voertuig);
        }
    }
}
