using Xunit;

namespace integrationTests
{
    public class FuelTest
    {
        private readonly HttpClient _client;

        public FuelTest(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetVehicles_ReturnsOk()
        {
            var url = "/api/brandstof/voertuigen";

            var response = await _client.GetAsync(url);

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var responseBody = await response.Content.ReadAsStringAsync();
            Assert.False(string.IsNullOrWhiteSpace(responseBody));
        }
    }
}