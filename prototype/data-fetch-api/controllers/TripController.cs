using Microsoft.AspNetCore.Mvc;
using Services;

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
            if (result != null && result.Any())
            {
                return Ok(result);
            }
            return NotFound("Geen ritten gevonden");
        }

        [HttpPost()]
        public async Task AddTrip([From Body] Rit rit){
            await _tripServoce.AddTrip(rit);
        }
    }
}
