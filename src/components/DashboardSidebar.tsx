import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Wallet, 
  Gift, 
  User,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders' },
    { icon: Users, label: 'Referrals', path: '/dashboard/referral' },
    { icon: Wallet, label: 'Wallet', path: '/dashboard/wallet' },
    { icon: Gift, label: 'Rewards', path: '/dashboard/rewards' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-card border-r border-border transition-all duration-300 z-40 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* User Info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {collapsed && user && (
        <div className="p-3 border-b border-border flex justify-center">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              isActive(item.path)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              collapsed && "justify-center"
            )}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          onClick={signOut}
          className={cn(
            "w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed ? "justify-center px-0" : "justify-start"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
