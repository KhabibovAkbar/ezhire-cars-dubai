"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Users,
  UserPlus,
  Crown,
  Star,
  Mail,
  Phone,
  User,
  MapPin,
  CheckCircle,
  Calendar,
  CreditCard,
  Car,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { customers as initialCustomers } from "@/lib/data";
import { formatCurrency, getInitials } from "@/lib/utils";
import type { Customer } from "@/types";

export default function CustomersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState(initialCustomers);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isVIP: false,
  });

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: customers.length,
    newThisMonth: 87,
    vipMembers: customers.filter((c) => c.isVIP).length,
    avgRating: (
      customers.reduce((sum, c) => sum + c.rating, 0) / customers.length
    ).toFixed(1),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCustomer: Customer = {
      id: customers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`,
      totalBookings: 0,
      totalSpent: 0,
      rating: 5.0,
      isVIP: formData.isVIP,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      isVIP: false,
    });
    
    setAddDialogOpen(false);
    showSuccessToast("Customer added successfully!");
  };

  const showSuccessToast = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setProfileDialogOpen(true);
  };

  const handleDeleteCustomer = (customerId: number) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    setProfileDialogOpen(false);
    showSuccessToast("Customer deleted successfully!");
  };

  const handleToggleVIP = (customerId: number) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId ? { ...c, isVIP: !c.isVIP } : c
      )
    );
    if (selectedCustomer) {
      setSelectedCustomer({ ...selectedCustomer, isVIP: !selectedCustomer.isVIP });
    }
    showSuccessToast("VIP status updated!");
  };

  // Mock booking history for profile
  const mockBookingHistory = [
    { id: "BK-1001", vehicle: "BMW X5 2024", date: "Feb 5, 2024", amount: 447, status: "completed" },
    { id: "BK-0987", vehicle: "Tesla Model 3", date: "Jan 20, 2024", amount: 356, status: "completed" },
    { id: "BK-0912", vehicle: "Mercedes C300", date: "Jan 5, 2024", amount: 258, status: "completed" },
  ];

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Customers"
          subtitle="Manage your customer base"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-6"
          >
            {/* Success Toast */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg shadow-lg"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{successMessage}</span>
              </motion.div>
            )}

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  All Customers
                </h2>
                <p className="text-text-secondary">
                  {filteredCustomers.length} customers in your database
                </p>
              </div>
              
              {/* Add Customer Dialog */}
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                      Enter the customer details below to add them to your database.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                          <Input
                            name="name"
                            placeholder="John Doe"
                            className="pl-9"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                          <Input
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="pl-9"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                          <Input
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className="pl-9"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Address
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                          <Input
                            name="address"
                            placeholder="123 Main St, New York, NY"
                            className="pl-9"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium text-text-primary flex items-center gap-2">
                            <Crown className="h-4 w-4 text-warning" />
                            VIP Member
                          </label>
                          <p className="text-xs text-text-muted">
                            Grant VIP status and benefits
                          </p>
                        </div>
                        <Switch
                          checked={formData.isVIP}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, isVIP: checked }))
                          }
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Customer
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* View Profile Dialog */}
            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {selectedCustomer && (
                  <>
                    <DialogHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={selectedCustomer.avatar} />
                          <AvatarFallback className="text-lg">
                            {getInitials(selectedCustomer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <DialogTitle className="text-xl">
                              {selectedCustomer.name}
                            </DialogTitle>
                            {selectedCustomer.isVIP && (
                              <Badge variant="warning" className="gap-1">
                                <Crown className="h-3 w-3" />
                                VIP
                              </Badge>
                            )}
                          </div>
                          <DialogDescription className="mt-1">
                            Member since {selectedCustomer.joinedDate}
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Contact Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <Mail className="h-5 w-5 text-text-muted" />
                          <div>
                            <p className="text-xs text-text-muted">Email</p>
                            <p className="text-sm font-medium text-text-primary">
                              {selectedCustomer.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <Phone className="h-5 w-5 text-text-muted" />
                          <div>
                            <p className="text-xs text-text-muted">Phone</p>
                            <p className="text-sm font-medium text-text-primary">
                              {selectedCustomer.phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-lg bg-bg-tertiary">
                          <Calendar className="h-5 w-5 mx-auto mb-2 text-info" />
                          <p className="text-2xl font-bold text-text-primary">
                            {selectedCustomer.totalBookings}
                          </p>
                          <p className="text-xs text-text-muted">Total Bookings</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-bg-tertiary">
                          <CreditCard className="h-5 w-5 mx-auto mb-2 text-success" />
                          <p className="text-2xl font-bold text-success">
                            {formatCurrency(selectedCustomer.totalSpent)}
                          </p>
                          <p className="text-xs text-text-muted">Total Spent</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-bg-tertiary">
                          <Star className="h-5 w-5 mx-auto mb-2 text-warning" />
                          <p className="text-2xl font-bold text-text-primary">
                            {selectedCustomer.rating}
                          </p>
                          <p className="text-xs text-text-muted">Rating</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Recent Bookings */}
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Recent Bookings
                        </h4>
                        <div className="space-y-2">
                          {mockBookingHistory.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary"
                            >
                              <div className="flex items-center gap-3">
                                <Car className="h-4 w-4 text-text-muted" />
                                <div>
                                  <p className="text-sm font-medium text-text-primary">
                                    {booking.vehicle}
                                  </p>
                                  <p className="text-xs text-text-muted">
                                    {booking.id} • {booking.date}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm font-semibold text-success">
                                {formatCurrency(booking.amount)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* VIP Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-bg-tertiary">
                        <div className="flex items-center gap-3">
                          <Crown className="h-5 w-5 text-warning" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">
                              VIP Status
                            </p>
                            <p className="text-xs text-text-muted">
                              Toggle VIP membership for this customer
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={selectedCustomer.isVIP}
                          onCheckedChange={() => handleToggleVIP(selectedCustomer.id)}
                        />
                      </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="text-danger hover:text-danger hover:bg-danger/10"
                        onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Customer
                      </Button>
                      <div className="flex gap-2 flex-1 sm:flex-initial">
                        <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>
                          Close
                        </Button>
                        <Button>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-bg-secondary/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-info/10">
                    <Users className="h-5 w-5 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Total Customers</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {customers.length.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-bg-secondary/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-success/10">
                    <UserPlus className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">New This Month</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {stats.newThisMonth}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-bg-secondary/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <Crown className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">VIP Members</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {stats.vipMembers}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-bg-secondary/50">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Star className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Avg Rating</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {stats.avgRating}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                placeholder="Search customers..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Customer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomers.map((customer, index) => (
                <motion.div
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={customer.avatar} />
                            <AvatarFallback>
                              {getInitials(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-text-primary">
                              {customer.name}
                            </h3>
                            <p className="text-sm text-text-muted">
                              Member since {customer.joinedDate}
                            </p>
                          </div>
                        </div>
                        {customer.isVIP && (
                          <Badge variant="warning" className="gap-1">
                            <Crown className="h-3 w-3" />
                            VIP
                          </Badge>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Mail className="h-4 w-4 text-text-muted" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Phone className="h-4 w-4 text-text-muted" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
                        <div className="text-center">
                          <p className="text-lg font-bold text-text-primary">
                            {customer.totalBookings}
                          </p>
                          <p className="text-xs text-text-muted">Bookings</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-success">
                            {formatCurrency(customer.totalSpent)}
                          </p>
                          <p className="text-xs text-text-muted">Spent</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-lg font-bold text-text-primary">
                              {customer.rating}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted">Rating</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewProfile(customer)}
                        >
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          New Booking
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">No customers found</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
