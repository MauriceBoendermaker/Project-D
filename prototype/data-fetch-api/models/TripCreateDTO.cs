using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public class TripCreateDto
    {
        public int TripId { get; set; }

        public int VehicleId { get; set; }

        public DateTime? Date { get; set; }

        public int DistanceKm { get; set; }

        public int Time { get; set; }

        public int FuelUsage { get; set; }

        public int DestinationId { get; set; }

        public int CustomerId { get; set; }

        public int DriverId { get; set; }




        public Trip ToTrip()
        {
            return new Trip
            {
                Id = TripId,
                VehicleId = VehicleId,
                Date = Date,
                DistanceKm = DistanceKm,
                Time = Time,
                FuelUsage = FuelUsage,
                DestinationId = DestinationId,
                CustomerId = CustomerId,
                DriverId = DriverId,
            };
        }
    }
}