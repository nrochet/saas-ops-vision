import { Account, AccountManager, MetricCard, ChartData } from "./types";

export const sampleAccounts: Account[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    logo: "TC",
    arr: 450000,
    renewalDate: "Renew:202x-12-15",
    riskLevel: "safe",
    nrr: 115,
    productsActive: 3,
    productsContracted: 3,
    usage: 87,
    supportTickets: 2,
    lastQbr: "2024-09-15",
    forecastCategory: "commit",
    accountManager: "Sarah Johnson",
    segment: "enterprise"
  },
  {
    id: "2", 
    name: "DataFlow Inc",
    logo: "DF",
    arr: 280000,
    renewalDate: "Renew:2024-11-30",
    riskLevel: "watch",
    nrr: 95,
    productsActive: 2,
    productsContracted: 4,
    usage: 65,
    supportTickets: 8,
    lastQbr: "2024-06-20",
    forecastCategory: "best",
    accountManager: "Mike Chen",
    segment: "mid-market"
  },
  {
    id: "3",
    name: "CloudScale Systems",
    logo: "CS",
    arr: 125000,
    renewalDate: "Renew:2025-01-20",
    riskLevel: "at-risk",
    nrr: 82,
    productsActive: 1,
    productsContracted: 2,
    usage: 34,
    supportTickets: 15,
    lastQbr: "2024-03-10",
    forecastCategory: "upside",
    accountManager: "Alex Rivera",
    segment: "smb"
  },
  {
    id: "4",
    name: "InnovateLabs",
    logo: "IL",
    arr: 680000,
    renewalDate: "Renew:2024-12-31",
    riskLevel: "safe",
    nrr: 125,
    productsActive: 4,
    productsContracted: 4,
    usage: 92,
    supportTickets: 1,
    lastQbr: "2024-10-01",
    forecastCategory: "commit",
    accountManager: "Sarah Johnson",
    segment: "enterprise"
  },
  {
    id: "5",
    name: "Growth Dynamics",
    logo: "GD", 
    arr: 95000,
    renewalDate: "Renew:2024-11-15",
    riskLevel: "watch",
    nrr: 89,
    productsActive: 2,
    productsContracted: 3,
    usage: 58,
    supportTickets: 5,
    lastQbr: "2024-08-15",
    forecastCategory: "best",
    accountManager: "David Park",
    segment: "smb"
  }
];

export const sampleAccountManagers: AccountManager[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    arr: 1130000,
    accounts: 8,
    nrr: 118,
    retention: 95,
    segment: "Enterprise"
  },
  {
    id: "2", 
    name: "Mike Chen",
    arr: 850000,
    accounts: 12,
    nrr: 108,
    retention: 89,
    segment: "Mid-Market"
  },
  {
    id: "3",
    name: "Alex Rivera", 
    arr: 420000,
    accounts: 15,
    nrr: 95,
    retention: 85,
    segment: "SMB"
  },
  {
    id: "4",
    name: "David Park",
    arr: 675000,
    accounts: 10,
    nrr: 112,
    retention: 92,
    segment: "Mid-Market"
  }
];

export const executiveMetrics: MetricCard[] = [
  {
    title: "Net Revenue Retention",
    value: "104%", 
    change: 8,
    trend: "up",
    target: 115,
    role: "manager"
  },
  {
    title: "Logo Retention",
    value: "93%",
    change: -2,
    trend: "down", 
    target: 95,
    role: "manager"
  },
  {
    title: "ARR per AM",
    value: "$2.1M",
    change: 12,
    trend: "up",
    role: "manager"
  },
  {
    title: "Product Breadth",
    value: "2.4",
    change: 5,
    trend: "up",
    role: "manager"
  }
];

export const nrrWaterfallData: ChartData[] = [
  { name: "Starting ARR", value: 12500000, category: "base" },
  { name: "Expansions", value: 2100000, category: "positive" },
  { name: "Contractions", value: -650000, category: "negative" },
  { name: "Churn", value: -890000, category: "negative" },
  { name: "Ending ARR", value: 13000000, category: "base" }
];

export const productBreadthData: ChartData[] = [
  { name: "1 Product", value: 28, color: "var(--chart-1)" },
  { name: "2 Products", value: 34, color: "var(--chart-2)" },
  { name: "3 Products", value: 25, color: "var(--chart-3)" },
  { name: "4+ Products", value: 13, color: "var(--chart-4)" }
];

export const cohortData = [
  { month: "Jan", retention: 100 },
  { month: "Feb", retention: 96 },
  { month: "Mar", retention: 94 },
  { month: "Apr", retention: 93 },
  { month: "May", retention: 92 },
  { month: "Jun", retention: 91 },
  { month: "Jul", retention: 90 },
  { month: "Aug", retention: 89 },
  { month: "Sep", retention: 88 },
  { month: "Oct", retention: 87 },
  { month: "Nov", retention: 87 },
  { month: "Dec", retention: 86 }
];

export const forecastData = [
  { category: "Commit", amount: 2800000, probability: 95 },
  { category: "Best", amount: 1200000, probability: 65 },
  { category: "Upside", amount: 850000, probability: 35 }
];
