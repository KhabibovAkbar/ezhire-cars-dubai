"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueData, revenueByCategory, bookings } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";

const COLORS = ["#FF4500", "#3B82F6", "#22C55E", "#F59E0B", "#EF4444"];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-secondary border border-border rounded-lg p-3 shadow-xl">
        <p className="text-sm text-text-secondary">{label}</p>
        <p className="text-lg font-bold text-text-primary">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenuePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recentTransactions = bookings
    .filter((b) => b.status === "completed" || b.status === "active")
    .slice(0, 6);

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Revenue"
          subtitle="Financial overview"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Revenue & Analytics
                </h2>
                <p className="text-text-secondary">
                  Track your earnings and financial performance
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-transparent" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-text-secondary">
                        This Month
                      </p>
                      <div className="flex items-center gap-1 text-success">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="text-sm font-medium">+12.4%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-text-primary">
                      $48,520
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-text-secondary">
                        Last Month
                      </p>
                      <span className="text-sm text-text-muted">Baseline</span>
                    </div>
                    <p className="text-3xl font-bold text-text-primary">
                      $43,180
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-text-secondary">
                        This Year
                      </p>
                      <div className="flex items-center gap-1 text-success">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="text-sm font-medium">+28.5%</span>
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-text-primary">
                      $412,840
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient
                              id="colorRevenueGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#FF4500"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#FF4500"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#27272A"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717A", fontSize: 12 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717A", fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#FF4500"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenueGrad)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Revenue by Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Revenue by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={revenueByCategory}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            dataKey="value"
                            paddingAngle={4}
                          >
                            {revenueByCategory.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                      {revenueByCategory.map((cat, index) => (
                        <div
                          key={cat.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            />
                            <span className="text-sm text-text-secondary">
                              {cat.name}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-text-primary">
                            {cat.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase">
                            Date
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase">
                            Customer
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase hidden sm:table-cell">
                            Vehicle
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase">
                            Amount
                          </th>
                          <th className="text-left py-3 px-2 text-xs font-medium text-text-muted uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((transaction) => (
                          <tr
                            key={transaction.id}
                            className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors"
                          >
                            <td className="py-3 px-2 text-sm text-text-secondary">
                              {transaction.startDate}
                            </td>
                            <td className="py-3 px-2 text-sm font-medium text-text-primary">
                              {transaction.customer}
                            </td>
                            <td className="py-3 px-2 text-sm text-text-secondary hidden sm:table-cell">
                              {transaction.vehicle}
                            </td>
                            <td className="py-3 px-2 text-sm font-semibold text-success">
                              {formatCurrency(transaction.total)}
                            </td>
                            <td className="py-3 px-2">
                              <StatusBadge status={transaction.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
