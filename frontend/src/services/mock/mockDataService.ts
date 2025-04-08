import { AnalysisResults, ResearchQuery, QuoteData } from "../types/qualitativeAnalysisTypes";

export const generateMockResults = (query: ResearchQuery): AnalysisResults => {
  return {
    aiSummary: `Analysis of conversations around ${query.query} reveals a mix of enthusiasm and caution. Users are excited about potential rewards from staking and participation, but express concerns about security, regulatory clarity, and project sustainability.`,
    
    reportGeneratedAt: new Date().toISOString(),
    
    keyInsights: [
      "Staking incentives are the most positively discussed aspect of tokens, with 68% of mentions expressing favorable views.",
      "User adoption is limited by technical complexity barriers, with 42% of negative comments citing confusion about staking processes.",
      "Community governance participation has increased 34% since the introduction of token-based voting.",
      "Security concerns have decreased by 18% following the latest platform audit and smart contract improvements.",
      "Token utility discussions demonstrate strong interest in real-world use cases beyond speculation."
    ],
    
    challenges: [
      "Technical barriers remain high for non-crypto native users trying to participate in the ecosystem.",
      "Regulatory uncertainty is creating hesitation among institutional participants.",
      "Balancing short-term incentives with long-term sustainability is a frequent concern.",
      "Price volatility undermines confidence in staking for some potential participants.",
      "Competition from other token ecosystems is increasing, requiring clearer differentiation."
    ],
    
    recommendations: [
      "Develop simpler onboarding tools specifically for non-technical users to increase adoption.",
      "Create educational content focused on explaining staking benefits in clear, non-technical language.",
      "Increase transparency around tokenomics and long-term sustainability plans.",
      "Implement additional security measures and promote recent security audit results.",
      "Consider tiered incentive structures to reward both short and long-term participation."
    ],
    
    aiInsights: [
      "Over 60% of discussions focus on practical token applications rather than speculative value.",
      "Educational content about staking has seen 3x more engagement than price discussions.",
      "Community governance proposals have increased by 47% quarter-over-quarter.",
      "Technical documentation improvements have reduced basic support questions by 35%.",
      "Early adopters are showing strong brand loyalty with 76% participation in community activities."
    ],
    
    topTopics: ["Token Utility", "Governance", "Staking Rewards", "Security", "Community Growth"],
    
    exampleQuotes: [
      {
        text: "The tokenomics look promising and well-thought-out compared to many other projects I've seen.",
        source: "Twitter",
        date: "Jan 12, 2023",
        sentiment: "positive"
      },
      {
        text: "Excited to see another project embracing the token ecosystem model, but show me the real utility first.",
        source: "Reddit",
        date: "Jan 13, 2023",
        sentiment: "neutral"
      },
      {
        text: "The APY rates for early stakers are incredible! Already moved my tokens into the staking contract.",
        source: "Reddit",
        date: "Feb 9, 2023",
        sentiment: "positive"
      }
    ],
    
    trendsAnalysis: [
      "Token utility discussions have grown 45% over the past quarter, indicating increased focus on real-world applications.",
      "The sentiment around governance proposals has shifted from 62% skeptical to 71% supportive following the recent voting system improvements.",
      "Community growth metrics show a sustained 12% month-over-month increase in active participation across all platform activities."
    ],
    
    timelineEvents: [
      {
        id: "event1",
        date: "Jan 12",
        timestamp: "2023-01-12",
        position: "5%",
        label: "Initial Token Launch",
        description: "Platform tokens were introduced to the public with initial staking mechanisms and rewards structure announced.",
        sentiment: "positive",
        impact: 85,
        quotes: [
          {
            text: "The tokenomics look promising and well-thought-out compared to many other projects I've seen.",
            source: "Twitter",
            date: "Jan 12, 2023",
            sentiment: "positive"
          },
          {
            text: "Excited to see another project embracing the token ecosystem model, but show me the real utility first.",
            source: "Reddit",
            date: "Jan 13, 2023",
            sentiment: "neutral"
          }
        ]
      },
      {
        id: "event2",
        date: "Feb 8",
        timestamp: "2023-02-08",
        position: "22%",
        label: "Staking Rewards Boost",
        description: "Platform announced increased rewards for early stakers, driving significant increase in participation.",
        sentiment: "positive",
        impact: 65,
        quotes: [
          {
            text: "The APY rates for early stakers are incredible! Already moved my tokens into the staking contract.",
            source: "Reddit",
            date: "Feb 9, 2023",
            sentiment: "positive"
          },
          {
            text: "Good short-term incentives, but these rates are unsustainable. What's the long-term plan?",
            source: "Twitter",
            date: "Feb 10, 2023",
            sentiment: "neutral"
          }
        ]
      },
      {
        id: "event3",
        date: "Mar 15",
        timestamp: "2023-03-15",
        position: "38%",
        label: "Security Vulnerability",
        description: "A minor security issue was discovered in the staking contract, temporarily pausing new deposits.",
        sentiment: "negative",
        impact: 70,
        quotes: [
          {
            text: "This is concerning. Even though it was caught early, it raises questions about the audit process.",
            source: "Reddit",
            date: "Mar 16, 2023",
            sentiment: "negative"
          },
          {
            text: "The team responded quickly and transparently. This is how security issues should be handled.",
            source: "Twitter",
            date: "Mar 17, 2023",
            sentiment: "positive"
          }
        ]
      },
      {
        id: "event4",
        date: "Apr 3",
        timestamp: "2023-04-03",
        position: "55%",
        label: "Governance Proposal System",
        description: "Introduction of token-based governance allowing holders to propose and vote on platform changes.",
        sentiment: "positive",
        impact: 60,
        quotes: [
          {
            text: "Finally some real utility! Being able to influence the platform's direction makes holding these tokens worthwhile.",
            source: "Reddit",
            date: "Apr 4, 2023",
            sentiment: "positive"
          },
          {
            text: "The governance system is still too complex for average users. Need simpler interfaces and better documentation.",
            source: "Twitter",
            date: "Apr 5, 2023",
            sentiment: "negative"
          }
        ]
      },
      {
        id: "event5",
        date: "May 22",
        timestamp: "2023-05-22",
        position: "72%",
        label: "Strategic Partnership",
        description: "Partnership announced with major DeFi platform, expanding token utility and cross-platform benefits.",
        sentiment: "positive",
        impact: 75,
        quotes: [
          {
            text: "This partnership makes perfect sense - expanding the ecosystem while adding real value for token holders.",
            source: "News Article",
            date: "May 23, 2023",
            sentiment: "positive"
          },
          {
            text: "Partnerships are good, but I'd rather see focus on improving the core product before expanding.",
            source: "Reddit",
            date: "May 24, 2023",
            sentiment: "neutral"
          }
        ]
      },
      {
        id: "event6",
        date: "Jun 30",
        timestamp: "2023-06-30",
        position: "90%",
        label: "Community Growth Milestone",
        description: "Platform reached 100,000 active token holders with 65% participating in staking or governance.",
        sentiment: "positive",
        impact: 80,
        quotes: [
          {
            text: "The growth is impressive - reaching 100k active users in this market shows the product has real demand.",
            source: "Twitter",
            date: "Jul 1, 2023",
            sentiment: "positive"
          },
          {
            text: "Great to see the community growing, but what matters more is retention. Let's see these numbers in 6 months.",
            source: "Reddit",
            date: "Jul 2, 2023",
            sentiment: "neutral"
          }
        ]
      }
    ],
    
    topicRippleData: [
      { 
        name: "Jan", 
        "User Adoption": 25, 
        "Token Utility": 40, 
        "Platform Security": 30, 
        "Governance": 15, 
        "Development Progress": 35,
        "Community Growth": 20
      },
      { 
        name: "Feb", 
        "User Adoption": 30, 
        "Token Utility": 50, 
        "Platform Security": 25, 
        "Governance": 18, 
        "Development Progress": 30,
        "Community Growth": 28
      },
      { 
        name: "Mar", 
        "User Adoption": 28, 
        "Token Utility": 45, 
        "Platform Security": 60, 
        "Governance": 22, 
        "Development Progress": 25,
        "Community Growth": 32
      },
      { 
        name: "Apr", 
        "User Adoption": 35, 
        "Token Utility": 42, 
        "Platform Security": 40, 
        "Governance": 55, 
        "Development Progress": 30,
        "Community Growth": 38
      },
      { 
        name: "May", 
        "User Adoption": 42, 
        "Token Utility": 48, 
        "Platform Security": 30, 
        "Governance": 45, 
        "Development Progress": 38,
        "Community Growth": 45
      },
      { 
        name: "Jun", 
        "User Adoption": 55, 
        "Token Utility": 52, 
        "Platform Security": 25, 
        "Governance": 50, 
        "Development Progress": 42,
        "Community Growth": 60
      },
      { 
        name: "Jul", 
        "User Adoption": 65, 
        "Token Utility": 58, 
        "Platform Security": 22, 
        "Governance": 48, 
        "Development Progress": 45,
        "Community Growth": 70
      }
    ],
    
    topicInsights: [
      {
        topic: "User Adoption",
        description: "User adoption has steadily increased over the past 6 months with a significant acceleration in June following improved onboarding processes.",
        trend: "rising",
        sentiment: "positive"
      },
      {
        topic: "Token Utility",
        description: "Discussions around token utility have remained consistently high, with growing interest in governance rights and platform access benefits.",
        trend: "rising",
        sentiment: "positive"
      },
      {
        topic: "Platform Security",
        description: "Security concerns peaked in March following a contract vulnerability, but have steadily decreased as new security measures were implemented.",
        trend: "falling",
        sentiment: "positive"
      },
      {
        topic: "Governance",
        description: "Governance discussions spiked in April with the introduction of the proposal system and have maintained high engagement since.",
        trend: "stable",
        sentiment: "positive"
      },
      {
        topic: "Development Progress",
        description: "Interest in development updates has been consistent, with slight increases following roadmap announcements.",
        trend: "stable",
        sentiment: "neutral"
      },
      {
        topic: "Community Growth",
        description: "The most rapidly growing topic over the observed period, with overwhelmingly positive sentiment around ecosystem expansion.",
        trend: "rising",
        sentiment: "positive"
      }
    ],
    
    sentimentBreakdown: {
      positive: 58,
      neutral: 27,
      negative: 15
    },
    
    sourceBreakdown: {
      "twitter": 45,
      "reddit": 35,
      "news": 20
    }
  };
};

export const fetchQualitativeData = async (query: ResearchQuery): Promise<AnalysisResults> => {
  // This simulates an API call with a small delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Use the generateMockResults function to maintain consistency
  return generateMockResults(query);
};
