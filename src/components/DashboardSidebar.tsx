import { BarChart3, Building2, TrendingUp, Users, Target, Settings, Home } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
const navigation = [{
  title: "Executive Overview",
  url: "/",
  icon: Home,
  role: "Manager"
}, {
  title: "Renewals & Retention",
  url: "/renewals",
  icon: Building2,
  role: "Both"
}, {
  title: "Product Adoption",
  url: "/adoption",
  icon: TrendingUp,
  role: "Both"
}, {
  title: "AM Performance",
  url: "/performance",
  icon: Users,
  role: "Both"
}, {
  title: "Forecast",
  url: "/forecast",
  icon: Target,
  role: "Manager"
}];
export function DashboardSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };
  const getNavClasses = (path: string) => {
    return isActive(path) ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground";
  };
  return <Sidebar className="w-64 bg-dashboard-sidebar border-r">
      <SidebarContent className="bg-dashboard-sidebar">
        <div className="p-6 border-b border-border/10">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-white">Account Ops</h1>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wide px-6 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {navigation.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavClasses(item.url)}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                      
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-6 border-t border-border/10">
          <SidebarMenuButton asChild>
            <button className="flex items-center gap-3 w-full px-3 py-2 text-muted-foreground hover:bg-muted rounded-lg">
              <Settings className="h-4 w-4" />
              <span className="text-sm">Settings</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>;
}