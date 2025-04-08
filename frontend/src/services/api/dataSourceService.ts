
import { ResearchQuery, AnalysisResults, QuoteData, DataSource, SentimentFilter } from "../types/qualitativeAnalysisTypes";
import { toast } from "sonner";
import { generateAIInsights, generateTrendsAnalysis } from "../ai/aiInsightsService";
import { fetchTwitterData, fetchRedditData, fetchNewsData } from "./sourceAdapters";
import { handleApiError } from "../utils/apiUtils";
import { generateMockResults } from "../mock/mockDataService";

// Main function to fetch qualitative data from real APIs
export async function fetchQualitativeData(query: ResearchQuery): Promise<AnalysisResults> {
  try {
    // Track which sources successfully returned data
    const sourceResults: { [key: string]: boolean } = {};
    let quotes: QuoteData[] = [];
    let keywords: string[] = [];
    let topics: string[] = [];
    
    // Prioritize crypto-specific keywords for Web3 queries
    if (query.query.toLowerCase().includes("crypto") || 
        query.query.toLowerCase().includes("defi") || 
        query.query.toLowerCase().includes("web3") || 
        query.query.toLowerCase().includes("nft")) {
      if (!query.keywords.includes("defi")) query.keywords.push("defi");
      if (!query.keywords.includes("crypto")) query.keywords.push("crypto");
      if (!query.keywords.includes("blockchain")) query.keywords.push("blockchain");
    }
    
    // Determine which sources to query
    const sourcesToQuery = query.sources.includes("all") ? ["twitter", "reddit", "news"] as DataSource[] : query.sources as DataSource[];
    
    // Create promise array for parallel API calls
    const apiPromises = sourcesToQuery.map(source => {
      const fetcher = getFetcherForSource(source);
      return fetcher(query).then(result => {
        sourceResults[source] = result.quotes.length > 0;
        quotes = [...quotes, ...result.quotes];
        keywords = [...keywords, ...result.keywords];
        topics = [...topics, ...result.topics];
      }).catch(error => {
        handleApiError(error, `${source} API`);
        sourceResults[source] = false;
      });
    });
    
    // Wait for all API calls to complete
    await Promise.all(apiPromises);
    
    // Filter quotes by sentiment if specified
    if (query.sentiment !== "all") {
      quotes = quotes.filter(quote => quote.sentiment === query.sentiment);
    }
    
    // If no data returned from any source, fall back to mock data
    const anySourceSucceeded = Object.values(sourceResults).some(success => success);
    if (!anySourceSucceeded && Object.keys(sourceResults).length > 0) {
      console.log("No real data available, falling back to mock data");
      
      // Use mock data but inform the user
      toast.info("Using offline data as API requests are restricted in this environment.", {
        description: "Try testing on localhost or using your own API keys for live data."
      });
      
      return generateMockResults(query);
    }
    
    // Process and prioritize by keywords
    processKeywords(quotes, query);
    
    // For crypto queries, prioritize quotes mentioning specific crypto terms
    if (query.query.toLowerCase().includes("crypto") || 
        query.query.toLowerCase().includes("defi") || 
        query.query.toLowerCase().includes("web3")) {
      const cryptoTerms = ["token", "staking", "yield", "apy", "liquidity", "dex", "defi", "nft"];
      quotes.sort((a, b) => {
        const aMentionsCrypto = cryptoTerms.some(term => a.text.toLowerCase().includes(term));
        const bMentionsCrypto = cryptoTerms.some(term => b.text.toLowerCase().includes(term));
        return (bMentionsCrypto ? 1 : 0) - (aMentionsCrypto ? 1 : 0);
      });
    }
    
    // Deduplicate and limit keywords and topics
    keywords = Array.from(new Set(keywords)).slice(0, 15);
    topics = Array.from(new Set(topics)).slice(0, 5);
    
    // If this is a crypto query, add relevant topics if missing
    if (query.query.toLowerCase().includes("crypto") || query.query.toLowerCase().includes("web3")) {
      const cryptoTopics = ["DeFi Trends", "Market Sentiment", "Token Utility", "On-chain Metrics"];
      for (const topic of cryptoTopics) {
        if (!topics.includes(topic) && topics.length < 5) {
          topics.push(topic);
        }
      }
    }
    
    // Calculate sentiment breakdown
    const sentimentBreakdown = calculateSentimentBreakdown(quotes);
    
    // Generate AI insights and trends analysis
    const aiInsights = generateAIInsights(topics, sentimentBreakdown, keywords, query);
    const trendsAnalysis = [generateTrendsAnalysis(sentimentBreakdown, topics, query)]; // Wrapping in array
    
    // Create a complete AnalysisResults object
    const defaultResult = generateMockResults(query);
    
    return {
      // Use the real data we collected
      topTopics: topics,
      sentimentBreakdown,
      exampleQuotes: quotes.slice(0, 10), // Limit to 10 quotes
      keyPhrases: keywords,
      aiInsights,
      trendsAnalysis,
      reportGeneratedAt: new Date().toISOString(),
      
      // For required properties where we don't have real data, use the mock data
      aiSummary: `Analysis of conversations around ${query.query} based on collected data.`,
      keyInsights: defaultResult.keyInsights,
      challenges: defaultResult.challenges,
      recommendations: defaultResult.recommendations,
      timelineEvents: defaultResult.timelineEvents,
      topicRippleData: defaultResult.topicRippleData,
      topicInsights: defaultResult.topicInsights,
      sourceBreakdown: generateSourceBreakdown(quotes)
    };
  } catch (error) {
    return handleGlobalError(error, query);
  }
}

