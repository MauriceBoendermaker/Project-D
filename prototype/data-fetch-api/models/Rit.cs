public class Rit
{
    public int Id { get; set; }
    [JsonPropertyName("rit_id")]
    public string? RitId { get; set; }

    [JsonPropertyName("datum")]
    public string? Datum { get; set; }

    [JsonPropertyName("afstand_km")]
    public int AfstandKm { get; set; }

    [JsonPropertyName("brandstof_verbruik_l")]
    public int BrandstofVerbruikL { get; set; }

    [JsonPropertyName("duur_minuten")]
    public int DuurMinuten { get; set; }

    [JsonPropertyName("kosten")]
    public Kost? Kosten { get; set; }
}