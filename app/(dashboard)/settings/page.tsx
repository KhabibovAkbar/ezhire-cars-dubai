"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building,
  Bell,
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Check,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ThemeProvider";

const accentColors = [
  { name: "Orange", value: "#FF4500", hover: "#FF6130" },
  { name: "Blue", value: "#3B82F6", hover: "#2563EB" },
  { name: "Green", value: "#22C55E", hover: "#16A34A" },
  { name: "Yellow", value: "#F59E0B", hover: "#D97706" },
  { name: "Red", value: "#EF4444", hover: "#DC2626" },
  { name: "Pink", value: "#EC4899", hover: "#DB2777" },
];

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedColor, setSelectedColor] = useState("#FF4500");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    bookingUpdates: true,
    reviewAlerts: true,
  });

  // Load saved accent color on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("accentColor");
    if (savedColor) {
      setSelectedColor(savedColor);
      applyAccentColor(savedColor);
    }
  }, []);

  const applyAccentColor = (color: string) => {
    const colorData = accentColors.find(c => c.value === color);
    if (colorData) {
      document.documentElement.style.setProperty("--color-accent", colorData.value);
      document.documentElement.style.setProperty("--color-accent-hover", colorData.hover);
      localStorage.setItem("accentColor", color);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    applyAccentColor(color);
  };

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Settings"
          subtitle="Manage your preferences"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="bg-bg-secondary mb-6">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="company" className="gap-2">
                  <Building className="h-4 w-4" />
                  Company
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Profile Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Avatar */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="h-24 w-24 rounded-full bg-accent flex items-center justify-center text-white font-bold text-2xl">
                            KA
                          </div>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">
                            Khalid Al Ameri
                          </h3>
                          <p className="text-sm text-text-muted">Administrator</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            First Name
                          </label>
                          <Input defaultValue="Khalid" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Last Name
                          </label>
                          <Input defaultValue="Al Ameri" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              className="pl-9"
                              defaultValue="admin@ezhirecars.ae"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Phone
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              className="pl-9"
                              defaultValue="+971 50 123 4567"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button className="gap-2">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Company Tab */}
              <TabsContent value="company">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Company Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Business Name
                          </label>
                          <Input defaultValue="DriveHub" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Website
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              className="pl-9"
                              defaultValue="www.drivehub.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Address
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              className="pl-9"
                              defaultValue="123 Main Street, New York, NY 10001"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Business Email
                          </label>
                          <Input defaultValue="contact@drivehub.com" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-secondary">
                            Business Phone
                          </label>
                          <Input defaultValue="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button className="gap-2">
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        {[
                          {
                            key: "email",
                            label: "Email Notifications",
                            description:
                              "Receive notifications via email",
                          },
                          {
                            key: "push",
                            label: "Push Notifications",
                            description:
                              "Receive push notifications in browser",
                          },
                          {
                            key: "sms",
                            label: "SMS Notifications",
                            description: "Receive text message alerts",
                          },
                          {
                            key: "bookingUpdates",
                            label: "Booking Updates",
                            description:
                              "Get notified about new bookings and changes",
                          },
                          {
                            key: "reviewAlerts",
                            label: "Review Alerts",
                            description:
                              "Get notified when customers leave reviews",
                          },
                          {
                            key: "marketing",
                            label: "Marketing Emails",
                            description:
                              "Receive tips, product updates, and offers",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between py-3 border-b border-border last:border-0"
                          >
                            <div>
                              <p className="font-medium text-text-primary">
                                {item.label}
                              </p>
                              <p className="text-sm text-text-muted">
                                {item.description}
                              </p>
                            </div>
                            <Switch
                              checked={
                                notifications[
                                  item.key as keyof typeof notifications
                                ]
                              }
                              onCheckedChange={(checked) =>
                                setNotifications((prev) => ({
                                  ...prev,
                                  [item.key]: checked,
                                }))
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <p className="font-medium text-text-primary mb-4">
                          Theme
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { name: "Dark", value: "dark" as const },
                            { name: "Light", value: "light" as const },
                            { name: "System", value: "system" as const },
                          ].map((themeOption) => (
                            <button
                              key={themeOption.name}
                              onClick={() => setTheme(themeOption.value)}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                theme === themeOption.value
                                  ? "border-accent bg-accent/10"
                                  : "border-border hover:border-border-hover"
                              }`}
                            >
                              <div
                                className={`h-20 rounded-md mb-3 ${
                                  themeOption.name === "Dark"
                                    ? "bg-[#121214]"
                                    : themeOption.name === "Light"
                                    ? "bg-white"
                                    : "bg-gradient-to-r from-[#121214] to-white"
                                }`}
                              />
                              <p
                                className={`text-sm font-medium ${
                                  theme === themeOption.value
                                    ? "text-accent"
                                    : "text-text-secondary"
                                }`}
                              >
                                {themeOption.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="font-medium text-text-primary mb-4">
                          Accent Color
                        </p>
                        <div className="flex gap-3">
                          {accentColors.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => handleColorChange(color.value)}
                              className={`w-10 h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                                selectedColor === color.value 
                                  ? "ring-2 ring-offset-2 ring-offset-bg-secondary ring-white" 
                                  : ""
                              }`}
                              style={{ backgroundColor: color.value }}
                            >
                              {selectedColor === color.value && (
                                <Check className="w-5 h-5 text-white" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
