import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';

interface PriceChartProps {
  title: string;
  data: { time: string; price: number }[];
  color?: 'green' | 'cyan';
}

export function PriceChart({ title, data, color = 'green' }: PriceChartProps) {
  const chartColor = color === 'green' ? 'hsl(156, 100%, 50%)' : 'hsl(187, 100%, 50%)';
  const gradientId = `gradient-${color}`;

  return (
    <GlassCard className="h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              domain={['dataMin - 100000', 'dataMax + 100000']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 10%)',
                border: '1px solid hsl(222, 30%, 25%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
              formatter={(value: number) => [`${value.toLocaleString()} DZD`, 'Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
