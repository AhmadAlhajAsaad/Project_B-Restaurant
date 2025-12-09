# Frontend

React + TypeScript application for the restaurant website.

## Quick Start

1. Install dependencies: `npm install`
2. Update API URL in `src/services/api.ts` if needed
3. Start development server: `npm start`
4. Open http://localhost:3000

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Menu.tsx
│   ├── Reservations.tsx
│   └── Order.tsx
├── services/           # API service layer
│   ├── api.ts
│   ├── menuService.ts
│   ├── reservationService.ts
│   └── orderService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component with routing
├── index.tsx           # Application entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Configuration

### API Base URL
Update in `src/services/api.ts`:
```typescript
const API_BASE_URL = 'https://localhost:7001/api';
```

## Features

### Home Page
- Welcome section
- Feature highlights
- Navigation to other pages

### Menu Page
- Display all menu items
- Filter by category
- View prices and descriptions

### Reservations Page
- Form to book a table
- Date/time selection
- Guest count selection

### Order Page
- Browse menu items
- Add to cart
- Adjust quantities
- Enter delivery information
- Place order

## Styling

The application uses vanilla CSS with a modern, clean design:
- Responsive grid layouts
- Card-based components
- Smooth transitions and hover effects
- Professional color scheme

## Making Changes

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in navbar

### Adding API Calls
1. Define types in `src/types/index.ts`
2. Create service in `src/services/`
3. Use service in page components

## Troubleshooting

### CORS Errors
- Ensure backend is running
- Check CORS configuration in backend `Program.cs`
- Verify API URL in `services/api.ts`

### Build Errors
- Clear node_modules: `rm -rf node_modules; npm install`
- Clear cache: `npm cache clean --force`
