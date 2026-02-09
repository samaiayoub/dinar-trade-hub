import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpRight, Upload, CheckCircle2, Copy, AlertTriangle } from 'lucide-react';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'form' | 'tax' | 'success';

const TAX_CCP_ACCOUNT = '00799999004405080606';
const TAX_AMOUNT = 650;

export function WithdrawDialog({ open, onOpenChange }: WithdrawDialogProps) {
  const { t, isRTL } = useLanguage();
  const [step, setStep] = useState<Step>('form');
  const [ccpAccount, setCcpAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [confirmCcp, setConfirmCcp] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContinue = () => {
    if (ccpAccount && amount) {
      setStep('tax');
    }
  };

  const handleSubmit = () => {
    if (confirmCcp && receiptFile) {
      setStep('success');
    }
  };

  const handleClose = () => {
    setStep('form');
    setCcpAccount('');
    setAmount('');
    setConfirmCcp('');
    setReceiptFile(null);
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleCopyAccount = async () => {
    await navigator.clipboard.writeText(TAX_CCP_ACCOUNT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-glass-border sm:max-w-md">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-primary" />
                {t('withdraw.title')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {isRTL ? 'أدخل تفاصيل حسابك للسحب' : 'Enter your account details to withdraw'}
              </DialogDescription>
              <p className="text-sm text-warning mt-2">
                {isRTL ? 'الحد الأدنى 2000 - الحد الأقصى 50000 DA' : 'Minimum 2000 - Maximum 50000 DA'}
              </p>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="ccp" className="text-muted-foreground">
                  {t('withdraw.ccp_account')}
                </Label>
                <Input
                  id="ccp"
                  value={ccpAccount}
                  onChange={(e) => setCcpAccount(e.target.value)}
                  placeholder={t('withdraw.ccp_placeholder')}
                  className="bg-secondary/50 border-glass-border focus:border-primary"
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-muted-foreground">
                  {t('withdraw.amount')}
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={t('withdraw.amount_placeholder')}
                  className="bg-secondary/50 border-glass-border focus:border-primary"
                  dir="ltr"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 border-glass-border bg-secondary/30 hover:bg-secondary/50"
                >
                  {t('withdraw.cancel')}
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={!ccpAccount || !amount}
                  className="flex-1 bg-primary text-primary-foreground btn-glow"
                >
                  {t('withdraw.continue')}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'tax' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                {t('withdraw.tax_title')}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  {t('withdraw.tax_message')}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground">{t('withdraw.send_to')}</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary/50 border border-glass-border rounded-lg p-3 font-mono text-lg text-primary" dir="ltr">
                    {TAX_CCP_ACCOUNT}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyAccount}
                    className="border-glass-border bg-secondary/30 hover:bg-secondary/50"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-center text-2xl font-bold text-warning mt-2">
                  {TAX_AMOUNT} DA
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-muted-foreground">{t('withdraw.upload_receipt')}</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-glass-border bg-secondary/30 hover:bg-secondary/50 h-20 flex flex-col gap-2"
                >
                  <Upload className="w-6 h-6" />
                  {receiptFile ? (
                    <span className="text-sm text-primary">{receiptFile.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? 'انقر لتحميل صورة الإيصال' : 'Click to upload receipt image'}
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmCcp" className="text-muted-foreground">
                  {t('withdraw.your_ccp')}
                </Label>
                <Input
                  id="confirmCcp"
                  value={confirmCcp}
                  onChange={(e) => setConfirmCcp(e.target.value)}
                  placeholder={t('withdraw.ccp_placeholder')}
                  className="bg-secondary/50 border-glass-border focus:border-primary"
                  dir="ltr"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('form')}
                  className="flex-1 border-glass-border bg-secondary/30 hover:bg-secondary/50"
                >
                  {t('withdraw.cancel')}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!confirmCcp || !receiptFile}
                  className="flex-1 bg-primary text-primary-foreground btn-glow"
                >
                  {t('withdraw.submit')}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                {t('withdraw.success_title')}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  {t('withdraw.success_message')}
                </p>
              </div>
              
              <div className="bg-secondary/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('withdraw.amount')}:</span>
                  <span className="text-foreground font-semibold">{amount} DZD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('withdraw.ccp_account')}:</span>
                  <span className="text-foreground font-mono" dir="ltr">{ccpAccount}</span>
                </div>
              </div>
              
              <Button
                onClick={handleClose}
                className="w-full bg-primary text-primary-foreground btn-glow"
              >
                {t('withdraw.close')}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
