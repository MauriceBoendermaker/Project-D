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
        public int RitId { get; set; } // Primary key (en auto increment)

        [JsonPropertyName("rit_id")]
        public string RitNummer { get; set; } = string.Empty;

        [JsonPropertyName("voertuig_id")]
        [ForeignKey("Vehicle")]
        public int VehicleVoertuigId { get; set; } // Foreign key naar Voertuig

        public Vehicle Vehicle { get; set; } = null!;

        [JsonPropertyName("datum")]
        public DateTime? Datum { get; set; }

        [JsonPropertyName("afstand_km")]
        public int AfstandKm { get; set; }

        [JsonPropertyName("duur_minuten")]
        public int DuurMinuten { get; set; }

        [JsonPropertyName("brandstof_verbruik_l")]
        public int BrandstofVerbruikL { get; set; }

        [JsonPropertyName("bestemming_id")]
        public int BestemmingId { get; set; } // Foreign key naar Locatie

        [JsonPropertyName("klant_id")]
        public int KlantId { get; set; } // Foreign key naar Klant

        [JsonPropertyName("chauffeur_id")]
        public int ChauffeurId { get; set; } // Foreign key naar Medewerker

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
