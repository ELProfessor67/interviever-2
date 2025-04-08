
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Button from "@/components/ui-custom/Button";
import Section from "@/components/ui-custom/Section";
import Card from "@/components/ui-custom/Card";
import Reveal from "@/components/ui-custom/Reveal";
import { useStateContext } from "@/contexts/StateContact";

// Form schema
const formSchema = z.object({
  industry: z.string().min(1, "Please select your industry"),
  marketingExperience: z.string().min(1, "Please select your marketing experience"),
  researchGoals: z.string().min(1, "Please select your research goals"),
});

type ScreenerFormValues = z.infer<typeof formSchema>;

const PersonaCreationScreener = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setIndustry,setGoal,setExperience} = useStateContext();
  
  const form = useForm<ScreenerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: "",
      marketingExperience: "",
      researchGoals: "",
    },
  });

  const onSubmit = async (values: ScreenerFormValues) => {
    setIsSubmitting(true);
    
    try {
      // For now, we'll consider all participants eligible
      // In a real implementation, we would check if they meet criteria
      
      // Store data in Supabase (this would be implemented later)
      const {industry,marketingExperience,researchGoals} = form.getValues();
      setIndustry(industry);
      setExperience(marketingExperience);
      setGoal(researchGoals);
      
      // Navigate to the questionnaire
      navigate("/persona-creation/questionnaire");
    } catch (error) {
      console.error("Error in screener submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative pt-24 pb-16">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background -z-10" />
          
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <Reveal>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 font-plasmik text-center">
                  Persona Creation Eligibility
                </h1>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-lg text-muted-foreground mb-8 text-center">
                  Help us understand your needs to ensure our persona creation process is right for you.
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <Card className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base">What industry are you in?</FormLabel>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="space-y-1"
                              >
                                {["E-commerce", "SaaS", "Finance", "Healthcare", "Education", "Other"].map((industry) => (
                                  <FormItem key={industry} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={industry} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{industry}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="marketingExperience"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base">How much experience do you have with marketing research?</FormLabel>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="space-y-1"
                              >
                                {["None", "1-2 years", "3-5 years", "5+ years", "I'm a professional researcher"].map((exp) => (
                                  <FormItem key={exp} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={exp} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{exp}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="researchGoals"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base">What is your primary goal for creating an AI persona?</FormLabel>
                            <FormControl>
                              <RadioGroup 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                className="space-y-1"
                              >
                                {[
                                  "Market research for a new product/service", 
                                  "Improving existing marketing messages", 
                                  "Understanding customer pain points", 
                                  "Validating product ideas", 
                                  "General audience insights",
                                  "Other"
                                ].map((goal) => (
                                  <FormItem key={goal} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value={goal} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{goal}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          variant="primary"
                          className="w-full group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Processing..."
                          ) : (
                            <>
                              Continue to Questionnaire
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </Card>
              </Reveal>
              
              <Reveal delay={300}>
                <div className="mt-8 bg-muted/50 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Note:</span> For this demo version, all participants are considered eligible. In a production environment, we would apply specific screening criteria.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PersonaCreationScreener;
