"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Eye,
  Edit,
  MoreHorizontal,
  X,
  Calendar,
  Car,
  User,
  MapPin,
  Clock,
  CreditCard,
  CheckCircle,
  FileText,
  Send,
  Printer,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bookings as initialBookings, vehicles, customers } from "@/lib/data";
import { formatCurrency, getInitials } from "@/lib/utils";
import type { Booking } from "@/types";

type BookingStatus = "all" | "active" | "pending" | "upcoming" | "completed" | "cancelled";

export default function BookingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BookingStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState(initialBookings);
  
  // Dialog states
  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const [viewBookingOpen, setViewBookingOpen] = useState(false);
  const [editBookingOpen, setEditBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // New booking form state
  const [newBookingForm, setNewBookingForm] = useState({
    customer: "",
    vehicle: "",
    startDate: "",
    endDate: "",
    pickupLocation: "Downtown Office",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    status: "",
    pickupLocation: "",
  });

  const filteredBookings = bookings.filter((booking) => {
    const matchesTab = activeTab === "all" || booking.status === activeTab;
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusCount = (status: BookingStatus) => {
    if (status === "all") return bookings.length;
    return bookings.filter((b) => b.status === status).length;
  };

  const showSuccessToast = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNewBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vehicle = vehicles.find(v => v.name === newBookingForm.vehicle);
    const customer = customers.find(c => c.name === newBookingForm.customer);
    
    const newBooking: Booking = {
      id: `BK-${1000 + bookings.length + 1}`,
      customer: newBookingForm.customer,
      customerAvatar: customer?.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
      vehicle: newBookingForm.vehicle,
      startDate: newBookingForm.startDate,
      endDate: newBookingForm.endDate,
      total: vehicle ? vehicle.price * 3 : 299,
      status: "pending",
    };

    setBookings(prev => [newBooking, ...prev]);
    setNewBookingOpen(false);
    setNewBookingForm({
      customer: "",
      vehicle: "",
      startDate: "",
      endDate: "",
      pickupLocation: "Downtown Office",
    });
    showSuccessToast("Booking created successfully!");
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setViewBookingOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditForm({
      status: booking.status,
      pickupLocation: "Downtown Office",
    });
    setEditBookingOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedBooking) {
      setBookings(prev =>
        prev.map(b =>
          b.id === selectedBooking.id
            ? { ...b, status: editForm.status as Booking["status"] }
            : b
        )
      );
      setEditBookingOpen(false);
      showSuccessToast("Booking updated successfully!");
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === bookingId ? { ...b, status: "cancelled" as const } : b
      )
    );
    setViewBookingOpen(false);
    showSuccessToast("Booking cancelled!");
  };

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Bookings"
          subtitle="Track all reservations"
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
                  All Bookings
                </h2>
                <p className="text-text-secondary">
                  {filteredBookings.length} bookings found
                </p>
              </div>
              
              {/* New Booking Dialog */}
              <Dialog open={newBookingOpen} onOpenChange={setNewBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Booking
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Booking</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new vehicle reservation.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleNewBooking}>
                    <div className="grid gap-4 py-4">
                      {/* Customer Select */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Customer *
                        </label>
                        <Select
                          value={newBookingForm.customer}
                          onValueChange={(value) =>
                            setNewBookingForm(prev => ({ ...prev, customer: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                          <SelectContent>
                            {customers.map(customer => (
                              <SelectItem key={customer.id} value={customer.name}>
                                {customer.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Vehicle Select */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Vehicle *
                        </label>
                        <Select
                          value={newBookingForm.vehicle}
                          onValueChange={(value) =>
                            setNewBookingForm(prev => ({ ...prev, vehicle: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicles.filter(v => v.status === "available").map(vehicle => (
                              <SelectItem key={vehicle.id} value={vehicle.name}>
                                {vehicle.name} - {formatCurrency(vehicle.price)}/day
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">
                            Start Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              type="date"
                              className="pl-9"
                              value={newBookingForm.startDate}
                              onChange={(e) =>
                                setNewBookingForm(prev => ({ ...prev, startDate: e.target.value }))
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">
                            End Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              type="date"
                              className="pl-9"
                              value={newBookingForm.endDate}
                              onChange={(e) =>
                                setNewBookingForm(prev => ({ ...prev, endDate: e.target.value }))
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Pickup Location */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                          Pickup Location
                        </label>
                        <Select
                          value={newBookingForm.pickupLocation}
                          onValueChange={(value) =>
                            setNewBookingForm(prev => ({ ...prev, pickupLocation: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Downtown Office">Downtown Office</SelectItem>
                            <SelectItem value="Airport Terminal">Airport Terminal</SelectItem>
                            <SelectItem value="Hotel Delivery">Hotel Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setNewBookingOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Booking
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* View Booking Dialog */}
            <Dialog open={viewBookingOpen} onOpenChange={setViewBookingOpen}>
              <DialogContent className="sm:max-w-[600px]">
                {selectedBooking && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <DialogTitle className="text-xl flex items-center gap-2">
                            <FileText className="h-5 w-5 text-accent" />
                            Booking {selectedBooking.id}
                          </DialogTitle>
                          <DialogDescription className="mt-1">
                            View booking details and manage reservation
                          </DialogDescription>
                        </div>
                        <StatusBadge status={selectedBooking.status} />
                      </div>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Customer Info */}
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-tertiary">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={selectedBooking.customerAvatar} />
                          <AvatarFallback>{getInitials(selectedBooking.customer)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-text-primary">{selectedBooking.customer}</p>
                          <p className="text-sm text-text-muted">Customer</p>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <Car className="h-5 w-5 text-accent" />
                          <div>
                            <p className="text-xs text-text-muted">Vehicle</p>
                            <p className="text-sm font-medium text-text-primary">
                              {selectedBooking.vehicle}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <CreditCard className="h-5 w-5 text-success" />
                          <div>
                            <p className="text-xs text-text-muted">Total Amount</p>
                            <p className="text-sm font-medium text-success">
                              {formatCurrency(selectedBooking.total)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <Calendar className="h-5 w-5 text-info" />
                          <div>
                            <p className="text-xs text-text-muted">Dates</p>
                            <p className="text-sm font-medium text-text-primary">
                              {selectedBooking.startDate} - {selectedBooking.endDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <MapPin className="h-5 w-5 text-warning" />
                          <div>
                            <p className="text-xs text-text-muted">Pickup Location</p>
                            <p className="text-sm font-medium text-text-primary">
                              Downtown Office
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Quick Actions */}
                      <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Send className="h-4 w-4" />
                          Send Reminder
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Printer className="h-4 w-4" />
                          Print Invoice
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-danger hover:text-danger"
                          onClick={() => handleCancelBooking(selectedBooking.id)}
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setViewBookingOpen(false)}>
                        Close
                      </Button>
                      <Button onClick={() => {
                        setViewBookingOpen(false);
                        handleEditBooking(selectedBooking);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Booking
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit Booking Dialog */}
            <Dialog open={editBookingOpen} onOpenChange={setEditBookingOpen}>
              <DialogContent className="sm:max-w-[500px]">
                {selectedBooking && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Edit Booking {selectedBooking.id}</DialogTitle>
                      <DialogDescription>
                        Update the booking details below.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      {/* Customer (readonly) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Customer</label>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedBooking.customerAvatar} />
                            <AvatarFallback>{getInitials(selectedBooking.customer)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-text-primary">
                            {selectedBooking.customer}
                          </span>
                        </div>
                      </div>

                      {/* Vehicle (readonly) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Vehicle</label>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <Car className="h-5 w-5 text-text-muted" />
                          <span className="text-sm font-medium text-text-primary">
                            {selectedBooking.vehicle}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Status</label>
                        <Select
                          value={editForm.status}
                          onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Pickup Location */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Pickup Location</label>
                        <Select
                          value={editForm.pickupLocation}
                          onValueChange={(value) => setEditForm(prev => ({ ...prev, pickupLocation: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Downtown Office">Downtown Office</SelectItem>
                            <SelectItem value="Airport Terminal">Airport Terminal</SelectItem>
                            <SelectItem value="Hotel Delivery">Hotel Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Amount */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">Total Amount</label>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
                          <CreditCard className="h-5 w-5 text-success" />
                          <span className="text-lg font-bold text-success">
                            {formatCurrency(selectedBooking.total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setEditBookingOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Tabs and Search */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as BookingStatus)}>
                <TabsList className="bg-bg-tertiary">
                  <TabsTrigger value="all">
                    All ({getStatusCount("all")})
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    Active ({getStatusCount("active")})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending ({getStatusCount("pending")})
                  </TabsTrigger>
                  <TabsTrigger value="upcoming">
                    Upcoming ({getStatusCount("upcoming")})
                  </TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({getStatusCount("completed")})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="relative w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-9 w-full lg:w-[280px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Bookings Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                          Booking ID
                        </th>
                        <th className="text-left py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="text-left py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                          Vehicle
                        </th>
                        <th className="text-left py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider hidden md:table-cell">
                          Dates
                        </th>
                        <th className="text-left py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                          Total
                        </th>
                        <th className="text-left py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-right py-4 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking, index) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                          className="border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className="text-sm font-medium text-accent">
                              {booking.id}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={booking.customerAvatar} />
                                <AvatarFallback>
                                  {getInitials(booking.customer)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium text-text-primary">
                                {booking.customer}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm text-text-secondary">
                              {booking.vehicle}
                            </span>
                          </td>
                          <td className="py-4 px-4 hidden md:table-cell">
                            <span className="text-sm text-text-secondary">
                              {booking.startDate} - {booking.endDate}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-sm font-semibold text-text-primary">
                              {formatCurrency(booking.total)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <StatusBadge status={booking.status} />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewBooking(booking)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditBooking(booking)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewBooking(booking)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Send Reminder
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Print Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-danger"
                                    onClick={() => handleCancelBooking(booking.id)}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel Booking
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredBookings.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">No bookings found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
