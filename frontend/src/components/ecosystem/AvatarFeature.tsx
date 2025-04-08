
import { ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/ui-custom/Reveal";

const AvatarFeature = () => {
  return (
    <div className="container px-4 mx-auto">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <Reveal>
          <div className="inline-flex items-center justify-center bg-amber-800/10 px-4 py-2 rounded-full mb-4">
            <Bot className="h-5 w-5 text-amber-800 mr-2" />
            <span className="text-sm font-medium text-amber-800">AI Research Assistant</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-900 font-plasmik">
            Talk to PersonaAI Research Agent
          </h2>
          <p className="text-amber-950 text-pretty max-w-2xl mx-auto mb-10">
            Get personalized market insights and token utility information from our 
            AI research agent. Explore Web3 trends with an immersive AI experience.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl mx-auto mb-10 aspect-square sm:aspect-video rounded-2xl overflow-hidden shadow-2xl border border-amber-200">
            <img 
              src="/lovable-uploads/71730aa8-fe82-45fd-8644-de4add24519b.png" 
              alt="AI Research Avatar" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent"></div>

            {/* Video avatar badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-100/60 backdrop-blur-sm border border-amber-400/30 rounded-full flex items-center">
              <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs font-medium text-amber-900">Live AI Avatar</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              className="group bg-gradient-to-r from-amber-700 to-amber-600 border-none shadow-lg"
            >
              Start Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
            </Button>
            <Button 
              variant="outline"
              className="border-amber-400 text-amber-800 hover:bg-amber-50"
            >
              Learn How It Works
            </Button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-md border border-amber-100">
            <h3 className="font-bold text-lg mb-2 text-amber-900">Market Insights</h3>
            <p className="text-amber-950 text-sm">
              Get real-time market sentiment analysis and trend predictions from our AI research avatar.
            </p>
          </div>
          
          <div className="bg-amber-50 backdrop-blur-sm rounded-xl p-6 shadow-md border border-amber-100">
            <h3 className="font-bold text-lg mb-2 text-amber-900">Token Utility</h3>
            <p className="text-amber-950 text-sm">
              Learn about $PRSNA token use cases, staking benefits, and ecosystem opportunities.
            </p>
          </div>
          
          <div className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-md border border-amber-100">
            <h3 className="font-bold text-lg mb-2 text-amber-900">Research on Demand</h3>
            <p className="text-amber-950 text-sm">
              Ask specific questions about Web3 projects and get AI-powered qualitative analysis.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AvatarFeature;
