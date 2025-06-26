using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using integrationTests;
using System.Text;
using System.Text.Json;

namespace integrationTests
{
    public class TripTest : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public TripTest(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetTripOverview_Ok()
        {
            // Arrange
            var url = $"/api/ritten/overzicht";

            // Act
            var response = await _client.GetAsync(url);
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine(body);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task Get_AvailableTrucks_OK()
        {
            // Arrange
            var date = DateTime.UtcNow.ToString("yyyy-MM-dd");
            var url = $"/api/ritten?date={date}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
        }
    }
}
