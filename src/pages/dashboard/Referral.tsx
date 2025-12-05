import { useState } from 'react';
import { Copy, Share2, Users, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockReferrals, referralStats } from '@/data/mockDashboardData';

const Referral = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const referralLink = `https://dripzy.life/ref/${user?.referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Dripzy Life',
          text: `Use my code ${user?.referralCode} to join the Dripzy Tribe and get exclusive perks!`,
          url: referralLink
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Share the Drip, Get Rewarded</h1>
        <p className="text-muted-foreground">Earn ₹200 for every friend who joins the tribe</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Referrals', value: referralStats.totalReferrals, icon: Users },
          { label: 'Completed', value: referralStats.completedReferrals, icon: Check },
          { label: 'Total Earned', value: `₹${referralStats.totalRewards}`, icon: Gift },
          { label: 'Pending', value: `₹${referralStats.pendingRewards}`, icon: Gift },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <stat.icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Referral Card */}
      <div className="bg-gradient-to-br from-secondary to-card border border-border rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-4">Your Referral Code</h2>
          
          <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <p className="text-3xl font-mono font-bold text-primary text-center">
              {user?.referralCode}
            </p>
          </div>

          <div className="bg-secondary rounded-xl p-3 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Referral Link</p>
            <div className="flex items-center gap-2">
              <p className="flex-1 text-sm font-mono truncate">{referralLink}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCopy} className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: 1, title: 'Share Your Code', desc: 'Send your unique referral link to friends' },
            { step: 2, title: 'Friend Joins', desc: 'They sign up and make their first purchase' },
            { step: 3, title: 'Get Rewarded', desc: 'You receive ₹200 reward in your wallet' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral List */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Your Referrals</h2>
        {mockReferrals.length > 0 ? (
          <div className="space-y-3">
            {mockReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="font-semibold text-sm">{referral.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(referral.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">+₹{referral.reward}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    referral.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {referral.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No referrals yet. Share your code to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Referral;
