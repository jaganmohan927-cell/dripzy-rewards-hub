import { Gift, Award, Star, Trophy } from 'lucide-react';
import { mockCommunityRewards, walletStats } from '@/data/mockDashboardData';

const Rewards = () => {
  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'Milestone': return <Trophy className="w-4 h-4" />;
      case 'Weekly': return <Star className="w-4 h-4" />;
      case 'Special': return <Award className="w-4 h-4" />;
      default: return <Gift className="w-4 h-4" />;
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'Milestone': return 'bg-purple-500/20 text-purple-500';
      case 'Weekly': return 'bg-blue-500/20 text-blue-500';
      case 'Special': return 'bg-primary/20 text-primary';
      default: return 'bg-green-500/20 text-green-500';
    }
  };

  const totalRewards = mockCommunityRewards.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold">Your Tribe Perks</h1>
        <p className="text-sm md:text-base text-muted-foreground">Track your community rewards and milestones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {[
          { label: 'Total Rewards', value: `₹${totalRewards}`, icon: Gift },
          { label: 'Milestones', value: mockCommunityRewards.filter(r => r.type === 'Milestone').length, icon: Trophy },
          { label: 'Weekly Cashback', value: mockCommunityRewards.filter(r => r.type === 'Weekly').length, icon: Star },
          { label: 'Pending', value: `₹${walletStats.pendingRewards}`, icon: Award },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-4">
            <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary mb-1 md:mb-2" />
            <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Reward Tiers */}
      <div className="bg-gradient-to-br from-secondary to-card border border-border rounded-xl md:rounded-2xl p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Tribe Milestones</h2>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {[
              { tier: 'Bronze', referrals: '1-3', bonus: '₹50', achieved: true },
              { tier: 'Silver', referrals: '4-10', bonus: '₹100', achieved: false },
              { tier: 'Gold', referrals: '11+', bonus: '₹200', achieved: false },
            ].map((tier) => (
              <div 
                key={tier.tier}
                className={`border rounded-lg md:rounded-xl p-2 md:p-4 ${
                  tier.achieved 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 md:mb-2">
                  <h3 className="font-semibold text-xs md:text-base">{tier.tier}</h3>
                  {tier.achieved && (
                    <span className="text-[8px] md:text-xs bg-primary text-primary-foreground px-1 md:px-2 py-0.5 rounded-full w-fit mt-1 md:mt-0">
                      Achieved
                    </span>
                  )}
                </div>
                <p className="text-[10px] md:text-sm text-muted-foreground mb-0.5 md:mb-1">{tier.referrals} referrals</p>
                <p className="text-sm md:text-lg font-bold text-primary">{tier.bonus} bonus</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rewards History */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <h2 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Rewards History</h2>
        <div className="space-y-2 md:space-y-3">
          {mockCommunityRewards.map((reward) => (
            <div key={reward.id} className="flex items-center justify-between py-2 md:py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${getRewardColor(reward.type)}`}>
                  {getRewardIcon(reward.type)}
                </div>
                <div>
                  <p className="font-medium text-xs md:text-sm">{reward.title}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground hidden md:block">{reward.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm md:text-base text-primary">+₹{reward.amount}</p>
                <p className="text-[10px] md:text-xs text-muted-foreground">{new Date(reward.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Rewards */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <h2 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Upcoming Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            { title: 'Weekly Cashback', desc: 'Complete your weekly activity', amount: '₹50', progress: 75 },
            { title: '5 Referrals Milestone', desc: 'Refer 2 more tribe members', amount: '₹100', progress: 60 },
          ].map((upcoming) => (
            <div key={upcoming.title} className="border border-border rounded-lg p-3 md:p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-xs md:text-sm">{upcoming.title}</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{upcoming.desc}</p>
                </div>
                <span className="text-primary font-semibold text-sm md:text-base">{upcoming.amount}</span>
              </div>
              <div className="w-full h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${upcoming.progress}%` }}
                />
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-1">{upcoming.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-secondary/50 border border-border rounded-xl p-3 md:p-4">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> All rewards are part of the Dripzy Tribe community perks. 
          This is not an earning scheme — it's a simple brand Cashback reward.
        </p>
      </div>
    </div>
  );
};

export default Rewards;
