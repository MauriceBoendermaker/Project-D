// using System.Net;
// using System.Threading.Tasks;
// using Xunit;
// using Microsoft.AspNetCore.Mvc.Testing;

// namespace integrationTests
// {
//     public class ShipmentTest : IClassFixture<WebApplicationFactory<Program>>
//     {
//         private readonly HttpClient _client;

//         public ShipmentTest(WebApplicationFactory<Program> factory)
//         {
//             _client = factory.CreateClient();
//         }

//         [Fact]
//         public async Task GetShipments_ReturnsOk()
//         {
//             // Arrange
//             var url = "/api/zending";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         }

//         [Fact]
//         public async Task GetMaxCapacity_ReturnsOk()
//         {
//             // Arrange
//             var shipmentId = 1;
//             var url = $"/api/zending/maxcapaciteit?shipmentId={shipmentId}";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         }

//         [Fact]
//         public async Task GetMaxCapacity_ReturnsNotFound() {
//             // Arrange
//             var shipmentId = 0;
//             var url = $"/api/zending/maxcapaciteit?shipmentId={shipmentId}";
            
//             // Act
//             var response =  await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
//         }

//         [Fact]
//         public async Task GetLoadDegree_ReturnsOk()
//         {
//             // Arrange
//             var shipmentId = 1;
//             var url = $"/api/zending/beladingsgraad?shipmentId={shipmentId}";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         }

//         [Fact]
//         public async Task GetLoadDegree_ReturnsNotFound()
//         {
//             // Arrange
//             var shipmentId = 0;
//             var url = $"/api/zending/beladingsgraad?shipmentId={shipmentId}";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
//         }

//         [Fact]
//         public async Task GetTotalLoadDegree_ReturnsOk()
//         {
//             // Arrange
//             var shipmentId = 1;
//             var url = $"/api/zending/beladingsgraad/totaal";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         }

//         [Fact]
//         public async Task GetAverageLoadDegree_ReturnsOk()
//         {
//             // Arrange
//             var shipmentId = 1;
//             var url = $"/api/zending/beladingsgraad/gemiddeld";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         }

//                 [Fact]
//         public async Task GetUnusedKilometers_ReturnsOk()
//         {
//             // Arrange
//             var shipmentId = 1;
//             var url = $"/api/zending/onbenutte-kilometers";

//             // Act
//             var response = await _client.GetAsync(url);

//             // Assert
//             Assert.Equal(HttpStatusCode.OK, response.StatusCode);
//         }
//     }
// }