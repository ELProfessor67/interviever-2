
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchQualitativeData } from "@/services/mock/mockDataService";
import { ResearchQuery, AnalysisResults } from "@/services/types/qualitativeAnalysisTypes";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const InsightsGenerator = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  
  const generateInsights = async () => {
    if (!query.trim()) {
      toast.error("Please enter a research query");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Using the mock data service for now
      const researchQuery: ResearchQuery = {
        query: query,
        sources: ["twitter", "reddit", "news"],
        sentiment: "all",
        timeFrame: "medium-term",
        keywords: []
      };
      
      const data = await fetchQualitativeData(researchQuery);
      setResults(data);
      toast.success("Insights generated successfully!");
    } catch (error) {
      console.error("Error generating insights:", error);
      toast.error("Failed to generate insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI That Thinks Like a Human, But Works at Machine Speed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter any topic to generate AI-powered analysis from social media, news, and forums in seconds.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2 mb-8">
            <Input
              placeholder="E.g., AI tokens fear and regulation, Zelenskyy administration strategy..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={generateInsights} disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Insights"}
            </Button>
          </div>
          
          {isLoading ? (
            <InsightsLoadingState />
          ) : results ? (
            <InsightsResults results={results} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
};

const EmptyState = () => (
  <Card className="border-dashed border-2 bg-transparent">
    <CardContent className="pt-6 text-center py-16">
      <p className="text-muted-foreground mb-4">
        Enter a query above and click "Generate Insights" to see AI-powered analysis
      </p>
    </CardContent>
  </Card>
);

const InsightsLoadingState = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
    <Skeleton className="h-48 w-full" />
  </div>
);

const InsightsResults = ({ results }: { results: AnalysisResults }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="quotes">Example Quotes</TabsTrigger>
        <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-generated analysis based on collected data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.aiInsights && results.aiInsights.map((insight, index) => (
                <p key={index} className="text-sm">• {insight}</p>
              ))}
              {!results.aiInsights && results.keyInsights && results.keyInsights.map((insight, index) => (
                <p key={index} className="text-sm">• {insight}</p>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.topTopics && results.topTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary">{topic}</Badge>
                ))}
                {!results.topTopics && results.topicInsights && results.topicInsights.map((insight, index) => (
                  <Badge key={index} variant="secondary">{insight.topic}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${results.sentimentBreakdown.positive}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {results.sentimentBreakdown.positive}% Positive
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-gray-400 h-2.5 rounded-full" 
                    style={{ width: `${results.sentimentBreakdown.neutral}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {results.sentimentBreakdown.neutral}% Neutral
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-red-500 h-2.5 rounded-full" 
                    style={{ width: `${results.sentimentBreakdown.negative}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {results.sentimentBreakdown.negative}% Negative
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="quotes" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Example Quotes</CardTitle>
            <CardDescription>Key quotes from various sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.exampleQuotes && results.exampleQuotes.map((quote, index) => (
                <Card key={index} className={`border-l-4 ${
                  quote.sentiment === 'positive' ? 'border-l-green-500' :
                  quote.sentiment === 'negative' ? 'border-l-red-500' : 'border-l-gray-500'
                }`}>
                  <CardContent className="py-4">
                    <p className="italic text-sm mb-2">"{quote.text}"</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{quote.source}</span>
                      <Badge variant={
                        quote.sentiment === 'positive' ? 'default' :
                        quote.sentiment === 'negative' ? 'destructive' : 'secondary'
                      }>
                        {quote.sentiment.charAt(0).toUpperCase() + quote.sentiment.slice(1)}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!results.exampleQuotes && results.timelineEvents && results.timelineEvents.map((event) => (
                event.quotes && event.quotes.map((quote, index) => (
                  <Card key={index} className={`border-l-4 ${
                    quote.sentiment === 'positive' ? 'border-l-green-500' :
                    quote.sentiment === 'negative' ? 'border-l-red-500' : 'border-l-gray-500'
                  }`}>
                    <CardContent className="py-4">
                      <p className="italic text-sm mb-2">"{quote.text}"</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{quote.source}</span>
                        <Badge variant={
                          quote.sentiment === 'positive' ? 'default' :
                          quote.sentiment === 'negative' ? 'destructive' : 'secondary'
                        }>
                          {quote.sentiment.charAt(0).toUpperCase() + quote.sentiment.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="trends" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Trends Analysis</CardTitle>
            <CardDescription>Detailed analysis of identified trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.trendsAnalysis && results.trendsAnalysis.map((trend, index) => (
                <div key={index} className="whitespace-pre-line text-sm">{trend}</div>
              ))}
              {!results.trendsAnalysis && results.topicInsights && results.topicInsights.map((insight, index) => (
                <div key={index} className="whitespace-pre-line text-sm">
                  <strong>{insight.topic}:</strong> {insight.description} 
                  <span className="ml-1 text-xs">
                    (Trend: {insight.trend}, Sentiment: {insight.sentiment})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InsightsGenerator;
