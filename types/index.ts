export interface Vehicle {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  status: "available" | "rented" | "maintenance";
  seats: number;
  transmission: "Automatic" | "Manual";
  rating: number;
  reviews: number;
  year: number;
}

export interface Booking {
  id: string;
  customer: string;
  customerAvatar: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  total: number;
  status: "active" | "pending" | "completed" | "upcoming" | "cancelled";
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalBookings: number;
  totalSpent: number;
  rating: number;
  isVIP: boolean;
  joinedDate: string;
}

export interface Review {
  id: number;
  customer: string;
  avatar: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface FleetStatus {
  name: string;
  value: number;
  color: string;
}

export interface CategoryRevenue {
  name: string;
  value: number;
  amount: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}
