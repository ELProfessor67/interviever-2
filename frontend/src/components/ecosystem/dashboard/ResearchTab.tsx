
import { Bot, Globe, Users, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";

const ResearchTab = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Research Tools Access</h3>
        <p className="text-gray-400 mb-6">
          Access AI-powered research tools and insights with your $PRSNA tokens.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border border-gray-700 hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all bg-gray-800/80">
            <div className="flex items-start mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">AI Persona Interviewer</h4>
                <p className="text-sm text-gray-400">
                  Conduct 1:1 interviews with custom AI personas
                </p>
              </div>
            </div>
            <Link to="/persona-ai-interviewer">
              <Button className="bg-gray-700 hover:bg-gray-600 border-none">Launch Tool</Button>
            </Link>
          </Card>
          
          <Card className="p-4 border border-gray-700 hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all bg-gray-800/80">
            <div className="flex items-start mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">AI Focus Groups</h4>
                <p className="text-sm text-gray-400">
                  Run moderated discussions with diverse AI personas
                </p>
              </div>
            </div>
            <Link to="/ai-focus-groups">
              <Button className="bg-gray-700 hover:bg-gray-600 border-none">Launch Tool</Button>
            </Link>
          </Card>
          
          <Card className="p-4 border border-gray-700 hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all bg-gray-800/80">
            <div className="flex items-start mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Web3 Sentiment Analysis</h4>
                <p className="text-sm text-gray-400">
                  Track market sentiment across DAOs and DeFi projects
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
              Coming Soon
            </Button>
          </Card>
          
          <Card className="p-4 border border-gray-700 hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all bg-gray-800/80">
            <div className="flex items-start mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Gem className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Tokenized AI Insights (NFTs)</h4>
                <p className="text-sm text-gray-400">
                  Access exclusive AI-generated research insights as NFTs
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
              Stake More to Unlock
            </Button>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default ResearchTab;
