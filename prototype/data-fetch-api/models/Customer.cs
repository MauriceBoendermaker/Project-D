using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        public string Company { get; set; } = string.Empty;

        public string Contactperson { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string TelephoneNumber { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        public string ZipCode { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
