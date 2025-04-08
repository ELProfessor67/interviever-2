
import { User, Bot, ArrowRight, Video, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../ui-custom/Section";
import Button from "../ui-custom/Button";
import Reveal from "../ui-custom/Reveal";

const CustomAIPersonas = () => {
  return (
    <Section id="custom-ai-personas" className="bg-gradient-to-r from-gray-950 to-gray-900 text-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side with persona image grid */}
          <div className="w-full md:w-1/2 relative">
            <Reveal>
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-primary/40 transition-all">
                <img 
                  src="/lovable-uploads/723fa150-405c-4fa6-aa1f-33398c934182.png" 
                  alt="Grid of diverse AI personas representing different demographics" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-70"></div>
                
                {/* Video avatar badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 border border-primary/30 rounded-full flex items-center">
                  <Video className="h-4 w-4 text-primary mr-2" />
                  <span className="text-xs font-medium text-primary">Video Avatar</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right side with content */}
          <div className="w-full md:w-1/2">
            <Reveal>
              <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full mb-2 border border-primary/20">
                <Bot className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">AI Persona</span>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-plasmik">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">Custom AI Personas</span>
              </h2>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="text-xl text-gray-300 mb-4">
                For research: Talk directly to our AI Research personas. Get qualitative insights, sentiment analysis, and predictive intelligence from deeply-trained personas.
              </p>
              <p className="text-xl text-gray-300 mb-8">
                Create your own persona for personal and business use.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/your-persona">
                  <Button 
                    size="lg" 
                    variant="primary" 
                    className="rounded-full px-8 py-3 bg-gradient-to-r from-primary to-primary/70 border-none shadow-lg shadow-primary/20 w-full sm:w-auto"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Create a Persona
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                
                <Link to="/ai-focus-groups">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="rounded-full px-8 py-3 shadow-lg w-full sm:w-auto"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    AI Focus Groups
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CustomAIPersonas;
