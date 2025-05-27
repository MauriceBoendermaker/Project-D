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
        public int TripId { get; set; }
        public int VehicleId { get; set; }

        public DateTime? Date { get; set; }
        public double Cost { get; set; }

        public TripCost(int TId, int VId, DateTime? date, double cost)
        {
            TripId = TId;
            VehicleId = VId;
            Date = date;
            Cost = cost;
        }
    }
}
