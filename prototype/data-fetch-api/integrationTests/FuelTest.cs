using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;

namespace integrationTests
{
    public class FuelTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public FuelTest(WebApplicationFactory<Program> factory)
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

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetVehicleAverage_ReturnsOk()
        {
            // Arrange
            var vehicleId = "TRK-0"; 
            var url = $"/api/brandstof/gemiddelde/{vehicleId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("gemiddelde brandstof", body);
        }

        [Fact]
        public async Task GetRitCost_ReturnsOk()
        {
            // Arrange
            var vehicleId = "TRK-0"; 
            var ritId = "RIT-0";     
            var url = $"/api/brandstof/kosten/{vehicleId}/{ritId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("Benzinekosten", body);
        }
    }
}
