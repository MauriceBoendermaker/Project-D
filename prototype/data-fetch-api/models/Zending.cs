using System.Text.Json;
using System.Text.Json.Serialization;
namespace Models
{
    public class Zending
    {

        [JsonPropertyName("zending_id")]
        public int ShipmentId { get; set; }
        [JsonPropertyName("voertuig_id")]
        public required string VehicleId { get; set; }
        [JsonPropertyName("bestemming")]

        public required string Destination { get; set; }
        [JsonPropertyName("max_capaciteit")]

        public int MaxCapacityKg { get; set; }
        [JsonPropertyName("huidige_capaciteit")]

        public int CurrentLoadKg { get; set; }
        [JsonPropertyName("onbenutte_kilometers")]

        public int EmptyKilometers { get; set; }
    }
}