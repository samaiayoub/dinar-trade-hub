import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageToggle } from '@/components/LanguageToggle';
import { TrendingUp, Lock, User, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('login.error'));
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
      
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-green">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <span className="text-3xl font-bold gradient-text">CryptoDinar</span>
          </div>
          <p className="text-muted-foreground">{t('login.tagline')}</p>
        </div>

        <GlassCard className="animate-float" style={{ animationDuration: '8s' }}>
          <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
            {t('login.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-muted-foreground">{t('login.username')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('login.username.placeholder')}
                  className="pl-11 bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary/20 h-12"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">{t('login.password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.password.placeholder')}
                  className="pl-11 bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary/20 h-12"
                  required
                  dir="ltr"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground font-semibold btn-glow hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {t('login.signing_in')}
                </span>
              ) : (
                t('login.button')
              )}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-glass-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">{t('login.or')}</span>
              </div>
            </div>

            <Link to="/signup">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-glass-border bg-secondary/30 hover:bg-secondary/50 text-foreground"
              >
                {t('login.signup')}
              </Button>
            </Link>
          </form>
        </GlassCard>

        <p className="text-center text-muted-foreground text-sm mt-6">
          {t('login.terms')}
        </p>
      </div>
    </div>
  );
}
