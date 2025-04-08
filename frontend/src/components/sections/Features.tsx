
import { User, Users, TrendingUp, Search, Briefcase } from "lucide-react";
import Section from "../ui-custom/Section";
import Reveal from "../ui-custom/Reveal";

const features = [
  {
    icon: <User className="h-6 w-6 text-primary" />,
    title: "AI Personas",
    description: "High-fidelity consumer simulations."
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "AI-Driven Focus Groups",
    description: "Instant insights into messaging, branding, and product fit."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Market Simulation",
    description: "Predict buying behavior using AI models."
  },
  {
    icon: <Search className="h-6 w-6 text-primary" />,
    title: "Qualitative Trend Analysis",
    description: "Identify sentiment shifts & hidden consumer patterns."
  },
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Enterprise Research Tools",
    description: "Private AI models for B2B insights."
  }
];

const Features = () => {
  return (
    <Section id="features">
      <div className="container px-4 mx-auto">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-plasmik">
              Features That Set Us Apart
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <Reveal key={index} delay={100 * index}>
              <div className="flex flex-col items-center text-center">
                <div className="p-2 bg-primary/10 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <p className="flex items-center gap-2 text-pretty">
                  <span className="text-primary">🔹</span>
                  <span><strong>{feature.title}</strong> – {feature.description}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
