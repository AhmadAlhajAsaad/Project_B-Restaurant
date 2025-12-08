# Database Documentation

## Overview

The Restaurant database uses SQL Server and Entity Framework Core for data management.

## Connection String

Default connection string (update in `appsettings.json`):
```
Server=localhost;Database=RestaurantDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true
```

## Schema

### Tables

#### MenuItems
Stores restaurant menu items.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | int | PK, Identity | Primary key |
| Name | nvarchar(200) | NOT NULL | Item name |
| Description | nvarchar(max) | NOT NULL | Item description |
| Price | decimal(18,2) | NOT NULL | Item price |
| Category | nvarchar(max) | NOT NULL | Category (Pizza, Pasta, etc.) |
| ImageUrl | nvarchar(max) | NULL | Optional image URL |
| IsAvailable | bit | NOT NULL, Default: 1 | Availability status |
| CreatedAt | datetime2 | NOT NULL | Creation timestamp |

#### Reservations
Stores table reservations.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | int | PK, Identity | Primary key |
| CustomerName | nvarchar(200) | NOT NULL | Customer name |
| CustomerEmail | nvarchar(200) | NOT NULL | Customer email |
| CustomerPhone | nvarchar(max) | NOT NULL | Customer phone |
| ReservationDate | datetime2 | NOT NULL | Reservation date |
| ReservationTime | time | NOT NULL | Reservation time |
| NumberOfGuests | int | NOT NULL | Number of guests |
| SpecialRequests | nvarchar(max) | NULL | Special requests |
| Status | nvarchar(max) | NOT NULL | Status (Pending/Confirmed/Cancelled) |
| CreatedAt | datetime2 | NOT NULL | Creation timestamp |

#### Orders
Stores customer orders.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | int | PK, Identity | Primary key |
| CustomerName | nvarchar(max) | NOT NULL | Customer name |
| CustomerEmail | nvarchar(max) | NOT NULL | Customer email |
| CustomerPhone | nvarchar(max) | NOT NULL | Customer phone |
| DeliveryAddress | nvarchar(max) | NOT NULL | Delivery address |
| TotalAmount | decimal(18,2) | NOT NULL | Order total |
| Status | nvarchar(max) | NOT NULL | Status (New/Preparing/Ready/Delivered/Cancelled) |
| CreatedAt | datetime2 | NOT NULL | Creation timestamp |

#### OrderItems
Stores individual items in orders.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| Id | int | PK, Identity | Primary key |
| OrderId | int | FK → Orders(Id) | Foreign key to Orders |
| MenuItemId | int | NOT NULL | Reference to menu item |
| MenuItemName | nvarchar(max) | NOT NULL | Item name snapshot |
| Price | decimal(18,2) | NOT NULL | Price snapshot |
| Quantity | int | NOT NULL | Quantity ordered |

### Relationships

- **Orders → OrderItems**: One-to-Many (cascade delete)

## Seed Data

Initial menu items are seeded:
1. Margherita Pizza - $12.99
2. Pepperoni Pizza - $14.99
3. Caesar Salad - $9.99
4. Spaghetti Carbonara - $15.99
5. Tiramisu - $7.99

## Common Queries

### Get Available Menu Items by Category
```sql
SELECT * FROM MenuItems 
WHERE Category = 'Pizza' AND IsAvailable = 1
ORDER BY Name;
```

### Get Pending Reservations
```sql
SELECT * FROM Reservations 
WHERE Status = 'Pending' 
ORDER BY ReservationDate, ReservationTime;
```

### Get Order Details with Items
```sql
SELECT o.*, oi.* 
FROM Orders o
INNER JOIN OrderItems oi ON o.Id = oi.OrderId
WHERE o.Id = 1;
```

### Get Today's Reservations
```sql
SELECT * FROM Reservations
WHERE CAST(ReservationDate AS DATE) = CAST(GETDATE() AS DATE)
ORDER BY ReservationTime;
```

## Maintenance

### Backup Database
```sql
BACKUP DATABASE RestaurantDB 
TO DISK = 'C:\Backup\RestaurantDB.bak';
```

### View Table Sizes
```sql
SELECT 
    t.NAME AS TableName,
    p.rows AS RowCounts
FROM sys.tables t
INNER JOIN sys.partitions p ON t.object_id = p.OBJECT_ID
WHERE t.is_ms_shipped = 0 AND p.index_id IN (0,1)
ORDER BY p.rows DESC;
```

## Migration Commands

### Create New Migration
```powershell
dotnet ef migrations add MigrationName
```

### Apply Migrations
```powershell
dotnet ef database update
```

### Rollback Migration
```powershell
dotnet ef database update PreviousMigrationName
```

### Remove Last Migration (if not applied)
```powershell
dotnet ef migrations remove
```

## Indexes

Consider adding indexes for better performance:

```sql
-- Index on Category for faster filtering
CREATE INDEX IX_MenuItems_Category ON MenuItems(Category);

-- Index on ReservationDate for faster date queries
CREATE INDEX IX_Reservations_Date ON Reservations(ReservationDate);

-- Index on Order Status
CREATE INDEX IX_Orders_Status ON Orders(Status);
```
