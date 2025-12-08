using Microsoft.EntityFrameworkCore;
using RestaurantAPI.Models;

namespace RestaurantAPI.Data;

public class RestaurantDbContext : DbContext
{
    public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options)
        : base(options)
    {
    }

    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MenuItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CustomerName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CustomerEmail).IsRequired().HasMaxLength(200);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");
            entity.HasMany(e => e.OrderItems)
                  .WithOne(e => e.Order)
                  .HasForeignKey(e => e.OrderId);
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
        });

        // Seed data
        modelBuilder.Entity<MenuItem>().HasData(
            new MenuItem { Id = 1, Name = "Margherita Pizza", Description = "Classic pizza with tomato sauce, mozzarella, and basil", Price = 12.99m, Category = "Pizza", IsAvailable = true, CreatedAt = new DateTime(2024, 1, 1) },
            new MenuItem { Id = 2, Name = "Pepperoni Pizza", Description = "Pizza with pepperoni and cheese", Price = 14.99m, Category = "Pizza", IsAvailable = true, CreatedAt = new DateTime(2024, 1, 1) },
            new MenuItem { Id = 3, Name = "Caesar Salad", Description = "Fresh romaine lettuce with Caesar dressing", Price = 9.99m, Category = "Salad", IsAvailable = true, CreatedAt = new DateTime(2024, 1, 1) },
            new MenuItem { Id = 4, Name = "Spaghetti Carbonara", Description = "Creamy pasta with bacon and parmesan", Price = 15.99m, Category = "Pasta", IsAvailable = true, CreatedAt = new DateTime(2024, 1, 1) },
            new MenuItem { Id = 5, Name = "Tiramisu", Description = "Classic Italian dessert with coffee and mascarpone", Price = 7.99m, Category = "Dessert", IsAvailable = true, CreatedAt = new DateTime(2024, 1, 1) }
        );
    }
}
