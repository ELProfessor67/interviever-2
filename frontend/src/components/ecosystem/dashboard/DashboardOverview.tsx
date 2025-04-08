
import { BarChart3, Bot, ChevronRight, Plus, Zap } from "lucide-react";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import { ArrowRight } from "lucide-react";

type DashboardOverviewProps = {
  mockBalance: string;
  mockStaked: string;
  mockAPY: string;
  mockRewards: string;
  mockStakingTier: string;
};

const DashboardOverview = ({
  mockBalance,
  mockStaked,
  mockAPY,
  mockRewards,
  mockStakingTier
}: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-800 border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-1">$PRSNA Balance</h3>
          <p className="text-2xl font-bold">{mockBalance}</p>
        </Card>
        <Card className="p-4 bg-gray-800 border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Staked $PRSNA</h3>
          <p className="text-2xl font-bold">{mockStaked}</p>
        </Card>
        <Card className="p-4 bg-gray-800 border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Current APY</h3>
          <p className="text-2xl font-bold text-primary">{mockAPY}</p>
        </Card>
        <Card className="p-4 bg-gray-800 border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-1">Rewards</h3>
          <p className="text-2xl font-bold text-primary">{mockRewards}</p>
        </Card>
      </div>
      
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Research Access</h3>
          <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
            {mockStakingTier} Tier
          </div>
        </div>
        <p className="text-gray-400 mb-4">
          Your current staking position grants you access to:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span>AI Focus Group participation (up to 3 per month)</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span>Unlimited access to the AI Persona Interviewer</span>
          </li>
          <li className="flex items-start">
            <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span>Weekly market sentiment reports</span>
          </li>
        </ul>
        <div className="mt-6">
          <Button className="bg-gray-700 hover:bg-gray-600 border-none">
            <Plus className="h-4 w-4 mr-2" />
            Stake more for Gold Tier
          </Button>
        </div>
      </Card>
      
      {/* Live AI Insights Preview */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Live AI Insights</h3>
          <div className="px-3 py-1 bg-green-900/40 text-green-400 rounded-full text-xs flex items-center">
            <Zap className="h-3 w-3 mr-1" />
            LIVE
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center mb-1">
              <Bot className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">DeFi Sentiment</span>
            </div>
            <p className="text-xs text-gray-300">
              Positive shift in Base Chain DeFi protocols sentiment over the past 24 hours. User engagement up 12% despite market volatility.
            </p>
          </div>
          <div className="p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center mb-1">
              <Bot className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium">NFT Market Trend</span>
            </div>
            <p className="text-xs text-gray-300">
              Sentiment analysis indicates shift toward utility-focused NFT collections. Collections with clear use cases show 3x more positive mentions.
            </p>
          </div>
        </div>
        <div className="mt-4 text-right">
          <Button variant="link" className="text-primary p-0 h-auto">
            View Full Research Hub
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
