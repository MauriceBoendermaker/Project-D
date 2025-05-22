using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers
{
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
            var result = await _fuelService.GetAllVehiclesAsync();
            if (result != null)
            {
                return Ok(new Response { Data = result });
            }
            return NotFound(new Response { Message = "Geen voertuigen gevonden" });
        }

        [HttpGet("ritten")]
        public async Task<IActionResult> GetTrips()
        {
            IEnumerable<Trip>? result = await _fuelService.GetAllTripsAsync();
            if (result != null)
            {
                return Ok(new Response { Data = result });
            }
            return NotFound("Geen ritten gevonden");
        }


        [HttpGet("gemiddelde/{voertuigId}")]
        public async Task<IActionResult> GetVehicleAverage([FromRoute] int voertuigId)
        {
            var result = await _fuelService.GetVehicleAverageAsync(voertuigId);
            if (result != 0)
            {
                return Ok(new Response { Message = $"Gemiddeld brandstofverbruik per rit voor voertuig {voertuigId}: {result} liter" });
            }
            return NotFound(new Response { Message = "Voertuig bestaat niet of geen ritten" });
        }

        [HttpGet("kosten/{voertuigId}/{ritId}")]
        public async Task<IActionResult> GetRitCost([FromRoute] string voertuigId, [FromRoute] string ritId)
        {
            var result = await _fuelService.GetRitCostAsync(voertuigId, ritId);
            if (result != 0)
            {
                return Ok(new Response { Message = $"De brandstofkosten voor rit {ritId} van voertuig {voertuigId} zijn: €{result}" });
            }
            return NotFound(new Response { Message = "Voertuig of rit niet gevonden" });
        }

        [HttpGet("totalekosten")]
        public async Task<IActionResult> GetTotalFuelCost()
        {
            Stopwatch sp = new();
            sp.Start();
            IEnumerable<TripCost>? result = await _fuelService.GetAllTripCostsAsync();
            sp.Stop();
            Console.WriteLine(sp.Elapsed);
            if (result != null)
            {
                return Ok(new Response { Data = result });
            }
            return NotFound(new Response { Message = "Er is een fout opgetreden tijdens het bereken van de kosten." });
        }
    }
}
