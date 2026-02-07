import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface CryptoCardProps {
  symbol: string;
  name: string;
  price: string;
  change: number;
  volume: string;
  icon: React.ReactNode;
}

export function CryptoCard({ symbol, name, price, change, volume, icon }: CryptoCardProps) {
  const isPositive = change >= 0;

  return (
    <GlassCard className="hover:border-primary/30 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{symbol}</h3>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium",
          isPositive ? "bg-chart-up/10 text-chart-up" : "bg-chart-down/10 text-chart-down"
        )}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground">{price} <span className="text-sm font-normal text-muted-foreground">DZD</span></p>
        <p className="text-sm text-muted-foreground">Vol: {volume}</p>
      </div>
    </GlassCard>
  );
}
