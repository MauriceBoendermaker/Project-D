using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
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
            var vehicles = await _vehicleService.GetAllVehiclesAsync();
            if (vehicles == null || vehicles.Count == 0)
            {
                return NotFound(new Response { Message = "Geen voertuigen gevonden." });
            }
            return Ok(new Response { Data = vehicles });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicleById([FromRoute] int id)
        {
            var vehicle = await _vehicleService.GetVehicleByIdAsync(id);
            if (vehicle == null)
            {
                return NotFound(new Response { Message = $"voertuig met ID {id} niet gevonden." });
            }
            return Ok(new Response { Data = vehicle });
        }

        [HttpPost]
        public async Task<IActionResult> AddVehicle([FromBody] Vehicle vehicle)
        {
            if (vehicle == null)
            {
                return BadRequest(new Response { Message = "Ongeldige voertuig data." });
            }

            await _vehicleService.AddVehicleAsync(vehicle);

            return Created("http://localhost:5000/api/voertuigen", new Response { Message = "Voertuig succesvol toegevoegd." });
        }
    }
}
