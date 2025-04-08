
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Info, Clock, Check, UserPlus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Card from "@/components/ui-custom/Card";
import Reveal from "@/components/ui-custom/Reveal";

const PersonaCreationLanding = () => {
  const navigate = useNavigate();
  
  const handleStartProcess = () => {
    navigate("/persona-creation/screener");
  };

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
                  Persona Creation Process
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  Build Your AI Persona for Research Insights
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Create a research-grade AI persona through our structured process. Train an AI that mirrors your target audience's behaviors, preferences, and decision-making patterns.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="group"
                  onClick={handleStartProcess}
                >
                  Begin Persona Creation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Process Overview Section */}
        <Section>
          <div className="container px-4 mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-plasmik">
                The Persona Creation Process
              </h2>
            </Reveal>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Reveal delay={100}>
                <Card className="p-6 border-l-4 border-l-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserPlus className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">1. Eligibility</h3>
                  </div>
                  <p className="text-muted-foreground">
                    A brief screener to ensure you're eligible to create a persona based on your industry and needs.
                  </p>
                </Card>
              </Reveal>
              
              <Reveal delay={200}>
                <Card className="p-6 border-l-4 border-l-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Info className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">2. Information</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Provide details about your target audience to help us create a more accurate AI persona.
                  </p>
                </Card>
              </Reveal>
              
              <Reveal delay={300}>
                <Card className="p-6 border-l-4 border-l-primary">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">3. Interview</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our AI will conduct an in-depth interview to gather essential data for building your persona.
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* Benefits Section */}
        <Section className="bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  Benefits of AI Personas
                </h2>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Instant Insights",
                  description: "Get immediate feedback and insights without traditional research delays."
                },
                {
                  title: "Cost Effective",
                  description: "Eliminate the high costs of focus groups and traditional qualitative research."
                },
                {
                  title: "Always Available",
                  description: "Your AI Persona is available 24/7 for ongoing research and validation."
                },
                {
                  title: "Unbiased Responses",
                  description: "Receive consistent, unbiased feedback based on real human data patterns."
                }
              ].map((benefit, index) => (
                <Reveal key={index} delay={index * 100}>
                  <Card className="p-5 h-full">
                    <div className="mb-4 p-2 bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </Card>
                </Reveal>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Reveal delay={400}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="group"
                  onClick={handleStartProcess}
                >
                  Start Creating Your Persona
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default PersonaCreationLanding;
