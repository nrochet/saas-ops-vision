import { MetricCard } from "@/components/MetricCard";
import { NRRWaterfall } from "@/components/charts/NRRWaterfall";
import { ProductBreadthChart } from "@/components/charts/ProductBreadthChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { executiveMetrics, nrrWaterfallData, productBreadthData } from "@/lib/sampleData";

export default function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Executive Overview</h1>
          <p className="text-muted-foreground">High-level metrics for account management leadership</p>
        </div>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          👤 Manager View
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NRRWaterfall data={nrrWaterfallData} />
        <ProductBreadthChart data={productBreadthData} />
      </div>

      {/* Alerts Panel */}
      <AlertsPanel />
    </div>
  );
}