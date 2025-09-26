export interface Account {
  id: string;
  name: string;
  logo?: string;
  arr: number;
  renewalDate: string;
  riskLevel: 'safe' | 'watch' | 'at-risk';
  nrr: number;
  productsActive: number;
  productsContracted: number;
  usage: number;
  supportTickets: number;
  lastQbr: string;
  forecastCategory: 'commit' | 'best' | 'upside';
  accountManager: string;
  segment: 'enterprise' | 'mid-market' | 'smb';
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'flat';
  target?: number;
  role: 'manager' | 'ic' | 'both';
}

export interface ChartData {
  name: string;
  value: number;
  category?: string;
  color?: string;
}

export interface AccountManager {
  id: string;
  name: string;
  arr: number;
  accounts: number;
  nrr: number;
  retention: number;
  segment: string;
}