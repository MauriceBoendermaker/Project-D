using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;

namespace integrationTests 
{
    public class TripTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public TripTest(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetTrips_ReturnsOk() {
            // Arrange
            var url = "api/ritten/overzicht";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }


        [Fact]
        public async Task AddTrip_WhenLoggedIn_ReturnsOk()
        {
            // Arrange
            var LoginRequest = new
            {
                username = "username",
                password = "password"
            };

            var loginResponse = await _client.PostAsync("/api/auth/login", LoginRequest);
            loginResponse.EnsureSuccessStatusCode();

            var trip = new
            {
                ritId = 999,
                ritNummer = "RIT-1000",
                datum = DateTime.Now,
                afstandKm = 50,
                brandstofVerbruikL = 5,
                duurMinuten = 60,
                voertuigId = "100",
                kenteken = "XX-1234",
                merk = "Red Bull",
                model = "Racing Car",
                brandstofType = "Petrol"
            };

            var json = JsonConvert.SerializeObject(trip);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/api/ritten", content);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

    }
}