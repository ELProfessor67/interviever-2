
import { ResearchQuery, QuoteData, SentimentFilter } from "../types/qualitativeAnalysisTypes";
import { getApiKeys } from "../utils/apiKeyUtils";
import { toast } from "sonner";
import { handleApiError, showApiRestrictionNotice, generatePlaceholderData } from "../utils/apiUtils";

// Helper function to ensure sentiment is a valid QuoteData sentiment
const mapSentiment = (sentiment: SentimentFilter): "positive" | "negative" | "neutral" => {
  if (sentiment === "all") {
    // Default to neutral if "all" is used
    return "neutral";
  }
  return sentiment;
};

// Helper function to ensure quotes have all required properties
const ensureValidQuotes = (quotes: any[]): QuoteData[] => {
  const currentDate = new Date().toISOString().split('T')[0]; // Today's date as fallback
  
  return quotes.map(quote => ({
    text: quote.text || "",
    source: quote.source || "Unknown",
    date: quote.date || currentDate,
    sentiment: mapSentiment(quote.sentiment || "neutral")
  }));
};

// Twitter API adapter
export async function fetchTwitterData(query: ResearchQuery): Promise<{ quotes: QuoteData[], keywords: string[], topics: string[] }> {
  try {
    const apiKeys = getApiKeys();
    
    if (!apiKeys.twitter) {
      toast.error("Twitter API key is missing. Please add your key in the API Keys settings.");
      return { quotes: [], keywords: [], topics: [] };
    }
    
    showApiRestrictionNotice("Twitter");
    const placeholderData = generatePlaceholderData("Twitter");
    
    // Ensure all quotes are valid QuoteData objects
    const quotes = ensureValidQuotes(placeholderData.quotes);
    
    return { ...placeholderData, quotes };
  } catch (error) {
    handleApiError(error, "Twitter API");
    return { quotes: [], keywords: [], topics: [] };
  }
}

// Reddit API adapter
export async function fetchRedditData(query: ResearchQuery): Promise<{ quotes: QuoteData[], keywords: string[], topics: string[] }> {
  try {
    const apiKeys = getApiKeys();
    
    if (!apiKeys.reddit) {
      toast.error("Reddit API key is missing. Please add your key in the API Keys settings.");
      return { quotes: [], keywords: [], topics: [] };
    }
    
    showApiRestrictionNotice("Reddit");
    const placeholderData = generatePlaceholderData("Reddit");
    
    // Ensure all quotes are valid QuoteData objects
    const quotes = ensureValidQuotes(placeholderData.quotes);
    
    return { ...placeholderData, quotes };
  } catch (error) {
    handleApiError(error, "Reddit API");
    return { quotes: [], keywords: [], topics: [] };
  }
}

// News API adapter
export async function fetchNewsData(query: ResearchQuery): Promise<{ quotes: QuoteData[], keywords: string[], topics: string[] }> {
  try {
    const apiKeys = getApiKeys();
    
    if (!apiKeys.newsApi) {
      toast.error("News API key is missing. Please add your key in the API Keys settings.");
      return { quotes: [], keywords: [], topics: [] };
    }
    
    showApiRestrictionNotice("News API");
    const placeholderData = generatePlaceholderData("News API");
    
    // Ensure all quotes are valid QuoteData objects
    const quotes = ensureValidQuotes(placeholderData.quotes);
    
    return { ...placeholderData, quotes };
  } catch (error) {
    handleApiError(error, "News API");
    return { quotes: [], keywords: [], topics: [] };
  }
}
