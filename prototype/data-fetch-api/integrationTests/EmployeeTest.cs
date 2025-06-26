using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using integrationTests;
using System.Text;
using System.Text.Json;

namespace integrationTests
{
    public class EmployeeTest : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly HttpClient _client;

        public EmployeeTest(CustomWebApplicationFactory factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetEmployee_ReturnsOk()
        {
            // Arrange
            var EmpId = 5;
            var url = $"/api/medewerkers/{EmpId}";

            // Act
            var response = await _client.GetAsync(url);
            var body = await response.Content.ReadAsStringAsync();
            Console.WriteLine(body);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetEmployee_ReturnsNotFound()
        {
            // Arrange
            var EmpId = 999;
            var url = $"/api/medewerkers/{EmpId}";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("niet gevonden", body);
        }

        [Fact]
        public async Task GetAllEmployees_ReturnsOk()
        {
            // Arrange
            var url = $"/api/medewerkers";

            // Act
            var response = await _client.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
            Assert.Contains("data", body);
        }

        [Fact]
        public async Task AddEmployee_Invalid()
        {
            // Arrange
            var url = $"/api/medewerkers/toevoegen";
            var newEmployee = new
            {
                
                Name = "Test Person",
                Type = "planner",
                Email = "john.doe@example.com",
                Available = 1
            };
            var json = JsonSerializer.Serialize(newEmployee);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync(url, content);

            // Assert
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            var body = await response.Content.ReadAsStringAsync();
        }
    }
}
