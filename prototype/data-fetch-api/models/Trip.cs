using System.Text.Json.Serialization;

namespace Models
{
    public class Trip
    {
        [JsonPropertyName("voertuig_id")]
        public required string VehicleId { get; set; }

        [JsonPropertyName("kenteken")]
        public required string LicensePlate { get; set; }

        [JsonPropertyName("merk")]
        public required string Brand { get; set; }

        [JsonPropertyName("model")]
        public required string Model { get; set; }

        [JsonPropertyName("brandstof_type")]
        public required string FuelType { get; set; }

        [JsonPropertyName("ritten")]
        public required List<Rit> Ritten { get; set; }
    }

    public class Rit
    {
        [JsonPropertyName("rit_id")]
        public required string RitId { get; set; }

        [JsonPropertyName("datum")]
        public DateTime Date { get; set; }

        [JsonPropertyName("afstand_km")]
        public int DistanceKm { get; set; }

        [JsonPropertyName("brandstof_verbruik_l")]
        public int FuelUsedL { get; set; }

        [JsonPropertyName("gemiddeld_verbruik_l_per_100km")]
        public int AvgConsumption { get; set; }
    }
}
