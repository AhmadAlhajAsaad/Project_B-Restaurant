# System Architecture — Restaurant Website

## Overview

The restaurant website follows a **client–server architecture** with a separated frontend and backend.
The frontend is responsible for user interaction, while the backend handles business logic and data storage.

## Architecture Diagram (Text-based)

+------------------------+
|   User (Web Browser)  |
|  React + TypeScript   |
+-----------+------------+
            |
            | HTTPS (REST API)
            v
+-----------+------------+
|  ASP.NET Core Web API |
|        (C#)          |
|----------------------|
| Controllers          |
| Services / Business  |
| Logic                |
| Entity Framework     |
| Core (ORM)           |
+-----------+------------+
            |
            | EF Core
            v
+-----------+------------+
|     SQL Server        |
|  (RestaurantDb)      |
|----------------------|
| Tables:              |
| - Dishes             |
| - Reservations       |
| - Users (Admin)      |
+----------------------+

## Component Responsibilities

### Frontend (React + TypeScript)
- Displays restaurant information and menu
- Provides reservation form
- Sends HTTP requests to backend API
- Handles form validation and UI feedback

### Backend (ASP.NET Core Web API)
- Exposes REST API endpoints
- Validates incoming requests
- Implements business logic
- Handles authentication and authorization
- Communicates with the database using Entity Framework Core

### Database (SQL Server)
- Stores menu items
- Stores reservations
- Stores admin user credentials
- Ensures data consistency and integrity

## Communication Flow

1. User opens the website in a browser.
2. React frontend loads and requests data from the API.
3. API processes the request and queries the database.
4. Database returns data to the API.
5. API returns JSON responses to the frontend.
6. Frontend updates the UI accordingly.