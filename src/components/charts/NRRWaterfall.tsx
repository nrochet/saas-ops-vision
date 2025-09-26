import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartData } from "@/lib/types";

interface NRRWaterfallProps {
  data: ChartData[];
}

export function NRRWaterfall({ data }: NRRWaterfallProps) {
  const formatValue = (value: number) => {
    return `$${(Math.abs(value) / 1000000).toFixed(1)}M`;
  };

  const getBarColor = (category: string) => {
    switch (category) {
      case 'base':
        return 'hsl(var(--chart-1))';
      case 'positive':
        return 'hsl(var(--success))';
      case 'negative':
        return 'hsl(var(--danger))';
      default:
        return 'hsl(var(--muted))';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          NRR Waterfall Analysis
          <span className="text-sm font-normal bg-success-bg text-success px-2 py-1 rounded">
            112% NRR
          </span>
        </CardTitle>
        <CardDescription>
          Revenue retention breakdown showing expansion vs contraction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatValue}
            />
            <Tooltip 
              formatter={(value: number) => [formatValue(value), 'Amount']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Bar 
              dataKey="value"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}