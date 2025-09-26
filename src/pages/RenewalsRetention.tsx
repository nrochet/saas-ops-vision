import { useState } from "react";
import { RiskBoard } from "@/components/RiskBoard";
import { RenewalCalendar } from "@/components/charts/RenewalCalendar";
import { CohortChart } from "@/components/charts/CohortChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cohortData } from "@/lib/sampleData";

export default function RenewalsRetention() {
  const [viewMode, setViewMode] = useState<'manager' | 'ic'>('ic');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Renewals & Retention</h1>
          <p className="text-muted-foreground">Track renewal pipeline and retention metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'manager' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('manager')}
            >
              Manager View
            </Button>
            <Button
              variant={viewMode === 'ic' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('ic')}
            >
              IC View
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'manager' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RenewalCalendar />
          <CohortChart data={cohortData} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-success-bg text-success">
              18 Safe Accounts
            </Badge>
            <Badge variant="secondary" className="bg-warning-bg text-warning">
              5 Watch Accounts  
            </Badge>
            <Badge variant="secondary" className="bg-danger-bg text-danger">
              3 At-Risk Accounts
            </Badge>
          </div>
          <RiskBoard />
        </div>
      )}
    </div>
  );
}