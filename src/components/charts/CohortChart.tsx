import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CohortChartProps {
  data: Array<{ month: string; retention: number }>;
}

export function CohortChart({ data }: CohortChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cohort Survival Analysis</CardTitle>
        <CardDescription>
          12-month retention curve for accounts starting in January 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[80, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Retention Rate']}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="retention" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-lg">86%</div>
            <div className="text-muted-foreground">12-Month Retention</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">-14%</div>
            <div className="text-muted-foreground">Total Churn</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">92%</div>
            <div className="text-muted-foreground">Industry Benchmark</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}