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

            return Shipments is null ? NotFound("Geen zendingen gevonden..") : Ok(Shipments);
        }

        // Per zending de max capaciteit
        [HttpGet("maxcapaciteit")]
        public async Task<IActionResult> GetMaxCapacity([FromQuery] int ZendingId)
        {
            int MaxCapacityKg = await _ShipmentService.GetMaxCapacity(ZendingId);
            return MaxCapacityKg < 0 ? NotFound($"De zending met Id: {ZendingId} bestaat niet of het berekenen van de gegevens is niet mogelijk ") : Ok($"De Maximale capaciteit van Zending: {ZendingId}: {MaxCapacityKg}Kg");

        }


        // Per zending de beladingsgraad in %
        [HttpGet("beladingsgraad")]
        public async Task<IActionResult> GetLoadDegree([FromQuery] int ZendingId)
        {
            double LoadDegree = await _ShipmentService.GetLoadDegree(ZendingId);
            return LoadDegree < 0 ? NotFound($"De zending met Id: {ZendingId} bestaat niet of het berekenen van de gegevens is niet mogelijk ") :
                                    Ok($"De beladingsgraad van zending {ZendingId}: {LoadDegree * 100}%");
        }

        // Voor alle zendingen de gemiddelde beladingsgraad %
        [HttpGet("beladingsgraad/gemiddeld")]
        public async Task<IActionResult> GetAverageLoadDegree()
        {
            double AverageLoadDegree = await _ShipmentService.GetAverageLoadDegree();
            return AverageLoadDegree < 0 ? NotFound("Het berekenen van de gegevens is niet mogelijk") : Ok($"De gemiddelde beladingsgraad: {AverageLoadDegree * 100}%");
        }

        // De totale onbenutte kilometers
        [HttpGet("onbenutte-kilometers")]
        public async Task<IActionResult> GetTotalEmptyMiles()
        {
            int TotalEmptyMiles = await _ShipmentService.GetTotalEmptyMiles();
            return TotalEmptyMiles < 0 ? NotFound("Het berekenen van de gegevens is niet mogelijk") : Ok($"De totale onbenutte kilometers: {TotalEmptyMiles}km");
        }
    }
}