import { useState } from "react";
import { BarChart3, LockIcon, Lightbulb, Bot } from "lucide-react";
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Footer from "@/components/sections/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Reveal from "@/components/ui-custom/Reveal";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";

// Import components
import EcosystemHero from "@/components/ecosystem/EcosystemHero";
import TokenFeaturesOverview from "@/components/ecosystem/TokenFeaturesOverview";
import DashboardHeader from "@/components/ecosystem/DashboardHeader";
import DashboardOverview from "@/components/ecosystem/dashboard/DashboardOverview";
import StakingTab from "@/components/ecosystem/dashboard/StakingTab";
import ResearchTab from "@/components/ecosystem/dashboard/ResearchTab";
import AIAgentTab from "@/components/ecosystem/dashboard/AIAgentTab";
import StakingPreview from "@/components/ecosystem/StakingPreview";
import QualitativeAnalysis from "@/components/sections/QualitativeAnalysis"; 
import ResearchAgentSection from "@/components/ecosystem/ResearchAgentSection"; 
import AvatarFeature from "@/components/ecosystem/AvatarFeature";

const PRSNAEcosystem = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { 
    isWalletConnected, 
    connectWallet, 
    disconnectWallet,
    mockBalance,
    mockStaked,
    mockAPY,
    mockRewards,
    mockStakingTier
  } = useWeb3Wallet();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <EcosystemHero 
          isWalletConnected={isWalletConnected}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          setActiveTab={setActiveTab}
        />

        {/* AI Avatar Feature Section - Directly under Hero */}
        <Section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 mt-0">
          <AvatarFeature />
        </Section>
        
        {/* Research Agent Section */}
        {!isWalletConnected && <ResearchAgentSection />}
        
        {/* Web3 Dashboard Section */}
        <Section className="bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-5xl mx-auto">
              {isWalletConnected ? (
                <>
                  <DashboardHeader
                    title="$PRSNA Dashboard"
                    description="Manage your tokens and access AI research tools"
                    walletAddress="0x7b1B...42Fa"
                    disconnectWallet={disconnectWallet}
                  />
                  
                  <Reveal delay={100}>
                    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-10">
                      <TabsList className="grid grid-cols-4 mb-8 bg-gray-800 p-1 border border-gray-700">
                        <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-700">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Dashboard</span>
                        </TabsTrigger>
                        <TabsTrigger value="staking" className="data-[state=active]:bg-gray-700">
                          <LockIcon className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Staking</span>
                        </TabsTrigger>
                        <TabsTrigger value="research" className="data-[state=active]:bg-gray-700">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Research</span>
                        </TabsTrigger>
                        <TabsTrigger value="ai-agent" className="data-[state=active]:bg-gray-700">
                          <Bot className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">AI Agent</span>
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="dashboard">
                        <DashboardOverview 
                          mockBalance={mockBalance}
                          mockStaked={mockStaked}
                          mockAPY={mockAPY}
                          mockRewards={mockRewards}
                          mockStakingTier={mockStakingTier}
                        />
                      </TabsContent>
                      
                      <TabsContent value="staking">
                        <StakingTab mockBalance={mockBalance} />
                      </TabsContent>
                      
                      <TabsContent value="research">
                        <ResearchTab />
                      </TabsContent>
                      
                      <TabsContent value="ai-agent">
                        <AIAgentTab />
                      </TabsContent>
                    </Tabs>
                  </Reveal>
                </>
              ) : (
                null
              )}
            </div>
          </div>
        </Section>
        
        {/* For non-connected wallet users, show these sections */}
        {!isWalletConnected && (
          <>
            {/* Insights Conductor Section with proper background and spacing */}
            <div className="bg-gray-800 text-gray-100">
              <Section className="pt-8 pb-16" reducedPadding>
                <QualitativeAnalysis />
              </Section>
            </div>
            
            {/* Staking Dashboard Preview */}
            <StakingPreview connectWallet={connectWallet} />
            
            {/* Token Features Overview (below staking) */}
            <Section className="bg-gray-900">
              <div className="container px-4 mx-auto">
                <div className="max-w-5xl mx-auto">
                  <TokenFeaturesOverview />
                </div>
              </div>
            </Section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PRSNAEcosystem;
