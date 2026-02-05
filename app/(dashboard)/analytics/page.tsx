"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingTrends, pickupTimes, vehicleUtilization } from "@/lib/data";

const COLORS = ["#FF4500", "#3B82F6", "#22C55E", "#F59E0B"];

const customerData = [
  { name: "New", value: 65, color: "#FF4500" },
  { name: "Returning", value: 35, color: "#22C55E" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-secondary border border-border rounded-lg p-3 shadow-xl">
        <p className="text-sm text-text-secondary">{label || payload[0].name}</p>
        <p className="text-lg font-bold text-text-primary">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Analytics"
          subtitle="Insights and trends"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary">
                Business Analytics
              </h2>
              <p className="text-text-secondary">
                Track trends and make data-driven decisions
              </p>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Booking Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Bookings by Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={bookingTrends}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272A"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717A", fontSize: 12 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717A", fontSize: 12 }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="bookings"
                            stroke="#FF4500"
                            strokeWidth={3}
                            dot={{ fill: "#FF4500", strokeWidth: 0, r: 4 }}
                            activeDot={{ r: 6, fill: "#FF4500" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Popular Pickup Times */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Popular Pickup Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pickupTimes} layout="vertical">
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272A"
                            horizontal={false}
                          />
                          <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717A", fontSize: 12 }}
                          />
                          <YAxis
                            type="category"
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717A", fontSize: 12 }}
                            width={80}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="count"
                            fill="#FF4500"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Vehicle Utilization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Vehicle Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {vehicleUtilization.map((vehicle, index) => (
                        <div key={vehicle.vehicle} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-secondary truncate max-w-[200px]">
                              {vehicle.vehicle}
                            </span>
                            <span className="text-sm font-medium text-text-primary">
                              {vehicle.utilization}%
                            </span>
                          </div>
                          <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${vehicle.utilization}%` }}
                              transition={{
                                duration: 0.8,
                                delay: 0.4 + index * 0.1,
                              }}
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  COLORS[index % COLORS.length],
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Customer Demographics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Customer Demographics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="h-[200px] w-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={customerData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              dataKey="value"
                              paddingAngle={4}
                            >
                              {customerData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-4">
                        {customerData.map((item) => (
                          <div key={item.name} className="flex items-center gap-3">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <div>
                              <p className="text-sm text-text-secondary">
                                {item.name} Customers
                              </p>
                              <p className="text-2xl font-bold text-text-primary">
                                {item.value}%
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Avg. Booking Duration", value: "3.2 days" },
                { label: "Peak Booking Day", value: "Saturday" },
                { label: "Most Popular Category", value: "SUV" },
                { label: "Customer Satisfaction", value: "4.8/5" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-text-muted mb-1">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-text-primary">
                        {stat.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
