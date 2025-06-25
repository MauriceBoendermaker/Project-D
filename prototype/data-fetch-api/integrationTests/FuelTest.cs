using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using integrationTests;

namespace integrationTests
{
    public class FuelTest : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public FuelTest(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetVehicles_ReturnsOk()
        {
            // Arrange
            var url = "/api/brandstof/voertuigen";
            

            // Act
            var response = await _client.GetAsync(url);
            Console.WriteLine($"response: {response.Content.ReadAsStringAsync()}");

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetVehicleAverage_ReturnsOk()
        {
            // Arrange
            var vehicleId = 16; 
            var url = $"/api/brandstof/gemiddelde/{vehicleId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("Gemiddeld brandstofverbruik", body);
        }

        [Fact]
        public async Task GetVehicleAverage_ReturnsNotFound() {
            // Arrange
            var vehicleId = 999;
            var url = $"/api/brandstof/gemiddelde/{vehicleId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("bestaat niet", body);
        }

        [Fact]
        public async Task GetRitCost_ReturnsOk()
        {
            // Arrange
            var vehicleId = 16; 
            var ritId = 121;     
            var url = $"/api/brandstof/kosten/{vehicleId}/{ritId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("brandstofkosten", body);
        }

        [Fact]
        public async Task GetRitCost_ReturnsNotFound()
        {
            // Arrange
            var vehicleId = 999; 
            var ritId = 999;     
            var url = $"/api/brandstof/kosten/{vehicleId}/{ritId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("niet gevonden", body);
        }

    }
}
