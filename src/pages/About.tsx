import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const pillars = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fashion is Freedom",
      description: "Express your vibe. Every piece is designed for those who refuse to blend in."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community is Wealth",
      description: "Grow together. Share the drip, share the perks. The tribe rises as one."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Simplicity is Power",
      description: "One price. One vision. One movement. No complexity, just pure style."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--dripzy-yellow)/0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              Not Just a Brand.{' '}
              <span className="text-gradient">A Mindset.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              We're building a new kind of lifestyle — where your wardrobe builds value.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Dripzy Life was born from a simple idea: What if buying your favorite T-shirt could also help you get rewarded?
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're redefining eCommerce by creating a community-led fashion movement. Every person who buys becomes a part of our tribe — sharing in the growth, rewards, and vision.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We don't chase trends — we create waves. Every drop you wear carries purpose. Every drop you share builds value. Welcome to the drip that never fades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Philosophy</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Three pillars that define everything we do at Dripzy Life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="relative bg-card border border-border rounded-2xl p-8 text-center group hover:border-primary/50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary/10 rounded-full px-6 py-2 mb-8">
              <span className="text-primary font-semibold">Our Mission</span>
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8">
              "To build a fashion community where{' '}
              <span className="text-gradient">style meets rewards</span>, and every member grows together."
            </blockquote>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Dripzy Life, we believe fashion should be accessible, rewarding, and community-driven. That's why every purchase unlocks perks, and every referral strengthens our tribe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto text-center bg-gradient-to-br from-secondary to-card border border-border rounded-2xl p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Discover the <span className="text-gradient">Movement</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands who've already discovered the drip that gives back. Your journey starts with a single tee.
              </p>
              <Link to="/shop">
                <Button size="lg" className="btn-glow font-bold">
                  Discover the Movement
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

export default About;
