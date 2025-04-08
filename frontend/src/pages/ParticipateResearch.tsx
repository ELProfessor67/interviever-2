
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import Section from "@/components/ui-custom/Section";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Users, DollarSign } from "lucide-react";

const ParticipateResearch = () => {
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
                  Research Participant
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  Join Our Research Studies and Share Your Perspective
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Participate in AI-driven research interviews to help companies understand consumer needs better. Your insights matter and will shape future products and services.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/interview-process">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="group w-full sm:w-auto"
                    >
                      Start Research Interview
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <Section>
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  Why Participate in Our Research?
                </h2>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Your perspective is valuable, and our AI-driven interviews make sharing it easier than ever before.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal>
                <Card className="p-6 h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-flex">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Quick & Convenient</h3>
                  <p className="text-muted-foreground">
                    Our AI-powered interviews take just 15-20 minutes and can be completed anywhere, anytime on any device.
                  </p>
                </Card>
              </Reveal>

              <Reveal delay={100}>
                <Card className="p-6 h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-flex">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Shape the Future</h3>
                  <p className="text-muted-foreground">
                    Your insights help companies create better products, services, and experiences that address real consumer needs.
                  </p>
                </Card>
              </Reveal>

              <Reveal delay={200}>
                <Card className="p-6 h-full">
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg inline-flex">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Earn Rewards</h3>
                  <p className="text-muted-foreground">
                    Many of our research studies offer incentives, from gift cards to PRSNA tokens, as a thank you for your time.
                  </p>
                </Card>
              </Reveal>
            </div>

            <div className="text-center mt-12">
              <Reveal delay={300}>
                <Link to="/interview-process">
                  <Button size="lg" className="group">
                    Start Interview Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* How It Works Section */}
        <Section className="bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  How Our Research Interviews Work
                </h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Reveal>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">1</div>
                  <h3 className="text-xl font-semibold mb-2">Begin Interview</h3>
                  <p className="text-muted-foreground">
                    Start the AI-driven interview and answer a few basic demographic questions.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">2</div>
                  <h3 className="text-xl font-semibold mb-2">Share Your Insights</h3>
                  <p className="text-muted-foreground">
                    Our AI asks thoughtful questions and intelligently follows up based on your responses.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4">3</div>
                  <h3 className="text-xl font-semibold mb-2">Complete & Receive Reward</h3>
                  <p className="text-muted-foreground">
                    Finish the interview and receive your reward (if applicable to the specific study).
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="text-center mt-12">
              <Reveal delay={300}>
                <Link to="/interview-process">
                  <Button size="lg" className="group">
                    Participate Now
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

export default ParticipateResearch;
