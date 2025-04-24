using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace Models
{
    public class Zending
    {
        public int Id { get; set; }

        // XML and JSON property name mapping for ShipmentId
        [JsonPropertyName("zending_id")]
        [XmlElement("zending_id")]
        public int ShipmentId { get; set; }

        // JSON and XML property name mapping for VehicleId
        [JsonPropertyName("voertuig_id")]
        [XmlElement("voertuig_id")]
        public required string VehicleId { get; set; }

        // JSON and XML property name mapping for Destination
        [JsonPropertyName("bestemming")]
        [XmlElement("bestemming")]
        public required string Destination { get; set; }

        // JSON and XML property name mapping for MaxCapacityKg
        [JsonPropertyName("max_capaciteit")]
        [XmlElement("max_capaciteit")]
        public int MaxCapacityKg { get; set; }

        // JSON and XML property name mapping for CurrentLoadKg
        [JsonPropertyName("huidige_capaciteit")]
        [XmlElement("huidige_capaciteit")]
        public int CurrentLoadKg { get; set; }

        // JSON and XML property name mapping for EmptyKilometers
        [JsonPropertyName("onbenutte_kilometers")]
        [XmlElement("onbenutte_kilometers")]
        public int EmptyKilometers { get; set; }

        // JSON and XML property name mapping for CreatedAt (optional)
        [JsonPropertyName("created_at")]
        [XmlElement("created_at")]
        public string? CreatedAt { get; set; }
    }

    // Class to map load degree
    public class loadDegree
    {
        // ShipmentId mapped for both JSON and XML
        [JsonPropertyName("shipment_id")]
        [XmlElement("shipment_id")]
        public int ShipmentId { get; set; }

        // LoadDegree property mapped for both JSON and XML
        [JsonPropertyName("load_degree")]
        [XmlElement("load_degree")]
        public double LoadDegree { get; set; }
    }
}
