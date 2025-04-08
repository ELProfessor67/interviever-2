
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Reveal from "@/components/ui-custom/Reveal";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui-custom/Button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui-custom/Card";

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink, 
  isPopular = false 
}: { 
  title: string; 
  price: string; 
  description: string; 
  features: string[]; 
  buttonText: string; 
  buttonLink: string; 
  isPopular?: boolean;
}) => {
  return (
    <Card className={`p-8 flex flex-col h-full ${isPopular ? 'border-primary border-2' : ''}`}>
      {isPopular && (
        <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full w-fit mb-4">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 font-plasmik">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <Link to={buttonLink}>
        <Button 
          className="w-full group" 
          variant={isPopular ? "primary" : "outline"}
        >
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </Card>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <p className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                  Pricing
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  Choose the Plan That Works for You
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  From individual researchers to enterprise teams, we have flexible pricing options to scale with your needs.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <Section>
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Reveal>
                <PricingTier
                  title="Basic"
                  price="$XX"
                  description="Perfect for individuals and small teams getting started with AI research."
                  features={[
                    "5 AI focus groups per month",
                    "1 custom AI persona",
                    "Basic analytics dashboard",
                    "Email support"
                  ]}
                  buttonText="Get Started"
                  buttonLink="/contact"
                />
              </Reveal>
              
              <Reveal delay={200}>
                <PricingTier
                  title="Professional"
                  price="$XX"
                  description="Ideal for growing businesses and research teams."
                  features={[
                    "15 AI focus groups per month",
                    "3 custom AI personas",
                    "Advanced analytics dashboard",
                    "Priority email support",
                    "API access"
                  ]}
                  buttonText="Try Professional"
                  buttonLink="/contact"
                  isPopular={true}
                />
              </Reveal>
              
              <Reveal delay={400}>
                <PricingTier
                  title="Enterprise"
                  price="Custom"
                  description="Tailored solutions for large teams and organizations."
                  features={[
                    "Unlimited AI focus groups",
                    "Unlimited custom AI personas",
                    "Enterprise analytics dashboard",
                    "Dedicated account manager",
                    "Custom API integration",
                    "SSO and advanced security features"
                  ]}
                  buttonText="Contact Sales"
                  buttonLink="/contact"
                />
              </Reveal>
            </div>
          </div>
        </Section>
        
        {/* FAQ Section */}
        <Section className="bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-3xl font-bold mb-10 text-center font-plasmik">
                  Frequently Asked Questions
                </h2>
              </Reveal>
              
              <div className="space-y-6">
                <Reveal>
                  <div className="p-6 bg-background rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Can I upgrade or downgrade my plan?</h3>
                    <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                  </div>
                </Reveal>
                
                <Reveal delay={100}>
                  <div className="p-6 bg-background rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">Do you offer a free trial?</h3>
                    <p className="text-muted-foreground">We offer a 14-day free trial on all our plans. No credit card required to start your trial.</p>
                  </div>
                </Reveal>
                
                <Reveal delay={200}>
                  <div className="p-6 bg-background rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
                    <p className="text-muted-foreground">We accept all major credit cards, PayPal, and for Enterprise customers, we also offer invoicing.</p>
                  </div>
                </Reveal>
                
                <Reveal delay={300}>
                  <div className="p-6 bg-background rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">What kind of support is included?</h3>
                    <p className="text-muted-foreground">Basic plans include email support with a 48-hour response time. Professional plans include priority email support with a 24-hour response time. Enterprise plans include dedicated account management and phone support.</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
