using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Trip
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key (en auto increment)



        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; } // Foreign key naar Voertuig
        [JsonIgnore]


        public Vehicle Vehicle { get; set; } = null!;


        public DateTime? Date { get; set; }

        public int DistanceKm { get; set; }

        public int Time { get; set; }

        public int FuelUsage { get; set; }

        public int DestinationId { get; set; } // Foreign key naar Locatie

        public int CustomerId { get; set; } // Foreign key naar Klant

        public int DriverId { get; set; } // Foreign key naar Medewerker

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
