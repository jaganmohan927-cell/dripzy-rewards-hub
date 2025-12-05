import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wallet, Globe, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Shop = () => {
  const highlights = [
    { icon: <Sparkles className="w-5 h-5" />, text: "Flat ₹999 for all" },
    { icon: <Wallet className="w-5 h-5" />, text: "Get ₹200 reward per referral" },
    { icon: <Globe className="w-5 h-5" />, text: "Community rewards on every level" },
    { icon: <RefreshCw className="w-5 h-5" />, text: "Wallet & instant withdrawal system" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--dripzy-yellow)/0.08),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Every Polo. One Price.{' '}
              <span className="text-gradient">Infinite Value.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Minimal. Sharp. Made to move with you — in style and in purpose.
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Our collection is designed for those who live fast, think big, and stay grounded. Crafted in premium fabrics, each piece brings comfort, durability, and effortless confidence. But here's what makes it special — every purchase gives you access to our reward ecosystem. Buy once. Get rewarded. Simple as that.
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 hover:border-primary/50 transition-colors"
              >
                <span className="text-primary">{highlight.icon}</span>
                <span className="text-sm font-medium">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">All Products</h2>
              <p className="text-muted-foreground">{products.length} items</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-secondary to-card border border-border rounded-2xl p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Own the Drip. <span className="text-gradient">Grow the Life.</span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Every polo at ₹999 comes with access to our tribe perks. It's not just fashion — it's a movement.
              </p>
              <Link to="/about">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn About Our Community
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
