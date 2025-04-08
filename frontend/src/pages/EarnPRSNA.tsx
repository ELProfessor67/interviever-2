import { useState } from "react";
import { ArrowRight, BrainCircuit, Users, GraduationCap, HandCoins, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Section from "@/components/ui-custom/Section";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui-custom/Button";
import Card from "@/components/ui-custom/Card";
import Reveal from "@/components/ui-custom/Reveal";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import AvatarFeatureDark from "@/components/ecosystem/AvatarFeatureDark";

const EarnPRSNA = () => {
  const { isWalletConnected, connectWallet } = useWeb3Wallet();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Section className="bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Left side - Text Content */}
              <div className="w-full lg:w-1/2">
                <Reveal>
                  <div className="inline-flex items-center justify-center bg-secondary/20 px-4 py-2 rounded-full mb-6">
                    <HandCoins className="h-5 w-5 text-secondary mr-2" />
                    <span className="text-sm font-medium text-secondary">Earn Rewards</span>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 font-plasmik">
                    Earn $PRSNA by Contributing to AI Research
                  </h1>
                </Reveal>
                
                <Reveal delay={200}>
                  <p className="text-gray-300 text-pretty mb-10">
                    Help shape the future of AI-powered research and earn $PRSNA tokens as rewards. 
                    Create unique AI personas or participate in focus groups to earn while 
                    contributing to next-generation market insights.
                  </p>
                </Reveal>
                
                <Reveal delay={300}>
                  {!isWalletConnected ? (
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
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/prsna-ecosystem">
                        <Button
                          variant="primary"
                          size="lg"
                          className="group bg-gradient-to-r from-primary to-primary/80 border-none"
                        >
                          <Wallet className="w-4 h-4 mr-2" />
                          Stake $PRSNA
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </Reveal>
              </div>
              
              {/* Right side - Rewards Illustration */}
              <div className="w-full lg:w-1/2">
                <Reveal delay={400}>
                  <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6">
                    <div className="aspect-video bg-gray-900/80 rounded-lg flex flex-col items-center justify-center border border-gray-700 mb-6">
                      <HandCoins className="h-20 w-20 text-secondary/50 mb-3" />
                      <h3 className="text-xl font-semibold text-white mb-2">Earn While Contributing</h3>
                      <p className="text-gray-400 text-center max-w-md mb-4">
                        Get rewarded for helping improve AI research capabilities
                      </p>
                      <div className="flex items-center justify-center px-4 py-2 bg-secondary/20 rounded-full">
                        <span className="text-sm font-medium text-secondary">$PRSNA Rewards</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-gray-700/50 p-3 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="text-sm font-medium">Create AI Personas</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-700/50 p-3 rounded-lg">
                        <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                          <Users className="h-4 w-4 text-secondary" />
                        </div>
                        <span className="text-sm font-medium">Join Focus Groups</span>
                      </div>
                    </div>
                    
                    <div className="text-center text-gray-400 text-sm">
                      Stakers get priority access to earning opportunities
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>

        {/* AI Avatar Feature Section - Using the new dark text on light background component */}
        <Section className="bg-white from-gray-50 to-gray-100 py-16 mt-0">
          <AvatarFeatureDark />
        </Section>

        {/* How to Earn Section */}
        <Section className="bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-3xl font-bold mb-2 text-center">How to Earn $PRSNA</h2>
                <p className="text-gray-400 text-center mb-10">
                  Multiple ways to earn rewards while contributing to AI research
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Reveal delay={100}>
                  <Card className="h-full bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-secondary/10 transition-all">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                        <BrainCircuit className="h-6 w-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold">Create AI Personas</h3>
                    </div>
                    <p className="text-gray-400 mb-6">
                      Build and train unique AI personas with specific demographics, 
                      behaviors, and preferences. Your personas will be used in qualitative 
                      research studies to generate insights.
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">✓</span>
                        </span>
                        <span className="text-gray-300">Earn 50-200 $PRSNA per approved persona</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">✓</span>
                        </span>
                        <span className="text-gray-300">Earn royalties when your personas are used in research</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">✓</span>
                        </span>
                        <span className="text-gray-300">Persona creators get priority for focus groups</span>
                      </li>
                    </ul>
                    <Button variant="secondary" className="w-full" disabled>
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Coming Soon
                    </Button>
                  </Card>
                </Reveal>
                
                <Reveal delay={200}>
                  <Card className="h-full bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-secondary/10 transition-all">
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold">Join AI Focus Groups</h3>
                    </div>
                    <p className="text-gray-400 mb-6">
                      Participate in moderated AI focus groups to provide insights on products, 
                      services, and market trends. Your contributions help shape the future of 
                      AI-powered research.
                    </p>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">✓</span>
                        </span>
                        <span className="text-gray-300">Earn 10-50 $PRSNA per focus group session</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">✓</span>
                        </span>
                        <span className="text-gray-300">Bonus rewards for high-quality contributions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="h-5 w-5 rounded-full bg-secondary/20 flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-xs font-bold text-secondary">✓</span>
                        </span>
                        <span className="text-gray-300">$PRSNA stakers get access to premium sessions</span>
                      </li>
                    </ul>
                    <Link to="/ai-focus-groups">
                      <Button variant="secondary" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Explore Focus Groups
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </Card>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>

        {/* Staking Benefits Section */}
        <Section className="bg-gray-800">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                  Stake $PRSNA for Enhanced Rewards
                </h2>
                <p className="text-gray-400 text-center mb-10">
                  Stake your tokens to unlock premium earning opportunities
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="bg-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all border border-gray-700">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4">
                      <Wallet className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-3">Priority Access</h3>
                    <p className="text-gray-400 text-center text-sm">
                      Stakers get first access to high-paying research opportunities and focus groups
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all border border-gray-700">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4">
                      <HandCoins className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-3">Bonus Rewards</h3>
                    <p className="text-gray-400 text-center text-sm">
                      Earn up to 50% more $PRSNA for each contribution based on your staking tier
                    </p>
                  </div>
                  
                  <div className="bg-gray-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all border border-gray-700">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 mx-auto mb-4">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-center mb-3">Premium Research</h3>
                    <p className="text-gray-400 text-center text-sm">
                      Access exclusive high-tier research opportunities reserved for stakers
                    </p>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={200}>
                <div className="text-center">
                  <Link to="/prsna-ecosystem">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      className="group bg-gradient-to-r from-primary to-primary/80 border-none"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Stake $PRSNA Now
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export default EarnPRSNA;
