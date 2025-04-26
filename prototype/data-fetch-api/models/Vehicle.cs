using System.Collections.Generic;
using System.Text.Json.Serialization;

public class Vehicle
{
    public int Id { get; set; }
    [JsonPropertyName("voertuig_id")]
    public string? VoertuigId { get; set; }

    [JsonPropertyName("kenteken")]
    public string? Kenteken { get; set; }

    [JsonPropertyName("merk")]
    public string? Merk { get; set; }

    [JsonPropertyName("model")]
    public string? Model { get; set; }

    [JsonPropertyName("brandstof_type")]
    public string? BrandstofType { get; set; }

    [JsonPropertyName("ritten")]
    public List<Rit>? Ritten { get; set; }
}
