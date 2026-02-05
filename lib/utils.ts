import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-AE").format(num);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: "text-success bg-success/10 border-success/20",
    active: "text-success bg-success/10 border-success/20",
    rented: "text-accent bg-accent/10 border-accent/20",
    pending: "text-warning bg-warning/10 border-warning/20",
    maintenance: "text-warning bg-warning/10 border-warning/20",
    completed: "text-info bg-info/10 border-info/20",
    upcoming: "text-info bg-info/10 border-info/20",
    cancelled: "text-danger bg-danger/10 border-danger/20",
  };
  return colors[status] || "text-text-secondary bg-bg-tertiary border-border";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
