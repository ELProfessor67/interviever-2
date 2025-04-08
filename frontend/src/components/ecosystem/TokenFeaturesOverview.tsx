
import { ArrowRight, TrendingUp, LockIcon, Globe, Rocket } from "lucide-react";
import Card from "@/components/ui-custom/Card";
import Reveal from "@/components/ui-custom/Reveal";

type FeatureSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const TokenFeaturesOverview = () => {
  const sections: FeatureSection[] = [
    {
      id: "token-utility",
      title: "Token Utility & Research Access",
      description: "$PRSNA fuels AI-driven market intelligence. Token holders gain access to exclusive research insights, AI-generated intelligence, and staking rewards.",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
    },
    {
      id: "staking",
      title: "Staking & Research Rewards",
      description: "Stake $PRSNA to unlock premium AI-generated insights, participate in focus groups, and earn staking rewards.",
      icon: <LockIcon className="h-6 w-6 text-primary" />,
    },
    {
      id: "research",
      title: "Web3 Research & AI Insights",
      description: "Gain access to AI-powered market intelligence, tracking sentiment across DAOs, DeFi, and NFT ecosystems.",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      id: "token-ecosystem",
      title: "Token Utility & AI-Powered Research",
      description: "$PRSNA is the key to accessing PersonaAI's intelligence ecosystem for AI-driven insights and market data.",
      icon: <Rocket className="h-6 w-6 text-primary" />,
    }
  ];

  return (
    <>
      <Reveal>
        <h2 className="text-3xl font-bold mb-6 text-center">
          The $PRSNA Token Ecosystem
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <Reveal key={section.id} delay={100 * index}>
            <Card className="h-full bg-gray-800 border-gray-700 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-start mb-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 mr-4">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold">{section.title}</h3>
              </div>
              <p className="text-gray-400 mb-6">{section.description}</p>
              <a href={`#${section.id}-details`} className="inline-flex items-center text-primary font-medium">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Card>
          </Reveal>
        ))}
      </div>
    </>
  );
};

export default TokenFeaturesOverview;
