
import { BarChart3, Wallet } from "lucide-react";
import Reveal from "@/components/ui-custom/Reveal";
import Button from "@/components/ui-custom/Button";

type DashboardHeaderProps = {
  title: string;
  description: string;
  walletAddress?: string;
  disconnectWallet?: () => void;
};

const DashboardHeader = ({ 
  title, 
  description, 
  walletAddress,
  disconnectWallet
}: DashboardHeaderProps) => {
  return (
    <Reveal>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {walletAddress && (
            <div className="px-4 py-2 bg-gray-800 rounded-lg flex items-center border border-gray-700">
              <Wallet className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium truncate max-w-[150px]">
                {walletAddress}
              </span>
            </div>
          )}
          {disconnectWallet && (
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export default DashboardHeader;
