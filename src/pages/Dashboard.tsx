import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CryptoCard } from '@/components/dashboard/CryptoCard';
import { PriceChart } from '@/components/dashboard/PriceChart';
import { WalletOverview } from '@/components/dashboard/WalletOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TradePanel } from '@/components/dashboard/TradePanel';
import { Button } from '@/components/ui/button';
import { TrendingUp, LogOut, Bell, Settings, Bitcoin } from 'lucide-react';

// Mock price data
const btcData = [
  { time: '00:00', price: 6750000 },
  { time: '04:00', price: 6820000 },
  { time: '08:00', price: 6780000 },
  { time: '12:00', price: 6900000 },
  { time: '16:00', price: 6850000 },
  { time: '20:00', price: 6920000 },
  { time: '24:00', price: 6850000 },
];

const ethData = [
  { time: '00:00', price: 485000 },
  { time: '04:00', price: 492000 },
  { time: '08:00', price: 488000 },
  { time: '12:00', price: 505000 },
  { time: '16:00', price: 498000 },
  { time: '20:00', price: 510000 },
  { time: '24:00', price: 500000 },
];

const cryptoData = [
  { symbol: 'BTC/DA', name: 'Bitcoin', price: '6850000', change: 3.5, volume: '54000', icon: <Bitcoin className="w-5 h-5 text-warning" /> },
  { symbol: 'ETH/DA', name: 'Ethereum', price: '500000', change: 2.1, volume: '152500', icon: <span className="text-lg">⟠</span> },
  { symbol: 'USDT/DA', name: 'Tether', price: '172500', change: 0.0, volume: '200250', icon: <span className="text-lg text-chart-up">₮</span> },
  { symbol: 'BNB/DA', name: 'BNB', price: '42000', change: 1.8, volume: '34850', icon: <span className="text-lg text-warning">◆</span> },
];

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-green">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold gradient-text">CryptoDinar</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-foreground font-medium">Dashboard</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Markets</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Trade</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Wallets</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-glass-border bg-secondary/30 hover:bg-secondary/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Trader</h1>
          <p className="text-muted-foreground">Here's what's happening with your portfolio today.</p>
        </div>

        {/* Top Row - Wallet and Trade */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <WalletOverview />
          </div>
          <div>
            <TradePanel />
          </div>
        </div>

        {/* Crypto Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cryptoData.map((crypto) => (
            <CryptoCard key={crypto.symbol} {...crypto} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PriceChart title="BTC/DZD Price" data={btcData} color="green" />
          <PriceChart title="ETH/DZD Price" data={ethData} color="cyan" />
        </div>

        {/* Recent Activity */}
        <div className="max-w-2xl">
          <RecentActivity />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 CryptoDinar. All rights reserved. Trade responsibly.</p>
        </div>
      </footer>
    </div>
  );
}
