"use client";

import { cn } from "@/lib/utils";
import { Check, Clock, AlertCircle, Calendar, X } from "lucide-react";

type Status = "available" | "active" | "rented" | "pending" | "maintenance" | "completed" | "upcoming" | "cancelled";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }> = {
  available: {
    label: "Available",
    icon: Check,
    className: "text-success bg-success/10 border-success/20",
  },
  active: {
    label: "Active",
    icon: Check,
    className: "text-success bg-success/10 border-success/20",
  },
  rented: {
    label: "Rented",
    icon: Clock,
    className: "text-accent bg-accent/10 border-accent/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-warning bg-warning/10 border-warning/20",
  },
  maintenance: {
    label: "Maintenance",
    icon: AlertCircle,
    className: "text-warning bg-warning/10 border-warning/20",
  },
  completed: {
    label: "Completed",
    icon: Check,
    className: "text-info bg-info/10 border-info/20",
  },
  upcoming: {
    label: "Upcoming",
    icon: Calendar,
    className: "text-info bg-info/10 border-info/20",
  },
  cancelled: {
    label: "Cancelled",
    icon: X,
    className: "text-danger bg-danger/10 border-danger/20",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
