import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Made by Badge */}
      <Link
        href="https://webnum.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 px-3 py-1.5 text-xs font-medium text-text-secondary bg-bg-secondary/90 backdrop-blur-sm border border-border rounded-full hover:text-accent hover:border-accent/50 transition-all duration-200 shadow-lg"
      >
        Made by <span className="text-accent font-semibold">webnum.com</span>
      </Link>
    </>
  );
}
