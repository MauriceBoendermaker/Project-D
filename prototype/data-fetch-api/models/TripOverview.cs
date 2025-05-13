using System;

namespace Models
{
    public class TripOverview
    {
        public int RitId { get; set; }
        public string RitNummer { get; set; } = string.Empty;
        public DateTime? Datum { get; set; }
        public int AfstandKm { get; set; }
        public int BrandstofVerbruikL { get; set; }
        public int DuurMinuten { get; set; }
        public string VoertuigId { get; set; } = string.Empty;
        public string Kenteken { get; set; } = string.Empty;
        public string Merk { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string BrandstofType { get; set; } = string.Empty;
    }
}
