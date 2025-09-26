import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis } from "recharts";
import { Target, TrendingUp, Settings } from "lucide-react";
import { forecastData } from "@/lib/sampleData";

const accuracyTrend = [
  { quarter: "Q1 2024", planned: 2800000, actual: 2650000 },
  { quarter: "Q2 2024", planned: 3200000, actual: 3100000 },
  { quarter: "Q3 2024", planned: 2900000, actual: 3050000 },
  { quarter: "Q4 2024", planned: 4850000, actual: 4850000 }
];

const COLORS = ['hsl(var(--commit))', 'hsl(var(--best))', 'hsl(var(--upside))'];

export default function Forecast() {
  const [commitRate, setCommitRate] = useState([95]);
  const [bestRate, setBestRate] = useState([65]);
  const [upsideRate, setUpsideRate] = useState([35]);

  const calculateTotal = () => {
    return forecastData.reduce((sum, item) => {
      const rate = item.category === 'Commit' ? commitRate[0] : 
                   item.category === 'Best' ? bestRate[0] : upsideRate[0];
      return sum + (item.amount * rate / 100);
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forecast</h1>
          <p className="text-muted-foreground">Revenue forecasting and scenario planning</p>
        </div>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          👤 Manager View
        </div>
      </div>

      {/* Pipeline Roll-up */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-success">Commit (≥90%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(forecastData[0].amount / 1000000).toFixed(1)}M</div>
            <Badge className="bg-success text-success-foreground mt-2">
              {forecastData[0].probability}% probability
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-warning">Best (50-70%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(forecastData[1].amount / 1000000).toFixed(1)}M</div>
            <Badge className="bg-warning text-warning-foreground mt-2">
              {forecastData[1].probability}% probability
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-primary">Upside (&lt;50%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(forecastData[2].amount / 1000000).toFixed(1)}M</div>
            <Badge variant="secondary" className="mt-2">
              {forecastData[2].probability}% probability
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-4 w-4" />
              Total Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ${(calculateTotal() / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-muted-foreground mt-2">Weighted average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Forecast Breakdown
            </CardTitle>
            <CardDescription>
              Pipeline distribution by commit level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={forecastData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(1)}M`}
                >
                  {forecastData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, 'Amount']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Scenario Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Scenario Adjustments
            </CardTitle>
            <CardDescription>
              Adjust win rates to model different scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Commit Win Rate</span>
                <span className="text-sm text-muted-foreground">{commitRate[0]}%</span>
              </div>
              <Slider
                value={commitRate}
                onValueChange={setCommitRate}
                max={100}
                min={70}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Best Case Win Rate</span>
                <span className="text-sm text-muted-foreground">{bestRate[0]}%</span>
              </div>
              <Slider
                value={bestRate}
                onValueChange={setBestRate}
                max={80}
                min={30}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Upside Win Rate</span>
                <span className="text-sm text-muted-foreground">{upsideRate[0]}%</span>
              </div>
              <Slider
                value={upsideRate}
                onValueChange={setUpsideRate}
                max={60}
                min={10}
                step={5}
                className="w-full"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  ${(calculateTotal() / 1000000).toFixed(1)}M
                </div>
                <p className="text-sm text-muted-foreground">Scenario Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Accuracy Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Forecast Accuracy Trend</CardTitle>
          <CardDescription>
            Planned vs actual results over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Manual Legend */}
          <div className="flex items-center justify-center gap-6 mb-4 p-2 bg-muted/20 rounded">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 border-t-2 border-dashed" style={{ borderColor: 'hsl(var(--primary))' }}></div>
              <span className="text-sm font-medium">Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1" style={{ backgroundColor: 'hsl(var(--success))' }}></div>
              <span className="text-sm font-medium">Actual</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={accuracyTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="quarter" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `$${(value / 1000000).toFixed(1)}M`, 
                  name === 'planned' ? 'Planned' : 'Actual'
                ]}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="planned" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Planned"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
