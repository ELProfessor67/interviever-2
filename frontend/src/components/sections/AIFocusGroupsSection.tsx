
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../ui-custom/Section";
import Button from "../ui-custom/Button";
import Reveal from "../ui-custom/Reveal";

const AIFocusGroupsSection = () => {
  return (
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
  );
};

export default AIFocusGroupsSection;
