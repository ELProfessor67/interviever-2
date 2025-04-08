
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Reveal from "@/components/ui-custom/Reveal";
import Footer from "@/components/sections/Footer";
import QualitativeAnalysis from "@/components/sections/QualitativeAnalysis";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "@/components/ui-custom/Button";

const Research = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] pt-24 pb-16 flex items-center">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-background to-background -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <p className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                  PersonaAI Researcher
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  Advanced Research Tools for Modern Insights
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  Leverage AI-powered research tools to gather qualitative insights at scale. From AI focus groups to 
                  sentiment analysis, get the data you need to make informed decisions.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="#insights-conductor">
                    <Button size="lg" className="group">
                      Insights Conductor
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="#ai-focus-groups">
                    <Button variant="secondary" size="lg" className="group">
                      AI Focus Groups
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Insights Conductor Section */}
        <div id="insights-conductor">
          <QualitativeAnalysis />
        </div>

        {/* AI Focus Groups Section - Using the existing component */}
        <div id="ai-focus-groups">
          <Section className="py-20 md:py-28 bg-primary/90 text-white">
            <div className="container px-4 mx-auto relative">
              <div className="max-w-4xl mx-auto text-center">
                <Reveal>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                    AI-Powered Focus Groups—Scalable, Instant, and Always Available.
                  </h2>
                </Reveal>
                
                <Reveal delay={100}>
                  <p className="text-white/80 text-pretty max-w-2xl mx-auto mb-10">
                    Test branding, messaging, and product ideas in real-time with AI-driven focus groups. 
                    Get qualitative insights at the speed of AI—no scheduling, no delays, just instant answers.
                  </p>
                </Reveal>
                
                <Reveal delay={200}>
                  <Link to="/ai-focus-groups">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      className="group"
                    >
                      Run an AI Focus Group
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </Reveal>
              </div>
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
