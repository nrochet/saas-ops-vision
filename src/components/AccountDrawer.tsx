import { Account } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { 
  Building2, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Users,
  Package
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface AccountDrawerProps {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountDrawer({ account, open, onOpenChange }: AccountDrawerProps) {
  if (!account) return null;

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'safe': return 'default';
      case 'watch': return 'secondary'; 
      case 'at-risk': return 'destructive';
      default: return 'default';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'bg-success';
      case 'watch': return 'bg-warning';
      case 'at-risk': return 'bg-danger';
      default: return 'bg-muted';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[480px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${getRiskColor(account.riskLevel)} flex items-center justify-center text-white font-semibold`}>
              {account.logo}
            </div>
            <div>
              <SheetTitle>{account.name}</SheetTitle>
              <SheetDescription>
                Account 360° • Managed by {account.accountManager}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Annual Recurring Revenue
              </div>
              <div className="text-2xl font-bold">
                ${(account.arr / 1000).toFixed(0)}K
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Renewal Date
              </div>
              <div className="text-lg font-semibold">
                {new Date(account.renewalDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk Assessment
            </h3>
            <div className="flex items-center justify-between">
              <span>Risk Level</span>
              <Badge variant={getRiskBadgeVariant(account.riskLevel)}>
                {account.riskLevel.toUpperCase().replace('-', ' ')}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Product Usage */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Adoption
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Products Active</span>
                <span>{account.productsActive} of {account.productsContracted}</span>
              </div>
              <Progress value={(account.productsActive / account.productsContracted) * 100} />
              
              <div className="flex justify-between text-sm">
                <span>Usage Score</span>
                <span>{account.usage}%</span>
              </div>
              <Progress value={account.usage} />
            </div>
          </div>

          <Separator />

          {/* Support & Engagement */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Engagement
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Support Tickets</span>
                <div className="font-medium">{account.supportTickets} open</div>
              </div>
              <div>
                <span className="text-muted-foreground">Last QBR</span>
                <div className="font-medium">
                  {new Date(account.lastQbr).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" variant="default">
              Schedule QBR
            </Button>
            <Button className="w-full" variant="outline">
              Create Save Plan
            </Button>
            <Button className="w-full" variant="outline">
              View Full Profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}