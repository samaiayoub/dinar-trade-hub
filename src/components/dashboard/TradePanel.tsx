import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TradePanel() {
  const [amount, setAmount] = useState('');

  return (
    <GlassCard className="h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Trade</h3>
      
      <Tabs defaultValue="buy" className="w-full">
        <TabsList className="w-full bg-secondary/50 p-1 mb-4">
          <TabsTrigger 
            value="buy" 
            className="flex-1 data-[state=active]:bg-chart-up data-[state=active]:text-primary-foreground"
          >
            Buy
          </TabsTrigger>
          <TabsTrigger 
            value="sell"
            className="flex-1 data-[state=active]:bg-chart-down data-[state=active]:text-foreground"
          >
            Sell
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy" className="space-y-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Amount (DZD)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-secondary/50 border-glass-border h-12"
            />
          </div>
          
          <div className="flex gap-2">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <Button
                key={percent}
                variant="outline"
                size="sm"
                className="flex-1 border-glass-border bg-secondary/30 hover:bg-secondary/50 text-xs"
                onClick={() => setAmount(String(245000 * parseInt(percent) / 100))}
              >
                {percent}
              </Button>
            ))}
          </div>

          <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You'll receive (est.)</span>
              <span className="text-foreground font-medium">
                {amount ? (parseFloat(amount) / 6850000).toFixed(8) : '0.00000000'} BTC
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span className="text-foreground">0.1%</span>
            </div>
          </div>

          <Button className="w-full h-12 bg-chart-up text-primary-foreground font-semibold hover:bg-chart-up/90">
            Buy BTC
          </Button>
        </TabsContent>

        <TabsContent value="sell" className="space-y-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Amount (BTC)</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00000000"
              className="bg-secondary/50 border-glass-border h-12"
            />
          </div>

          <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You'll receive (est.)</span>
              <span className="text-foreground font-medium">
                {amount ? (parseFloat(amount) * 6850000).toLocaleString() : '0'} DZD
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee</span>
              <span className="text-foreground">0.1%</span>
            </div>
          </div>

          <Button className="w-full h-12 bg-chart-down text-foreground font-semibold hover:bg-chart-down/90">
            Sell BTC
          </Button>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
}
