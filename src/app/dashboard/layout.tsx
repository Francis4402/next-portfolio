"use client"

import "../globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import SiteHeader from "./components/site-header";
import { usePathname } from "next/navigation";

const routeNames: Record<string, string> = {
  "dashboard": "Dashboard",
  "projects": "Projects", 
  "blogs": "Blogs",
  "messages": "Messages",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const currentRouteName = routeNames[pathname.split('/').pop() || 'dashboard'] || "Dashboard";

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
          <SiteHeader currentPage={currentRouteName} />
          {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
