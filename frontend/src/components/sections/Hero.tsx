
import { Rocket, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui-custom/Button";
import Reveal from "../ui-custom/Reveal";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-background -z-10">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-40 w-40 rounded-full bg-primary/30 blur-3xl top-1/4 left-1/4 animate-pulse"></div>
          <div className="absolute h-60 w-60 rounded-full bg-accent/20 blur-3xl bottom-1/3 right-1/3 animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute h-20 w-20 rounded-full bg-primary/20 blur-3xl top-1/3 right-1/4 animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal delay={100} animation="blur-in">
            <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight font-plasmik text-balance text-white drop-shadow-md">
              Market Research, Reimagined: AI-Driven Qualitative Insights
            </h1>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="mb-10 text-lg md:text-xl text-gray-300 text-pretty max-w-2xl mx-auto">
              AI Personas—digital consumers built from real human interviews. Run AI-driven focus groups, analyze sentiment shifts, and predict market behavior—faster and at scale.
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button 
                size="lg" 
                className="group py-6 px-8 text-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30"
                as={Link}
                to="/research"
                variant="primary"
              >
                PersonaAI Researcher
                <Rocket className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-[-2px]" />
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                as={Link}
                to="/interviewer"
                className="group py-6 px-8 text-lg bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30"
              >
                PersonaAI Interviewer
                <Users className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
      
      {/* Hero Image */}
      <Reveal delay={400} className="mt-16 max-w-5xl mx-auto px-6">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent product-image-mask pointer-events-none z-10" />
          <div className="bg-gradient-to-tr from-primary/30 to-accent/40 absolute inset-0" />
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-300">Product visualization will appear here</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
