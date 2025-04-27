using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Kost
    {
        [Key]
        public int Id { get; set; }
        
        [JsonPropertyName("onderhoud")]
        public float Onderhoud { get; set; }

        [JsonPropertyName("verzekering")]
        public float Verzekering { get; set; }

        [JsonPropertyName("tolwegen")]
        public float Tolwegen { get; set; }
    }
}
