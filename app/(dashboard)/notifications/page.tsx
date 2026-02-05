"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Calendar,
  Car,
  Star,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Check,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const allNotifications = [
  {
    id: "1",
    type: "booking",
    title: "New booking received",
    message: "Ahmed Al Maktoum booked BMW X5",
    time: "2 min ago",
    read: false,
    icon: Calendar,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    id: "2",
    type: "vehicle",
    title: "Vehicle returned",
    message: "Tesla Model 3 returned at Dubai Mall",
    time: "1 hour ago",
    read: false,
    icon: Car,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "3",
    type: "review",
    title: "New review",
    message: "Fatima Al Nahyan left a 5-star review",
    time: "3 hours ago",
    read: false,
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: "4",
    type: "booking",
    title: "Booking confirmed",
    message: "Rajesh Sharma confirmed Range Rover booking",
    time: "5 hours ago",
    read: true,
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    id: "5",
    type: "alert",
    title: "Maintenance reminder",
    message: "Mercedes S-Class due for service in 3 days",
    time: "6 hours ago",
    read: true,
    icon: AlertTriangle,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: "6",
    type: "message",
    title: "New message",
    message: "Priya Patel sent you a message about her booking",
    time: "8 hours ago",
    read: true,
    icon: MessageSquare,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    id: "7",
    type: "booking",
    title: "Booking cancelled",
    message: "Omar Hassan cancelled Porsche 911 booking",
    time: "12 hours ago",
    read: true,
    icon: Calendar,
    color: "text-danger",
    bgColor: "bg-danger/10",
  },
  {
    id: "8",
    type: "vehicle",
    title: "Vehicle picked up",
    message: "Aisha Mohammed picked up Lamborghini Urus",
    time: "1 day ago",
    read: true,
    icon: Car,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    id: "9",
    type: "review",
    title: "New review",
    message: "Mohammed Al Rashid left a 4-star review",
    time: "1 day ago",
    read: true,
    icon: Star,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    id: "10",
    type: "alert",
    title: "Insurance expiring",
    message: "BMW 7 Series insurance expires in 7 days",
    time: "2 days ago",
    read: true,
    icon: AlertTriangle,
    color: "text-danger",
    bgColor: "bg-danger/10",
  },
];

export default function NotificationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Notifications"
          subtitle={`${unreadCount} unread notifications`}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Actions Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All ({notifications.length})
                </Button>
                <Button
                  variant={filter === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("unread")}
                >
                  Unread ({unreadCount})
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Mark all read
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  disabled={notifications.length === 0}
                  className="gap-2 text-danger hover:text-danger"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear all
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No notifications
                  </h3>
                  <p className="text-text-secondary">
                    {filter === "unread"
                      ? "You have no unread notifications"
                      : "You're all caught up!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification, index) => {
                  const Icon = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`overflow-hidden transition-all hover:border-border-hover ${
                          !notification.read ? "border-l-4 border-l-accent" : ""
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-full ${notification.bgColor}`}
                            >
                              <Icon className={`h-5 w-5 ${notification.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h4
                                    className={`font-semibold ${
                                      notification.read
                                        ? "text-text-secondary"
                                        : "text-text-primary"
                                    }`}
                                  >
                                    {notification.title}
                                  </h4>
                                  <p className="text-sm text-text-muted mt-1">
                                    {notification.message}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-xs text-text-muted flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs h-7 gap-1"
                                  >
                                    <Check className="h-3 w-3" />
                                    Mark as read
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    deleteNotification(notification.id)
                                  }
                                  className="text-xs h-7 gap-1 text-danger hover:text-danger"
                                >
                                  <Trash2 className="h-3 w-3" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
