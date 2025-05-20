using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Shipment
    {
        [Key]
        public int Id { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; } = null!;

        public int ShipmentId { get; set; }

        public string Destination { get; set; } = string.Empty;

        [JsonPropertyName("max_capaciteit")]
        public int MaxCapacityKg { get; set; }

        [JsonPropertyName("huidige_capaciteit")]
        public int CurrentLoadKg { get; set; }

        [JsonPropertyName("onbenutte_kilometers")]
        public int EmptyKilometers { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
