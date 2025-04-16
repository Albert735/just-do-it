import Sidebar from "@/components/ui/sidebar";
import DashboardNav from "@/components/ui/dashboardNav";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[230px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:block border-r border-gray-200 dark:border-white/10 bg-white dark:bg-black ">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        <header>
          <DashboardNav />
        </header>

        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        {/* placed toaster component from sonner here  */}
        <Toaster />
      </div>
    </div>
  );
}
