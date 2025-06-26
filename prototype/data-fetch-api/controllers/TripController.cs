using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using System.Threading.Tasks;
using System.Linq;

namespace Controllers
{
    [Route("api/ritten")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripService _tripService;

        public TripController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet("overzicht")]
        public async Task<IActionResult> GetTripOverview()
        {
            var result = await _tripService.GetTripOverview();
            return result != null && result.Any() ? Ok(new Response { Data = result }) : NotFound(new Response { Message = "Geen ritten gevonden." });
        }

        [HttpPost]
        public async Task<IActionResult> AddTrip([FromBody] TripCreateDto rit)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _tripService.AddTrip(rit);
                return Created("http://localhost:3000/api/ritten", new Response { Message = "Rit succesvol toegevoegd." });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Message = $"Fout bij toevoegen rit: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAvailableTrucks([FromQuery] DateTime date)
        {
            try
            {
                var result = await _tripService.GetAvailableVehicles(date);
                return Ok(new Response { Data = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new Response { Message = $"Fout bij ophalen beschikbare voertuigen: {ex.Message}" });
            }
        }
    }
}
