import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AccountDrawer } from "@/components/AccountDrawer";
import { Account } from "@/lib/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isAccountDrawerOpen, setIsAccountDrawerOpen] = useState(false);

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account);
    setIsAccountDrawerOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-dashboard-bg">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

        <AccountDrawer
          account={selectedAccount}
          open={isAccountDrawerOpen}
          onOpenChange={setIsAccountDrawerOpen}
        />
      </div>
    </SidebarProvider>
  );
}