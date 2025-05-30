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
                return NotFound(new Response { Message = "Geen klanten gevonden." });
            }
            return Ok(new Response { Data = Customers });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById([FromRoute] int id)
        {
            Customer customer = await _customerService.GetCustomerByIdAsync(id);
            if (customer == null)
            {
                return NotFound(new Response { Message = $"Klant met ID {id} niet gevonden." });
            }
            return Ok(new Response { Data = customer });
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody] Customer customer)
        {
            if (customer == null)
            {
                return BadRequest(new Response { Message = "Ongeldige klant data." });
            }

            await _customerService.AddCustomerAsync(customer);

            return Created("http://localhost:3000/api/klanten", new Response { Message = "Klant succesvol toegevoegd." });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer([FromQuery] int id, Customer customer)
        {
            bool result = await _customerService.UpdateCustomerAsync(id, customer);

            return result ? Ok(new Response { Message = "Klant succesvol bijgewerkt." }) : NotFound(new Response { Message = "Klant niet gevonden" });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            bool result = await _customerService.DeleteCustomerAsync(id);
            if (!result)
            {
                return NotFound("Klant niet gevonden");
            }
            return Ok("Klant succesvol verwijderd");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            bool result = await _customerService.DeleteCustomerAsync(id);
            if (!result)
            {
                return NotFound("Klant niet gevonden");
            }
            return Ok("Klant succesvol verwijderd");
        }
    }
}
