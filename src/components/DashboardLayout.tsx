import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AccountDrawer } from "@/components/AccountDrawer";
import { Account } from "@/lib/types";
import { AccountContext } from "@/contexts/AccountContext";

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

  const handleForecastCategoryChange = (accountId: string, category: 'commit' | 'best' | 'upside') => {
    // Update the selected account's forecast category
    if (selectedAccount && selectedAccount.id === accountId) {
      setSelectedAccount({
        ...selectedAccount,
        forecastCategory: category
      });
    }
    // In a real app, you'd also want to persist this change to your backend
    console.log(`Updated account ${accountId} forecast category to ${category}`);
  };

  return (
    <AccountContext.Provider value={{ handleAccountSelect }}>
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
            onForecastCategoryChange={handleForecastCategoryChange}
          />
        </div>
      </SidebarProvider>
    </AccountContext.Provider>
  );
}