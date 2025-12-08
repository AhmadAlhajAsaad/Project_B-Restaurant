# Restaurant Website — Functional & Non-Functional Requirements

## Table of Contents
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Technology Stack](#technology-stack)
- [Implementation Status](#implementation-status)

---

## Functional Requirements

### 1. User-Facing Functionality

#### FR-1.1 Restaurant Information Display
- **Description**: The system must display general restaurant information
- **Details**: Opening hours, location, and contact details must be easily accessible
- **Priority**: High
- **Status**: ✅ Implemented (Home page)

#### FR-1.2 Menu Display
- **Description**: Users must be able to view the restaurant menu
- **Details**: Display dish name, description, price, and category with filtering options
- **Priority**: High
- **Status**: ✅ Implemented (Menu page with category filtering)

#### FR-1.3 Reservation System
- **Description**: The system must allow users to make reservations
- **Required Fields**:
  - Customer Name
  - Email Address
  - Phone Number
  - Reservation Date
  - Reservation Time
  - Number of Guests
  - Special Requests (optional)
- **Priority**: High
- **Status**: ✅ Implemented (Reservations page with form validation)

#### FR-1.4 Reservation Confirmation
- **Description**: Users must receive immediate feedback after submitting a reservation
- **Details**: Display success or error messages clearly
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-1.5 Online Ordering
- **Description**: Users can place food orders for delivery
- **Features**:
  - Add items to cart
  - Adjust quantities
  - Enter delivery information
  - View order total
- **Priority**: Medium
- **Status**: ✅ Implemented (Order page)

---

### 2. Backend API Functionality

#### FR-2.1 Menu Items API
- **Endpoints**:
  - `GET /api/MenuItems` - Retrieve all menu items
  - `GET /api/MenuItems/{id}` - Retrieve specific menu item
  - `GET /api/MenuItems/category/{category}` - Retrieve items by category
  - `POST /api/MenuItems` - Create new menu item
  - `PUT /api/MenuItems/{id}` - Update menu item
  - `DELETE /api/MenuItems/{id}` - Delete menu item
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-2.2 Reservations API
- **Endpoints**:
  - `GET /api/Reservations` - Retrieve all reservations
  - `GET /api/Reservations/{id}` - Retrieve specific reservation
  - `POST /api/Reservations` - Create new reservation
  - `PUT /api/Reservations/{id}` - Update reservation
  - `PATCH /api/Reservations/{id}/status` - Update reservation status
  - `DELETE /api/Reservations/{id}` - Cancel reservation
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-2.3 Orders API
- **Endpoints**:
  - `GET /api/Orders` - Retrieve all orders
  - `GET /api/Orders/{id}` - Retrieve specific order
  - `POST /api/Orders` - Create new order
  - `PUT /api/Orders/{id}` - Update order
  - `PATCH /api/Orders/{id}/status` - Update order status
  - `DELETE /api/Orders/{id}` - Cancel order
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-2.4 Data Validation
- **Description**: All API endpoints must validate incoming data
- **Details**: Return appropriate HTTP status codes and error messages
- **Priority**: High
- **Status**: ✅ Implemented

---

### 3. Database Functionality

#### FR-3.1 Menu Items Storage
- **Table**: MenuItems
- **Fields**:
  - `Id` (Primary Key)
  - `Name` (Required)
  - `Description` (Required)
  - `Price` (Decimal, Required)
  - `Category` (Required)
  - `ImageUrl` (Optional)
  - `IsAvailable` (Boolean)
  - `CreatedAt` (DateTime)
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-3.2 Reservations Storage
- **Table**: Reservations
- **Fields**:
  - `Id` (Primary Key)
  - `CustomerName` (Required)
  - `CustomerEmail` (Required)
  - `CustomerPhone` (Required)
  - `ReservationDate` (DateTime, Required)
  - `ReservationTime` (TimeSpan, Required)
  - `NumberOfGuests` (Integer, Required)
  - `SpecialRequests` (Optional)
  - `Status` (Pending/Confirmed/Cancelled)
  - `CreatedAt` (DateTime)
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-3.3 Orders Storage
- **Tables**: Orders, OrderItems
- **Orders Fields**:
  - `Id` (Primary Key)
  - `CustomerName` (Required)
  - `CustomerEmail` (Required)
  - `CustomerPhone` (Required)
  - `DeliveryAddress` (Required)
  - `TotalAmount` (Decimal)
  - `Status` (New/Preparing/Ready/Delivered/Cancelled)
  - `CreatedAt` (DateTime)
- **OrderItems Fields**:
  - `Id` (Primary Key)
  - `OrderId` (Foreign Key)
  - `MenuItemId` (Integer)
  - `MenuItemName` (String)
  - `Price` (Decimal)
  - `Quantity` (Integer)
- **Priority**: High
- **Status**: ✅ Implemented

#### FR-3.4 Data Integrity
- **Description**: Database must enforce data constraints
- **Rules**:
  - Prevent negative prices
  - Validate email formats
  - Ensure required fields are not null
- **Priority**: High
- **Status**: ✅ Implemented (Entity Framework constraints)

---

## Non-Functional Requirements

### 1. Performance

#### NFR-1.1 Page Load Time
- **Requirement**: Main pages (Home, Menu) must load within 2 seconds
- **Target**: < 2 seconds on normal internet connection
- **Priority**: High
- **Status**: ⚠️ To be tested

#### NFR-1.2 API Response Time
- **Requirement**: API requests must respond within 500ms
- **Target**: < 500ms under normal load
- **Priority**: High
- **Status**: ⚠️ To be tested

#### NFR-1.3 Concurrent Users
- **Requirement**: Support at least 100 simultaneous users
- **Target**: No performance degradation with 100 concurrent users
- **Priority**: Medium
- **Status**: ⚠️ To be tested

---

### 2. Security

#### NFR-2.1 Authentication
- **Requirement**: Admin pages require authentication
- **Details**: No access without valid login credentials
- **Priority**: High
- **Status**: 🔄 Planned for Phase 2

#### NFR-2.2 Password Security
- **Requirement**: Passwords must be encrypted
- **Details**: Never store passwords in plain text
- **Priority**: High
- **Status**: 🔄 Planned for Phase 2

#### NFR-2.3 Input Validation
- **Requirement**: Prevent SQL injection and XSS attacks
- **Details**: Validate and sanitize all user input
- **Priority**: Critical
- **Status**: ✅ Implemented (Entity Framework parameterization)

#### NFR-2.4 CORS Configuration
- **Requirement**: Restrict API access to approved domains
- **Details**: CORS rules must specify allowed origins
- **Priority**: High
- **Status**: ✅ Implemented (localhost for development)

---

### 3. Usability

#### NFR-3.1 Responsive Design
- **Requirement**: Mobile-friendly on all screen sizes
- **Details**: Responsive layout using CSS Grid/Flexbox
- **Priority**: High
- **Status**: ✅ Implemented

#### NFR-3.2 Navigation
- **Requirement**: Clear and simple navigation
- **Details**: Consistent layout and typography throughout
- **Priority**: High
- **Status**: ✅ Implemented

#### NFR-3.3 Error Messages
- **Requirement**: Meaningful error messages for invalid input
- **Details**: User-friendly feedback for all form validations
- **Priority**: High
- **Status**: ✅ Implemented

---

### 4. Reliability

#### NFR-4.1 Error Handling
- **Requirement**: System continues functioning with invalid user input
- **Details**: Graceful error handling without crashes
- **Priority**: High
- **Status**: ✅ Implemented

#### NFR-4.2 Peak Load Performance
- **Requirement**: Remain usable during peak hours
- **Details**: Handle dinner time traffic efficiently
- **Priority**: Medium
- **Status**: ⚠️ To be tested

#### NFR-4.3 Database Reconnection
- **Requirement**: Auto-reconnect if database connection is lost
- **Details**: Implement connection retry logic
- **Priority**: Medium
- **Status**: ✅ Implemented (Entity Framework built-in)

---

### 5. Scalability

#### NFR-5.1 Cloud Deployment
- **Requirement**: Architecture supports cloud hosting
- **Details**: Stateless design, externalized configuration
- **Priority**: Medium
- **Status**: ✅ Implemented (ready for Azure/AWS)

#### NFR-5.2 Feature Extension
- **Requirement**: Easy to add new features
- **Examples**: Online payments, loyalty program, mobile app
- **Priority**: Medium
- **Status**: ✅ Implemented (modular architecture)

#### NFR-5.3 Database Scalability
- **Requirement**: Database design supports future growth
- **Details**: Normalized schema, extensible without breaking changes
- **Priority**: Medium
- **Status**: ✅ Implemented

---

### 6. Maintainability

#### NFR-6.1 Backend Architecture
- **Requirement**: Follow clean architecture principles
- **Details**: Separation of controllers, services, and models
- **Priority**: High
- **Status**: ✅ Implemented
  - Controllers: API endpoints
  - Models: Data entities
  - Data: DbContext and repositories
  - Services: Business logic (to be added)

#### NFR-6.2 Frontend Best Practices
- **Requirement**: Follow React and TypeScript best practices
- **Details**: Component reusability, proper typing, state management
- **Priority**: High
- **Status**: ✅ Implemented
  - TypeScript interfaces
  - Reusable components
  - Service layer for API calls

#### NFR-6.3 Code Quality
- **Requirement**: Readable, commented, well-structured code
- **Details**: Consistent naming conventions, clear documentation
- **Priority**: High
- **Status**: ✅ Implemented

---

### 7. Compatibility

#### NFR-7.1 Browser Support
- **Requirement**: Function in all major browsers
- **Supported Browsers**:
  - ✅ Chrome (latest)
  - ✅ Firefox (latest)
  - ✅ Safari (latest)
  - ✅ Edge (latest)
- **Priority**: High
- **Status**: ⚠️ To be tested

#### NFR-7.2 Backend Compatibility
- **Requirement**: Run on .NET 8 or newer
- **Current**: .NET 10
- **Priority**: High
- **Status**: ✅ Implemented

#### NFR-7.3 Frontend Compatibility
- **Requirement**: Modern React and TypeScript versions
- **Current**: React 18, TypeScript 4.9
- **Priority**: High
- **Status**: ✅ Implemented

---

## Technology Stack

### Backend
- **Framework**: ASP.NET Core 10.0
- **Language**: C# 10
- **ORM**: Entity Framework Core 10.0
- **Database**: SQLite (development), SQL Server (production-ready)
- **API Style**: RESTful

### Frontend
- **Library**: React 18.2
- **Language**: TypeScript 4.9
- **Routing**: React Router 6
- **HTTP Client**: Axios 1.6
- **Styling**: CSS3 (custom)

### Development Tools
- **.NET SDK**: 10.0
- **Node.js**: 16+
- **Package Manager**: npm
- **Version Control**: Git

---

## Implementation Status

### ✅ Completed (Phase 1)
1. Backend REST API with all CRUD operations
2. Database schema with migrations
3. Frontend React application with routing
4. Menu display with category filtering
5. Reservation system with form validation
6. Online ordering with shopping cart
7. API service layer
8. TypeScript type definitions
9. Responsive design
10. CORS configuration
11. Documentation (README, API docs, database schema)

### 🔄 Planned (Phase 2)
1. Admin authentication system
2. Admin dashboard for managing menu and orders
3. User authentication
4. Payment integration
5. Email notifications
6. Order tracking
7. Reviews and ratings system
8. Image upload for menu items
9. Performance testing and optimization
10. Comprehensive unit and integration tests

### ⚠️ To Be Tested
1. Cross-browser compatibility
2. Performance under load
3. Mobile device testing
4. Security penetration testing
5. Accessibility compliance (WCAG)

---

## Quality Metrics

| Category | Target | Current Status |
|----------|--------|----------------|
| Code Coverage | > 80% | 🔄 Tests to be added |
| API Response Time | < 500ms | ⚠️ To be measured |
| Page Load Time | < 2s | ⚠️ To be measured |
| Browser Support | 4 major browsers | ⚠️ To be tested |
| Mobile Responsive | 100% | ✅ Implemented |
| Documentation | Complete | ✅ Completed |

---

**Document Version**: 1.0  
**Last Updated**: December 8, 2025  
**Status**: Phase 1 Complete