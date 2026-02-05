"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Plus,
  Search,
  Car,
  Calendar,
  Users,
  Settings,
  Star,
  Fuel,
  Gauge,
  MapPin,
  DollarSign,
  Shield,
  CheckCircle,
  Edit,
  Trash2,
  Copy,
  Award,
  TrendingUp,
  Clock,
  Wrench,
  ImageIcon,
  X,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/StatusBadge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { vehicles as initialVehicles } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import type { Vehicle } from "@/types";

const categories = ["All Types", "Electric", "SUV", "Luxury", "Sports", "Sedan"];
const statuses = ["All Status", "Available", "Rented", "Maintenance"];

export default function VehiclesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState(initialVehicles);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // New vehicle form state
  const [newVehicleForm, setNewVehicleForm] = useState({
    name: "",
    category: "SUV",
    year: "2024",
    seats: "5",
    transmission: "Automatic",
    fuelType: "Gasoline",
    price: "",
    licensePlate: "",
    vin: "",
    mileage: "",
    color: "",
    features: [] as string[],
    insurance: true,
    gps: true,
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    status: "",
    price: "",
    seats: "",
    transmission: "",
    year: "",
    licensePlate: "",
    mileage: "",
  });

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesCategory =
      selectedCategory === "All Types" || vehicle.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "All Status" ||
      vehicle.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = vehicle.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const showSuccessToast = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newVehicle: Vehicle = {
      id: vehicles.length + 1,
      name: newVehicleForm.name,
      category: newVehicleForm.category,
      year: parseInt(newVehicleForm.year),
      seats: parseInt(newVehicleForm.seats),
      transmission: newVehicleForm.transmission,
      price: parseInt(newVehicleForm.price) || 99,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      status: "available",
      rating: 4.5,
      reviews: 0,
    };

    setVehicles(prev => [newVehicle, ...prev]);
    setAddDialogOpen(false);
    setNewVehicleForm({
      name: "",
      category: "SUV",
      year: "2024",
      seats: "5",
      transmission: "Automatic",
      fuelType: "Gasoline",
      price: "",
      licensePlate: "",
      vin: "",
      mileage: "",
      color: "",
      features: [],
      insurance: true,
      gps: true,
    });
    showSuccessToast("Vehicle added successfully!");
  };

  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setViewDialogOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setEditForm({
      name: vehicle.name,
      category: vehicle.category,
      status: vehicle.status,
      price: vehicle.price.toString(),
      seats: vehicle.seats.toString(),
      transmission: vehicle.transmission,
      year: vehicle.year.toString(),
      licensePlate: "AB-123-CD",
      mileage: "25000",
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedVehicle) {
      setVehicles(prev =>
        prev.map(v =>
          v.id === selectedVehicle.id
            ? {
                ...v,
                name: editForm.name,
                category: editForm.category,
                status: editForm.status as Vehicle["status"],
                price: parseInt(editForm.price) || v.price,
                seats: parseInt(editForm.seats) || v.seats,
                transmission: editForm.transmission,
                year: parseInt(editForm.year) || v.year,
              }
            : v
        )
      );
      setEditDialogOpen(false);
      showSuccessToast("Vehicle updated successfully!");
    }
  };

  const handleDeleteVehicle = (vehicle: Vehicle) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
    setViewDialogOpen(false);
    showSuccessToast("Vehicle removed successfully!");
  };

  const toggleFeature = (feature: string) => {
    setNewVehicleForm(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header
          title="Vehicles"
          subtitle="Manage your fleet"
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
                  All Vehicles
                </h2>
                <p className="text-text-secondary">
                  {filteredVehicles.length} vehicles in your fleet
                </p>
              </div>

              {/* Add New Vehicle Dialog */}
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add New Vehicle
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      <Car className="h-5 w-5 text-accent" />
                      Add New Vehicle
                    </DialogTitle>
                    <DialogDescription>
                      Fill in the vehicle details to add it to your fleet.
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAddVehicle}>
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="basic">Basic Info</TabsTrigger>
                        <TabsTrigger value="specs">Specifications</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                      </TabsList>

                      {/* Basic Info Tab */}
                      <TabsContent value="basic" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Vehicle Name *
                            </label>
                            <Input
                              placeholder="e.g., BMW X5 2024"
                              value={newVehicleForm.name}
                              onChange={(e) =>
                                setNewVehicleForm(prev => ({ ...prev, name: e.target.value }))
                              }
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Category *
                            </label>
                            <Select
                              value={newVehicleForm.category}
                              onValueChange={(value) =>
                                setNewVehicleForm(prev => ({ ...prev, category: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Electric">Electric</SelectItem>
                                <SelectItem value="SUV">SUV</SelectItem>
                                <SelectItem value="Luxury">Luxury</SelectItem>
                                <SelectItem value="Sports">Sports</SelectItem>
                                <SelectItem value="Sedan">Sedan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Year *
                            </label>
                            <Select
                              value={newVehicleForm.year}
                              onValueChange={(value) =>
                                setNewVehicleForm(prev => ({ ...prev, year: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[2024, 2023, 2022, 2021, 2020].map(year => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              License Plate
                            </label>
                            <Input
                              placeholder="AB-123-CD"
                              value={newVehicleForm.licensePlate}
                              onChange={(e) =>
                                setNewVehicleForm(prev => ({ ...prev, licensePlate: e.target.value }))
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              VIN Number
                            </label>
                            <Input
                              placeholder="Vehicle Identification Number"
                              value={newVehicleForm.vin}
                              onChange={(e) =>
                                setNewVehicleForm(prev => ({ ...prev, vin: e.target.value }))
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Daily Rate *
                            </label>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                              <Input
                                type="number"
                                placeholder="99"
                                className="pl-9"
                                value={newVehicleForm.price}
                                onChange={(e) =>
                                  setNewVehicleForm(prev => ({ ...prev, price: e.target.value }))
                                }
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Color
                            </label>
                            <Input
                              placeholder="e.g., Midnight Black"
                              value={newVehicleForm.color}
                              onChange={(e) =>
                                setNewVehicleForm(prev => ({ ...prev, color: e.target.value }))
                              }
                            />
                          </div>
                        </div>

                        {/* Image Upload Area */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">
                            Vehicle Images
                          </label>
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                            <ImageIcon className="h-10 w-10 mx-auto text-text-muted mb-2" />
                            <p className="text-sm text-text-secondary">
                              Drag and drop images or click to upload
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                              PNG, JPG up to 10MB (max 5 images)
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Specifications Tab */}
                      <TabsContent value="specs" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Seats
                            </label>
                            <Select
                              value={newVehicleForm.seats}
                              onValueChange={(value) =>
                                setNewVehicleForm(prev => ({ ...prev, seats: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[2, 4, 5, 6, 7, 8].map(seats => (
                                  <SelectItem key={seats} value={seats.toString()}>
                                    {seats} seats
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Transmission
                            </label>
                            <Select
                              value={newVehicleForm.transmission}
                              onValueChange={(value) =>
                                setNewVehicleForm(prev => ({ ...prev, transmission: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Automatic">Automatic</SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Fuel Type
                            </label>
                            <Select
                              value={newVehicleForm.fuelType}
                              onValueChange={(value) =>
                                setNewVehicleForm(prev => ({ ...prev, fuelType: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Gasoline">Gasoline</SelectItem>
                                <SelectItem value="Diesel">Diesel</SelectItem>
                                <SelectItem value="Electric">Electric</SelectItem>
                                <SelectItem value="Hybrid">Hybrid</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-text-primary">
                              Current Mileage
                            </label>
                            <div className="relative">
                              <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                              <Input
                                type="number"
                                placeholder="15000"
                                className="pl-9"
                                value={newVehicleForm.mileage}
                                onChange={(e) =>
                                  setNewVehicleForm(prev => ({ ...prev, mileage: e.target.value }))
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* Engine & Performance */}
                        <Separator />
                        <h4 className="text-sm font-semibold text-text-primary">Engine & Performance</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                            <Fuel className="h-6 w-6 mx-auto text-accent mb-2" />
                            <p className="text-xs text-text-muted">Fuel Economy</p>
                            <p className="text-sm font-semibold text-text-primary">28 MPG</p>
                          </div>
                          <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                            <Gauge className="h-6 w-6 mx-auto text-accent mb-2" />
                            <p className="text-xs text-text-muted">Horsepower</p>
                            <p className="text-sm font-semibold text-text-primary">300 HP</p>
                          </div>
                          <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                            <TrendingUp className="h-6 w-6 mx-auto text-accent mb-2" />
                            <p className="text-xs text-text-muted">0-60 mph</p>
                            <p className="text-sm font-semibold text-text-primary">5.2s</p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Features Tab */}
                      <TabsContent value="features" className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "Bluetooth",
                            "Navigation",
                            "Backup Camera",
                            "Heated Seats",
                            "Sunroof",
                            "Leather Interior",
                            "Apple CarPlay",
                            "Android Auto",
                            "Cruise Control",
                            "Parking Sensors",
                            "Lane Assist",
                            "Blind Spot Monitor",
                          ].map(feature => (
                            <div
                              key={feature}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                newVehicleForm.features.includes(feature)
                                  ? "border-accent bg-accent/10"
                                  : "border-border hover:border-accent/50"
                              }`}
                              onClick={() => toggleFeature(feature)}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-4 w-4 rounded border flex items-center justify-center ${
                                    newVehicleForm.features.includes(feature)
                                      ? "bg-accent border-accent"
                                      : "border-text-muted"
                                  }`}
                                >
                                  {newVehicleForm.features.includes(feature) && (
                                    <CheckCircle className="h-3 w-3 text-white" />
                                  )}
                                </div>
                                <span className="text-sm text-text-primary">{feature}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        {/* Insurance & GPS */}
                        <h4 className="text-sm font-semibold text-text-primary">Additional Services</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
                            <div className="flex items-center gap-3">
                              <Shield className="h-5 w-5 text-success" />
                              <div>
                                <p className="text-sm font-medium text-text-primary">Insurance Included</p>
                                <p className="text-xs text-text-muted">Full coverage insurance</p>
                              </div>
                            </div>
                            <Switch
                              checked={newVehicleForm.insurance}
                              onCheckedChange={(checked) =>
                                setNewVehicleForm(prev => ({ ...prev, insurance: checked }))
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
                            <div className="flex items-center gap-3">
                              <MapPin className="h-5 w-5 text-info" />
                              <div>
                                <p className="text-sm font-medium text-text-primary">GPS Tracking</p>
                                <p className="text-xs text-text-muted">Real-time location tracking</p>
                              </div>
                            </div>
                            <Switch
                              checked={newVehicleForm.gps}
                              onCheckedChange={(checked) =>
                                setNewVehicleForm(prev => ({ ...prev, gps: checked }))
                              }
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <DialogFooter className="mt-6">
                      <Button type="button" variant="outline" onClick={() => setAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* View Vehicle Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
                {selectedVehicle && (
                  <>
                    {/* Hero Image */}
                    <div className="relative h-64 w-full">
                      <Image
                        src={selectedVehicle.image}
                        alt={selectedVehicle.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
                      <div className="absolute top-4 right-4">
                        <StatusBadge status={selectedVehicle.status} />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 left-4 bg-bg-primary/50 backdrop-blur-sm hover:bg-bg-primary/80"
                        onClick={() => setViewDialogOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-6">
                        <h2 className="text-2xl font-bold text-text-primary">
                          {selectedVehicle.name}
                        </h2>
                        <p className="text-text-secondary">
                          {selectedVehicle.category} • {selectedVehicle.year}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Price and Rating */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-bold text-accent">
                            {formatCurrency(selectedVehicle.price)}
                          </span>
                          <span className="text-text-muted">/day</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-warning text-warning" />
                          <span className="text-lg font-semibold text-text-primary">
                            {selectedVehicle.rating}
                          </span>
                          <span className="text-text-muted">
                            ({selectedVehicle.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                          <Users className="h-5 w-5 mx-auto text-accent mb-2" />
                          <p className="text-xs text-text-muted">Seats</p>
                          <p className="text-lg font-semibold text-text-primary">{selectedVehicle.seats}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                          <Settings className="h-5 w-5 mx-auto text-accent mb-2" />
                          <p className="text-xs text-text-muted">Transmission</p>
                          <p className="text-lg font-semibold text-text-primary">{selectedVehicle.transmission}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                          <Fuel className="h-5 w-5 mx-auto text-accent mb-2" />
                          <p className="text-xs text-text-muted">Fuel Type</p>
                          <p className="text-lg font-semibold text-text-primary">Gasoline</p>
                        </div>
                        <div className="p-4 rounded-lg bg-bg-tertiary text-center">
                          <Gauge className="h-5 w-5 mx-auto text-accent mb-2" />
                          <p className="text-xs text-text-muted">Mileage</p>
                          <p className="text-lg font-semibold text-text-primary">25k mi</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Vehicle Details */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-text-primary flex items-center gap-2">
                            <Car className="h-4 w-4 text-accent" />
                            Vehicle Information
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-text-muted">License Plate</span>
                              <span className="text-text-primary font-medium">AB-123-CD</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">VIN</span>
                              <span className="text-text-primary font-medium">1HGCM...4521</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Color</span>
                              <span className="text-text-primary font-medium">Midnight Black</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Last Service</span>
                              <span className="text-text-primary font-medium">Jan 15, 2024</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold text-text-primary flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-accent" />
                            Performance Stats
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-text-muted">Total Rentals</span>
                              <span className="text-text-primary font-medium">47</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Total Revenue</span>
                              <span className="text-success font-medium">$12,450</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Utilization Rate</span>
                              <span className="text-text-primary font-medium">78%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-muted">Avg. Rating</span>
                              <span className="text-warning font-medium">{selectedVehicle.rating} ★</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-text-primary">Features & Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {["Bluetooth", "Navigation", "Backup Camera", "Heated Seats", "Apple CarPlay", "Cruise Control", "Parking Sensors"].map(feature => (
                            <Badge key={feature} variant="secondary" className="bg-bg-tertiary">
                              <CheckCircle className="h-3 w-3 mr-1 text-success" />
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Maintenance Schedule */}
                      <div className="p-4 rounded-lg bg-bg-tertiary space-y-3">
                        <h4 className="font-semibold text-text-primary flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-warning" />
                          Maintenance Schedule
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-text-muted" />
                            <div>
                              <p className="text-xs text-text-muted">Oil Change</p>
                              <p className="text-sm text-text-primary">Due in 2,500 mi</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-text-muted" />
                            <div>
                              <p className="text-xs text-text-muted">Tire Rotation</p>
                              <p className="text-sm text-text-primary">Due in 5,000 mi</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-text-muted" />
                            <div>
                              <p className="text-xs text-text-muted">Inspection</p>
                              <p className="text-sm text-text-primary">Mar 2024</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4">
                        <Button
                          variant="outline"
                          className="text-danger hover:text-danger hover:bg-danger/10"
                          onClick={() => handleDeleteVehicle(selectedVehicle)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Vehicle
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline">
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </Button>
                          <Button onClick={() => {
                            setViewDialogOpen(false);
                            handleEditVehicle(selectedVehicle);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Vehicle
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>

            {/* Edit Vehicle Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                {selectedVehicle && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-xl flex items-center gap-2">
                        <Edit className="h-5 w-5 text-accent" />
                        Edit Vehicle
                      </DialogTitle>
                      <DialogDescription>
                        Update vehicle information and settings.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      {/* Vehicle Preview */}
                      <div className="flex items-center gap-4 p-4 rounded-lg bg-bg-tertiary">
                        <div className="relative h-20 w-32 rounded-lg overflow-hidden">
                          <Image
                            src={selectedVehicle.image}
                            alt={selectedVehicle.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">{selectedVehicle.name}</h4>
                          <p className="text-sm text-text-muted">
                            {selectedVehicle.category} • {selectedVehicle.year}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            <span className="text-xs text-text-secondary">
                              {selectedVehicle.rating} ({selectedVehicle.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Edit Form */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2">
                          <label className="text-sm font-medium text-text-primary">Vehicle Name</label>
                          <Input
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">Category</label>
                          <Select
                            value={editForm.category}
                            onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Electric">Electric</SelectItem>
                              <SelectItem value="SUV">SUV</SelectItem>
                              <SelectItem value="Luxury">Luxury</SelectItem>
                              <SelectItem value="Sports">Sports</SelectItem>
                              <SelectItem value="Sedan">Sedan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

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
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="rented">Rented</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">Daily Rate</label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              type="number"
                              className="pl-9"
                              value={editForm.price}
                              onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">Year</label>
                          <Select
                            value={editForm.year}
                            onValueChange={(value) => setEditForm(prev => ({ ...prev, year: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[2024, 2023, 2022, 2021, 2020].map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">Seats</label>
                          <Select
                            value={editForm.seats}
                            onValueChange={(value) => setEditForm(prev => ({ ...prev, seats: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[2, 4, 5, 6, 7, 8].map(seats => (
                                <SelectItem key={seats} value={seats.toString()}>
                                  {seats} seats
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">Transmission</label>
                          <Select
                            value={editForm.transmission}
                            onValueChange={(value) => setEditForm(prev => ({ ...prev, transmission: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Automatic">Automatic</SelectItem>
                              <SelectItem value="Manual">Manual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">License Plate</label>
                          <Input
                            value={editForm.licensePlate}
                            onChange={(e) => setEditForm(prev => ({ ...prev, licensePlate: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-text-primary">Current Mileage</label>
                          <div className="relative">
                            <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <Input
                              type="number"
                              className="pl-9"
                              value={editForm.mileage}
                              onChange={(e) => setEditForm(prev => ({ ...prev, mileage: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <Separator />
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-text-primary">Quick Actions</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <Button variant="outline" className="justify-start">
                            <Wrench className="h-4 w-4 mr-2 text-warning" />
                            Schedule Maintenance
                          </Button>
                          <Button variant="outline" className="justify-start">
                            <Award className="h-4 w-4 mr-2 text-accent" />
                            Set as Featured
                          </Button>
                        </div>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
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

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <Input
                  placeholder="Search vehicles..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, index) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                  onView={handleViewVehicle}
                  onEdit={handleEditVehicle}
                  onDelete={handleDeleteVehicle}
                />
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">No vehicles found</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
