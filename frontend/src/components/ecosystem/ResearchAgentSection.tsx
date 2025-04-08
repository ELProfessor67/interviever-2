
import { ArrowRight, Bot, Brain, BrainCircuit, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";

const ResearchAgentSection = () => {
  return (
    <Section className="bg-gray-800" reducedPadding>
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left side - Image & Visual */}
            <Reveal>
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl border border-gray-700 shadow-xl">
                  {/* Main image */}
                  <div className="aspect-[4/3] lg:aspect-square overflow-hidden">
                    <img 
                      src="/lovable-uploads/71730aa8-fe82-45fd-8644-de4add24519b.png" 
                      alt="AI Research Agent" 
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent pointer-events-none"></div>
                  
                  {/* Live indicator */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-full flex items-center">
                    <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-xs font-medium text-gray-100">AI-Powered Research</span>
                  </div>
                  
                  {/* Info cards positioned over the image */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3">
                    <div className="px-3 py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 inline-flex items-center">
                      <Brain className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-xs font-medium text-gray-100">Market Analysis</span>
                    </div>
                    <div className="px-3 py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 inline-flex items-center">
                      <Search className="h-4 w-4 text-amber-400 mr-2" />
                      <span className="text-xs font-medium text-gray-100">Research Tools</span>
                    </div>
                    <div className="px-3 py-2 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 inline-flex items-center">
                      <BrainCircuit className="h-4 w-4 text-purple-400 mr-2" />
                      <span className="text-xs font-medium text-gray-100">Sentiment Analysis</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right side - Content */}
            <div>
              <Reveal>
                <div className="inline-flex items-center justify-center bg-primary/20 px-4 py-2 rounded-full mb-4">
                  <Bot className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">AI Research Agent</span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100 font-plasmik">
                  Talk to PersonaAI Research Agent
                </h2>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="text-gray-300 text-pretty mb-8">
                  Discover market insights and trends with our AI research agent. Analyze token 
                  utility, explore Web3 projects, and get qualitative analysis from our 
                  AI-powered system trained on professional market research methodologies.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-700">
                    <div className="mb-2 flex">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-100 mb-1">Market Analysis</h3>
                    <p className="text-sm text-gray-300">
                      Get real-time sentiment analysis and trend forecasting.
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-700">
                    <div className="mb-2 flex">
                      <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <Search className="h-4 w-4 text-amber-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-100 mb-1">Research Tools</h3>
                    <p className="text-sm text-gray-300">
                      Access expert AI tools for deep Web3 project research.
                    </p>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={400}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    className="group bg-gradient-to-r from-blue-600 to-blue-500 border-none"
                  >
                    Start Research Session
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    View Sample Insights
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ResearchAgentSection;
