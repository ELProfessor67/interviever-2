
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "../ui-custom/Section";
import Button from "../ui-custom/Button";
import Reveal from "../ui-custom/Reveal";

const PersonaAIInterviewerSection = () => {
  return (
    <Section className="py-20 md:py-28 overflow-hidden">
      <div className="container px-4 mx-auto relative">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
              Deep Interview AI—Uncover Authentic Human Insights
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-muted-foreground text-pretty max-w-2xl mx-auto mb-10">
              Conduct in-depth interviews covering life stories, values, decision-making, emotional resilience, and future outlook—then analyze responses instantly with our research-grade AI.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <Link to="/persona-ai-interviewer">
              <Button 
                variant="primary" 
                size="lg" 
                className="group"
              >
                Try the PersonaAI Interviewer
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default PersonaAIInterviewerSection;
