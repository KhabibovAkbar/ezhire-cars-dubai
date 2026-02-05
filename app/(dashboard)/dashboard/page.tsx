"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Calendar, Car, Users } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { FleetStatusChart } from "@/components/charts/FleetStatusChart";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { TopVehicles } from "@/components/dashboard/TopVehicles";
import { dashboardStats } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <Header
          title={t("dashboard")}
          subtitle={`${t("welcomeBack")}, Khalid`}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard
                title={t("totalRevenue")}
                value={formatCurrency(dashboardStats.totalRevenue)}
                change={`+${dashboardStats.revenueChange}%`}
                trend="up"
                icon={DollarSign}
                iconColor="green"
                delay={0}
              />
              <StatCard
                title={t("totalBookings")}
                value={formatNumber(dashboardStats.totalBookings)}
                change={`+${dashboardStats.bookingsChange}%`}
                trend="up"
                icon={Calendar}
                iconColor="blue"
                delay={0.1}
              />
              <StatCard
                title={t("fleetStatus")}
                value={`${dashboardStats.availableVehicles}/${dashboardStats.totalVehicles}`}
                change={t("available")}
                trend="neutral"
                icon={Car}
                iconColor="purple"
                delay={0.2}
              />
              <StatCard
                title={t("totalCustomers")}
                value={formatNumber(dashboardStats.totalCustomers)}
                change={`+${dashboardStats.customersChange}%`}
                trend="up"
                icon={Users}
                iconColor="yellow"
                delay={0.3}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2 h-[350px]">
                <RevenueChart />
              </div>
              <div className="h-[350px]">
                <FleetStatusChart />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2">
                <RecentBookings />
              </div>
              <div>
                <TopVehicles />
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
