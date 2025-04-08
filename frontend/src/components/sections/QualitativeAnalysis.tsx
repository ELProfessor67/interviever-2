
import React, { useState, useEffect, useRef } from "react";
import Section from "../ui-custom/Section";
import Card from "../ui-custom/Card";
import Button from "../ui-custom/Button";
import Reveal from "../ui-custom/Reveal";
import Logo from "../ui-custom/Logo";
import { 
  BarChart3, 
  Filter, 
  Search, 
  Clock, 
  Hash, 
  Loader2, 
  BrainCircuit, 
  TrendingUp, 
  Info, 
  Check, 
  AlertTriangle, 
  ThumbsUp, 
  CircleEqual, 
  ThumbsDown,
  Download,
  FileText,
  LineChart,
  MessageCircle,
  GitBranch,
  Waves,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";
import { 
  ResearchQuery, 
  DataSource, 
  SentimentFilter, 
  TimeFrame,
  AnalysisResults,
  TimelineEvent,
  TopicRippleData
} from "@/services/types/qualitativeAnalysisTypes";
import { fetchQualitativeData } from "@/services/mock/mockDataService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const QualitativeAnalysis: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [query, setQuery] = useState<ResearchQuery>({
    query: "",
    sources: ["twitter", "reddit", "news"],
    sentiment: "all",
    timeFrame: "medium-term",
    keywords: []
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const placeholders = [
    "What are people saying about AI token staking incentives?",
    "How do crypto investors feel about token rewards?",
    "What's the biggest fear in the NFT space right now?",
    "What do people really think about AI-generated art?",
    "What are the most common concerns about Web3 adoption?"
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  
  useEffect(() => {
    adjustTextareaHeight();
  }, [query.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting query:", query);
    
    if (!query.query.trim()) {
      toast.error("Please enter a research query");
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await fetchQualitativeData(query);
      setResults(data);
      setShowResults(true);
      toast.success("Analysis completed successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch analysis data");
    } finally {
      setIsLoading(false);
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !query.keywords.includes(keywordInput.trim())) {
      setQuery({
        ...query,
        keywords: [...query.keywords, keywordInput.trim()]
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setQuery({
      ...query,
      keywords: query.keywords.filter(k => k !== keyword)
    });
  };

  const handleNewSearch = () => {
    setShowResults(false);
  };
  
  const handleSourceChange = (source: DataSource) => (checked: boolean) => {
    let newSources = [...query.sources];
    
    if (checked) {
      if (!newSources.includes(source)) {
        newSources.push(source);
      }
    } else {
      newSources = newSources.filter(s => s !== source);
    }
    
    if (newSources.length === 0) {
      newSources = ["twitter"];
    }
    
    setQuery({ ...query, sources: newSources });
  };
  
  const isSourceSelected = (source: DataSource) => {
    return query.sources.includes(source);
  };

  const getSentimentIconAndColor = (sentiment: SentimentFilter) => {
    switch (sentiment) {
      case "positive":
        return { 
          icon: <ThumbsUp size={18} className="text-green-600" />, 
          color: "border-green-200 bg-green-50 hover:bg-green-100 data-[state=active]:bg-green-100 data-[state=active]:border-green-300"
        };
      case "neutral":
        return { 
          icon: <CircleEqual size={18} className="text-gray-600" />, 
          color: "border-gray-200 bg-gray-50 hover:bg-gray-100 data-[state=active]:bg-gray-100 data-[state=active]:border-gray-300"
        };
      case "negative":
        return { 
          icon: <ThumbsDown size={18} className="text-red-600" />, 
          color: "border-red-200 bg-red-50 hover:bg-red-100 data-[state=active]:bg-red-100 data-[state=active]:border-red-300"
        };
      case "all":
      default:
        return { 
          icon: <Info size={18} className="text-blue-600" />, 
          color: "border-blue-200 bg-blue-50 hover:bg-blue-100 data-[state=active]:bg-blue-100 data-[state=active]:border-blue-300"
        };
    }
  };

  return (
    <Section className="bg-gradient-to-b from-primary/5 to-background py-20" highlight={true}>
      <div className="container max-w-5xl mx-auto">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <Logo size="lg" />
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Qualitative Insights Conductor
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-[#221F26] font-plasmik">
                AI That Thinks Like a Human<br />
                Not a Machine
              </h2>
              <p className="text-muted-foreground text-lg">
                Uncover the real thoughts, opinions, and emotions driving conversations—beyond data, beyond numbers.
              </p>
            </div>
          </div>
        </Reveal>

        {!showResults ? (
          <Reveal delay={200}>
            <Card className="shadow-lg mb-8 border-primary/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="query" className="block text-lg font-medium text-[#221F26]">
                    Research Query
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 text-muted-foreground" />
                    <textarea
                      ref={textareaRef}
                      id="query"
                      className="w-full min-h-32 pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-[#33C3F0] resize-none overflow-hidden"
                      placeholder={placeholders[placeholderIndex]}
                      value={query.query}
                      onChange={(e) => {
                        setQuery({ ...query, query: e.target.value });
                      }}
                      onInput={adjustTextareaHeight}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Describe in your own words what qualitative insights you're looking for
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block font-medium flex items-center gap-2">
                      <Filter size={16} />
                      Data Sources
                    </label>
                    
                    <div className="space-y-2">
                      <div className="font-medium text-sm mb-1">Live Sources:</div>
                      <div className="bg-background rounded-lg p-4 border border-input">
                        <div className="grid grid-cols-1 gap-3">
                          <label className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer group">
                            <div className="h-6 w-6 rounded border-2 flex items-center justify-center mr-3 border-primary bg-background group-hover:bg-primary/10">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isSourceSelected("twitter")}
                                onChange={(e) => handleSourceChange("twitter")(e.target.checked)}
                              />
                              {isSourceSelected("twitter") && <Check size={16} className="text-primary" />}
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">Twitter</span>
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Live
                              </span>
                            </div>
                          </label>
                          
                          <label className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer group">
                            <div className="h-6 w-6 rounded border-2 flex items-center justify-center mr-3 border-primary bg-background group-hover:bg-primary/10">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isSourceSelected("reddit")}
                                onChange={(e) => handleSourceChange("reddit")(e.target.checked)}
                              />
                              {isSourceSelected("reddit") && <Check size={16} className="text-primary" />}
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">Reddit</span>
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Live
                              </span>
                            </div>
                          </label>
                          
                          <label className="flex items-center p-2 rounded-md hover:bg-muted transition-colors cursor-pointer group">
                            <div className="h-6 w-6 rounded border-2 flex items-center justify-center mr-3 border-primary bg-background group-hover:bg-primary/10">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isSourceSelected("news")}
                                onChange={(e) => handleSourceChange("news")(e.target.checked)}
                              />
                              {isSourceSelected("news") && <Check size={16} className="text-primary" />}
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">News & Blogs</span>
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Live
                              </span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block font-medium flex items-center gap-2">
                        <BarChart3 size={16} />
                        Which voices do you want to hear?
                      </label>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {(["positive", "neutral", "negative", "all"] as SentimentFilter[]).map((sentimentOption) => {
                          const { icon, color } = getSentimentIconAndColor(sentimentOption);
                          const isActive = query.sentiment === sentimentOption;
                          
                          return (
                            <button
                              key={sentimentOption}
                              type="button"
                              className={`flex items-center gap-2 px-4 py-3 rounded-md border text-left transition-all
                                ${color} ${isActive ? 'ring-2 ring-primary/30' : ''}
                              `}
                              onClick={() => setQuery({ ...query, sentiment: sentimentOption })}
                              data-state={isActive ? 'active' : 'inactive'}
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-current/10 shrink-0">
                                {icon}
                              </div>
                              <div className="flex-grow">
                                <span className="font-medium">
                                  {sentimentOption === "positive" && "Positive"}
                                  {sentimentOption === "neutral" && "Neutral"}
                                  {sentimentOption === "negative" && "Negative"}
                                  {sentimentOption === "all" && "All Perspectives"}
                                </span>
                                <span className="block text-sm text-muted-foreground">
                                  {sentimentOption === "positive" && "Supporters & Enthusiasts"}
                                  {sentimentOption === "neutral" && "Balanced & Informational"}
                                  {sentimentOption === "negative" && "Concerns & Criticism"}
                                  {sentimentOption === "all" && 
                                    <span className="flex items-center gap-1">
                                      Recommended
                                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        Full spectrum
                                      </span>
                                    </span>
                                  }
                                </span>
                              </div>
                              {isActive && (
                                <Check size={18} className="text-primary ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block font-medium flex items-center gap-2">
                        <Clock size={16} />
                        Time Frame
                      </label>
                      <div className="flex flex-wrap items-center gap-2">
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`px-3 py-2 rounded-md border transition-all duration-200 ${
                                  query.timeFrame === "real-time" 
                                  ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(27,81,161,0.5)]" 
                                  : "border-input hover:bg-accent/50"
                                }`}
                                onClick={() => setQuery({ ...query, timeFrame: "real-time" })}
                              >
                                Live Trends (24 hours)
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-primary/5 border-primary/20">
                              <p>See the latest discussions in real-time</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`px-3 py-2 rounded-md border transition-all duration-200 ${
                                  query.timeFrame === "short-term" 
                                  ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(27,81,161,0.5)]" 
                                  : "border-input hover:bg-accent/50"
                                }`}
                                onClick={() => setQuery({ ...query, timeFrame: "short-term" })}
                              >
                                Short-Term (Past 7 Days)
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-primary/5 border-primary/20">
                              <p>Track recent sentiment shifts</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`px-3 py-2 rounded-md border transition-all duration-200 ${
                                  query.timeFrame === "medium-term" 
                                  ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(27,81,161,0.5),0_2px_12px_rgba(27,81,161,0.25)] font-medium" 
                                  : "border-input hover:bg-accent/50"
                                }`}
                                onClick={() => setQuery({ ...query, timeFrame: "medium-term" })}
                              >
                                Medium-Term (Past Month) <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1">(Default)</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-primary/5 border-primary/20">
                              <p className="text-primary/80 font-medium">Default Option</p>
                              <p>Identify emerging patterns and sustained sentiment trends</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`px-3 py-2 rounded-md border transition-all duration-200 ${
                                  query.timeFrame === "long-term" 
                                  ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(27,81,161,0.5)]" 
                                  : "border-input hover:bg-accent/50"
                                }`}
                                onClick={() => setQuery({ ...query, timeFrame: "long-term" })}
                              >
                                Long-Term (3-6 Months)
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-primary/5 border-primary/20">
                              <p>Understand trends over a quarter</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`px-3 py-2 rounded-md border transition-all duration-200 ${
                                  query.timeFrame === "historical" 
                                  ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(27,81,161,0.5)]" 
                                  : "border-input hover:bg-accent/50"
                                }`}
                                onClick={() => setQuery({ ...query, timeFrame: "historical" })}
                              >
                                Historical View (6-12 Months)
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-primary/5 border-primary/20">
                              <p>Analyze sentiment shifts over a full year</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`px-3 py-2 rounded-md border transition-all duration-200 ${
                                  query.timeFrame === "deep-historical" 
                                  ? "bg-primary/10 border-primary shadow-[0_0_0_1px_rgba(27,81,161,0.5)]" 
                                  : "border-input hover:bg-accent/50"
                                }`}
                                onClick={() => setQuery({ ...query, timeFrame: "deep-historical" })}
                              >
                                Deep Historical View (1+ Year)
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-primary/5 border-primary/20">
                              <p>Gain insights on long-term behavioral patterns</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="keywords" className="block font-medium flex items-center gap-2">
                    <Hash size={16} />
                    Keywords Filter (Optional)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="keywords"
                      className="flex-grow"
                      placeholder="Enter keywords to filter results"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    />
                    <Button type="button" variant="secondary" onClick={addKeyword}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {query.keywords.map((keyword) => (
                      <span 
                        key={keyword} 
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="text-muted-foreground hover:text-foreground ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5">
                          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                            <Loader2 className="animate-spin" size={20} />
                          </div>
                        </div>
                        <span>Gathering insights...</span>
                      </div>
                    ) : (
                      "Reveal the Conversation"
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </Reveal>
        ) : (
          <ResultsDashboard 
            results={results!} 
            query={query} 
            onNewSearch={handleNewSearch} 
          />
        )}
      </div>
    </Section>
  );
};

interface ResultsDashboardProps {
  results: AnalysisResults;
  query: ResearchQuery;
  onNewSearch: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, query, onNewSearch }) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeFrame>(query.timeFrame);
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentFilter>(query.sentiment);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    // We don't need to generate timeline events here anymore
    // as they'll come from the mock data service
  }, [results]);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 border-green-300 text-green-800";
      case "negative": return "bg-red-100 border-red-300 text-red-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const handleExportPDF = () => {
    toast.success("Report export started. Your PDF will download shortly.");
    // In a real implementation, this would call a PDF generation service
    setTimeout(() => {
      toast.success("Report exported successfully!");
    }, 2000);
  };

  const filterByKeyword = (keyword: string) => {
    // This would filter the results based on the keyword
    toast.info(`Filtering results for: ${keyword}`);
  };

  const navigateTo = (section: string) => {
    setActiveTab(section);
  };
  
  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    toast.info(`Viewing details for: ${event.label}`);
  };
  
  // Get colors for topic ripple chart
  const getTopicColor = (topic: string) => {
    const colorMap: {[key: string]: string} = {
      "User Adoption": "#3182CE", // blue
      "Token Utility": "#38A169", // green
      "Platform Security": "#DD6B20", // orange
      "Governance": "#E53E3E", // red
      "Development Progress": "#805AD5", // purple
      "Community Growth": "#D69E2E" // yellow
    };
    
    return colorMap[topic] || "#718096"; // default gray
  };
  
  // Filter topic ripple data based on selected topic
  const getFilteredTopicData = () => {
    if (!selectedTopic) return results.topicRippleData;
    
    return results.topicRippleData.map(dataPoint => {
      const filteredPoint: TopicRippleData = { name: dataPoint.name };
      filteredPoint[selectedTopic] = dataPoint[selectedTopic];
      return filteredPoint;
    });
  };
  
  return (
    <div className="space-y-8">
      <Reveal>
        <Card className="shadow-lg border-primary/20">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onNewSearch}
                className="text-primary hover:text-primary/80"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h3 className="text-xl font-semibold text-[#221F26]">Results for: "{query.query}"</h3>
            </div>
            <div className="flex gap-2">
              {results.reportGeneratedAt && (
                <p className="text-xs text-muted-foreground self-center">
                  Generated: {new Date(results.reportGeneratedAt).toLocaleString()}
                </p>
              )}
              <Button 
                variant="outline" 
                onClick={handleExportPDF}
                className="border-primary/30 hover:border-primary/60 flex items-center gap-2"
              >
                <Download size={16} />
                Export PDF
              </Button>
              <Button 
                variant="primary" 
                onClick={onNewSearch}
                className="flex items-center gap-2"
              >
                New Search
              </Button>
            </div>
          </div>
          
          {/* Filter Bar */}
          <div className="bg-primary/5 p-3 rounded-md mb-6 flex flex-wrap gap-3 items-center">
            <div className="font-medium text-primary text-sm">Filter Results:</div>
            
            <select 
              className="bg-white border border-primary/20 rounded-md px-2 py-1 text-sm"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as TimeFrame)}
            >
              <option value="real-time">Past 24 Hours</option>
              <option value="short-term">Past 7 Days</option>
              <option value="medium-term">Past Month</option>
              <option value="long-term">Past 3-6 Months</option>
              <option value="historical">Past 6-12 Months</option>
              <option value="deep-historical">1+ Year</option>
            </select>
            
            <select 
              className="bg-white border border-primary/20 rounded-md px-2 py-1 text-sm"
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value as SentimentFilter)}
            >
              <option value="all">All Sentiment</option>
              <option value="positive">Positive Only</option>
              <option value="neutral">Neutral Only</option>
              <option value="negative">Negative Only</option>
            </select>
            
            <div className="flex-grow">
              <Input
                placeholder="Search within results..."
                className="h-8 text-sm"
              />
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="summary" className="flex items-center gap-1.5">
                <FileText size={16} />
                Summary
              </TabsTrigger>
              <TabsTrigger value="storyline" className="flex items-center gap-1.5">
                <GitBranch size={16} />
                Storyline
              </TabsTrigger>
              <TabsTrigger value="topics" className="flex items-center gap-1.5">
                <Waves size={16} />
                Topic Ripples
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-1.5">
                <LineChart size={16} />
                Trends
              </TabsTrigger>
              <TabsTrigger value="quotes" className="flex items-center gap-1.5">
                <MessageCircle size={16} />
                Quotes
              </TabsTrigger>
            </TabsList>
            
            {/* Tab Content */}
            <TabsContent value="summary" className="space-y-6">
              <div className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-lg mb-2 text-primary">AI Analysis Summary</h4>
                  <p className="text-muted-foreground">
                    {results.aiSummary}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp size={18} className="text-green-600" />
                      Key Insights
                    </h5>
                    <ul className="space-y-2">
                      {results.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 text-primary">
                            <Check size={14} />
                          </div>
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  
                  <Card className="p-4">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-amber-600" />
                      Challenges & Concerns
                    </h5>
                    <ul className="space-y-2">
                      {results.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 text-amber-600">
                            <AlertTriangle size={14} />
                          </div>
                          <span className="text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                  
                  <Card className="p-4">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <BrainCircuit size={18} className="text-purple-600" />
                      Recommendations
                    </h5>
                    <ul className="space-y-2">
                      {results.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 text-purple-600">
                            <Info size={14} />
                          </div>
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="storyline" className="space-y-6">
              <div className="space-y-8">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-lg mb-2 text-primary">Narrative Timeline</h4>
                  <p className="text-muted-foreground">
                    Discover how the conversation has evolved over time and identify key moments that shaped sentiment and opinion.
                  </p>
                </div>
                
                {/* Timeline Visualization */}
                <div className="relative">
                  {/* Timeline bar */}
                  <div className="absolute top-11 left-0 right-0 h-1.5 bg-primary/20 rounded-full"></div>
                  
                  {/* Timeline Events */}
                  <div className="relative pt-6 pb-12">
                    {results.timelineEvents.map((event) => (
                      <div 
                        key={event.id}
                        className="absolute transform -translate-x-1/2"
                        style={{ left: event.position }}
                      >
                        <button
                          onClick={() => handleEventClick(event)}
                          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                            selectedEvent?.id === event.id ? 'scale-110' : 'hover:scale-105'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                            selectedEvent?.id === event.id 
                              ? 'border-primary bg-primary text-white' 
                              : `border-${event.sentiment === 'positive' ? 'green' : event.sentiment === 'negative' ? 'red' : 'gray'}-400 bg-white`
                          }`}>
                            <Calendar size={18} />
                          </div>
                          <span className="text-xs font-medium whitespace-nowrap">{event.date}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Selected Event Details */}
                {selectedEvent && (
                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{selectedEvent.label}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span>{selectedEvent.date}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSentimentColor(selectedEvent.sentiment)}`}>
                            {selectedEvent.sentiment.charAt(0).toUpperCase() + selectedEvent.sentiment.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">
                        Impact: {selectedEvent.impact}%
                      </div>
                    </div>
                    <p className="text-muted-foreground">{selectedEvent.description}</p>
                    
                    {selectedEvent.quotes && (
                      <div className="mt-4">
                        <h5 className="font-medium text-sm mb-2">Representative Quotes:</h5>
                        <div className="space-y-2">
                          {selectedEvent.quotes.map((quote, idx) => (
                            <div key={idx} className="bg-background p-3 rounded-md text-sm border border-input">
                              "{quote.text}"
                              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                                <span>{quote.source}</span>
                                <span>{quote.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="topics" className="space-y-6">
              <div className="space-y-8">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-lg mb-2 text-primary">Topic Ripples</h4>
                  <p className="text-muted-foreground">
                    Explore how different topics rise and fall in conversation volumes over time, revealing patterns and connections.
                  </p>
                </div>
                
                {/* Topic Filters */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedTopic === null ? "secondary" : "outline"}
                    onClick={() => setSelectedTopic(null)}
                    className="text-sm"
                  >
                    All Topics
                  </Button>
                  
                  {results.topicRippleData.length > 0 && Object.keys(results.topicRippleData[0])
                    .filter(key => key !== 'name')
                    .map((topic) => (
                      <Button
                        key={topic}
                        variant={selectedTopic === topic ? "secondary" : "outline"}
                        onClick={() => setSelectedTopic(topic)}
                        className="text-sm"
                        style={{
                          backgroundColor: selectedTopic === topic ? getTopicColor(topic) : 'transparent',
                          borderColor: getTopicColor(topic),
                          color: selectedTopic === topic ? 'white' : getTopicColor(topic)
                        }}
                      >
                        {topic}
                      </Button>
                    ))
                  }
                </div>
                
                {/* Topic Ripple Visualization */}
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={getFilteredTopicData()}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => value.toString()}
                      />
                      <RechartsTooltip 
                        formatter={(value, name) => [value, name]}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Legend />
                      
                      {results.topicRippleData.length > 0 && Object.keys(results.topicRippleData[0])
                        .filter(key => key !== 'name')
                        .filter(topic => !selectedTopic || topic === selectedTopic)
                        .map((topic) => (
                          <Area
                            key={topic}
                            type="monotone"
                            dataKey={topic}
                            stroke={getTopicColor(topic)}
                            fill={getTopicColor(topic)}
                            fillOpacity={0.3}
                            activeDot={{ r: 6 }}
                          />
                        ))
                      }
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Topic Insights */}
                {results.topicInsights && results.topicInsights.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Topic Insights:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.topicInsights.map((insight, idx) => (
                        <Card key={idx} className="p-4">
                          <h5 className="font-medium text-base mb-2">{insight.topic}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-primary">Trend: {insight.trend}</span>
                            <span className={`px-2 py-0.5 rounded ${getSentimentColor(insight.sentiment)}`}>
                              {insight.sentiment.charAt(0).toUpperCase() + insight.sentiment.slice(1)}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <p>Trends analysis data will be displayed here...</p>
            </TabsContent>
            
            <TabsContent value="quotes" className="space-y-6">
              <p>Representative quotes will be displayed here...</p>
            </TabsContent>
          </Tabs>
        </Card>
      </Reveal>
    </div>
  );
};

export default QualitativeAnalysis;
