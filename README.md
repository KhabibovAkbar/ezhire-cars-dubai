# DriveHub - Car Rental Admin Dashboard

A modern, production-ready admin dashboard for a car rental business. This is a **frontend-only** demo showcasing beautiful UI/UX design.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=DriveHub+Dashboard)

## Features

- **8 Complete Pages**: Dashboard, Vehicles, Bookings, Customers, Revenue, Analytics, Reviews, Settings
- **Modern Design**: Dark theme with glassmorphism effects and smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Mock Data**: All data is hardcoded for easy demo purposes

## Tech Stack

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages Overview

### 1. Dashboard
Main overview with key metrics, revenue chart, recent bookings, fleet status, and top vehicles.

### 2. Vehicles
Grid view of all vehicles with filtering by category, status, and search. Includes vehicle cards with images, specs, and ratings.

### 3. Bookings
Table view of all reservations with status tabs (Active, Pending, Upcoming, Completed) and quick actions.

### 4. Customers
Customer cards showing profile info, booking history, total spent, and VIP status.

### 5. Revenue
Financial overview with revenue charts, category breakdown, and recent transactions.

### 6. Analytics
Business insights including booking trends, pickup times, vehicle utilization, and customer demographics.

### 7. Reviews
Customer feedback with star ratings, comments, and response options.

### 8. Settings
Profile, company info, notification preferences, and appearance settings.

## Project Structure

```
├── app/
│   ├── (dashboard)/
│   │   ├── analytics/
│   │   ├── bookings/
│   │   ├── customers/
│   │   ├── dashboard/
│   │   ├── revenue/
│   │   ├── reviews/
│   │   ├── settings/
│   │   └── vehicles/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── layout/
│   ├── ui/
│   └── vehicles/
├── lib/
│   ├── data.ts      # Mock data
│   └── utils.ts     # Utility functions
└── types/
    └── index.ts     # TypeScript types
```

## Customization

### Colors
Edit the color palette in `app/globals.css`:

```css
--color-accent: #613C98;      /* Primary accent */
--color-success: #22C55E;     /* Success states */
--color-warning: #F59E0B;     /* Warning states */
--color-danger: #EF4444;      /* Error states */
```

### Mock Data
All mock data is located in `lib/data.ts`. Modify vehicles, bookings, customers, and other data as needed.

## License

This project is for demonstration purposes. Feel free to use it as a starting point for your own projects.

---

Built with ❤️ by DriveHub Team
