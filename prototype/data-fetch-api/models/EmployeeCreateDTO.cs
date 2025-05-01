using System.Text.Json.Serialization;
using Models;

public class EmployeeCreateDTO
{
    [JsonPropertyName("naam")]
    public string Naam { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [JsonPropertyName("beschikbaar")]
    public bool Beschikbaar { get; set; }

    [JsonPropertyName("voertuig_id")]
    public int? VoertuigId { get; set; } // Nullable omdat niet elke medewerker een chauffeur is


    public Employee ToEmployee()
    {
        return new Employee
        {
            Naam = this.Naam,
            Type = this.Type,
            Email = this.Email,
            Beschikbaar = this.Beschikbaar,
            VoertuigId = this.VoertuigId,

        };
    }
}