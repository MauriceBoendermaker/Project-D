using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class Cost
    {
        [Key]
        public int Id { get; set; }

        public float Maintenance { get; set; }

        public float Insurance { get; set; }

        public float TollRoads { get; set; }
    }
}
