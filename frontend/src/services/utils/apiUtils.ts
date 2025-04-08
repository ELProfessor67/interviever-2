
import { toast } from "sonner";
import { QuoteData, SentimentFilter } from "../types/qualitativeAnalysisTypes";

// Centralized error handling for API calls
export const handleApiError = (error: unknown, service: string): void => {
  console.error(`Error in ${service}:`, error);
  toast.error(`${service} error occurred`, {
    description: "Using fallback data for this request.",
    duration: 3000
  });
};

// Centralized API notification for CORS/proxy issues
export const showApiRestrictionNotice = (apiName: string): void => {
  console.log(`${apiName} API has CORS restrictions in browser environment`);
  toast.warning(`${apiName} API requires a backend proxy for browser requests`, {
    duration: 3000,
    id: `${apiName.toLowerCase()}-api-cors-warning`
  });
};

// Placeholder data generator for when APIs are inaccessible
export const generatePlaceholderData = (apiName: string) => {
  return {
    quotes: [{ 
      text: `${apiName} API has CORS restrictions in this environment. Using simulated data instead.`, 
      sentiment: "neutral" as SentimentFilter, 
      source: `${apiName}: System Notice` 
    }],
    keywords: ["CORS", "API", apiName, "restrictions", "browser"],
    topics: ["API Access Limitations"]
  };
};
