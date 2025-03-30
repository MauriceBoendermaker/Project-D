using Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddScoped<IFuelService, JsonFuelService>();

var app = builder.Build();

app.Urls.Add("http://localhost:3000");
app.MapControllers();
app.Run();
