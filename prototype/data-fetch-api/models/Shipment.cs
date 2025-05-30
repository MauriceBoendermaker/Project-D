using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    public class Shipment
    {
        [Key]
        public int Id { get; set; }

        public string VehicleNumber { get; set; } = string.Empty;

        public string Destination { get; set; } = string.Empty;

        public int MaxCapacityKg { get; set; }

        public int CurrentLoadKg { get; set; }

        public int EmptyKilometers { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
