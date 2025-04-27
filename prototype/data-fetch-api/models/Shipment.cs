using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Shipment
    {
        [Key]
        public int Id { get; set; }

        [JsonPropertyName("shipment_id")]
        public int ShipmentId { get; set; }

        [JsonPropertyName("destination")]
        public string Destination { get; set; } = string.Empty;

        [JsonPropertyName("max_capacity_kg")]
        public int MaxCapacityKg { get; set; }

        [JsonPropertyName("current_load_kg")]
        public int CurrentLoadKg { get; set; }

        [JsonPropertyName("empty_kilometers")]
        public int EmptyKilometers { get; set; }

        [ForeignKey(nameof(Vehicle))]
        public int VoertuigId { get; set; }

        public Vehicle Vehicle { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
