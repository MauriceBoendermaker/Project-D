using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace Models
{
    public class Zending
    {
        public int Id { get; set; }

        [JsonPropertyName("zending_id")]
        [XmlElement("zending_id")]
        public int ShipmentId { get; set; }

        private string _vehicleId;

        [JsonPropertyName("voertuig_id")]
        [XmlElement("voertuig_id")]
        public required string VehicleId
        {
            get => _vehicleId;
            set => _vehicleId = value.Trim();
        }

        private string _destination;
        [JsonPropertyName("bestemming")]
        [XmlElement("bestemming")]
        public required string Destination { get => _destination; set => _destination = value.Trim(); }

        [JsonPropertyName("max_capaciteit")]
        [XmlElement("max_capaciteit")]
        public int MaxCapacityKg { get; set; }

        [JsonPropertyName("huidige_capaciteit")]
        [XmlElement("huidige_capaciteit")]
        public int CurrentLoadKg { get; set; }

        [JsonPropertyName("onbenutte_kilometers")]
        [XmlElement("onbenutte_kilometers")]
        public int EmptyKilometers { get; set; }

        [JsonPropertyName("created_at")]
        [XmlElement("created_at")]
        public string? CreatedAt { get; set; }
    }

    public class loadDegree
    {
        [JsonPropertyName("shipment_id")]
        [XmlElement("shipment_id")]
        public int ShipmentId { get; set; }

        [JsonPropertyName("load_degree")]
        [XmlElement("load_degree")]
        public double LoadDegree { get; set; }
    }
}
