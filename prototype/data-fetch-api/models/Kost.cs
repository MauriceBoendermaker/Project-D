using System.Collections.Generic;
using System.Text.Json.Serialization;

public class Kost
{
    public int Id { get; set; }
    [JsonPropertyName("onderhoud")]
    public float Onderhoud { get; set; }

    [JsonPropertyName("verzekering")]
    public float Verzekering { get; set; }

    [JsonPropertyName("tolwegen")]
    public float Tolwegen { get; set; }
}