
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";
import Footer from "@/components/sections/Footer";
import { ArrowRight, MessageSquare, UserPlus, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Interviewer = () => {
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
                  PersonaAI Interviewer
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  AI-Powered Interviews for Deep Consumer Understanding
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Use AI-driven interviews to create accurate Personas or conduct research studies at scale—then leverage those 
                  Personas for ongoing insights, content creation, and decision validation.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Main Options Section */}
        <Section>
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Build a Persona Option */}
              <Reveal>
                <Card className="p-8 h-full flex flex-col">
                  <div className="mb-6 pb-6 border-b">
                    <h2 className="text-2xl font-bold mb-4 font-plasmik">1️⃣ Build a Persona</h2>
                    <p className="text-muted-foreground text-sm">For: Businesses, marketers, researchers</p>
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <p>AI-powered persona creation based on structured interviews.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <p>Modeled from real human data to mirror actual decision-making patterns.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <p>Reusable for future research—train your AI Persona once and use it repeatedly.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6 p-4 bg-muted/40 rounded-lg">
                      <h3 className="font-medium mb-2">Example Use Case:</h3>
                      <p className="text-sm text-muted-foreground">
                        Want to understand Gen Z investors? Our AI interviews real investors, builds an accurate digital Persona, 
                        and allows you to test messaging, products, and strategies instantly.
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/persona-creation/landing">
                    <Button className="w-full justify-center group mt-auto">
                      Create a Persona
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </Card>
              </Reveal>
              
              {/* Conduct Custom Research Option */}
              <Reveal delay={200}>
                <Card className="p-8 h-full flex flex-col">
                  <div className="mb-6 pb-6 border-b">
                    <h2 className="text-2xl font-bold mb-4 font-plasmik">2️⃣ Conduct Custom Research</h2>
                    <p className="text-muted-foreground text-sm">For: Businesses, researchers, brands</p>
                  </div>
                  
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <p>AI-powered interviewer conducts qualitative research at scale.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <p>Extracts customer opinions, motivations, and emotions in real-time.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-primary text-lg">•</span>
                        <p>Instant analysis—dashboard insights faster than any traditional research method.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6 p-4 bg-muted/40 rounded-lg">
                      <h3 className="font-medium mb-2">Example Use Case:</h3>
                      <p className="text-sm text-muted-foreground">
                        Want to know why customers abandon sign-ups? Our AI interviews real users, analyzes sentiment, and gives 
                        you actionable insights instantly.
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/custom-research">
                    <Button className="w-full justify-center group mt-auto">
                      Research Interviewer
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </Card>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* Your Persona Section */}
        <Section className="bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  Your AI Persona—Put It to Work
                </h2>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-muted-foreground text-pretty max-w-2xl mx-auto mb-10">
                  After creating your AI Persona, leverage it for a wide range of tasks—from content creation 
                  to decision validation and ongoing research.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal>
                <Card className="p-6 h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-flex">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate content tailored to your target audience—using their language, addressing their pain points, and matching their tone.
                  </p>
                  <Link to="/your-persona" className="text-primary font-medium inline-flex items-center group">
                    Try Content Creation
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Card>
              </Reveal>

              <Reveal delay={100}>
                <Card className="p-6 h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-flex">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Audience Expansion</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover adjacent audiences and strategies to expand your market reach based on your AI Persona's network and interests.
                  </p>
                  <Link to="/your-persona" className="text-primary font-medium inline-flex items-center group">
                    Expand Your Audience
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Card>
              </Reveal>

              <Reveal delay={200}>
                <Card className="p-6 h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-flex">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Idea Validation</h3>
                  <p className="text-muted-foreground mb-4">
                    Test new concepts and ideas with your AI Persona to predict market reception before investing in development.
                  </p>
                  <Link to="/your-persona" className="text-primary font-medium inline-flex items-center group">
                    Validate Your Ideas
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Card>
              </Reveal>
            </div>

            <div className="text-center mt-12">
              <Reveal delay={300}>
                <Link to="/your-persona">
                  <Button size="lg" className="group">
                    Explore Your Persona
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Interviewer;
