
import { 
  Users, 
  LightbulbIcon, 
  TrendingUp, 
  SearchCode 
} from "lucide-react";
import Section from "../ui-custom/Section";
import Card from "../ui-custom/Card";
import Reveal from "../ui-custom/Reveal";
import { Link } from "react-router-dom";
import Button from "../ui-custom/Button";

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  example?: string;
  actionText: string;
  actionLink: string;
}

const useCases: UseCase[] = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Market Research & Consumer Insights",
    description: "Get AI-powered focus groups for deeper, faster insights into buyer behavior.",
    bullets: [
      "Test product-market fit with scalable qualitative discussions.",
      "Optimize messaging through AI-driven A/B testing."
    ],
    example: "What resonates more with Gen Z—\"Sustainable Investing\" or \"AI-Powered Portfolio Growth\"?",
    actionText: "Discover Buyer Personas",
    actionLink: "/research#insights-conductor"
  },
  {
    icon: <LightbulbIcon className="h-10 w-10 text-primary" />,
    title: "Strategy & Ideation",
    description: "Refine business strategies with AI-powered feedback loops.",
    bullets: [
      "Validate concepts & positioning before launch.",
      "Optimize acquisition & branding strategies with AI insights."
    ],
    example: "Which positioning performs better? \"AI-Powered Investing\" vs. \"Data-Driven Wealth Growth\"?",
    actionText: "Validate Your Concepts",
    actionLink: "/research#ai-focus-groups"
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Long-Term Consumer Intelligence",
    description: "Develop AI personas that provide continuous insights over time.",
    bullets: [
      "Track shifting trends & behaviors using persistent AI personas.",
      "Leverage qualitative AI analytics for smarter decision-making."
    ],
    actionText: "Build Lasting Insights",
    actionLink: "/your-persona"
  },
  {
    icon: <SearchCode className="h-10 w-10 text-primary" />,
    title: "AI & Web3 Research",
    description: "Conduct specialized research on AI tokens, blockchain ecosystems, and emerging tech communities.",
    bullets: [
      "Understand token incentives & retention strategies.",
      "Simulate community sentiment & adoption trends."
    ],
    actionText: "Explore Tech Audiences",
    actionLink: "/earn-prsna"
  },
];

const HowToUsePersonaAI = () => {
  return (
    <Section id="how-to-use" className="bg-white">
      <div className="container px-4 mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-plasmik text-[#1d3a8a]">
              How You Can Use PersonaAI
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <Reveal key={index} delay={index * 100}>
              <Card className="h-full border-2 border-slate-200 hover:border-primary/20 transition-all">
                <div className="flex flex-col h-full">
                  <div className="flex gap-4 items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      {useCase.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-slate-600">{useCase.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {useCase.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-primary flex-shrink-0 pt-1">🔹</span>
                        <p className="text-slate-600">{bullet}</p>
                      </div>
                    ))}
                    
                    {useCase.example && (
                      <div className="flex items-start gap-2 mt-3">
                        <span className="text-primary flex-shrink-0 pt-1">🔹</span>
                        <p className="text-slate-600"><span className="font-medium">Example:</span> {useCase.example}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-6">
                    <Link to={useCase.actionLink}>
                      <Button variant="link" className="text-primary p-0 font-medium hover:underline">
                        [{useCase.actionText} →]
                      </Button>
                    </Link>
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

export default HowToUsePersonaAI;
