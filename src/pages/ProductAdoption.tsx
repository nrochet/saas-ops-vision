import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Package, TrendingUp, Users, PlayCircle } from "lucide-react";

const productPenetration = [
  { product: "Analytics Pro", contracted: 145, active: 132, penetration: 91 },
  { product: "Data Sync", contracted: 98, active: 87, penetration: 89 },
  { product: "ML Insights", contracted: 76, active: 54, penetration: 71 },
  { product: "Advanced Reports", contracted: 156, active: 98, penetration: 63 }
];

const adoptionPipeline = [
  { stage: "Contracted", count: 234, color: "hsl(var(--chart-1))" },
  { stage: "First Use", count: 198, color: "hsl(var(--chart-2))" },
  { stage: "Active", count: 171, color: "hsl(var(--success))" }
];

export default function ProductAdoption() {
  const [viewMode, setViewMode] = useState<'manager' | 'ic'>('manager');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Product Adoption</h1>
          <p className="text-muted-foreground">Track product penetration and expansion opportunities</p>
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
          {/* Product Penetration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Penetration
              </CardTitle>
              <CardDescription>
                Percentage of contracted customers actively using each product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {productPenetration.map((product) => (
                <div key={product.product} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{product.product}</span>
                    <span className="text-muted-foreground">
                      {product.active}/{product.contracted} ({product.penetration}%)
                    </span>
                  </div>
                  <Progress value={product.penetration} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Adoption Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Adoption Pipeline
              </CardTitle>
              <CardDescription>
                Customer journey from contract to active usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={adoptionPipeline} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inactive Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contracted but Inactive
              </CardTitle>
              <CardDescription>
                Accounts with unused product licenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "DataFlow Inc", product: "ML Insights", arr: 280000, daysInactive: 45 },
                  { name: "CloudScale Systems", product: "Advanced Reports", arr: 125000, daysInactive: 78 },
                  { name: "TechStart Pro", product: "Data Sync", arr: 85000, daysInactive: 23 }
                ].map((account) => (
                  <div key={`${account.name}-${account.product}`} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sm">{account.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {account.product} • Inactive {account.daysInactive} days
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        ${(account.arr / 1000).toFixed(0)}K
                      </Badge>
                      <Button size="sm" variant="outline">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Enable
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Playbook Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Adoption Playbook Tracker</CardTitle>
              <CardDescription>
                Track expansion plays by stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: "Demo Scheduled", count: 12, accounts: ["TechCorp", "InnovateLabs", "ScaleUp"] },
                  { stage: "POC in Progress", count: 8, accounts: ["DataFlow", "CloudScale", "GrowthCorp"] },
                  { stage: "Addendum Sent", count: 5, accounts: ["TechStart", "FlexiSoft"] },
                  { stage: "Closed Won", count: 3, accounts: ["PowerTech"] }
                ].map((item) => (
                  <div key={item.stage} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">{item.stage}</h4>
                      <Badge>{item.count}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.accounts.map((account) => (
                        <Badge key={account} variant="outline" className="text-xs">
                          {account}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}