// import { Sidebar } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid min-h-screen w-full lg:grid-cols-[230px_1fr] ">
      <Sidebar />
      {children}
    </section>
  );
}
