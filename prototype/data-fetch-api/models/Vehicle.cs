using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; } // Primary key (auto increment)

        public string VehicleNumber { get; set; } = string.Empty;

        public string? LicensePlate { get; set; } = string.Empty;

        public string? Brand { get; set; } = string.Empty;

        public string? Model { get; set; } = string.Empty;

        public string? FuelType { get; set; } = string.Empty;

        public List<Trip>? Trips { get; set; }

        public int MaximumCapacity { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
