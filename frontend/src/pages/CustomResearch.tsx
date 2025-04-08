
import { ArrowRight, Check, MessageSquare, ShieldCheck, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";

const CustomResearch = () => {
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
                  AI Interviewer – Custom Research
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  Run Structured Interviews with Human Participants—No Moderator Needed
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  PersonaAI's Interview System lets you conduct real-time interviews with human subjects, using an AI moderator. 
                  You define the objective—we handle the logistics, consistency, and data collection.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <p className="mb-10 text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Designed for businesses and teams that need to gather input from real people but want to avoid the time 
                  and cost of manual moderation.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <Section className="bg-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  What You Get
                </h2>
              </Reveal>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Reveal>
                <Card className="p-8 h-full">
                  <div className="mb-6 p-3 bg-primary/10 rounded-lg inline-flex">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Automated Interview Process</h3>
                  <p className="text-muted-foreground">
                    Interviews are conducted by AI, following a structured script that adapts to participant responses.
                  </p>
                </Card>
              </Reveal>
              
              <Reveal delay={100}>
                <Card className="p-8 h-full">
                  <div className="mb-6 p-3 bg-primary/10 rounded-lg inline-flex">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Consistent Data Output</h3>
                  <p className="text-muted-foreground">
                    Every interview produces standardized transcripts and structured data, ready for analysis.
                  </p>
                </Card>
              </Reveal>
              
              <Reveal delay={200}>
                <Card className="p-8 h-full">
                  <div className="mb-6 p-3 bg-primary/10 rounded-lg inline-flex">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Scalable Setup</h3>
                  <p className="text-muted-foreground">
                    Run one interview or one hundred. No need for staff or scheduling coordination.
                  </p>
                </Card>
              </Reveal>
              
              <Reveal delay={300}>
                <Card className="p-8 h-full">
                  <div className="mb-6 p-3 bg-primary/10 rounded-lg inline-flex">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Private & Secure</h3>
                  <p className="text-muted-foreground">
                    All data remains confidential. Full control over participant access and research parameters.
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </Section>
        
        {/* Use Cases Section */}
        <Section className="bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  Use Cases
                </h2>
              </Reveal>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Reveal>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-3 p-4 bg-card rounded-lg border shadow-sm">
                    <span className="text-primary text-lg mt-0.5">•</span>
                    <p>Product and concept feedback</p>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-card rounded-lg border shadow-sm">
                    <span className="text-primary text-lg mt-0.5">•</span>
                    <p>Audience research and preference mapping</p>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-card rounded-lg border shadow-sm">
                    <span className="text-primary text-lg mt-0.5">•</span>
                    <p>Expert interviews for internal strategy</p>
                  </li>
                  <li className="flex items-start gap-3 p-4 bg-card rounded-lg border shadow-sm">
                    <span className="text-primary text-lg mt-0.5">•</span>
                    <p>Community input for Web3 and crypto initiatives</p>
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </Section>
        
        {/* Get Started Section */}
        <Section className="bg-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  Get Started
                </h2>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="mb-10 text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Contact us to set up a research project or request access to the interview feature.
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Contract Research Project
                    </Button>
                  </Link>
                  
                  <Link to="/interview-process">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                      Go to Interview Platform
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomResearch;
