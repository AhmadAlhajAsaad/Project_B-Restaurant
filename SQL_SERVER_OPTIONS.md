# SQL Server Installation Guide

## You don't have SQL Server installed. Here are your options:

### Option 1: Install SQL Server Express (Recommended)

1. Download SQL Server Express from:
   https://www.microsoft.com/en-us/sql-server/sql-server-downloads

2. Click "Download now" under "Express"

3. Run the installer and choose "Basic" installation

4. After installation, the connection string will be:
   ```
   Server=localhost\\SQLEXPRESS;Database=RestaurantDB;Trusted_Connection=True;TrustServerCertificate=True;
   ```

5. Update the connection string in `Backend\RestaurantAPI\appsettings.json`

6. Then run:
   ```powershell
   dotnet ef database update
   dotnet run
   ```

### Option 2: Use PostgreSQL (You already have this!)

Since you have PostgreSQL installed, we can switch the project to use it:

1. I can modify the project to use PostgreSQL instead
2. This requires changing the NuGet packages and connection string
3. Would you like me to do this?

### Option 3: Use SQLite (Simplest for development)

Use SQLite which requires no server installation:
1. I can switch the project to SQLite
2. Database will be a single file
3. Perfect for development and testing

## Which option would you prefer?

Type your choice:
- "sql" - Install SQL Server Express (I'll wait while you install)
- "postgres" - Switch to PostgreSQL (I'll modify the code)
- "sqlite" - Switch to SQLite (I'll modify the code)
