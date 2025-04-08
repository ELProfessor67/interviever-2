
import { Target, MessageSquare, PieChart, FileText } from "lucide-react";
import Section from "../ui-custom/Section";
import Reveal from "../ui-custom/Reveal";

const steps = [
  {
    icon: <Target className="h-8 w-8 text-white" />,
    number: "1",
    title: "Define Your Goals",
    description: "Choose research type—focus group, concept testing, or sentiment analysis—and set your audience."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    number: "2",
    title: "AI Persona Interviews",
    description: "Our AI personas engage in real-time discussions, simulating market behaviors."
  },
  {
    icon: <PieChart className="h-8 w-8 text-white" />,
    number: "3",
    title: "AI-Generated Insights",
    description: "Analyze sentiment, decision drivers, and behavioral trends."
  },
  {
    icon: <FileText className="h-8 w-8 text-white" />,
    number: "4",
    title: "Actionable Research Reports",
    description: "Receive structured reports with visual data, key findings, and strategic recommendations."
  }
];

const HowItWorks = () => {
  return (
    <Section className="bg-primary text-white py-20 md:py-28 overflow-hidden">
      <div className="container px-4 mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
        
        <Reveal>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-plasmik text-white">
              How It Works
            </h2>
          </div>
        </Reveal>

        {/* Horizontal Stepper (Desktop) */}
        <div className="hidden md:flex max-w-6xl mx-auto justify-between mb-16">
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="flex flex-col items-center text-center max-w-[240px] group">
                {/* Step number and icon */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 transition-all rounded-full flex items-center justify-center flex-shrink-0 border border-white/20 mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute h-0.5 bg-white/20 w-24 left-[calc(50%+60px)] top-12 hidden md:block"></div>
                )}
                
                <h3 className="text-2xl font-medium mb-3 text-white">{step.title}</h3>
                <p className="text-primary-foreground/90">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Vertical Steps (Mobile) */}
        <div className="md:hidden max-w-md mx-auto">
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="flex items-start gap-6 mb-16 last:mb-0 relative">
                {/* Step number and icon */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center flex-shrink-0 border border-white/20">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-primary font-bold flex items-center justify-center text-sm">
                    {step.number}
                  </div>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-full left-1/2 w-0.5 h-16 bg-white/20 -translate-x-1/2"></div>
                  )}
                </div>
                
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-medium mb-2 text-white">{step.title}</h3>
                  <p className="text-primary-foreground/90 text-left">{step.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
