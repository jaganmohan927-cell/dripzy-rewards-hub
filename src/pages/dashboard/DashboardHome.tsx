import { Link } from 'react-router-dom';
import { Wallet, Users, ShoppingBag, Gift, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { walletStats, referralStats, mockOrders } from '@/data/mockDashboardData';

const DashboardHome = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Wallet,
      label: 'Wallet Balance',
      value: `₹${walletStats.balance}`,
      subtext: `₹${walletStats.pendingRewards} pending`,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      link: '/dashboard/wallet'
    },
    {
      icon: Users,
      label: 'Total Referrals',
      value: referralStats.totalReferrals,
      subtext: `₹${referralStats.totalRewards} earned`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      link: '/dashboard/referral'
    },
    {
      icon: ShoppingBag,
      label: 'Total Orders',
      value: mockOrders.length,
      subtext: '1 in progress',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      link: '/dashboard/orders'
    },
    {
      icon: Gift,
      label: 'Total Rewards',
      value: `₹${walletStats.totalEarned}`,
      subtext: 'Lifetime earnings',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      link: '/dashboard/rewards'
    },
  ];

  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-secondary to-card border border-border rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">
            Welcome to the Dripzy Tribe, <span className="text-gradient">{user?.name}!</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track your rewards, manage orders, and grow your tribe from your personal dashboard.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-5 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <div className={`w-8 h-8 md:w-10 md:h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color}`} />
              </div>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
            <p className="text-[10px] md:text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1">{stat.subtext}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Referral Card */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sm md:text-base">Share & Earn</h2>
              <p className="text-xs md:text-sm text-muted-foreground">Get ₹200 per referral</p>
            </div>
          </div>
          <div className="bg-secondary rounded-lg p-3 md:p-4 mb-3 md:mb-4">
            <p className="text-[10px] md:text-xs text-muted-foreground mb-1">Your Referral Code</p>
            <p className="font-mono font-bold text-base md:text-lg text-primary">{user?.referralCode}</p>
          </div>
          <Link to="/dashboard/referral">
            <button className="w-full bg-primary text-primary-foreground py-2 md:py-2.5 rounded-lg font-semibold text-sm md:text-base hover:bg-primary/90 transition-colors">
              Share & Earn Rewards
            </button>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="font-semibold text-sm md:text-base">Recent Orders</h2>
            <Link to="/dashboard/orders" className="text-xs md:text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-2 md:space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium text-xs md:text-sm">{order.id}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-xs md:text-sm">₹{order.total}</p>
                  <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' :
                    order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <h2 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Weekly Cashback Progress</h2>
        <div className="relative">
          <div className="w-full h-2 md:h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${walletStats.weeklyProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs md:text-sm">
            <span className="text-muted-foreground">{walletStats.weeklyProgress}% complete</span>
            <span className="text-primary font-medium">₹50 cashback unlocking soon</span>
          </div>
        </div>
        <p className="text-[10px] md:text-xs text-muted-foreground mt-2 md:mt-3">
          Complete your weekly activity to unlock your cashback reward!
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
