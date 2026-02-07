import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TrendingUp, User, Mail, Lock, CalendarIcon, AlertCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [birthday, setBirthday] = useState<Date>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Always fail with network error
    setError('Network problem. Please try again later.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow-green">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <span className="text-3xl font-bold gradient-text">CryptoDinar</span>
          </div>
          <p className="text-muted-foreground">Create your trading account</p>
        </div>

        <GlassCard>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-muted-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="pl-11 bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary/20 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-muted-foreground">Birthday</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal bg-secondary/50 border-glass-border hover:bg-secondary/70",
                      !birthday && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
                    {birthday ? format(birthday, "PPP") : <span>Select your birthday</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card border-glass-border" align="start">
                  <Calendar
                    mode="single"
                    selected={birthday}
                    onSelect={setBirthday}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-11 bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary/20 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="pl-11 bg-secondary/50 border-glass-border focus:border-primary focus:ring-primary/20 h-12"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
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
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </GlassCard>

        <p className="text-center text-muted-foreground text-sm mt-6">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
