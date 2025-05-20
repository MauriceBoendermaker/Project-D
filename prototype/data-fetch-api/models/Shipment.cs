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

        public int MaxCapacityKg { get; set; }

        public int CurrentLoadKg { get; set; }

        public int EmptyKilometers { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
