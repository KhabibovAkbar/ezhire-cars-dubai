export type Language = "en" | "ar";

export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    vehicles: "Vehicles",
    bookings: "Bookings",
    customers: "Customers",
    revenue: "Revenue",
    analytics: "Analytics",
    reviews: "Reviews",
    settings: "Settings",
    help: "Help & Support",
    logout: "Logout",
    
    // Dashboard
    welcomeBack: "Welcome back",
    totalRevenue: "Total Revenue",
    totalBookings: "Total Bookings",
    fleetStatus: "Fleet Status",
    totalCustomers: "Total Customers",
    vsLastMonth: "vs last month",
    available: "Available",
    rented: "Rented",
    maintenance: "Maintenance",
    revenueOverview: "Revenue Overview",
    recentBookings: "Recent Bookings",
    topVehicles: "Top Vehicles",
    viewAll: "View All",
    
    // Vehicles
    allVehicles: "All Vehicles",
    vehiclesInFleet: "vehicles in your fleet",
    addNewVehicle: "Add New Vehicle",
    allTypes: "All Types",
    allStatus: "All Status",
    searchVehicles: "Search vehicles...",
    view: "View",
    edit: "Edit",
    perDay: "/day",
    seats: "seats",
    
    // Bookings
    allBookings: "All Bookings",
    bookingsFound: "bookings found",
    newBooking: "New Booking",
    searchBookings: "Search bookings...",
    bookingId: "Booking ID",
    customer: "Customer",
    vehicle: "Vehicle",
    dates: "Dates",
    total: "Total",
    status: "Status",
    actions: "Actions",
    active: "Active",
    pending: "Pending",
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
    
    // Customers
    allCustomers: "All Customers",
    customersFound: "customers found",
    addCustomer: "Add Customer",
    searchCustomers: "Search customers...",
    vipCustomers: "VIP Customers",
    totalSpent: "Total Spent",
    memberSince: "Member Since",
    viewProfile: "View Profile",
    
    // Common
    search: "Search",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    close: "Close",
    create: "Create",
    update: "Update",
    all: "All",
    
    // Header
    notifications: "Notifications",
    profile: "Profile",
    
    // Locations
    dubaiMall: "Dubai Mall",
    dubaiMarina: "Dubai Marina",
    palmJumeirah: "Palm Jumeirah",
    downtownDubai: "Downtown Dubai",
    dubaiAirport: "Dubai Airport (DXB)",
    abuDhabi: "Abu Dhabi",
    
    // Branding
    companyName: "Ezhire Cars Dubai",
    tagline: "Premium Car Rental",
  },
  ar: {
    // Navigation
    dashboard: "لوحة التحكم",
    vehicles: "المركبات",
    bookings: "الحجوزات",
    customers: "العملاء",
    revenue: "الإيرادات",
    analytics: "التحليلات",
    reviews: "المراجعات",
    settings: "الإعدادات",
    help: "المساعدة والدعم",
    logout: "تسجيل الخروج",
    
    // Dashboard
    welcomeBack: "مرحباً بعودتك",
    totalRevenue: "إجمالي الإيرادات",
    totalBookings: "إجمالي الحجوزات",
    fleetStatus: "حالة الأسطول",
    totalCustomers: "إجمالي العملاء",
    vsLastMonth: "مقارنة بالشهر الماضي",
    available: "متاح",
    rented: "مؤجر",
    maintenance: "صيانة",
    revenueOverview: "نظرة عامة على الإيرادات",
    recentBookings: "الحجوزات الأخيرة",
    topVehicles: "أفضل المركبات",
    viewAll: "عرض الكل",
    
    // Vehicles
    allVehicles: "جميع المركبات",
    vehiclesInFleet: "مركبة في أسطولك",
    addNewVehicle: "إضافة مركبة جديدة",
    allTypes: "جميع الأنواع",
    allStatus: "جميع الحالات",
    searchVehicles: "البحث عن مركبات...",
    view: "عرض",
    edit: "تعديل",
    perDay: "/يوم",
    seats: "مقاعد",
    
    // Bookings
    allBookings: "جميع الحجوزات",
    bookingsFound: "حجز موجود",
    newBooking: "حجز جديد",
    searchBookings: "البحث عن حجوزات...",
    bookingId: "رقم الحجز",
    customer: "العميل",
    vehicle: "المركبة",
    dates: "التواريخ",
    total: "المجموع",
    status: "الحالة",
    actions: "الإجراءات",
    active: "نشط",
    pending: "قيد الانتظار",
    upcoming: "قادم",
    completed: "مكتمل",
    cancelled: "ملغي",
    
    // Customers
    allCustomers: "جميع العملاء",
    customersFound: "عميل موجود",
    addCustomer: "إضافة عميل",
    searchCustomers: "البحث عن عملاء...",
    vipCustomers: "عملاء VIP",
    totalSpent: "إجمالي المصروفات",
    memberSince: "عضو منذ",
    viewProfile: "عرض الملف",
    
    // Common
    search: "بحث",
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    close: "إغلاق",
    create: "إنشاء",
    update: "تحديث",
    all: "الكل",
    
    // Header
    notifications: "الإشعارات",
    profile: "الملف الشخصي",
    
    // Locations
    dubaiMall: "دبي مول",
    dubaiMarina: "دبي مارينا",
    palmJumeirah: "نخلة جميرا",
    downtownDubai: "وسط دبي",
    dubaiAirport: "مطار دبي الدولي",
    abuDhabi: "أبوظبي",
    
    // Branding
    companyName: "إيزهاير كارز دبي",
    tagline: "تأجير سيارات فاخرة",
  },
};

export type TranslationKey = keyof typeof translations.en;
