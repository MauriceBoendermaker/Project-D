using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Customer
    {
        [Key]
        [JsonPropertyName("klant_id")]
        public int CustomerId { get; set; }

        [JsonPropertyName("bedrijf")]
        public string Bedrijf { get; set; } = string.Empty;

        [JsonPropertyName("contactpersoon")]
        public string Contactpersoon { get; set; } = string.Empty;

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("telefoonnummer")]
        public string Telefoonnummer { get; set; } = string.Empty;

        [JsonPropertyName("adres")]
        public string Adres { get; set; } = string.Empty;

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
