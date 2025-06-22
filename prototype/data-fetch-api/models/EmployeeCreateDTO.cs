using System.Text.Json.Serialization;
using Models;

public class EmployeeCreateDTO
{
    public string Name { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public bool Available { get; set; }

    public int? VehicleId { get; set; } // Nullable omdat niet elke medewerker een chauffeur is


    public Employee ToEmployee()
    {
        return new Employee
        {
            Name = this.Name,
            Type = this.Type,
            Email = this.Email,
            Available = this.Available,
            VehicleId = this.VehicleId,

        };
    }
}