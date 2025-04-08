
import { ArrowRight, HandCoins, Bot, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";

const EarnPRSNASection = () => {
  return (
    <Section className="bg-gray-850 py-6">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-gray-800/80 border border-gray-700 rounded-xl p-6 md:p-8">
              <div className="md:max-w-[60%]">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-plasmik">
                  Earn $PRSNA Tokens
                </h2>
                <p className="text-gray-300 text-pretty mb-6">
                  Participate in our ecosystem and earn rewards. Create your own AI personas for research or join AI-powered focus groups to earn $PRSNA tokens.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/earn-prsna">
                    <Button 
                      variant="secondary" 
                      className="group bg-blue-500 hover:bg-blue-600 text-white border-none"
                    >
                      <HandCoins className="w-4 h-4 mr-2" />
                      Create AI Personas
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/earn-prsna">
                    <Button 
                      variant="outline" 
                      className="group border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Join Focus Groups
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="h-28 w-28 md:h-36 md:w-36 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                <HandCoins className="h-14 w-14 md:h-18 md:w-18 text-primary/70" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default EarnPRSNASection;
