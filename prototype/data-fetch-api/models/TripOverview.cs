using System;

namespace Models
{
    public class TripOverview
    {
        public int TripId { get; set; }
        public DateTime? Date { get; set; }
        public int DistanceKm { get; set; }
        public int FuelUsage { get; set; }
        public int Time { get; set; }
        public string VehicleId { get; set; } = string.Empty;
        public string LicensePlate { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string FuelType { get; set; } = string.Empty;
    }
}
