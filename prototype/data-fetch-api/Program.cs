using Services;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy => policy.WithOrigins("http://localhost:5000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=DashboardData.db"));

builder.Services.AddControllers();
builder.Services.AddScoped<IFuelService, JsonFuelService>();
builder.Services.AddScoped<IJsonShipmentService, XMLShipmentService>();
builder.Services.AddScoped<ITripService, TripService>();
builder.Services.AddScoped<IVehicleService, VehicleService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var converter = new JsonToDatabaseConverter(context);

    Console.WriteLine("Type 'import' om de JSON data te importeren in de database:");
    var input = Console.ReadLine();

    if (input?.ToLower() == "import")
    {
        await converter.ImportVehiclesAndTripsAsync("data/brandstof_data.json");
        await converter.ImportShipmentsAsync("data/Zending_data.json");

        Console.WriteLine("Data geïmporteerd!");
    }
}

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Urls.Add("http://localhost:3000");
app.MapControllers();
app.Run();
