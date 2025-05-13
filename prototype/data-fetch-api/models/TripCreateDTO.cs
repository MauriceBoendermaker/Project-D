using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class TripCreateDto
    {
        [JsonPropertyName("rit_id")]
        public string RitNummer { get; set; } = string.Empty;

        [JsonPropertyName("voertuig_id")]
        public int VehicleVoertuigId { get; set; }

        [JsonPropertyName("datum")]
        public DateTime? Datum { get; set; }

        [JsonPropertyName("afstand_km")]
        public int AfstandKm { get; set; }

        [JsonPropertyName("duur_minuten")]
        public int DuurMinuten { get; set; }

        [JsonPropertyName("brandstof_verbruik_l")]
        public int BrandstofVerbruikL { get; set; }

        [JsonPropertyName("bestemming_id")]
        public int BestemmingId { get; set; }

        [JsonPropertyName("klant_id")]
        public int KlantId { get; set; }

        [JsonPropertyName("chauffeur_id")]
        public int ChauffeurId { get; set; }




        public Trip ToTrip()
        {
            return new Trip
            {
                RitNummer = RitNummer,
                VehicleVoertuigId = VehicleVoertuigId,
                Datum = Datum,
                AfstandKm = AfstandKm,
                DuurMinuten = DuurMinuten,
                BrandstofVerbruikL = BrandstofVerbruikL,
                BestemmingId = BestemmingId,
                KlantId = KlantId,
                ChauffeurId = ChauffeurId,
            };
        }
    }
}