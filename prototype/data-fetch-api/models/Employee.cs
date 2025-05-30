using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool Available { get; set; }

        public int? VehicleId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
