import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { walletStats, mockTransactions } from '@/data/mockDashboardData';

const Wallet = () => {
  const { toast } = useToast();

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Initiated",
      description: "Your withdrawal request has been submitted. It will be processed within 24-48 hours.",
    });
  };

  const getTransactionIcon = (type: string) => {
    if (type === 'Withdrawal') return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Wallet</h1>
        <p className="text-muted-foreground">Track your earnings and manage withdrawals</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-primary/20 to-card border border-primary/30 rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
              <WalletIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-4xl font-bold">₹{walletStats.balance}</p>
            </div>
          </div>
          <Button onClick={handleWithdraw} className="btn-glow">
            Withdraw to Bank
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Earned', value: `₹${walletStats.totalEarned}`, icon: TrendingUp, color: 'text-green-500' },
          { label: 'Pending', value: `₹${walletStats.pendingRewards}`, icon: Clock, color: 'text-yellow-500' },
          { label: 'Weekly Progress', value: `${walletStats.weeklyProgress}%`, icon: TrendingUp, color: 'text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Cashback Progress */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Weekly Cashback Tracker</h2>
        <div className="relative">
          <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${walletStats.weeklyProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-muted-foreground">{walletStats.weeklyProgress}% complete</span>
            <span className="text-primary font-medium">₹50 unlocking soon</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Stay active to complete your weekly cashback. Buy once, get rewarded weekly!
        </p>
      </div>

      {/* Transaction History */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Transaction History</h2>
        <div className="space-y-3">
          {mockTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'Withdrawal' ? 'bg-red-500/10' : 'bg-green-500/10'
                }`}>
                  {getTransactionIcon(txn.type)}
                </div>
                <div>
                  <p className="font-medium text-sm">{txn.type}</p>
                  <p className="text-xs text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${txn.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'}`}>
                  {txn.type === 'Withdrawal' ? '-' : '+'}₹{txn.amount}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  txn.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-secondary/50 border border-border rounded-xl p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> Withdrawals are processed within 24-48 hours. 
          Minimum withdrawal amount is ₹500. This is just a brand cashback reward feature.
        </p>
      </div>
    </div>
  );
};

export default Wallet;
