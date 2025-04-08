
import { ArrowRight, Rocket, Wallet, HandCoins, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";

type EcosystemHeroProps = {
  isWalletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  setActiveTab: (tab: string) => void;
};

const EcosystemHero = ({ 
  isWalletConnected, 
  connectWallet, 
  disconnectWallet, 
  setActiveTab 
}: EcosystemHeroProps) => {
  return (
    <Section className="bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left side - Text Content */}
          <div className="w-full lg:w-1/2">
            <Reveal>
              <div className="inline-flex items-center justify-center bg-primary/20 px-4 py-2 rounded-full mb-6">
                <Rocket className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Base Chain</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-plasmik">
                PersonaAI and $PRSNA<br />
                Research Layer for Web3
              </h1>
            </Reveal>
            
            <Reveal delay={200}>
              <p className="text-gray-300 text-pretty mb-10">
                The $PRSNA token powers AI-driven market research and qualitative intelligence. 
                Stake $PRSNA to unlock premium insights, research tools, and AI-powered predictions.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              {!isWalletConnected ? (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="group bg-gradient-to-r from-primary to-primary/80 border-none w-full sm:w-auto"
                    onClick={connectWallet}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group border-gray-700 hover:bg-gray-800"
                    onClick={disconnectWallet}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Disconnect Wallet
                  </Button>
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="group bg-gradient-to-r from-primary to-primary/80 border-none"
                    onClick={() => setActiveTab("staking")}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Stake $PRSNA
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                  </Button>
                </div>
              )}
            </Reveal>
          </div>
          
          {/* Right side - Earn $PRSNA section */}
          <div className="w-full lg:w-1/2">
            <Reveal delay={400}>
              <div className="flex flex-col bg-gray-800/80 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-plasmik">
                      Earn $PRSNA Tokens
                    </h2>
                  </div>
                  <div className="h-16 w-16 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <HandCoins className="h-8 w-8 text-primary/70" />
                  </div>
                </div>
                
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
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EcosystemHero;
