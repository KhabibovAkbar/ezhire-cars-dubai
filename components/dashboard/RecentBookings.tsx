"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { bookings } from "@/lib/data";
import { formatCurrency, getInitials } from "@/lib/utils";

export function RecentBookings() {
  const recentBookings = bookings.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
          <Link href="/bookings">
            <Button variant="ghost" size="sm" className="gap-1 text-accent">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase tracking-wider hidden sm:table-cell">
                    Dates
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.customerAvatar} />
                          <AvatarFallback>
                            {getInitials(booking.customer)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-text-primary truncate max-w-[120px]">
                          {booking.customer}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm text-text-secondary truncate max-w-[150px] block">
                        {booking.vehicle}
                      </span>
                    </td>
                    <td className="py-3 px-2 hidden sm:table-cell">
                      <span className="text-sm text-text-secondary">
                        {booking.startDate} - {booking.endDate}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-sm font-medium text-text-primary">
                        {formatCurrency(booking.total)}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <StatusBadge status={booking.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