// Helper function to get the appropriate fetcher for each source
function getFetcherForSource(source: string) {
  switch (source) {
    case "twitter":
      return fetchTwitterData;
    case "reddit":
      return fetchRedditData;
    case "news":
      return fetchNewsData;
    default:
      return fetchTwitterData; // Default fallback
  }
}

// Generate source breakdown based on quotes
function generateSourceBreakdown(quotes: QuoteData[]): { [key in DataSource]?: number } {
  if (quotes.length === 0) {
    return { "twitter": 33, "reddit": 33, "news": 34 };
  }
  
  const sourceCounts: { [key: string]: number } = {};
  
  quotes.forEach(quote => {
    const source = quote.source.toLowerCase().includes("twitter") ? "twitter" :
                 quote.source.toLowerCase().includes("reddit") ? "reddit" : 
                 "news";
    
    sourceCounts[source] = (sourceCounts[source] || 0) + 1;
  });
  
  const total = quotes.length;
  const result: { [key in DataSource]?: number } = {};
  
  for (const source in sourceCounts) {
    result[source as DataSource] = Math.round((sourceCounts[source] / total) * 100);
  }
  
  return result;
}

// Process and prioritize quotes by keywords
function processKeywords(quotes: QuoteData[], query: ResearchQuery): void {
  if (query.keywords.length > 0) {
    // If user specified keywords, prioritize content containing those keywords
    const keywordRegex = new RegExp(query.keywords.join("|"), "i");
    quotes.sort((a, b) => {
      const aHasKeyword = keywordRegex.test(a.text);
      const bHasKeyword = keywordRegex.test(b.text);
      return (bHasKeyword ? 1 : 0) - (aHasKeyword ? 1 : 0);
    });
  }
}

// Calculate sentiment breakdown from quotes
function calculateSentimentBreakdown(quotes: QuoteData[]): { positive: number; neutral: number; negative: number } {
  if (quotes.length === 0) {
    return { positive: 33, neutral: 34, negative: 33 }; // Default even distribution
  }
  
  const sentimentCounts = quotes.reduce(
    (counts, quote) => {
      counts[quote.sentiment]++;
      return counts;
    },
    { positive: 0, neutral: 0, negative: 0 } as { [key: string]: number }
  );
  
  const total = quotes.length;
  return {
    positive: Math.round((sentimentCounts.positive / total) * 100),
    neutral: Math.round((sentimentCounts.neutral / total) * 100),
    negative: Math.round((sentimentCounts.negative / total) * 100)
  };
}

// Global error handler for the main function
async function handleGlobalError(error: unknown, query: ResearchQuery): Promise<AnalysisResults> {
  handleApiError(error, "Qualitative data fetching");
  return generateMockResults(query);
}
