
import { QuoteData } from "../types/qualitativeAnalysisTypes";

// Simple sentiment analysis
export function detectSentiment(text: string): string {
  const positiveWords = ['good', 'great', 'excellent', 'positive', 'amazing', 'wonderful', 'love', 'enjoy', 'happy', 'success', 'improve', 'benefit', 'opportunity'];
  const negativeWords = ['bad', 'poor', 'terrible', 'negative', 'awful', 'horrible', 'hate', 'dislike', 'sad', 'failure', 'decline', 'risk', 'problem', 'issue', 'concern'];
  
  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) positiveScore += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = lowerText.match(regex);
    if (matches) negativeScore += matches.length;
  });
  
  if (positiveScore > negativeScore) return "positive";
  if (negativeScore > positiveScore) return "negative";
  return "neutral";
}

// Calculate sentiment breakdown from quotes
export function calculateSentimentBreakdown(quotes: QuoteData[]): { positive: number; neutral: number; negative: number } {
  if (quotes.length === 0) {
    return { positive: 33, neutral: 34, negative: 33 };
  }
  
  const counts = {
    positive: quotes.filter(q => q.sentiment === "positive").length,
    neutral: quotes.filter(q => q.sentiment === "neutral").length,
    negative: quotes.filter(q => q.sentiment === "negative").length,
  };
  
  const total = quotes.length;
  
  return {
    positive: Math.round((counts.positive / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100),
    negative: Math.round((counts.negative / total) * 100)
  };
}
