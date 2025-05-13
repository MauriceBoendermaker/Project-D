using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Location
    {
        [Key]
        [JsonPropertyName("locatie_id")]
        public int LocatieId { get; set; }

        [JsonPropertyName("adres")]
        public string Adres { get; set; } = string.Empty;

        [JsonPropertyName("stad")]
        public string Stad { get; set; } = string.Empty;

        [JsonPropertyName("postcode")]
        public string Postcode { get; set; } = string.Empty;

        [JsonPropertyName("land")]
        public string Land { get; set; } = string.Empty;

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
