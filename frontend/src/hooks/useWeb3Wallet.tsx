
import { useState } from "react";
import { toast } from "sonner";

type WalletHookReturn = {
  isWalletConnected: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  walletAddress: string;
  mockBalance: string;
  mockStaked: string;
  mockAPY: string;
  mockRewards: string;
  mockStakingTier: string;
  mockEarnedRewards: string;
  mockAvailableRewards: string;
};

export function useWeb3Wallet(): WalletHookReturn {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  
  // Mock data - in a real implementation, these would come from blockchain queries
  const mockBalance = "1,245.00";
  const mockStaked = "750.00";
  const mockAPY = "12.5%";
  const mockRewards = "22.43";
  const mockStakingTier = "Silver";
  const mockEarnedRewards = "152.75";
  const mockAvailableRewards = "48.30";
  
  const connectWallet = () => {
    // In a real implementation, this would connect to a wallet provider
    setIsWalletConnected(true);
    // Mock wallet address - in a real implementation, this would come from the wallet
    setWalletAddress("0x7b1B3Af9e5F69D4AF2b75e91F42Fa");
    toast.success("Wallet connected successfully!");
  };
  
  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress("");
    toast.info("Wallet disconnected");
  };
  
  return {
    isWalletConnected,
    connectWallet,
    disconnectWallet,
    walletAddress,
    mockBalance,
    mockStaked,
    mockAPY,
    mockRewards,
    mockStakingTier,
    mockEarnedRewards,
    mockAvailableRewards
  };
}
