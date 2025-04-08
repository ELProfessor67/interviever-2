
import { ArrowRight, MessageSquare, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import Section from "@/components/ui-custom/Section";
import Button from "@/components/ui-custom/Button";
import Card from "@/components/ui-custom/Card";
import Reveal from "@/components/ui-custom/Reveal";

const AIFocusGroups = () => {
  const steps = [
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Define Your Research Topic",
      description: "Tell our AI what you need to explore—product feedback, brand sentiment, or market positioning."
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Facilitate Real-Time Discussions",
      description: "Engage with AI personas in direct conversation via voice or videoconference, or use an AI moderator to guide the discussion, prompt responses, and extract key insights—just like a traditional focus group, but faster and scalable."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Get Instant Insights",
      description: "See key sentiment trends, behavioral patterns, and qualitative feedback visualized in an interactive dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] pt-24 pb-16 flex items-center">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 via-background to-background -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <Reveal>
                <p className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                  AI-Driven Qualitative Research
                </p>
              </Reveal>
              
              <Reveal delay={100} animation="blur-in">
                <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl font-plasmik text-balance">
                  Real Conversations, AI Speed—PersonaAI Focus Groups.
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="mb-10 text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                  No recruitment, no scheduling—just real-time qualitative research. Our AI-driven focus groups 
                  simulate real consumer behavior, mirroring emotions, responses, and decision-making patterns 
                  to give you actionable insights in minutes.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <Link to="#start-focus-group">
                  <Button size="lg" className="group">
                    Start Your AI Focus Group
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <Section id="how-it-works" highlight>
          <div className="container px-4 mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-plasmik">
                How It Works
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Reveal key={index} delay={100 * index}>
                  <Card className="relative h-full overflow-hidden">
                    <div className="mb-4 p-3 bg-primary rounded-lg inline-flex">
                      {step.icon}
                    </div>
                    <div className="absolute top-4 right-6 text-3xl font-bold text-primary/10">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* CTA Section */}
        <Section id="start-focus-group" className="bg-primary/5">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik">
                  Ready to Get Started?
                </h2>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-muted-foreground mb-8">
                  Create your first AI focus group in minutes and get insights that would take weeks with traditional methods.
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <Button size="lg" className="group">
                  Start Your AI Focus Group
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default AIFocusGroups;
