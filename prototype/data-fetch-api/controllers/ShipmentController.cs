using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/zending")]
    public class ShipmentController : ControllerBase
    {
        private readonly IJsonShipmentService _shipmentService;

        public ShipmentController(IJsonShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShipments()
        {
            var shipments = await _shipmentService.GetAllShipments();
            return shipments == null ? NotFound(new { error = "Geen zendingen gevonden.." }) : Ok(shipments);
        }

        [HttpGet("maxcapaciteit")]
        public async Task<IActionResult> GetMaxCapacity([FromQuery] int shipmentId)
        {
            int maxCapacityKg = await _shipmentService.GetMaxCapacity(shipmentId);
            return maxCapacityKg < 0
                ? NotFound(new { error = $"De zending met Id: {shipmentId} bestaat niet of het berekenen van de gegevens is niet mogelijk." })
                : Ok(new { maxCapacity = maxCapacityKg });
        }

        [HttpGet("beladingsgraad")]
        public async Task<IActionResult> GetLoadDegree([FromQuery] int shipmentId)
        {
            double degree = await _shipmentService.GetLoadDegree(shipmentId);
            return degree < 0
                ? NotFound(new { error = $"De zending met Id: {shipmentId} bestaat niet of het berekenen van de gegevens is niet mogelijk." })
                : Ok(new { degree = degree });
        }

        [HttpGet("beladingsgraad/totaal")]
        public async Task<IActionResult> GetTotalLoadDegree()
        {
            List<LoadDegree>? degrees = await _shipmentService.GetTotalLoadDegree();
            return degrees == null
                ? NotFound(new { error = "Geen zendingen beschikbaar." })
                : Ok(degrees);
        }

        [HttpGet("beladingsgraad/gemiddeld")]
        public async Task<IActionResult> GetAverageLoadDegree()
        {
            double averageDegree = await _shipmentService.GetAverageLoadDegree();
            return averageDegree < 0
                ? NotFound(new { error = "Het berekenen van de gegevens is niet mogelijk." })
                : Ok(new { averageDegree = averageDegree });
        }

        [HttpGet("onbenutte-kilometers")]
        public async Task<IActionResult> GetTotalEmptyMiles()
        {
            int totalEmptyMiles = await _shipmentService.GetTotalEmptyMiles();
            return totalEmptyMiles < 0
                ? NotFound(new { error = "Het berekenen van de gegevens is niet mogelijk." })
                : Ok(new { totalEmptyMiles = totalEmptyMiles });
        }
    }
}
