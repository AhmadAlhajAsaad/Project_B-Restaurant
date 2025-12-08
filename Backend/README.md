# Backend API

ASP.NET Core Web API for the restaurant website.

## Quick Start

1. Update connection string in `appsettings.json`
2. Run migrations: `dotnet ef database update`
3. Start the API: `dotnet run`
4. Visit Swagger UI: `https://localhost:7001/swagger`

## Project Structure

```
RestaurantAPI/
├── Controllers/         # API endpoints
│   ├── MenuItemsController.cs
│   ├── ReservationsController.cs
│   └── OrdersController.cs
├── Models/             # Data models
│   ├── MenuItem.cs
│   ├── Reservation.cs
│   └── Order.cs
├── Data/               # Database context
│   └── RestaurantDbContext.cs
├── Program.cs          # Application entry point
└── appsettings.json    # Configuration
```

## Database Setup

### Initial Migration
```powershell
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Update After Model Changes
```powershell
dotnet ef migrations add YourMigrationName
dotnet ef database update
```

## Testing the API

Use Swagger UI at `https://localhost:7001/swagger` or tools like Postman.

### Example: Create Menu Item
```http
POST /api/MenuItems
Content-Type: application/json

{
  "name": "Lasagna",
  "description": "Classic Italian lasagna",
  "price": 16.99,
  "category": "Pasta",
  "isAvailable": true
}
```

## Configuration

### Connection String
Update in `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=RestaurantDB;..."
}
```

### CORS
Currently configured to allow:
- http://localhost:3000 (React default)
- http://localhost:5173 (Vite default)

Modify in `Program.cs` if using different ports.
