
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Lightbulb, Lock, TrendingUp, HandCoins, Coins, Zap, LineChart } from "lucide-react";
import Section from "../ui-custom/Section";
import Button from "../ui-custom/Button";
import Reveal from "../ui-custom/Reveal";

const TokenEcosystem = () => {
  return (
    <Section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center bg-primary/20 px-4 py-2 rounded-full mb-6 relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
              <Rocket className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Base Chain Powered</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-plasmik">
              $PRSNA — Research Layer for Web3
            </h2>
          </Reveal>
          
          <Reveal delay={200}>
            <p className="text-gray-300 text-pretty mb-10 max-w-2xl mx-auto text-lg">
              $PRSNA fuels the first AI-powered qualitative research ecosystem. 
              Stake to access exclusive insights, Web3 intelligence, and research tools.
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/prsna-ecosystem">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="group bg-gradient-to-r from-blue-600 to-blue-700 border-none w-60 h-14 text-lg shadow-lg hover:shadow-blue-600/30 transition-all"
                >
                  Connect Wallet
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/earn-prsna">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="group w-60 h-14 text-lg"
                >
                  <HandCoins className="w-5 h-5 mr-2" />
                  Earn $PRSNA
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 ml-2" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
        
        <Reveal delay={400}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mr-4 shrink-0 group-hover:bg-primary/30 transition-all">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Staking & Research Rewards</h3>
                  <p className="text-sm text-gray-300">
                    Stake $PRSNA to unlock premium AI-generated insights, participate in focus groups, and earn staking rewards. The longer you stake, the greater your access to cutting-edge AI research.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 border-blue-500/50 hover:bg-blue-500/20"
                  >
                    Start Staking
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mr-4 shrink-0 group-hover:bg-primary/30 transition-all">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Earn $PRSNA Tokens</h3>
                  <p className="text-sm text-gray-300">
                    Create your own AI personas for research or participate in AI-powered focus groups to earn $PRSNA tokens. Help shape the future of AI research while getting rewarded.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 border-blue-500/50 hover:bg-blue-500/20"
                  >
                    Create a Persona
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mr-4 shrink-0 group-hover:bg-primary/30 transition-all">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Web3 Research & AI Insights</h3>
                  <p className="text-sm text-gray-300">
                    Gain access to AI-powered market intelligence, tracking sentiment across DAOs, DeFi, and NFT ecosystems. Stakers unlock premium insights from AI personas and real-world research.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 border-blue-500/50 hover:bg-blue-500/20"
                  >
                    View Insights
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="flex items-start">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mr-4 shrink-0 group-hover:bg-primary/30 transition-all">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Token Utility & Research Access</h3>
                  <p className="text-sm text-gray-300">
                    $PRSNA fuels AI-driven market intelligence. Token holders gain access to exclusive research insights, AI-generated intelligence, and staking rewards. Holding and staking $PRSNA unlocks premium data and participation in next-gen AI research.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 border-blue-500/50 hover:bg-blue-500/20"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        
        {/* AI Avatar Preview */}
        <Reveal delay={500}>
          <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/50 to-slate-800/50 border border-blue-500/20 rounded-2xl max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Avatar Agent</h3>
            </div>
            <p className="text-gray-300 mb-4">Talk to our AI research agent to explore market insights and token utility</p>
            <div className="flex justify-center">
              <Link to="/prsna-ecosystem">
                <Button 
                  variant="secondary" 
                  className="group bg-blue-600/20 hover:bg-blue-600/30 text-white border-blue-500/30 shadow-md"
                >
                  Meet the AI Agent
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
};

export default TokenEcosystem;
