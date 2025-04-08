
import { BrainCircuit, Users, TrendingUp, Search, Building } from "lucide-react";
import Section from "../ui-custom/Section";
import Card from "../ui-custom/Card";
import Reveal from "../ui-custom/Reveal";

const differentiators = [
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: "Research-Grade AI Personas",
    description: "Built from structured human interviews for unmatched accuracy."
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "AI-Driven Focus Groups",
    description: "On-demand, scalable qualitative research with real-time responses."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Predictive Market Behavior",
    description: "AI Personas don't just analyze trends—they simulate consumer actions."
  },
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "Qualitative Intelligence at Scale",
    description: "Aggregate thousands of AI-driven conversations to uncover hidden patterns."
  },
  {
    icon: <Building className="h-6 w-6 text-primary" />,
    title: "Enterprise-Ready Research Platform",
    description: "B2B insights, enterprise licensing, and AI-powered qualitative analytics."
  }
];

const WhyPersonaAI = () => {
  return (
    <Section id="why-personaai" className="bg-secondary/50">
      <div className="container px-4 mx-auto">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              Why PersonaAI?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-plasmik">
              Key Differentiators
            </h2>
            <p className="text-muted-foreground text-pretty">
              Our platform delivers qualitative insights at scale with research-grade AI personas that think and respond like real humans.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <Reveal key={index} delay={100 * index}>
              <Card className="h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg inline-block flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default WhyPersonaAI;
