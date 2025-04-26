using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace Converters
{
    public class FlexibleDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var raw = reader.GetString();

            int parenIndex = raw.IndexOf(" (");
            if (parenIndex > 0)
                raw = raw.Substring(0, parenIndex).Trim();

            raw = Regex.Replace(raw, @"GMT([+-]\d{2})(\d{2})", "$1:$2");

            if (DateTime.TryParse(raw, out var result))
                return result;

            throw new JsonException($"Unable to convert {raw} to DateTime.");
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("o")); // ISO 8601 format
        }
    }
}
