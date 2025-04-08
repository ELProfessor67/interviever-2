
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from "@/components/ui-custom/Button";
import Section from "@/components/ui-custom/Section";
import Card from "@/components/ui-custom/Card";
import Reveal from "@/components/ui-custom/Reveal";
import { useStateContext } from "@/contexts/StateContact";

// Form schema
const formSchema = z.object({
  personaName: z.string().min(2, "Name must be at least 2 characters").max(50),
  personaAge: z.string().min(1, "Age range is required"),
  personaGender: z.string().min(1, "Gender is required"),
  personaBackground: z.string().min(20, "Please provide more detail about the background").max(500),
  personaGoals: z.string().min(20, "Please provide more detail about goals").max(500),
  personaChallenges: z.string().min(20, "Please provide more detail about challenges").max(500),
  personaInterests: z.string().min(20, "Please provide more detail about interests").max(500),
});

type QuestionnaireFormValues = z.infer<typeof formSchema>;

const PersonaCreationQuestionnaire = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setName,setAge,setGender,setBD,setGM,setPC,setIB} = useStateContext();
  
  const form = useForm<QuestionnaireFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personaName: "",
      personaAge: "",
      personaGender: "",
      personaBackground: "",
      personaGoals: "",
      personaChallenges: "",
      personaInterests: "",
    },
  });

  const onSubmit = async (values: QuestionnaireFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Store data in Supabase (this would be implemented later)
      console.log("Form values to save:", values);
      
      const {personaName,personaAge,personaGender,personaBackground,personaChallenges,personaGoals,personaInterests} = form.getValues();
      
      setName(personaName);
      setAge(personaAge);
      setGender(personaGender);
      setBD(personaBackground);
      setPC(personaChallenges);
      setGM(personaGoals);
      setIB(personaInterests);
      
      
      
      // Navigate to the interview process
      setTimeout(() => {
        navigate("/interview-process");
      }, 1500);
    } catch (error) {
      console.error("Error in questionnaire submission:", error);
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
                <h1 className="text-3xl md:text-4xl font-bold mb-4 font-plasmik text-center">
                  Pre-Interview Questionnaire
                </h1>
              </Reveal>
              
              <Reveal delay={100}>
                <p className="text-lg text-muted-foreground mb-8 text-center">
                  Help us understand the target persona you want to create. The more details you provide, the more accurate your AI persona will be.
                </p>
              </Reveal>
              
              <Reveal delay={200}>
                <Card className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="personaName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Persona Name</FormLabel>
                              <FormDescription>
                                Give your persona a name that represents your target audience
                              </FormDescription>
                              <FormControl>
                                <Input placeholder="e.g., Tech-Savvy Tina" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="personaAge"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age Range</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select age" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="18-24">18-24</SelectItem>
                                    <SelectItem value="25-34">25-34</SelectItem>
                                    <SelectItem value="35-44">35-44</SelectItem>
                                    <SelectItem value="45-54">45-54</SelectItem>
                                    <SelectItem value="55-64">55-64</SelectItem>
                                    <SelectItem value="65+">65+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="personaGender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="non-binary">Non-binary</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="personaBackground"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Background & Demographics</FormLabel>
                            <FormDescription>
                              Describe your persona's background, education, profession, income level, and other relevant demographics
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., College-educated professional working in marketing with 5+ years experience. Household income of $85,000+. Lives in urban area." 
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="personaGoals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goals & Motivations</FormLabel>
                            <FormDescription>
                              What are your persona's goals, motivations, and aspirations?
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., Looking to advance career, save time on daily tasks, improve work-life balance." 
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="personaChallenges"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pain Points & Challenges</FormLabel>
                            <FormDescription>
                              What frustrations, challenges or pain points does your persona experience?
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., Struggles with time management, feels overwhelmed by technology choices, has difficulty finding reliable service providers." 
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="personaInterests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interests & Behaviors</FormLabel>
                            <FormDescription>
                              Describe interests, hobbies, brand preferences, and digital behaviors
                            </FormDescription>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., Active on Instagram and LinkedIn, enjoys podcasts, follows technology trends, prefers quality over price." 
                                className="min-h-[100px]"
                                {...field}
                              />
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
                            <>
                              <Save className="mr-2 h-4 w-4 animate-pulse" />
                              Saving...
                            </>
                          ) : (
                            <>
                              Continue to Interview
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PersonaCreationQuestionnaire;
