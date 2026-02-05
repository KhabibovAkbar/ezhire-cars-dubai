"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Settings, Star, MoreHorizontal, Eye, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Vehicle } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  onView?: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, index, onView, onEdit, onDelete }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden group">
        {/* Image */}
        <div className="relative h-48 bg-bg-tertiary overflow-hidden">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <StatusBadge status={vehicle.status} />
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title and Category */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-text-primary text-lg">
                {vehicle.name}
              </h3>
              <p className="text-sm text-text-muted">
                {vehicle.category} • {vehicle.year}
              </p>
            </div>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{vehicle.seats} seats</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-text-primary">
                {formatCurrency(vehicle.price)}
              </span>
              <span className="text-text-muted">/day</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium text-text-primary">
                {vehicle.rating}
              </span>
              <span className="text-text-muted">({vehicle.reviews})</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1"
              size="sm"
              onClick={() => onView?.(vehicle)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              size="sm"
              onClick={() => onEdit?.(vehicle)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Set as Featured</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-danger"
                  onClick={() => onDelete?.(vehicle)}
                >
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
