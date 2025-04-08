
import { useState } from "react";
import Card from "@/components/ui-custom/Card";
import Button from "@/components/ui-custom/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StakingTabProps = {
  mockBalance: string;
};

const StakingTab = ({ mockBalance }: StakingTabProps) => {
  const [stakeAmount, setStakeAmount] = useState("");
  
  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock staking logic
    if (stakeAmount && !isNaN(Number(stakeAmount))) {
      alert(`Successfully staked ${stakeAmount} $PRSNA tokens!`);
      setStakeAmount("");
    } else {
      alert("Please enter a valid amount to stake");
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Stake $PRSNA Tokens</h3>
        <p className="text-gray-400 mb-6">
          Stake your tokens to earn rewards and gain access to advanced research features.
          The longer you stake, the higher your rewards and research access levels.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 border-2 border-gray-700 hover:border-primary cursor-pointer transition-all bg-gray-800/80">
            <h4 className="font-semibold mb-2">30 Days</h4>
            <p className="text-primary text-lg font-bold mb-1">8% APY</p>
            <p className="text-xs text-gray-400">Bronze Tier Access</p>
          </Card>
          <Card className="p-4 border-2 border-primary cursor-pointer transition-all bg-primary/5">
            <div className="absolute -top-2 right-4 px-2 py-0.5 bg-primary text-black text-xs rounded-full">
              Popular
            </div>
            <h4 className="font-semibold mb-2">90 Days</h4>
            <p className="text-primary text-lg font-bold mb-1">12.5% APY</p>
            <p className="text-xs text-gray-400">Silver Tier Access</p>
          </Card>
          <Card className="p-4 border-2 border-gray-700 hover:border-primary cursor-pointer transition-all bg-gray-800/80">
            <h4 className="font-semibold mb-2">180 Days</h4>
            <p className="text-primary text-lg font-bold mb-1">18% APY</p>
            <p className="text-xs text-gray-400">Gold Tier Access</p>
          </Card>
        </div>
        
        <form onSubmit={handleStakeSubmit} className="space-y-4">
          <div>
            <Label htmlFor="stake-amount" className="text-gray-300">Amount to Stake</Label>
            <div className="relative mt-1">
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.00"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="pl-3 pr-20 bg-gray-800 border-gray-700 text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400">$PRSNA</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Available: {mockBalance} $PRSNA
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={() => setStakeAmount((parseFloat(mockBalance.replace(/,/g, '')) / 4).toString())}
            >
              25%
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={() => setStakeAmount((parseFloat(mockBalance.replace(/,/g, '')) / 2).toString())}
            >
              50%
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-700"
              onClick={() => setStakeAmount(mockBalance.replace(/,/g, ''))}
            >
              Max
            </Button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary/80 border-none"
          >
            Stake Tokens
          </Button>
        </form>
      </Card>
      
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Your Staking Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Lock Period</th>
                <th className="py-2 text-left">APY</th>
                <th className="py-2 text-left">Rewards</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-3">750 $PRSNA</td>
                <td className="py-3">90 Days</td>
                <td className="py-3 text-primary">12.5%</td>
                <td className="py-3">22.43 $PRSNA</td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-green-900/40 text-green-400 rounded-full text-xs">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StakingTab;
