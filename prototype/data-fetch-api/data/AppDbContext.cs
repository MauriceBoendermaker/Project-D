using Microsoft.EntityFrameworkCore;
using Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Zending> Zendingen => Set<Zending>();
    public DbSet<Vehicle> Voertuigen => Set<Vehicle>();

    public DbSet<Rit> Ritten => Set<Rit>();
}