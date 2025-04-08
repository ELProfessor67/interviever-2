
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import CustomAIPersonas from "@/components/sections/CustomAIPersonas";
import HowItWorks from "@/components/sections/HowItWorks";
import TokenEcosystem from "@/components/sections/TokenEcosystem";
import Footer from "@/components/sections/Footer";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";
import ExplanatorySubsections from "@/components/sections/ExplanatorySubsections";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Users, UserPlus, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        {/* Main Features Section - Place both sections side by side under hero */}
        <Section className="py-20 md:py-28">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* PersonaAI Researcher Section */}
              <div className="bg-primary/5 rounded-xl p-8 flex flex-col h-full">
                <Reveal>
                  <h2 className="text-3xl font-bold mb-6 font-plasmik">
                    PersonaAI Researcher
                  </h2>
                </Reveal>
                
                <Reveal delay={100}>
                  <p className="text-muted-foreground text-pretty mb-8 flex-grow">
                    Leverage our AI-powered research tools to uncover qualitative insights at scale. 
                    From the Insights Conductor to AI Focus Groups, get the data you need fast.
                  </p>
                </Reveal>
                
                <Reveal delay={200}>
                  <div className="mt-auto">
                    <div className="space-y-4">
                      <Link to="/research#insights-conductor" className="block">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full group flex items-center justify-center"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Insights Conductor
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/research#ai-focus-groups" className="block">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full group flex items-center justify-center"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          AI Focus Groups
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/research" className="block mt-6">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full group flex items-center justify-center"
                        >
                          Explore All Research Solutions
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
              
              {/* AI Interviewer Section */}
              <div className="bg-primary/5 rounded-xl p-8 flex flex-col h-full">
                <Reveal>
                  <h2 className="text-3xl font-bold mb-6 font-plasmik">
                    PersonaAI Interviewer
                  </h2>
                </Reveal>
                
                <Reveal delay={100}>
                  <p className="text-muted-foreground text-pretty mb-8 flex-grow">
                    Use AI-driven interviews to build accurate personas or conduct research studies at scale. Use our Research Moderator for custom research with human participants.
                  </p>
                </Reveal>
                
                <Reveal delay={200}>
                  <div className="mt-auto">
                    <div className="space-y-4">
                      <Link to="/persona-ai-interviewer" className="block">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full group flex items-center justify-center"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          PersonaAI Interviewer
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/interviewer" className="block">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full group flex items-center justify-center"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Research Moderator
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/interviewer" className="block mt-6">
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full group flex items-center justify-center"
                        >
                          Explore AI Interviewer
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
        
        {/* New Explanatory Subsections */}
        <ExplanatorySubsections />
        
        <CustomAIPersonas />
        <HowItWorks />
        <TokenEcosystem />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
