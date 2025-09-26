import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, TrendingDown } from "lucide-react";
import { sampleAccounts } from "@/lib/sampleData";

export function RiskBoard() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const groupedAccounts = {
    safe: sampleAccounts.filter(acc => acc.riskLevel === 'safe'),
    watch: sampleAccounts.filter(acc => acc.riskLevel === 'watch'), 
    'at-risk': sampleAccounts.filter(acc => acc.riskLevel === 'at-risk')
  };

  const getColumnColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'border-success bg-success-bg';
      case 'watch': return 'border-warning bg-warning-bg';
      case 'at-risk': return 'border-danger bg-danger-bg';
      default: return 'border-border bg-muted';
    }
  };

  const getColumnTitle = (risk: string) => {
    switch (risk) {
      case 'safe': return '✅ Safe';
      case 'watch': return '⚠️ Watch';
      case 'at-risk': return '🚨 At Risk';
      default: return risk;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(groupedAccounts).map(([risk, accounts]) => (
        <Card key={risk} className={`${getColumnColor(risk)} border-2`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {getColumnTitle(risk)}
              <Badge variant="secondary">{accounts.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {accounts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No accounts in this category</p>
              </div>
            ) : (
              accounts.map((account) => (
                <Card 
                  key={account.id} 
                  className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                    selectedAccount === account.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedAccount(account.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{account.name}</h4>
                        <p className="text-xs text-muted-foreground">{account.segment}</p>
                      </div>
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded flex items-center justify-center text-xs font-bold">
                        {account.logo}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">ARR</span>
                        <div className="font-semibold">${(account.arr / 1000).toFixed(0)}K</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">NRR</span>
                        <div className="font-semibold">{account.nrr}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(account.renewalDate).toLocaleDateString()}
                      </div>
                      {account.riskLevel === 'at-risk' && (
                        <div className="flex items-center gap-1 text-danger">
                          <TrendingDown className="h-3 w-3" />
                          Usage: {account.usage}%
                        </div>
                      )}
                    </div>

                    <Button size="sm" variant="outline" className="w-full text-xs">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}