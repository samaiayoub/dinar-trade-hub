import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Login page
    'login.title': 'Login to Your Account',
    'login.username': 'Username',
    'login.username.placeholder': 'Enter your username',
    'login.password': 'Password',
    'login.password.placeholder': 'Enter your password',
    'login.button': 'Login',
    'login.signing_in': 'Signing in...',
    'login.or': 'or',
    'login.signup': 'Sign Up',
    'login.error': 'Invalid username or password',
    'login.terms': 'By continuing, you agree to our Terms of Service and Privacy Policy',
    'login.tagline': 'Trade crypto with Algerian Dinars',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back, Trader',
    'dashboard.subtitle': "Here's what's happening with your portfolio today.",
    'dashboard.markets': 'Markets',
    'dashboard.trade': 'Trade',
    'dashboard.wallets': 'Wallets',
    'dashboard.logout': 'Logout',
    'dashboard.footer': '© 2024 CryptoDinar. All rights reserved. Trade responsibly.',
    
    // Wallet
    'wallet.total_balance': 'Total Balance',
    'wallet.available': 'Available',
    'wallet.in_orders': 'In Orders',
    'wallet.deposit': 'Deposit',
    'wallet.withdraw': 'Withdraw',
    'wallet.baridi_mob': 'Baridi Mob',
    
    // Withdraw dialog
    'withdraw.title': 'Withdraw via Baridi Mob',
    'withdraw.ccp_account': 'Your CCP Account',
    'withdraw.ccp_placeholder': 'Enter your CCP account number',
    'withdraw.amount': 'Amount',
    'withdraw.amount_placeholder': 'Enter amount in DZD',
    'withdraw.continue': 'Continue',
    'withdraw.cancel': 'Cancel',
    'withdraw.tax_title': 'Tax Payment Required',
    'withdraw.tax_message': 'A processing fee of 650 DA must be paid via Baridi Mob. This fee is required for the withdrawal funds to be transferred to your account.',
    'withdraw.send_to': 'Send 650 DA to this CCP account:',
    'withdraw.upload_receipt': 'Upload Payment Receipt',
    'withdraw.your_ccp': 'Confirm Your CCP Account',
    'withdraw.submit': 'Submit Withdrawal Request',
    'withdraw.success_title': 'Request Submitted',
    'withdraw.success_message': 'Your withdrawal request has been submitted. We will process it within 24-48 hours after verifying your payment.',
    'withdraw.close': 'Close',
    
    // Trade panel
    'trade.quick_trade': 'Quick Trade',
    'trade.buy': 'Buy',
    'trade.sell': 'Sell',
    'trade.amount': 'Amount',
    'trade.price': 'Price',
    'trade.total': 'Total',
    'trade.buy_btc': 'Buy BTC',
    'trade.sell_btc': 'Sell BTC',
    
    // Activity
    'activity.recent': 'Recent Activity',
    'activity.bought': 'Bought',
    'activity.sold': 'Sold',
    'activity.deposit': 'Deposit',
    'activity.completed': 'Completed',
    
    // Crypto
    'crypto.volume': 'Volume',
  },
  ar: {
    // Login page
    'login.title': 'تسجيل الدخول إلى حسابك',
    'login.username': 'اسم المستخدم',
    'login.username.placeholder': 'أدخل اسم المستخدم',
    'login.password': 'كلمة المرور',
    'login.password.placeholder': 'أدخل كلمة المرور',
    'login.button': 'تسجيل الدخول',
    'login.signing_in': 'جاري تسجيل الدخول...',
    'login.or': 'أو',
    'login.signup': 'إنشاء حساب',
    'login.error': 'اسم المستخدم أو كلمة المرور غير صحيحة',
    'login.terms': 'بالمتابعة، فإنك توافق على شروط الخدمة وسياسة الخصوصية',
    'login.tagline': 'تداول العملات المشفرة بالدينار الجزائري',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك، متداول',
    'dashboard.subtitle': 'إليك ما يحدث مع محفظتك اليوم.',
    'dashboard.markets': 'الأسواق',
    'dashboard.trade': 'التداول',
    'dashboard.wallets': 'المحافظ',
    'dashboard.logout': 'تسجيل الخروج',
    'dashboard.footer': '© 2024 كريبتو دينار. جميع الحقوق محفوظة. تداول بمسؤولية.',
    
    // Wallet
    'wallet.total_balance': 'الرصيد الإجمالي',
    'wallet.available': 'المتاح',
    'wallet.in_orders': 'في الطلبات',
    'wallet.deposit': 'إيداع',
    'wallet.withdraw': 'سحب',
    'wallet.baridi_mob': 'بريدي موب',
    
    // Withdraw dialog
    'withdraw.title': 'السحب عبر بريدي موب',
    'withdraw.ccp_account': 'حساب CCP الخاص بك',
    'withdraw.ccp_placeholder': 'أدخل رقم حساب CCP',
    'withdraw.amount': 'المبلغ',
    'withdraw.amount_placeholder': 'أدخل المبلغ بالدينار',
    'withdraw.continue': 'متابعة',
    'withdraw.cancel': 'إلغاء',
    'withdraw.tax_title': 'مطلوب دفع الضريبة',
    'withdraw.tax_message': 'يجب دفع رسوم معالجة قدرها 650 دج عبر بريدي موب. هذه الرسوم مطلوبة لتحويل أموال السحب إلى حسابك.',
    'withdraw.send_to': 'أرسل 650 دج إلى حساب CCP هذا:',
    'withdraw.upload_receipt': 'تحميل إيصال الدفع',
    'withdraw.your_ccp': 'تأكيد حساب CCP الخاص بك',
    'withdraw.submit': 'إرسال طلب السحب',
    'withdraw.success_title': 'تم إرسال الطلب',
    'withdraw.success_message': 'تم إرسال طلب السحب الخاص بك. سنقوم بمعالجته خلال 24-48 ساعة بعد التحقق من الدفع.',
    'withdraw.close': 'إغلاق',
    
    // Trade panel
    'trade.quick_trade': 'تداول سريع',
    'trade.buy': 'شراء',
    'trade.sell': 'بيع',
    'trade.amount': 'الكمية',
    'trade.price': 'السعر',
    'trade.total': 'الإجمالي',
    'trade.buy_btc': 'شراء BTC',
    'trade.sell_btc': 'بيع BTC',
    
    // Activity
    'activity.recent': 'النشاط الأخير',
    'activity.bought': 'شراء',
    'activity.sold': 'بيع',
    'activity.deposit': 'إيداع',
    'activity.completed': 'مكتمل',
    
    // Crypto
    'crypto.volume': 'الحجم',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
