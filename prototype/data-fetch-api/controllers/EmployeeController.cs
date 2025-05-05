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

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            IEnumerable<Employee>? employees = await _employeeService.GetAllEmployees();
            return employees != null ? Ok(employees) : NotFound("Er zijn momenteel geen medewerkers");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            Employee? employee = await _employeeService.GetEmployee(id);
            if (employee == null)
            {
                return NotFound($"Medewerker met id: {id} niet gevonden.");
            }
            return Ok(employee);
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
                return Created("http://localhost:3000/api/medewerkers/Toevoegen", new { Message = "Medewerker succesvol toegevoegd." });
            }
            catch
            {
                return BadRequest("Er is een fout opgetreden");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            bool result = await _employeeService.DeleteEmployee(id);
            if (!result)
            {
                return NotFound("Mederwerker niet gevonden");
            }

            return Ok("Medewerker succesvol verwijderd.");
        }
    }
}