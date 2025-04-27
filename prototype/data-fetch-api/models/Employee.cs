using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Employee
    {
        [Key]
        [JsonPropertyName("medewerker_id")]
        public int MedewerkerId { get; set; }

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

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
