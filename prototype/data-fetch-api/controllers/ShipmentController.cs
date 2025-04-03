using Microsoft.AspNetCore.Mvc;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/zending")]
    public class ShipmentController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllShipments()
        {
            throw new NotImplementedException();
        }

        // Per zending de max capaciteit
        [HttpGet("maxcapaciteit")]
        public async Task<IActionResult> GetMaxCapacity([FromQuery] int ZendingId)
        {
            throw new NotImplementedException();
        }


        // Per zending de beladingsgraad in %
        [HttpGet("beladingsgraad")]
        public async Task<IActionResult> GetLoadDegree([FromQuery] int ZendingId)
        {
            throw new NotImplementedException();

        }

        // Voor alle zendingen de gemiddelde beladingsgraad %
        [HttpGet("beladingsgraad/gemiddeld")]
        public async Task<IActionResult> GetAverageLoadDegree()
        {
            throw new NotImplementedException();
        }

        // De totale onbenutte kilometers
        [HttpGet("onbenutte-kilometers")]
        public async Task<IActionResult> GetEmptyMiles()
        {
            throw new NotFiniteNumberException();
        }
    }
}