import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mockOrders, Order } from '@/data/mockDashboardData';

const Orders = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const { toast } = useToast();

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Processing': return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/20 text-green-500';
      case 'Shipped': return 'bg-blue-500/20 text-blue-500';
      case 'Processing': return 'bg-yellow-500/20 text-yellow-500';
    }
  };

  const handleCopyTracking = (trackingId: string) => {
    navigator.clipboard.writeText(trackingId);
    toast({
      title: "Copied!",
      description: "Tracking ID copied to clipboard",
    });
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold">My Orders</h1>
        <p className="text-sm md:text-base text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {[
          { label: 'Total', value: mockOrders.length, icon: Package },
          { label: 'In Progress', value: mockOrders.filter(o => o.status !== 'Delivered').length, icon: Truck },
          { label: 'Delivered', value: mockOrders.filter(o => o.status === 'Delivered').length, icon: CheckCircle },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg md:rounded-xl p-3 md:p-4 text-center">
            <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-1 md:mb-2" />
            <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-3 md:space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Order Header */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-lg flex items-center justify-center">
                  {getStatusIcon(order.status)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm md:text-base">{order.id}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="text-right">
                  <p className="font-bold text-sm md:text-base">₹{order.total}</p>
                  <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                {expandedOrder === order.id ? <ChevronUp className="w-4 h-4 md:w-5 md:h-5" /> : <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />}
              </div>
            </button>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <div className="border-t border-border p-3 md:p-4 bg-secondary/30 animate-fade-in">
                <div className="space-y-4">
                  {/* Items */}
                  <div>
                    <h4 className="text-xs md:text-sm font-medium mb-2">Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-xs md:text-sm">
                          <span className="text-muted-foreground">
                            {item.name} ({item.size}) × {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking */}
                  {order.trackingId && (
                    <div>
                      <h4 className="text-xs md:text-sm font-medium mb-1">Tracking ID</h4>
                      <div className="flex items-center gap-2">
                        <p className="text-xs md:text-sm text-primary font-mono">{order.trackingId}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyTracking(order.trackingId!)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Status Timeline */}
                  <div>
                    <h4 className="text-xs md:text-sm font-medium mb-3">Order Status</h4>
                    <div className="flex items-center gap-1 md:gap-2">
                      {['Processing', 'Shipped', 'Delivered'].map((status, index) => {
                        const isCompleted = 
                          (status === 'Processing') ||
                          (status === 'Shipped' && ['Shipped', 'Delivered'].includes(order.status)) ||
                          (status === 'Delivered' && order.status === 'Delivered');
                        
                        return (
                          <div key={status} className="flex items-center">
                            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm ${
                              isCompleted ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                            }`}>
                              {index + 1}
                            </div>
                            {index < 2 && (
                              <div className={`w-8 md:w-20 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-secondary'}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground mt-2">
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State - shown if no orders */}
      {mockOrders.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No orders yet. Start shopping!</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
