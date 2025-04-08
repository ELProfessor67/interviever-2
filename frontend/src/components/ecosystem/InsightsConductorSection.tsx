
import { ArrowRight, Lightbulb, BarChart3, PieChart } from "lucide-react";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Reveal from "@/components/ui-custom/Reveal";

const InsightsConductorSection = () => {
  return (
    <Section className="bg-gray-850 py-12">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-plasmik">
                Insights Conductor
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our advanced AI-powered research platform helps organizations extract valuable insights through qualitative analysis.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Reveal delay={100}>
              <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Qualitative Insights</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Transform unstructured data into actionable intelligence with our AI-powered analysis tools.
                </p>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Theme identification and pattern recognition
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Sentiment analysis and emotion detection
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Discover hidden correlations and insights
                  </li>
                </ul>
                <Button 
                  variant="secondary" 
                  className="group mt-auto bg-blue-500 hover:bg-blue-600 text-white border-none"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Market Research</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Gain deeper understanding of your market and customers through AI-powered research tools.
                </p>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Automated focus group analysis
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Customer preference modeling
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Competitor strategy assessment
                  </li>
                </ul>
                <Button 
                  variant="secondary" 
                  className="group mt-auto bg-blue-500 hover:bg-blue-600 text-white border-none"
                >
                  Explore Research Tools
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-xl p-6 md:p-8 border border-blue-500/30">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:w-7/12">
                  <h3 className="text-2xl font-bold mb-4">Power Your Research with $PRSNA</h3>
                  <p className="text-gray-300 mb-6">
                    Stake $PRSNA tokens to access premium research features and generate deeper insights from your qualitative data.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      variant="primary" 
                      className="group bg-gradient-to-r from-primary to-primary/80 border-none"
                    >
                      Start Analysis
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="group bg-blue-500 hover:bg-blue-600 text-white border-none"
                    >
                      Staking Benefits
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 ml-2" />
                    </Button>
                  </div>
                </div>
                <div className="flex-shrink-0 flex justify-center md:w-5/12">
                  <div className="relative w-40 h-40 md:w-48 md:h-48">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-blue-600/30 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                    <div className="absolute inset-4 bg-blue-700/40 rounded-full animate-pulse" style={{ animationDelay: "600ms" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PieChart className="w-20 h-20 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

export default InsightsConductorSection;
