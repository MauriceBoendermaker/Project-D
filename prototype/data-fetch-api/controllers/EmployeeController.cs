using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
using Models;
using Services;

namespace Controllers
{
    [Route("api/medewerkers")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IEmailService _emailService;

        public EmployeeController(IEmployeeService employeeService, IEmailService mailService)
        {
            _employeeService = employeeService;
            _emailService = mailService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            IEnumerable<Employee>? employees = await _employeeService.GetAllEmployees();
            return employees != null ? Ok(new Response { Data = employees }) : NotFound(new Response { Message = "Er zijn momenteel geen medewerkers" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            Employee? employee = await _employeeService.GetEmployee(id);
            if (employee == null)
            {
                return NotFound(new Response { Message = $"Medewerker met id: {id} niet gevonden." });
            }
            return Ok(new Response { Data = Response });
        }

        [HttpPost("toevoegen")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeCreateDTO employeeDto)
        {
            try
            {

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _employeeService.AddEmployee(employeeDto);
                await _emailService.SendRandomPassword(employeeDto.Email, await _emailService.GeneratePass());
                return Created("http://localhost:3000/api/medewerkers/toevoegen", new Response { Message = "Medewerker succesvol toegevoegd." });
            }
            catch
            {
                return BadRequest(new Response { Message = "Er is een fout opgetreden" });
            }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateEmployee([FromQuery] int id, EmployeeCreateDTO emp)
        {
            bool result = await _employeeService.UpdateEmployee(id, emp);

            return result ? Ok(new Response { Message = "Medewerker succesvol bijgewerkt." }) : NotFound(new Response { Message = "Medewerker niet gevonden." });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            bool result = await _employeeService.DeleteEmployee(id);
            if (!result)
            {
                return NotFound(new Response { Message = "Mederwerker niet gevonden" });
            }

            return Ok(new Response { Message = "Medewerker succesvol verwijderd." });
        }
    }
}