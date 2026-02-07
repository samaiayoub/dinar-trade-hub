import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const activities = [
  { type: 'buy', asset: 'BTC', amount: '0.0015', value: '10,275 DZD', time: '2 hours ago' },
  { type: 'sell', asset: 'ETH', amount: '0.05', value: '25,000 DZD', time: '5 hours ago' },
  { type: 'buy', asset: 'USDT', amount: '100', value: '17,250 DZD', time: '1 day ago' },
  { type: 'deposit', asset: 'DZD', amount: '', value: '50,000 DZD', time: '2 days ago' },
];

export function RecentActivity() {
  return (
    <GlassCard className="h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'buy' || activity.type === 'deposit' 
                  ? 'bg-chart-up/20 text-chart-up' 
                  : 'bg-chart-down/20 text-chart-down'
              }`}>
                {activity.type === 'buy' || activity.type === 'deposit' 
                  ? <ArrowDownLeft className="w-4 h-4" /> 
                  : <ArrowUpRight className="w-4 h-4" />
                }
              </div>
              <div>
                <p className="font-medium text-foreground capitalize">
                  {activity.type} {activity.asset}
                </p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
            <div className="text-right">
              {activity.amount && (
                <p className="font-medium text-foreground">{activity.amount} {activity.asset}</p>
              )}
              <p className="text-sm text-muted-foreground">{activity.value}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
