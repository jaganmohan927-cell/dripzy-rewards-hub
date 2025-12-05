import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Orders from "./pages/dashboard/Orders";
import Referral from "./pages/dashboard/Referral";
import Wallet from "./pages/dashboard/Wallet";
import Rewards from "./pages/dashboard/Rewards";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Dashboard Routes - No Footer */}
              <Route path="/dashboard" element={<><Header /><DashboardLayout /></>}>
                <Route index element={<DashboardHome />} />
                <Route path="orders" element={<Orders />} />
                <Route path="referral" element={<Referral />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              
              {/* Public Routes - With Footer */}
              <Route path="/" element={<><Header /><main className="min-h-screen"><Index /></main><Footer /></>} />
              <Route path="/about" element={<><Header /><main className="min-h-screen"><About /></main><Footer /></>} />
              <Route path="/shop" element={<><Header /><main className="min-h-screen"><Shop /></main><Footer /></>} />
              <Route path="/product/:id" element={<><Header /><main className="min-h-screen"><ProductDetail /></main><Footer /></>} />
              <Route path="/cart" element={<><Header /><main className="min-h-screen"><Cart /></main><Footer /></>} />
              <Route path="/auth" element={<><Header /><main className="min-h-screen"><Auth /></main><Footer /></>} />
              <Route path="*" element={<><Header /><main className="min-h-screen"><NotFound /></main><Footer /></>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
