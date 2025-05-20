using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using System.Threading.Tasks;

namespace Controllers
{
    [ApiController]
    [Route("api/klanten")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var Customers = await _customerService.GetAllCustomersAsync();
            if (Customers == null || Customers.Count == 0)
            {
                return NotFound(new { error = "Geen klanten gevonden." });
            }
            return Ok(Customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById([FromRoute] int id)
        {
            Customer customer = await _customerService.GetCustomerByIdAsync(id);
            if (customer == null)
            {
                return NotFound(new { error = $"Klant met ID {id} niet gevonden." });
            }
            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest(new { error = "Ongeldige klant data." });
            }

            await _customerService.AddCustomerAsync(customer);

            return Created("http://localhost:3000/api/klanten", new { message = "Klant succesvol toegevoegd." });
        }
    }
}
