using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace Models
{
    public class LoadDegree
    {
        [XmlElement("shipment_id")]
        public int ShipmentId { get; set; }

        [XmlElement("load_degree")]
        public double Degree { get; set; }
    }
}
