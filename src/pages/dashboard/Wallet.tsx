import { useState } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Clock, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { walletStats, mockTransactions } from '@/data/mockDashboardData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Wallet = () => {
  const { toast } = useToast();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({
    accountName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    amount: '',
  });

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Number(withdrawForm.amount) < 500) {
      toast({
        title: "Minimum Amount Required",
        description: "Minimum withdrawal amount is ₹500",
        variant: "destructive"
      });
      return;
    }

    if (Number(withdrawForm.amount) > walletStats.balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Withdrawal Initiated",
      description: `₹${withdrawForm.amount} will be transferred to ${withdrawForm.bankName} within 24-48 hours.`,
    });
    setShowWithdrawModal(false);
    setWithdrawForm({
      accountName: '',
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      amount: '',
    });
  };

  const getTransactionIcon = (type: string) => {
    if (type === 'Withdrawal') return <ArrowUpRight className="w-4 h-4 text-red-500" />;
    return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold">My Wallet</h1>
        <p className="text-sm md:text-base text-muted-foreground">Track your earnings and manage withdrawals</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-primary/20 to-card border border-primary/30 rounded-xl md:rounded-2xl p-4 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
              <WalletIcon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl md:text-4xl font-bold">₹{walletStats.balance}</p>
            </div>
          </div>
          <Button onClick={() => setShowWithdrawModal(true)} className="btn-glow text-sm md:text-base">
            Withdraw to Bank
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {[
          { label: 'Total Earned', value: `₹${walletStats.totalEarned}`, icon: TrendingUp, color: 'text-green-500' },
          { label: 'Pending', value: `₹${walletStats.pendingRewards}`, icon: Clock, color: 'text-yellow-500' },
          { label: 'Progress', value: `${walletStats.weeklyProgress}%`, icon: TrendingUp, color: 'text-primary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-4">
            <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color} mb-1 md:mb-2`} />
            <p className="text-base md:text-xl font-bold">{stat.value}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Cashback Progress */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <h2 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Weekly Cashback Tracker</h2>
        <div className="relative">
          <div className="w-full h-3 md:h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full transition-all duration-500"
              style={{ width: `${walletStats.weeklyProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs md:text-sm">
            <span className="text-muted-foreground">{walletStats.weeklyProgress}% complete</span>
            <span className="text-primary font-medium">₹50 unlocking soon</span>
          </div>
        </div>
        <p className="text-[10px] md:text-xs text-muted-foreground mt-3">
          Stay active to complete your weekly cashback. Buy once, get rewarded weekly!
        </p>
      </div>

      {/* Transaction History */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-6">
        <h2 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Transaction History</h2>
        <div className="space-y-2 md:space-y-3">
          {mockTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between py-2 md:py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-2 md:gap-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'Withdrawal' ? 'bg-red-500/10' : 'bg-green-500/10'
                }`}>
                  {getTransactionIcon(txn.type)}
                </div>
                <div>
                  <p className="font-medium text-xs md:text-sm">{txn.type}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm md:text-base ${txn.type === 'Withdrawal' ? 'text-red-500' : 'text-green-500'}`}>
                  {txn.type === 'Withdrawal' ? '-' : '+'}₹{txn.amount}
                </p>
                <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full ${
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
      <div className="bg-secondary/50 border border-border rounded-xl p-3 md:p-4">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Note:</span> Withdrawals are processed within 24-48 hours. 
          Minimum withdrawal amount is ₹500. This is just a brand cashback reward feature.
        </p>
      </div>

      {/* Withdrawal Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="sm:max-w-md mx-4 bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl">Withdraw to Bank</DialogTitle>
            <DialogDescription>
              Enter your bank details to withdraw your rewards. Min ₹500.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleWithdrawSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input
                id="accountName"
                value={withdrawForm.accountName}
                onChange={(e) => setWithdrawForm(prev => ({ ...prev, accountName: e.target.value }))}
                placeholder="Enter full name as per bank"
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={withdrawForm.bankName}
                onChange={(e) => setWithdrawForm(prev => ({ ...prev, bankName: e.target.value }))}
                placeholder="e.g., State Bank of India"
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={withdrawForm.accountNumber}
                onChange={(e) => setWithdrawForm(prev => ({ ...prev, accountNumber: e.target.value }))}
                placeholder="Enter account number"
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={withdrawForm.ifscCode}
                onChange={(e) => setWithdrawForm(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                placeholder="e.g., SBIN0001234"
                className="mt-1.5 bg-secondary border-border"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="amount">Amount to Withdraw</Label>
              <Input
                id="amount"
                type="number"
                value={withdrawForm.amount}
                onChange={(e) => setWithdrawForm(prev => ({ ...prev, amount: e.target.value }))}
                placeholder={`Max ₹${walletStats.balance}`}
                className="mt-1.5 bg-secondary border-border"
                min={500}
                max={walletStats.balance}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Available: ₹{walletStats.balance} • Minimum: ₹500
              </p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 btn-glow">
                Confirm Withdrawal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
