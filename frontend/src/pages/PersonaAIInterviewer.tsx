
import { ArrowRight, MessageSquare } from "lucide-react";
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";
import Footer from "@/components/sections/Footer";
import { Link } from "react-router-dom";

const PersonaAIInterviewer = () => {
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
                  AI That Asks the Right Questions—And Understands the Answers.
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Our AI conducts standardized interviews to create high-fidelity Personas or unlock deep qualitative insights—all without the delays and costs of traditional research.
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
                      Start Standard Interview
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* AI Interviews at Scale Section - Now as a separate section */}
        <Section className="bg-background py-20">
          <div className="container px-4 mx-auto relative">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  AI Interviews at Scale—Instant Insights, No Delays.
                </h2>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-muted-foreground text-pretty max-w-2xl mx-auto mb-10">
                  Get real consumer opinions, motivations, and decision-making patterns through AI-driven interviews—then analyze responses instantly with our research-grade AI Personas.
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <Link to="/interview-process">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="group"
                  >
                    Take an Interview
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </Section>

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
                        <p>AI-powered persona creation based on standardized interviews.</p>
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
                        Want to understand Gen Z investors? Our AI interviews real investors, builds an accurate digital Persona, and allows you to test messaging, products, and strategies instantly.
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/interview-process">
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
                        Want to know why customers abandon sign-ups? Our AI interviews real users, analyzes sentiment, and gives you actionable insights instantly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link to="/contact" className="flex-1">
                      <Button variant="outline" className="w-full justify-center group">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Request for Companies
                      </Button>
                    </Link>
                    <Link to="/custom-research" className="flex-1">
                      <Button className="w-full justify-center group">
                        Custom Research
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default PersonaAIInterviewer;
