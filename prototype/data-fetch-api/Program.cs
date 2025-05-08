using Services;
using Microsoft.EntityFrameworkCore;
using Models;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddConsole(options =>
{
    options.IncludeScopes = true;
    options.LogToStandardErrorThreshold = LogLevel.Information;
});

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
builder.Services.AddScoped<IJsonShipmentService, JsonShipmentService>();
builder.Services.AddScoped<ITripService, TripService>();
builder.Services.AddScoped<IVehicleService, VehicleService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmailService, EmailService>();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var converter = new JsonToDatabaseConverter(context);

    // --- Uncomment dit stukje als je JSON naar Database handmatig wilt importeren upon runtime ---
    // Console.WriteLine("Type 'import' om de JSON data te importeren in de database:");
    // var input = Console.ReadLine();

    // if (input?.ToLower() == "import")
    // {
    //     await converter.ImportVehiclesAndTripsAsync("data/brandstof_data.json");
    //     await converter.ImportShipmentsAsync("data/Zending_data.json");

    //     Console.WriteLine("Data geïmporteerd!");
    // }
}

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var logger = app.Services.GetRequiredService<ILogger<Program>>();

app.Urls.Add("http://localhost:3000");
app.MapControllers();
app.Run();

public partial class Program { }