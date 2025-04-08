import { SentimentFilter, QuoteData, TimeFrame } from "../types/qualitativeAnalysisTypes";

// Extract potential keywords
export function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().split(/\W+/);
  const wordCounts: Record<string, number> = {};
  
  // Common stopwords to filter out
  const stopwords = ["the", "and", "a", "to", "of", "in", "is", "it", "that", "for", "on", "with", "as", "be", "by", "at", "this", "an", "are", "was", "but", "or", "have", "not", "from"];
  
  words.forEach(word => {
    if (word.length > 3 && !stopwords.includes(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  
  // Sort by frequency
  return Object.keys(wordCounts)
    .sort((a, b) => wordCounts[b] - wordCounts[a])
    .slice(0, 20);
}

// Extract potential topics
export function extractTopics(text: string): string[] {
  // This is a very simple implementation
  // In a real app, you'd use NLP libraries or ML models
  
  const topicPatterns = [
    { regex: /\b(regulations?|compliance|regulatory|govern|law|legal)\b/gi, topic: "Regulatory concerns" },
    { regex: /\b(security|secure|protect|breach|hack|risk|threat)\b/gi, topic: "Security considerations" },
    { regex: /\b(adoption|implement|integrat|use case|utility)\b/gi, topic: "Adoption challenges" },
    { regex: /\b(profit|revenue|roi|return|invest|yield|apy|reward)\b/gi, topic: "Profit potential" },
    { regex: /\b(tech|technology|platform|protocol|infra|system)\b/gi, topic: "Technology infrastructure" },
    { regex: /\b(environment|sustainable|green|energy|climate|carbon)\b/gi, topic: "Environmental impact" },
    { regex: /\b(community|social|user|audience|people|market)\b/gi, topic: "Community engagement" },
    { regex: /\b(future|roadmap|develop|update|version|plan)\b/gi, topic: "Future development" },
  ];
  
  const foundTopics: Record<string, number> = {};
  
  topicPatterns.forEach(({ regex, topic }) => {
    const matches = text.match(regex);
    if (matches) {
      foundTopics[topic] = matches.length;
    }
  });
  
  // Sort by relevance (number of matches)
  return Object.keys(foundTopics)
    .sort((a, b) => foundTopics[b] - foundTopics[a]);
}

// Select representative quotes to display
export function selectRepresentativeQuotes(quotes: QuoteData[], sentimentFilter: SentimentFilter): QuoteData[] {
  if (quotes.length === 0) return [];
  
  // Ensure we have quotes of each sentiment unless filtered
  if (sentimentFilter === "all") {
    const positiveQuotes = quotes.filter(q => q.sentiment === "positive");
    const neutralQuotes = quotes.filter(q => q.sentiment === "neutral");
    const negativeQuotes = quotes.filter(q => q.sentiment === "negative");
    
    return [
      ...(positiveQuotes.length > 0 ? [positiveQuotes[0]] : []),
      ...(neutralQuotes.length > 0 ? [neutralQuotes[0]] : []),
      ...(negativeQuotes.length > 0 ? [negativeQuotes[0]] : []),
    ];
  }
  
  // Otherwise return the top 3 quotes (or fewer if we don't have 3)
  return quotes.slice(0, 3);
}

// Get top keywords sorted by frequency
export function getTopKeywords(keywords: string[], count: number): string[] {
  const wordCounts: Record<string, number> = {};
  
  keywords.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  
  return Object.keys(wordCounts)
    .sort((a, b) => wordCounts[b] - wordCounts[a])
    .slice(0, count);
}

// Select top topics with deduplication
export function selectTopTopics(topics: string[]): string[] {
  // Remove duplicates
  const uniqueTopics = [...new Set(topics)];
  
  // Return top 3 topics, or fewer if we don't have 3
  return uniqueTopics.slice(0, 3);
}

// Convert timeframe to date for News API
export function getDateFromTimeFrame(timeFrame: TimeFrame): string {
  const now = new Date();
  
  switch (timeFrame) {
    case "real-time":
      // Last 24 hours
      now.setDate(now.getDate() - 1);
      break;
    case "short-term":
      // Last week
      now.setDate(now.getDate() - 7);
      break;
    case "medium-term":
      // Last month
      now.setMonth(now.getMonth() - 1);
      break;
    case "long-term":
      // Last 3-6 months
      now.setMonth(now.getMonth() - 3);
      break;
    case "historical":
      // Last 6-12 months
      now.setMonth(now.getMonth() - 9);
      break;
    case "deep-historical":
      // 1+ year
      now.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  return now.toISOString().split('T')[0];
}
