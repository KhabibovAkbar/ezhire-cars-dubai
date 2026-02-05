"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  iconColor?: "green" | "blue" | "purple" | "yellow" | "red";
  delay?: number;
}

const iconColors = {
  green: "bg-success/10 text-success",
  blue: "bg-info/10 text-info",
  purple: "bg-accent/10 text-accent",
  yellow: "bg-warning/10 text-warning",
  red: "bg-danger/10 text-danger",
};

export function StatCard({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  iconColor = "purple",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl border border-border bg-bg-secondary/80 backdrop-blur-xl p-6 shadow-lg"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-text-primary tracking-tight">
            {value}
          </p>
          {change && (
            <div className="flex items-center gap-1">
              {trend === "up" && (
                <TrendingUp className="h-4 w-4 text-success" />
              )}
              {trend === "down" && (
                <TrendingDown className="h-4 w-4 text-danger" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-danger",
                  trend === "neutral" && "text-text-secondary"
                )}
              >
                {change}
              </span>
              <span className="text-sm text-text-muted">vs last month</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl",
            iconColors[iconColor]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
