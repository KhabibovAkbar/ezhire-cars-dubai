"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { topVehicles } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const medals = ["🥇", "🥈", "🥉"];

export function TopVehicles() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            <CardTitle className="text-lg">Top Vehicles</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topVehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-center gap-4 p-3 rounded-lg bg-bg-tertiary/50 hover:bg-bg-tertiary transition-colors"
              >
                <span className="text-2xl">{medals[index]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {vehicle.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {vehicle.bookings} bookings
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">
                    {formatCurrency(vehicle.revenue)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
