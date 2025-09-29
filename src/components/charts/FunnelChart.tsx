import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Users, TrendingDown } from "lucide-react";
import { sampleAccounts } from "@/lib/sampleData";

interface FunnelData {
  startLogos: number;
  retainedLogos: number;
  churnedLogos: number;
}

const funnelData: FunnelData = {
  startLogos: 120,
  retainedLogos: 111,
  churnedLogos: 9
};

const segmentOptions = ["All Segments", "Enterprise", "Mid-Market", "SMB"];
const periodOptions = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];
const amOptions = ["All AMs", "Sarah Johnson", "Michael Chen", "Emily Rodriguez"];
const geoOptions = ["All Regions", "North America", "Europe", "Asia-Pacific"];

export function FunnelChart() {
  const [selectedSegment, setSelectedSegment] = useState("All Segments");
  const [selectedPeriod, setSelectedPeriod] = useState("Q4 2024");
  const [selectedAM, setSelectedAM] = useState("All AMs");
  const [selectedGeo, setSelectedGeo] = useState("All Regions");
  const [showFilters, setShowFilters] = useState(false);

  const retentionRate = Math.round((funnelData.retainedLogos / funnelData.startLogos) * 100);
  const churnRate = Math.round((funnelData.churnedLogos / funnelData.startLogos) * 100);

  const retainedAccounts = sampleAccounts.filter(acc => acc.riskLevel === 'safe').slice(0, 8);
  const churnedAccounts = sampleAccounts.filter(acc => acc.riskLevel === 'at-risk').slice(0, 3);

  const FunnelStage = ({ 
    label, 
    count, 
    percentage, 
    color, 
    width, 
    accounts, 
    isClickable = false 
  }: {
    label: string;
    count: number;
    percentage?: number;
    color: string;
    width: string;
    accounts?: typeof sampleAccounts;
    isClickable?: boolean;
  }) => {
    const content = (
      <div className={`relative mx-auto ${width} transition-all duration-200 ${isClickable ? 'hover:scale-105 cursor-pointer' : ''}`}>
        <div className={`h-16 ${color} rounded-lg flex items-center justify-center border-2 border-white shadow-lg`}>
          <div className="text-center">
            <div className="font-semibold text-foreground">{count} logos</div>
            {percentage && (
              <div className="text-sm text-muted-foreground">{percentage}%</div>
            )}
          </div>
        </div>
        <div className="text-center mt-2 font-medium text-sm">{label}</div>
      </div>
    );

    if (isClickable && accounts) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            {content}
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{label} - {count} Accounts</DialogTitle>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead>ARR</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Account Manager</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>${(account.arr / 1000).toFixed(0)}K</TableCell>
                    <TableCell className="capitalize">{account.segment}</TableCell>
                    <TableCell>{account.accountManager}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          account.riskLevel === 'safe'
                            ? 'bg-success-bg text-success'
                            : account.riskLevel === 'watch'
                            ? 'bg-warning-bg text-warning'
                            : 'bg-danger-bg text-danger'
                        }
                      >
                        {account.riskLevel === 'safe' ? 'Retained' : 'Churned'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      );
    }

    return content;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Logo Retention Funnel
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Customer logo retention analysis for {selectedPeriod}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periodOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Segment</label>
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {segmentOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Manager</label>
              <Select value={selectedAM} onValueChange={setSelectedAM}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {amOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Geography</label>
              <Select value={selectedGeo} onValueChange={setSelectedGeo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {geoOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Funnel Visualization */}
          <div className="space-y-4">
            <FunnelStage
              label="Start Logos"
              count={funnelData.startLogos}
              color="bg-muted"
              width="w-full max-w-md"
            />
            
            <div className="flex justify-center">
              <TrendingDown className="h-6 w-6 text-muted-foreground" />
            </div>

            <FunnelStage
              label="Retained Logos"
              count={funnelData.retainedLogos}
              percentage={retentionRate}
              color="bg-success-bg text-success"
              width="w-5/6 max-w-sm"
              accounts={retainedAccounts}
              isClickable={true}
            />

            <FunnelStage
              label="Churned Logos"
              count={funnelData.churnedLogos}
              percentage={churnRate}
              color="bg-danger-bg text-danger"
              width="w-1/6 max-w-xs"
              accounts={churnedAccounts}
              isClickable={true}
            />
          </div>

          {/* Summary Stats */}
          <div className="flex justify-center gap-6 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{retentionRate}%</div>
              <div className="text-sm text-muted-foreground">Logo Retention</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-danger">{churnRate}%</div>
              <div className="text-sm text-muted-foreground">Logo Churn</div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Key Insights</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Strong {retentionRate}% logo retention rate exceeds industry benchmark</li>
              <li>• {funnelData.churnedLogos} churned logos represent ${((funnelData.churnedLogos * 170000) / 1000000).toFixed(1)}M ARR at risk</li>
              <li>• Click on funnel segments to view detailed account lists</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
