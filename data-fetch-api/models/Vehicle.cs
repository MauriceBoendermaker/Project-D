using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

public class Vehicle
{
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

public class Rit
{
    [JsonPropertyName("rit_id")]
    public string? RitId { get; set; }

    [JsonPropertyName("datum")]
    public string? Datum { get; set; }

    [JsonPropertyName("afstand_km")]
    public int AfstandKm { get; set; }

    [JsonPropertyName("brandstof_verbruik_l")]
    public int BrandstofVerbruikL { get; set; }

    [JsonPropertyName("gemiddeld_verbruik_l_per_100km")]
    public int GemiddeldVerbruikPer100Km { get; set; }
}
