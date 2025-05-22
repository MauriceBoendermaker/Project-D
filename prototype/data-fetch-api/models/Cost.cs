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

    public class TripCost
    {
        public string TripNumber { get; set; } = string.Empty;
        public string VehicleNumber { get; set; } = string.Empty;
        public DateTime? Date { get; set; }
        public double Cost { get; set; }

        public TripCost(string Tnumber, string Vnumber, DateTime? date, double cost)
        {
            TripNumber = Tnumber;
            VehicleNumber = Vnumber;
            Date = date;
            Cost = cost;
        }
    }
}
