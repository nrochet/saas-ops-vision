import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Users, TrendingUp, Target, Award } from "lucide-react";
import { sampleAccountManagers } from "@/lib/sampleData";

const teamEfficiency = [
  { name: "Sarah Johnson", arr: 2100000, efficiency: 118 },
  { name: "Mike Chen", arr: 1850000, efficiency: 108 },
  { name: "David Park", arr: 1675000, efficiency: 112 },
  { name: "Alex Rivera", arr: 1420000, efficiency: 95 }
];

export default function AMPerformance() {
  const [viewMode, setViewMode] = useState<'manager' | 'ic'>('manager');

  const personalScorecard = {
    name: "Sarah Johnson",
    arrManaged: 2100000,
    retentionRate: 95,
    breadthUplift: 0.3,
    savePlans: 2,
    adoptionPlays: 8,
    qbrStatus: "On Track"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AM Performance</h1>
          <p className="text-muted-foreground">Account manager metrics and team performance</p>
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
        <div className="space-y-6">
          {/* Manager KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Team NRR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">108%</div>
                <p className="text-sm text-muted-foreground">+3% vs last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-destructive" />
                  Churn $
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">$420K</div>
                <p className="text-sm text-muted-foreground">-15% vs last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Expansion $
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">$1.2M</div>
                <p className="text-sm text-muted-foreground">+18% vs last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Product Breadth Uplift
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+0.4</div>
                <p className="text-sm text-muted-foreground">Products per customer</p>
              </CardContent>
            </Card>
          </div>

          {/* Team Book of Business */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Book of Business
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="pb-3">Account Manager</th>
                      <th className="pb-3">ARR Managed</th>
                      <th className="pb-3"># Accounts</th>
                      <th className="pb-3">NRR</th>
                      <th className="pb-3">Retention</th>
                      <th className="pb-3">Segment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sampleAccountManagers.map((am) => (
                      <tr key={am.id} className="text-sm">
                        <td className="py-3 font-medium">{am.name}</td>
                        <td className="py-3">${(am.arr / 1000000).toFixed(1)}M</td>
                        <td className="py-3">{am.accounts}</td>
                        <td className="py-3">
                          <Badge variant={am.nrr >= 110 ? 'default' : am.nrr >= 100 ? 'secondary' : 'destructive'}>
                            {am.nrr}%
                          </Badge>
                        </td>
                        <td className="py-3">{am.retention}%</td>
                        <td className="py-3">{am.segment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ARR Efficiency Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                ARR per AM vs Team Average
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamEfficiency} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, 'ARR Managed']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="arr" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Personal Scorecard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  ARR Managed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(personalScorecard.arrManaged / 1000000).toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground">+12% vs last quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Retention Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{personalScorecard.retentionRate}%</div>
                <Progress value={personalScorecard.retentionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Breadth Uplift</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{personalScorecard.breadthUplift}</div>
                <p className="text-sm text-muted-foreground">Products per customer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">QBR Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-success text-success-foreground">
                  {personalScorecard.qbrStatus}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">8 of 8 completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Initiatives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Save Plans in Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { account: "CloudScale Systems", risk: "High", actions: "Usage audit scheduled", daysOpen: 12 },
                    { account: "DataFlow Inc", risk: "Medium", actions: "Executive sponsor meeting", daysOpen: 5 }
                  ].map((plan) => (
                    <div key={plan.account} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{plan.account}</h4>
                        <Badge variant={plan.risk === 'High' ? 'destructive' : 'secondary'}>
                          {plan.risk} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{plan.actions}</p>
                      <p className="text-xs text-muted-foreground">Open for {plan.daysOpen} days</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adoption Plays by Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: "Discovery", count: 3, color: "bg-chart-1" },
                    { stage: "Demo", count: 2, color: "bg-chart-2" },
                    { stage: "POC", count: 2, color: "bg-chart-3" },
                    { stage: "Negotiation", count: 1, color: "bg-success" }
                  ].map((stage) => (
                    <div key={stage.stage} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="text-sm font-medium">{stage.stage}</span>
                      </div>
                      <Badge variant="outline">{stage.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}