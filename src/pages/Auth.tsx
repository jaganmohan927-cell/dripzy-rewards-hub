import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = isSignUp 
        ? await signUp(email, password, name)
        : await signIn(email, password);

      if (result.success) {
        toast({
          title: isSignUp ? "Welcome to the Tribe!" : "Welcome back!",
          description: isSignUp ? "Your account has been created successfully." : "You've signed in successfully.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-border rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Join the Dripzy Tribe</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Join thousands of tribe members and unlock exclusive perks.'
              : 'Sign in to access your dashboard and rewards.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <div className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 bg-secondary border-border"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary border-border pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 6 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full btn-glow py-6 font-bold"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isSignUp ? 'Join the Tribe' : 'Sign In')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-semibold ml-2 hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>
        </form>

        {/* Benefits */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">What you'll unlock:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Weekly Cashback', '₹200 per referral', 'Tribe Perks'].map((perk) => (
              <span key={perk} className="text-xs bg-secondary border border-border rounded-full px-3 py-1">
                {perk}
              </span>
            ))}
          </div>
        </div>

        {/* Back to Shop */}
        <div className="mt-8 text-center">
          <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">
            ← Continue shopping without signing in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
