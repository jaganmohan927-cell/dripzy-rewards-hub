export interface Order {
  id: string;
  date: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  trackingId?: string;
}

export interface Referral {
  id: string;
  name: string;
  email: string;
  date: string;
  reward: number;
  status: 'Completed' | 'Pending';
}

export interface Transaction {
  id: string;
  type: 'Referral Reward' | 'Weekly Cashback' | 'Withdrawal' | 'Community Perk';
  amount: number;
  date: string;
  status: 'Completed' | 'Pending';
}

export interface CommunityReward {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: 'Milestone' | 'Weekly' | 'Special';
}

export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2025-12-01',
    items: [
      { name: 'Midnight Drip Tee', size: 'L', quantity: 1, price: 999 },
      { name: 'Golden Hour Oversized', size: 'M', quantity: 1, price: 999 }
    ],
    total: 1998,
    status: 'Delivered',
    trackingId: 'SHIP123456'
  },
  {
    id: 'ORD002',
    date: '2025-12-03',
    items: [
      { name: 'Shadow Wave Tee', size: 'XL', quantity: 2, price: 999 }
    ],
    total: 1998,
    status: 'Shipped',
    trackingId: 'SHIP789012'
  },
  {
    id: 'ORD003',
    date: '2025-12-05',
    items: [
      { name: 'Urban Phantom Tee', size: 'M', quantity: 1, price: 999 }
    ],
    total: 999,
    status: 'Processing'
  }
];

export const mockReferrals: Referral[] = [
  { id: 'REF001', name: 'Rahul Sharma', email: 'rahul@email.com', date: '2025-11-28', reward: 200, status: 'Completed' },
  { id: 'REF002', name: 'Priya Patel', email: 'priya@email.com', date: '2025-11-30', reward: 200, status: 'Completed' },
  { id: 'REF003', name: 'Amit Kumar', email: 'amit@email.com', date: '2025-12-02', reward: 200, status: 'Completed' },
  { id: 'REF004', name: 'Sneha Gupta', email: 'sneha@email.com', date: '2025-12-04', reward: 200, status: 'Pending' },
];

export const mockTransactions: Transaction[] = [
  { id: 'TXN001', type: 'Referral Reward', amount: 200, date: '2025-11-28', status: 'Completed' },
  { id: 'TXN002', type: 'Weekly Cashback', amount: 50, date: '2025-11-29', status: 'Completed' },
  { id: 'TXN003', type: 'Referral Reward', amount: 200, date: '2025-11-30', status: 'Completed' },
  { id: 'TXN004', type: 'Weekly Cashback', amount: 50, date: '2025-12-01', status: 'Completed' },
  { id: 'TXN005', type: 'Referral Reward', amount: 200, date: '2025-12-02', status: 'Completed' },
  { id: 'TXN006', type: 'Community Perk', amount: 100, date: '2025-12-03', status: 'Completed' },
  { id: 'TXN007', type: 'Weekly Cashback', amount: 50, date: '2025-12-04', status: 'Pending' },
];

export const mockCommunityRewards: CommunityReward[] = [
  { id: 'CR001', title: 'Welcome Bonus', description: 'Reward for joining the Dripzy Tribe', amount: 100, date: '2025-11-25', type: 'Milestone' },
  { id: 'CR002', title: 'Week 1 Cashback', description: 'Weekly cashback reward', amount: 50, date: '2025-11-29', type: 'Weekly' },
  { id: 'CR003', title: 'First Referral Milestone', description: 'Completed your first referral!', amount: 50, date: '2025-11-28', type: 'Milestone' },
  { id: 'CR004', title: 'Week 2 Cashback', description: 'Weekly cashback reward', amount: 50, date: '2025-12-01', type: 'Weekly' },
  { id: 'CR005', title: '3 Referrals Milestone', description: 'Referred 3 tribe members!', amount: 100, date: '2025-12-02', type: 'Milestone' },
];

export const walletStats = {
  balance: 850,
  totalEarned: 1050,
  pendingRewards: 250,
  weeklyProgress: 75, // percentage
};

export const referralStats = {
  totalReferrals: 4,
  completedReferrals: 3,
  totalRewards: 600,
  pendingRewards: 200,
};
