import { createContext, useContext } from "react";
import { Account } from "@/lib/types";

interface AccountContextType {
  handleAccountSelect: (account: Account) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function useAccountContext() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccountContext must be used within an AccountProvider');
  }
  return context;
}

export { AccountContext };