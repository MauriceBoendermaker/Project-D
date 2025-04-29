using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Vehicle
    {
        [Key]
        public int VoertuigId { get; set; } // Primary key (auto increment)

        [JsonPropertyName("voertuig_id")]
        public string VoertuigNummer { get; set; } = string.Empty;

        [JsonPropertyName("kenteken")]
        public string? Kenteken { get; set; } = string.Empty;

        [JsonPropertyName("merk")]
        public string? Merk { get; set; } = string.Empty;

        [JsonPropertyName("model")]
        public string? Model { get; set; } = string.Empty;

        [JsonPropertyName("brandstof_type")]
        public string? BrandstofType { get; set; } = string.Empty;

        [JsonPropertyName("ritten")]
        public List<Trip>? Ritten { get; set; }

        [JsonPropertyName("maximale_capaciteit_kg")]
        public int MaximaleCapaciteitKg { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
