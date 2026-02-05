"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/components/LanguageProvider";
import type { TranslationKey } from "@/lib/translations";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, isRTL } = useLanguage();

  const handleLogout = () => {
    router.push("/");
  };

  const mainNavItems = [
    { titleKey: "dashboard" as TranslationKey, href: "/dashboard", icon: LayoutDashboard },
    { titleKey: "vehicles" as TranslationKey, href: "/vehicles", icon: Car },
    { titleKey: "bookings" as TranslationKey, href: "/bookings", icon: Calendar },
    { titleKey: "customers" as TranslationKey, href: "/customers", icon: Users },
    { titleKey: "revenue" as TranslationKey, href: "/revenue", icon: DollarSign },
    { titleKey: "analytics" as TranslationKey, href: "/analytics", icon: BarChart3 },
  ];

  const otherNavItems = [
    { titleKey: "reviews" as TranslationKey, href: "/reviews", icon: Star },
    { titleKey: "settings" as TranslationKey, href: "/settings", icon: Settings },
    { titleKey: "help" as TranslationKey, href: "#", icon: HelpCircle },
  ];

  const NavLink = ({
    item,
  }: {
    item: { titleKey: TranslationKey; href: string; icon: React.ComponentType<{ className?: string }> };
  }) => {
    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
    const Icon = item.icon;

    return (
      <Link href={item.href} onClick={onClose}>
        <motion.div
          whileHover={{ x: isRTL ? -4 : 4 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            isActive
              ? "bg-accent/10 text-accent border-l-2 rtl:border-l-0 rtl:border-r-2 border-accent"
              : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
          )}
        >
          <Icon className={cn("h-5 w-5", isActive && "text-accent")} />
          <span>{t(item.titleKey)}</span>
        </motion.div>
      </Link>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-text-primary leading-tight">Ezhire Cars</span>
            <span className="text-[10px] text-accent font-medium -mt-0.5">DUBAI</span>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {/* Main Menu */}
          <div>
            <p className="px-3 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Main Menu
            </p>
            <nav className="space-y-1">
              {mainNavItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>

          <Separator className="bg-border" />

          {/* Other */}
          <div>
            <p className="px-3 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
              Other
            </p>
            <nav className="space-y-1">
              {otherNavItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-border shrink-0">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-semibold text-sm">
              KA
            </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              Khalid Al Ameri
            </p>
            <p className="text-xs text-text-muted truncate">Administrator</p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={handleLogout}>
            <LogOut className="h-4 w-4 text-text-muted hover:text-danger" />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - Always visible */}
      <aside className="hidden lg:flex fixed top-0 left-0 rtl:left-auto rtl:right-0 z-40 h-screen w-[260px] bg-bg-secondary border-r rtl:border-r-0 rtl:border-l border-border flex-col">
        <SidebarContent />
      </aside>

      {/* Desktop spacer */}
      <div className="hidden lg:block w-[260px] shrink-0" />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />

            {/* Mobile sidebar panel */}
            <motion.aside
              initial={{ x: isRTL ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 280 : -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "fixed top-0 z-50 h-screen w-[260px] bg-bg-secondary border-border flex flex-col lg:hidden",
                isRTL ? "right-0 border-l" : "left-0 border-r"
              )}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={onClick}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
