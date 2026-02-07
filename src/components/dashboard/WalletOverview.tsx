import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { WithdrawDialog } from './WithdrawDialog';

export function WalletOverview() {
  const { t } = useLanguage();
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <>
      <GlassCard glow="green" className="h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('wallet.total_balance')}</p>
            <h2 className="text-3xl font-bold text-foreground">261,000 <span className="text-lg font-normal text-muted-foreground">DZD</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{t('wallet.available')}</p>
            <p className="text-lg font-semibold text-foreground">245,000 DZD</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{t('wallet.in_orders')}</p>
            <p className="text-lg font-semibold text-foreground">16,000 DZD</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1 bg-primary text-primary-foreground btn-glow">
            <ArrowDownLeft className="w-4 h-4 mr-2" />
            {t('wallet.deposit')}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-glass-border bg-secondary/30 hover:bg-secondary/50"
            onClick={() => setWithdrawOpen(true)}
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            {t('wallet.withdraw')} - {t('wallet.baridi_mob')}
          </Button>
        </div>
      </GlassCard>

      <WithdrawDialog open={withdrawOpen} onOpenChange={setWithdrawOpen} />
    </>
  );
}
