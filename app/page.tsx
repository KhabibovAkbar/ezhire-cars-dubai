"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, ArrowRight, Shield, Clock, MapPin, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const features = [
    {
      icon: Car,
      title: "Premium Fleet",
      description: "Luxury and economy vehicles for every need",
    },
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Comprehensive coverage for peace of mind",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
    },
    {
      icon: MapPin,
      title: "Dubai Locations",
      description: "Convenient pickup points across Dubai",
    },
  ];

  const stats = [
    { value: "500+", label: "Vehicles" },
    { value: "10K+", label: "Happy Customers" },
    { value: "4.9", label: "Rating" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-border bg-bg-primary/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-text-primary">Ezhire Cars</span>
                <span className="text-[10px] text-accent font-medium -mt-1">DUBAI</span>
              </div>
            </Link>

            {/* Auth buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-text-secondary hover:text-text-primary">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-accent hover:bg-accent-hover text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-accent" />
              #1 Car Rental in Dubai
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Premium Car Rental
              <span className="text-accent"> Experience</span> in Dubai
            </h1>
            
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Discover our premium fleet of vehicles. From luxury sports cars to comfortable SUVs, 
              we have the perfect ride for your Dubai adventure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-8">
                  Start Renting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-border text-text-primary hover:bg-bg-tertiary">
                  View Dashboard Demo
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Why Choose Ezhire Cars?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Experience the best car rental service in Dubai with our premium features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-bg-secondary border border-border hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20"
          >
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Ready to Hit the Road?
            </h2>
            <p className="text-text-secondary mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers and experience premium car rental in Dubai.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-8">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
              <Car className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-text-secondary">
              © 2024 Ezhire Cars Dubai. All rights reserved.
            </span>
          </div>
          <Link
            href="https://webnum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-accent transition-colors"
          >
            Made by <span className="font-semibold">webnum.com</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
