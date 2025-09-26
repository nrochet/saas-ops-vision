import { AlertTriangle, TrendingUp, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const riskAlerts = [
  { account: "CloudScale Systems", arr: 125000, risk: "High churn risk - usage down 45%" },
  { account: "DataFlow Inc", arr: 280000, risk: "Overdue QBR - last meeting 4 months ago" },
  { account: "TechStart Pro", arr: 85000, risk: "Support tickets trending up 300%" }
];

const opportunities = [
  { account: "TechCorp Solutions", arr: 450000, opportunity: "Ready for Enterprise+ upgrade" },
  { account: "InnovateLabs", arr: 680000, opportunity: "3 unused products - demo scheduled" },
  { account: "ScaleUp Inc", arr: 220000, opportunity: "Lookalike for Analytics module" }
];

export function AlertsPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Risk Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-danger">
            <AlertTriangle className="h-5 w-5" />
            Top ARR at Risk
          </CardTitle>
          <CardDescription>
            Accounts requiring immediate attention
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {riskAlerts.map((alert) => (
            <div key={alert.account} className="flex items-center justify-between p-3 bg-danger-bg rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{alert.account}</h4>
                  <Badge variant="outline" className="text-xs">
                    ${(alert.arr / 1000).toFixed(0)}K ARR
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.risk}</p>
              </div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Expansion Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            Cross-Sell Opportunities
          </CardTitle>
          <CardDescription>
            High-probability expansion opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {opportunities.map((opp) => (
            <div key={opp.account} className="flex items-center justify-between p-3 bg-success-bg rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{opp.account}</h4>
                  <Badge variant="outline" className="text-xs">
                    ${(opp.arr / 1000).toFixed(0)}K ARR
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{opp.opportunity}</p>
              </div>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}