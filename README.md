# Restaurant Website

A full-stack restaurant website built with C# ASP.NET Core Web API, React, TypeScript, and SQL Server.

## Features

- **Menu Management**: Browse menu items by category
- **Online Ordering**: Add items to cart and place orders
- **Reservations**: Book tables online
- **RESTful API**: Complete CRUD operations for all entities

## Technology Stack

### Backend
- C# / ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- RESTful API with Swagger documentation

### Frontend
- React 18
- TypeScript
- React Router for navigation
- Axios for API calls
- CSS3 for styling

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v16 or higher)
- [SQL Server](https://www.microsoft.com/sql-server) (Express or higher)
- Visual Studio 2022 or VS Code

## Setup Instructions

### Backend Setup

1. Navigate to the Backend directory:
   ```powershell
   cd Backend\RestaurantAPI
   ```

2. Update the connection string in `appsettings.json` if needed:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=RestaurantDB;Trusted_Connection=True;TrustServerCertificate=True;"
   }
   ```

3. Install Entity Framework tools (if not already installed):
   ```powershell
   dotnet tool install --global dotnet-ef
   ```

4. Create the database and run migrations:
   ```powershell
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. Run the backend API:
   ```powershell
   dotnet run
   ```

   The API will be available at `https://localhost:7001` (or similar, check console output)
   Swagger documentation: `https://localhost:7001/swagger`

## Verifying the API

To verify your API is working:

- Visit http://localhost:5000/swagger to see the Swagger UI (if enabled).
- Or, try accessing a specific controller endpoint, such as http://localhost:5000/api/MenuItems (replace with your actual route).

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Update the API base URL in `src/services/api.ts` if your backend is running on a different port:
   ```typescript
   const API_BASE_URL = 'https://localhost:7001/api';
   ```

4. Start the development server:
   ```powershell
   npm start
   ```

   The app will open in your browser at `http://localhost:3000`

## API Endpoints

### Menu Items
- `GET /api/MenuItems` - Get all menu items
- `GET /api/MenuItems/{id}` - Get specific menu item
- `GET /api/MenuItems/category/{category}` - Get items by category
- `POST /api/MenuItems` - Create new menu item
- `PUT /api/MenuItems/{id}` - Update menu item
- `DELETE /api/MenuItems/{id}` - Delete menu item

### Reservations
- `GET /api/Reservations` - Get all reservations
- `GET /api/Reservations/{id}` - Get specific reservation
- `POST /api/Reservations` - Create new reservation
- `PUT /api/Reservations/{id}` - Update reservation
- `PATCH /api/Reservations/{id}/status` - Update reservation status
- `DELETE /api/Reservations/{id}` - Delete reservation

### Orders
- `GET /api/Orders` - Get all orders
- `GET /api/Orders/{id}` - Get specific order
- `POST /api/Orders` - Create new order
- `PUT /api/Orders/{id}` - Update order
- `PATCH /api/Orders/{id}/status` - Update order status
- `DELETE /api/Orders/{id}` - Delete order

## Database Schema

### MenuItems
- Id (int, PK)
- Name (string)
- Description (string)
- Price (decimal)
- Category (string)
- ImageUrl (string, nullable)
- IsAvailable (bool)
- CreatedAt (DateTime)

### Reservations
- Id (int, PK)
- CustomerName (string)
- CustomerEmail (string)
- CustomerPhone (string)
- ReservationDate (DateTime)
- ReservationTime (TimeSpan)
- NumberOfGuests (int)
- SpecialRequests (string, nullable)
- Status (string)
- CreatedAt (DateTime)

### Orders
- Id (int, PK)
- CustomerName (string)
- CustomerEmail (string)
- CustomerPhone (string)
- DeliveryAddress (string)
- TotalAmount (decimal)
- Status (string)
- CreatedAt (DateTime)
- OrderItems (List<OrderItem>)

### OrderItems
- Id (int, PK)
- OrderId (int, FK)
- MenuItemId (int)
- MenuItemName (string)
- Price (decimal)
- Quantity (int)

## Development

### Adding New Features

1. **Backend**: Add controllers in `Controllers/`, models in `Models/`, and update `RestaurantDbContext.cs`
2. **Frontend**: Add pages in `pages/`, services in `services/`, and update routing in `App.tsx`

### Running Migrations

After changing models:
```powershell
cd Backend\RestaurantAPI
dotnet ef migrations add YourMigrationName
dotnet ef database update
```

## Troubleshooting

### CORS Issues
- Ensure the backend CORS policy includes your frontend URL
- Check `Program.cs` for CORS configuration

### Database Connection Issues
- Verify SQL Server is running
- Check connection string in `appsettings.json`
- Ensure database has been created with `dotnet ef database update`

### Port Conflicts
- Backend: Change port in `Properties/launchSettings.json`
- Frontend: Set PORT environment variable or change in package.json

## Future Enhancements

- User authentication and authorization
- Admin dashboard for managing menu and orders
- Payment integration
- Email notifications
- Image upload for menu items
- Reviews and ratings
- Order tracking
- Mobile responsive design improvements

## License

This project is for educational purposes.
