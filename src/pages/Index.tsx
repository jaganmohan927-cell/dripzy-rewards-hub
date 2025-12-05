import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Users, Wallet, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  const benefits = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Every polo crafted with premium fabrics for lasting comfort and style."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Join the Tribe",
      description: "Become part of a community that celebrates individuality and rewards loyalty."
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Get Rewarded",
      description: "Earn ₹200 reward per referral. It's a simple perk inside Dripzy Tribe."
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Weekly Cashback",
      description: "Buy once, get rewarded weekly. It's just a brand reward feature."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--dripzy-yellow)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--dripzy-yellow)/0.05),transparent_40%)]" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Welcome to the Tribe</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              Wear the Drip.{' '}
              <span className="text-gradient">Live the Life.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Where fashion meets freedom. Dripzy Life isn't just a clothing brand, it's a community that rewards you for repping your vibe.
            </p>

            {/* Body */}
            <p className="text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              We believe every outfit should do more than look good — it should do good for you. At Dripzy Life, every purchase makes you part of a growing circle of creators, doers, and dreamers. Buy your first Polo, get rewarded through referrals, and grow with our community perks — all while staying effortlessly stylish.
            </p>

            {/* CTA */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/shop">
                <Button size="lg" className="btn-glow text-lg px-8 py-6 font-bold group">
                  Join the Drip. Own the Life.
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-primary font-semibold mt-4">Shop the ₹999 Collection →</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fresh <span className="text-gradient">Drops</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Curated collection of premium polos designed for those who live bold and stay grounded.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Join the <span className="text-gradient">Tribe?</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              More than just fashion. It's a community where your style earns you perks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-secondary to-card border border-border rounded-2xl p-12 overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join the <span className="text-gradient">Movement?</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Get your first Dripzy polo at just ₹999 and unlock exclusive tribe perks. The drip starts here.
              </p>
              <Link to="/shop">
                <Button size="lg" className="btn-glow font-bold">
                  Shop Now — ₹999
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

export default Index;
