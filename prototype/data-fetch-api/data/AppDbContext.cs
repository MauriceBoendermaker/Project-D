using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Trip> Ritten => Set<Trip>();
    public DbSet<Vehicle> Voertuigen => Set<Vehicle>();
    public DbSet<Shipment> Zendingen => Set<Shipment>();
    public DbSet<Employee> Medewerkers => Set<Employee>();
    public DbSet<Customer> Klanten => Set<Customer>();
    public DbSet<Location> Locaties => Set<Location>();
}
