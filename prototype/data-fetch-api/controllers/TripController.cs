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
            return result != null && result.Any() ? Ok(result) : NotFound(new { error = "Geen ritten gevonden." });
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
                return Created("http://localhost:3000/api/ritten", new { message = "Rit succesvol toegevoegd." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Fout bij toevoegen rit: {ex.Message}" });
            }
        }
    }
}
