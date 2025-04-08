
import { ResearchQuery, QuoteData } from "../types/qualitativeAnalysisTypes";
import { getApiKeys } from "../utils/apiKeyUtils";
import { detectSentiment } from "../utils/sentimentUtils";
import { extractKeywords, extractTopics, getDateFromTimeFrame } from "../utils/textAnalysisUtils";
import { toast } from "sonner";

// News API integration
export async function fetchNewsData(query: ResearchQuery): Promise<{ quotes: QuoteData[], keywords: string[], topics: string[] }> {
  try {
    // Get API key (user's key if they provided one, otherwise default)
    const apiKeys = getApiKeys();
    
    // Convert timeframe to date range for News API
    const from = getDateFromTimeFrame(query.timeFrame);
    
    // Build News API URL
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.append("q", `${query.query} ${query.keywords.join(" ")}`);
    url.searchParams.append("from", from);
    url.searchParams.append("sortBy", "relevancy");
    url.searchParams.append("language", "en");
    url.searchParams.append("pageSize", "10");
    url.searchParams.append("apiKey", apiKeys.newsApi);
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("News API error:", errorData);
      
      if (response.status === 401) {
        toast.error("News API key is invalid or missing. Please update your API key.");
      } else if (response.status === 429) {
        toast.error("News API rate limit exceeded. Try again later or use a different API key.");
      } else {
        toast.error(`News API error: ${errorData.message || response.statusText}`);
      }
      
      return { quotes: [], keywords: [], topics: [] };
    }
    
    const data = await response.json();
    console.log("News API response:", data);
    
    if (data.articles && data.articles.length > 0) {
      // Extract quotes from articles
      const quotes: QuoteData[] = data.articles.slice(0, 5).map((article: any) => {
        // Simple sentiment detection based on title and description
        const sentiment = detectSentiment(article.title + " " + (article.description || ""));
        
        return {
          text: article.description || article.title,
          sentiment,
          source: "News: " + article.source.name,
          date: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        };
      });
      
      // Extract keywords from titles
      const keywords = extractKeywords(data.articles.map((a: any) => a.title).join(" "));
      
      // Extract potential topics
      const topics = extractTopics(data.articles.map((a: any) => a.title + " " + (a.description || "")).join(" "));
      
      return { quotes, keywords, topics };
    }
    
    return { quotes: [], keywords: [], topics: [] };
  } catch (error) {
    console.error("Error fetching news data:", error);
    return { quotes: [], keywords: [], topics: [] };
  }
}

// Twitter API integration
export async function fetchTwitterData(query: ResearchQuery): Promise<{ quotes: QuoteData[], keywords: string[], topics: string[] }> {
  // Twitter API requires authentication and the free tier is limited
  // For now, we'll return a message explaining the limitation
  
  // In a real implementation, you would:
  // 1. Set up proper Twitter API authentication
  // 2. Use the Twitter API v2 search endpoint
  // 3. Process the tweets and extract sentiment
  
  const apiKeys = getApiKeys();
  
  if (!apiKeys.twitter) {
    console.log("Twitter API integration requires authentication setup");
    return { 
      quotes: [{
        text: "Twitter API integration requires authentication. Please set up Twitter API credentials to access real data.",
        sentiment: "neutral",
        source: "Twitter",
        date: new Date().toISOString().split('T')[0]
      }], 
      keywords: ["twitter", "api", "authentication"], 
      topics: ["Twitter API Integration"] 
    };
  }
  
  // Mock implementation - would be replaced with real API call
  return { quotes: [], keywords: [], topics: [] };
}

// Reddit API integration
export async function fetchRedditData(query: ResearchQuery): Promise<{ quotes: QuoteData[], keywords: string[], topics: string[] }> {
  try {
    // Reddit's API allows some access without authentication
    const searchTerm = encodeURIComponent(`${query.query} ${query.keywords.join(" ")}`);
    const url = `https://www.reddit.com/search.json?q=${searchTerm}&sort=relevance&limit=10`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error("Reddit API error:", response.statusText);
      return { quotes: [], keywords: [], topics: [] };
    }
    
    const data = await response.json();
    console.log("Reddit API response received");
    
    if (data.data && data.data.children && data.data.children.length > 0) {
      // Extract quotes from posts
      const quotes: QuoteData[] = data.data.children
        .filter((post: any) => post.data.selftext || post.data.title)
        .slice(0, 5)
        .map((post: any) => {
          const text = post.data.selftext || post.data.title;
          // Simple sentiment detection
          const sentiment = detectSentiment(text);
          
          return {
            text: text.substring(0, 200) + (text.length > 200 ? "..." : ""),
            sentiment,
            source: `Reddit: r/${post.data.subreddit}`,
            date: post.data.created ? new Date(post.data.created * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
          };
        });
      
      // Extract keywords from titles and texts
      const keywords = extractKeywords(
        data.data.children.map((post: any) => 
          post.data.title + " " + (post.data.selftext || "")
        ).join(" ")
      );
      
      // Extract potential topics
      const topics = extractTopics(
        data.data.children.map((post: any) => 
          post.data.title + " " + (post.data.selftext || "")
        ).join(" ")
      );
      
      return { quotes, keywords, topics };
    }
    
    return { quotes: [], keywords: [], topics: [] };
  } catch (error) {
    console.error("Error fetching Reddit data:", error);
    return { quotes: [], keywords: [], topics: [] };
  }
}
