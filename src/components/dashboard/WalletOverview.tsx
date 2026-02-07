import { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Loader2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { WithdrawDialog } from './WithdrawDialog';
import { toast } from '@/hooks/use-toast';

export function WalletOverview() {
  const { t, isRTL } = useLanguage();
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);

  const handleDepositClick = async () => {
    setDepositLoading(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDepositLoading(false);
    toast({
      variant: "destructive",
      title: isRTL ? "خطأ في الشبكة" : "Network Error",
      description: isRTL ? "مشكلة في الشبكة. يرجى المحاولة مرة أخرى لاحقاً." : "Network problem. Please try again later.",
    });
  };

  return (
    <>
      <GlassCard glow="green" className="h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
          <p className="text-sm text-muted-foreground">{t('wallet.total_balance')}</p>
            <h2 className="text-3xl font-bold text-foreground">240294 <span className="text-lg font-normal text-muted-foreground">DA</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{t('wallet.available')}</p>
            <p className="text-lg font-semibold text-foreground">224294 DA</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">{t('wallet.in_orders')}</p>
            <p className="text-lg font-semibold text-foreground">16000 DA</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-primary text-primary-foreground btn-glow"
            onClick={handleDepositClick}
            disabled={depositLoading}
          >
            {depositLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <ArrowDownLeft className="w-4 h-4 mr-2" />
            )}
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
