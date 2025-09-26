import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const renewalData = [
  { period: "Next 30 days", arr: 2400000, accounts: 8, status: "at-risk" },
  { period: "31-60 days", arr: 1850000, accounts: 12, status: "watch" },
  { period: "61-90 days", arr: 3200000, accounts: 15, status: "safe" },
  { period: "91-120 days", arr: 1600000, accounts: 9, status: "safe" }
];

export function RenewalCalendar() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-success text-success-foreground';
      case 'watch': return 'bg-warning text-warning-foreground';
      case 'at-risk': return 'bg-danger text-danger-foreground';
      default: return 'bg-muted';
    }
  };

  const getTotalARR = () => {
    return renewalData.reduce((sum, item) => sum + item.arr, 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Renewal Calendar Heatmap
        </CardTitle>
        <CardDescription>
          ARR up for renewal in upcoming periods • Total: ${(getTotalARR() / 1000000).toFixed(1)}M
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {renewalData.map((item) => (
            <div key={item.period} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium w-24">{item.period}</div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">ARR: </span>
                  <span className="font-semibold">${(item.arr / 1000000).toFixed(1)}M</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Accounts: </span>
                  <span className="font-semibold">{item.accounts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Key Insights</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• High-risk renewals concentrated in next 30 days</li>
            <li>• Q1 pipeline looking strong with $4.8M in 61-120 days</li>
            <li>• Focus efforts on 8 accounts in immediate renewal window</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}