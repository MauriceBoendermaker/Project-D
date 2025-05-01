using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
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


        // [Fact]
        // public async Task AddTrip_WhenLoggedInWithJwt_ReturnsOk()
        // {
        //     // Arrange
        //     var loginRequest = new
        //     {
        //         username = "username",
        //         password = "password"
        //     };

        //     var loginJson = JsonConvert.SerializeObject(loginRequest);
        //     var loginContent = new StringContent(loginJson, Encoding.UTF8, "application/json");

        //     var loginResponse = await _client.PostAsync("/api/login", loginContent);
        //     loginResponse.EnsureSuccessStatusCode();

            
        //     var loginResponseString = await loginResponse.Content.ReadAsStringAsync();
        //     dynamic loginResult = JsonConvert.DeserializeObject(loginResponseString);
        //     string token = loginResult.token;

        //     _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        //     var trip = new
        //     {
        //         ritId = 999,
        //         ritNummer = "RIT-1000",
        //         datum = DateTime.Now,
        //         afstandKm = 50,
        //         brandstofVerbruikL = 5,
        //         duurMinuten = 60,
        //         voertuigId = "100",
        //         kenteken = "XX-1234",
        //         merk = "Red Bull",
        //         model = "Racing Car",
        //         brandstofType = "Petrol"
        //     };

        //     var tripJson = JsonConvert.SerializeObject(trip);
        //     var tripContent = new StringContent(tripJson, Encoding.UTF8, "application/json");

        //     // Arrange
        //     var response = await _client.PostAsync("/api/ritten", tripContent);

        //     // Assert
        //     Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        // }


    }
}