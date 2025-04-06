using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/zending")]
    public class ShipmentController : ControllerBase
    {
        private IJsonSHipmentService _ShipmentService;

        public ShipmentController(IJsonSHipmentService service)
        {
            _ShipmentService = service;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllShipments()
        {
            var Shipments = await _ShipmentService.GetAllShipments();

            return Shipments is null ? NotFound(new { error = "Geen zendingen gevonden.." }) : Ok(Shipments);
        }

        // Per zending de max capaciteit
        [HttpGet("maxcapaciteit")]
        public async Task<IActionResult> GetMaxCapacity([FromQuery] int ZendingId)
        {
            int MaxCapacityKg = await _ShipmentService.GetMaxCapacity(ZendingId);
            return MaxCapacityKg < 0 ? NotFound(new { error = $"De zending met Id: {ZendingId} bestaat niet of het berekenen van de gegevens is niet mogelijk " }) : Ok(new { maxCapacity = MaxCapacityKg });

        }


        // Per zending de beladingsgraad in %
        [HttpGet("beladingsgraad")]
        public async Task<IActionResult> GetLoadDegree([FromQuery] int ZendingId)
        {
            double LoadDegree = await _ShipmentService.GetLoadDegree(ZendingId);
            return LoadDegree < 0 ? NotFound(new { error = $"De zending met Id: {ZendingId} bestaat niet of het berekenen van de gegevens is niet mogelijk" }) :
                                    Ok(new { loadDegree = LoadDegree });
        }

        // voor alle Zendingen de beladingsgraad
        [HttpGet("beladingsgraad/totaal")]
        public async Task<IActionResult> GetTotalLoadDegree()
        {
            Dictionary<int, double>? LoadDegrees = await _ShipmentService.GetTotalLoadDegree();
            var response = JsonSerializer.Serialize(LoadDegrees);

            return LoadDegrees == null ? NotFound(new { error = "No Shipments available" }) : Ok(response);
        }


        // Voor alle zendingen de gemiddelde beladingsgraad %
        [HttpGet("beladingsgraad/gemiddeld")]
        public async Task<IActionResult> GetAverageLoadDegree()
        {
            double AverageLoadDegree = await _ShipmentService.GetAverageLoadDegree();
            return AverageLoadDegree < 0 ? NotFound(new { error = $"Het berekenen van de gegevens is niet mogelijk" }) : Ok(new { averageLoadDegree = AverageLoadDegree });
        }

        // De totale onbenutte kilometers
        [HttpGet("onbenutte-kilometers")]
        public async Task<IActionResult> GetTotalEmptyMiles()
        {
            int TotalEmptyMiles = await _ShipmentService.GetTotalEmptyMiles();
            return TotalEmptyMiles < 0 ? NotFound(new { error = "Het berekenen van de gegevens is niet mogelijk" }) : Ok(new { totalEmptyMiles = TotalEmptyMiles });
        }
    }
}