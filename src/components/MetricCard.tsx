import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard as MetricCardType } from "@/lib/types";

export function MetricCard({ title, value, change, trend, target, role }: MetricCardType) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-danger" />;
      case 'flat':
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      case 'flat':
        return 'text-muted-foreground';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {role === 'manager' ? '👤 Manager' : role === 'ic' ? '👨‍💼 IC' : '🤝 Both'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {target && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Target className="h-3 w-3" />
                {target}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-muted-foreground">vs last period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}