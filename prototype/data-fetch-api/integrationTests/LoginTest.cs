using System.Net;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Text;
using System.Text.Json;



namespace integrationTests;

public class LoginTest : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public LoginTest(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }


    [Fact]
    public async Task Login_Successfull()
    {
        // Arange
        var url = "/api/login";

        var LoginRequest = new
        {
            username = "username",
            password = "password"
        };

        var json = JsonSerializer.Serialize(LoginRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Act
        var response = await _client.PostAsync(url, content);

        // Assert
        Assert.Equal(HttpStatusCode.Ok, response.StatusCode);

        var responseBody = await response.Content.ReadAsStringAsync();
        Assert.Contains("token", responseBody);
    }

    public async Task Login_Unauthorized()
    {
        // Arrange
        var url = "/api/login";

        var LoginRequest = new
        {
            username = "wrong",
            password = "credentials"
        };

        var json = JsonSerializer.Serialize(LoginRequest);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Act
        var response = await _client.PostAsync(url, content);

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}