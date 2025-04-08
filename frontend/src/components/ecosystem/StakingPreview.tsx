
import { ArrowRight, Wallet, LockIcon, TrendingUp, Zap } from "lucide-react";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";
import Card from "@/components/ui-custom/Card";

type StakingPreviewProps = {
  connectWallet: () => void;
};

const StakingPreview = ({ connectWallet }: StakingPreviewProps) => {
  return (
    <Section className="bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-bold mb-6 text-center">
              Stake $PRSNA to Access AI Research
            </h2>
          </Reveal>
          
          <Reveal delay={100}>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-center">
              Stake your $PRSNA tokens to earn rewards and access exclusive research insights.
              The longer you stake, the greater your research access and benefits.
            </p>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Bronze Tier */}
              <Card className="p-6 bg-gray-800/50 border border-gray-700 hover:border-primary/40 transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mr-4">
                    <LockIcon className="h-6 w-6 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Bronze Tier</h3>
                    <p className="text-primary">8% APY</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    Basic AI research insights
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    30-day staking period
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    Weekly market reports
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </Card>
              
              {/* Silver Tier */}
              <Card className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 border border-primary/30 hover:border-primary/60 transition-all shadow-lg shadow-primary/5 relative">
                <div className="absolute top-0 right-0 bg-primary text-black text-xs px-3 py-1 rounded-bl-lg font-medium">
                  Popular
                </div>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/20 mr-4">
                    <TrendingUp className="h-6 w-6 text-primary/80" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Silver Tier</h3>
                    <p className="text-primary">12.5% APY</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2"></div>
                    Advanced AI research insights
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2"></div>
                    90-day staking period
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2"></div>
                    AI persona interactions
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/70 mr-2"></div>
                    Daily market analysis
                  </li>
                </ul>
                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-primary to-primary/80 border-none"
                  onClick={connectWallet}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </Card>
              
              {/* Gold Tier */}
              <Card className="p-6 bg-gray-800/50 border border-gray-700 hover:border-primary/40 transition-all">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 mr-4">
                    <Zap className="h-6 w-6 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Gold Tier</h3>
                    <p className="text-primary">18% APY</p>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    Premium AI insights & reports
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    180-day staking period
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    AI video avatar access
                  </li>
                  <li className="flex items-center text-gray-400 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2"></div>
                    Exclusive NFT insights
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-700"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </Card>
            </div>
          </Reveal>
          
          <Reveal delay={300} className="text-center">
            <Button 
              variant="primary" 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-primary/80 border-none" 
              onClick={connectWallet}
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default StakingPreview;
