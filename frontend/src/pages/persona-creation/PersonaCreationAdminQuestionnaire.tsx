
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CircleX, Cross, CrossIcon, PlusCircle, Save } from "lucide-react";
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
import { supabase } from "@/lib/supabase";

type Section = {
  id: number;
  name: string;
  priority: string;
  time: string;
};

type Questions = {
  id: number;
  priority: string;
  question: string;
  section_name: string;
  section_id: number | null;
  importance_info: string[];
  followup_questions: string[];
};

const Rawprompt = `
     You are an AI interviewer conducting a structured interviewer. The interview consists of multiple sections, each with a priority level and a designated time limit. 

    Your task is to:  
    - Follow the given structure and ask questions naturally, without revealing section names or predefined structure.  
    - Make sure to ask the questions in sequence — first ask all the questions from the first section, then move to the next section. 
    - Ask questions one by one, making the conversation feel organic and engaging.  
    - Keep track of the elapsed time and transition smoothly between topics without making it obvious when switching sections.  
    - If a section is marked as "CRITICAL" priority, ask deeper follow-up questions for every question in that section before moving on.  
    - If a specific question is marked as "HIGH" priority, make sure to ask deeper follow-up questions for that particular question. 
    - If all questions in a section are completed before time runs out, ask relevant follow-up questions to gain more insights instead of moving to the next topic immediately.  
    - If the time limit for a section is exceeded, try to complete the current discussion quickly and naturally. Do not abruptly stop the candidate, but instead wrap up the topic smoothly and move on to the next one without delay. Keep the tone professional and the flow conversational.
    - Do NOT mention the time left to the candidate at any point. Just keep track internally and ensure a smooth flow.
    - If all questions in a section are completed before time runs out, ask relevant follow-up questions to gain more insights.  
    - For each question, make sure to ask the candidate about the associated "Important Info" to understand their reasoning, background, or approach more deeply.
    - If the total interview time is about to exceed and some important sections or questions are still pending, begin to wrap up the conversation more quickly. Prioritize the remaining important topics, ask concise but meaningful follow-ups, and complete the interview naturally without making the candidate feel rushed.
    - Once all sections are completed, conclude the interview professionally. Thank the candidate, summarize key points if necessary, and say goodbye in a polite and professional manner.
    
    Important:
      - if candidate response <continue> then give empty '' response.

    Total Interview Time: [total_time] minutes  
    
    [sections_data_append_here]
    
    **Begin the interview now. Start with an engaging greeting, introduce yourself as the interviewer your name [name], and then start with the first question in a conversational manner.**  
`;


const generateStructuredPromptData = (
  sections: Section[],
  questions: Questions[]
): string => {
  return sections
    .map((section) => {
      const sectionQuestions = questions.filter(
        (q) => q.section_id?.toString() === section.id.toString()
      );

      const questionsFormatted = sectionQuestions
        .map((q, index) => {
          const importanceInfo = q.importance_info
            .filter((info) => info.trim() !== "")
            .map((info, i) => `      - ${info}`)
            .join("\n");

          const followups = q.followup_questions
            .filter((fq) => fq.trim() !== "")
            .map((fq, i) => `      - ${fq}`)
            .join("\n");

          return `
              Q${index + 1}. ${q.question}
              Priority: ${q.priority}
              Important Info:
          ${importanceInfo || "      - None"}
              Follow-Up Questions:
          ${followups || "      - None"}`;
        })
        .join("\n");

      return `---  
          Section: ${section.name}  
          Priority: ${section.priority}  
          Time Limit: ${section.time} minutes  
          Questions:  
          ${questionsFormatted || "    None"}  
          ---`;
    })
    .join("\n\n");
};


const PersonaCreationQuestionnaire = () => {
  const [sections, setSections] = useState<Section[]>([{ id: Date.now(), name: "", priority: "", time: "" }]);
  const [questions, setQuestions] = useState<Questions[]>([{ id: Date.now(), priority: "", question: "", section_name: "", section_id: 0, importance_info: [''], followup_questions: [''] }]);

  const [name, setName] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(Rawprompt);
  const [finalPrompt, setFinalPrompt] = useState<string>(Rawprompt);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), name: "", priority: "", time: "" }]);
  };

  const deleteSection = (id: any) => {
    console.log(id, sections)
    setSections(prev => prev.filter(section => section.id.toString() != id.toString()))
  }

  const updateQuestionSection = (questionId: number, sectionId: number) => {
    const section = sections.find(section => section.id.toString() === sectionId.toString());
    const sectionName = section ? section.name : "";
    setQuestions(questions.map(question =>
      question.id === questionId ? { ...question, section_id: sectionId, section_name: sectionName } : question
    ));
  };


  const updateSection = (sectionId: number, key: string, value: string) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, [key]: value } : section
    ));
  };


  const addQuestion = (id: any, name: any) => {
    setQuestions([...questions, { id: Date.now(), priority: "", question: "", section_name: name, section_id: id, importance_info: [''], followup_questions: [''] }]);
  }

  const deleteQuestion = (id: any) => {
    setQuestions(prev => prev.filter(question => question.id.toString() != id.toString()));
  }

  const addImportanceInfo = (questionId: number) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedImportanceInfo = [...question.importance_info, ""];
        return { ...question, importance_info: updatedImportanceInfo };
      }
      return question;
    }
    ));
  }


  const addFollowupQuestion = (questionId: number) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedFollowupQuestions = [...question.followup_questions, ""];
        return { ...question, followup_questions: updatedFollowupQuestions };
      }
      return question;
    }
    ));
  }

  const updateQuestion = (questionId: number, key: string, value: string) => {
    setQuestions(questions.map(question =>
      question.id === questionId ? { ...question, [key]: value } : question
    ));
  }

  const updateImportanceInfo = (questionId: number, index: number, value: string) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedImportanceInfo = [...question.importance_info];
        updatedImportanceInfo[index] = value;
        return { ...question, importance_info: updatedImportanceInfo };
      }
      return question;
    }
    ));
  }

  const deleteImportantInfo = (questionId: number, index: number) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedImportanceInfo = question.importance_info.filter((_, i) => i != index);
        return { ...question, importance_info: updatedImportanceInfo };
      }
      return question;
    }
    ));
  }

  const updateFollowupQuestion = (questionId: number, index: number, value: string) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedFollowupQuestions = [...question.followup_questions];
        updatedFollowupQuestions[index] = value;
        return { ...question, followup_questions: updatedFollowupQuestions };
      }
      return question;
    }
    ));
  }


  const deleteFollowupQuestion = (questionId: number, index: number) => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        const updatedFollowupQuestions = question.followup_questions.filter((_, i) => i != index);
        return { ...question, followup_questions: updatedFollowupQuestions };
      }
      return question;
    }
    ));
  }




  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (sections.length === 0 || sections.some(s => !s.name || !s.priority || !s.time)) {
        setError("At least one complete section is required.");
        return;
      }

      if (questions.length === 0 || questions.some(q => !q.question || !q.section_id)) {
        setError("At least one complete question is required and must be linked to a section.");
        return;
      }

      setError(null);

      // Try fetching first existing persona
      const { data: existing, error: fetchError } = await supabase
        .from("interview_personas")
        .select("*")
        .limit(1)
        .single(); // will return null if no row exists

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing persona:", fetchError);
        setError("Failed to check existing data.");
        return;
      }

      let result;

      if (existing) {
        // Update the first existing row
        const { data, error } = await supabase
          .from("interview_personas")
          .update({
            prompt,
            final_prompt: finalPrompt,
            sections,
            questions,
            name
          })
          .eq("id", existing.id);

        result = { data, error };
      } else {
        // Insert new row
        const { data, error } = await supabase
          .from("interview_personas")
          .insert([
            {
              name: name || "Persona AI",
              prompt,
              final_prompt: finalPrompt,
              sections,
              questions,
            },
          ]);

        result = { data, error };
      }

      if (result.error) {
        console.error("Supabase save error:", result.error);
        setError("Failed to save data.");
        return;
      }

      console.log("Saved persona:", result.data);
    } catch (error) {
      console.error("Unexpected error during save:", error);
    } finally {
      setIsSubmitting(false);
    }
  };




  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {

  //     if (!name || name.trim() === "") {
  //       setError("Persona Name is required.");
  //       return;
  //     }

  //     if (sections.length === 0 || sections.some(s => !s.name || !s.priority || !s.time)) {
  //       setError("At least one complete section is required.");
  //       return;
  //     }

  //     if (questions.length === 0 || questions.some(q => !q.question || !q.section_id)) {
  //       setError("At least one complete question is required and must be linked to a section.");
  //       return;
  //     }

  //     setError(null);

  //      // Save to Supabase
  //     const { data, error } = await supabase
  //       .from("interview_personas")
  //       .insert([
  //         {
  //           name,
  //           prompt,
  //           final_prompt: finalPrompt,
  //           sections,
  //           questions,
  //         },
  //       ]);

  //     if (error) {
  //       console.error("Supabase insert error:", error);
  //       setError("Failed to save data.");
  //       return;
  //     }

  //     console.log("Saved persona:", data);
  //   } catch (error) {
  //     console.error("Error in questionnaire submission:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };


  useEffect(() => {
    const data = generateStructuredPromptData(sections, questions);
    const totalTime = sections.reduce((acc, section) => {
      const time = parseInt(section.time, 10);
      return acc + (isNaN(time) ? 0 : time);
    }, 0);
    const preparePrompt = Rawprompt.replace("[sections_data_append_here]", data)
      .replace("[name]", name || "Parsona AI")
      .replace("[total_time]", totalTime.toString())

    setFinalPrompt(preparePrompt)

  }, [sections, questions, name]);


  useEffect(() => {
    const fetchPersona = async () => {
      const { data, error } = await supabase
        .from("interview_personas")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        if (error.code !== "PGRST116") {
          console.error("Error fetching existing persona:", error);
        }
        return;
      }

      // Prefill form data
      setName(data.name || ""); // Add this too so it matches existing persona
      setPrompt(data.prompt || "");
      setFinalPrompt(data.final_prompt || "");
      setSections(data.sections || []);
      setQuestions(data.questions || []);
    };

    fetchPersona();
  }, []);


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
                  <form onSubmit={onSubmit} className="space-y-6">


                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Persona Name</label>
                      <Input
                        placeholder="Persona Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>



                    <div className="w-full">
                      <label className="block font-medium text-gray-700 mb-2 text-2xl">Sections</label>
                      <p className="text-sm text-gray-500 mb-2">Add sections to structure the interview.</p>
                      {sections.map((section) => (
                        <div key={section.id} className="p-4 rounded w-full bg-gray-50 mt-4 relative border">

                          <Button size="icon" type="button" variant="ghost" className="absolute top-2 right-2 hover:bg-gray-100" onClick={() => deleteSection(section.id)}>
                            <CircleX />
                          </Button>

                          <Input
                            placeholder="Section Name"
                            value={section.name}
                            onChange={(e) => updateSection(section.id, "name", e.target.value)}
                            className="mb-2 mt-8"
                          />
                          <Select onValueChange={(value) => updateSection(section.id, "priority", value)} value={section.priority}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Normal">Normal</SelectItem>
                              <SelectItem value="Important">Important</SelectItem>
                              <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            placeholder="Time (minutes)"
                            value={section.time}
                            onChange={(e) => updateSection(section.id, "time", e.target.value)}
                            className="mt-2"
                          />

                          <div className="w-full mt-5">
                            <label className="block font-medium text-gray-700 mb-2 text-2xl">Questions</label>
                            {questions.filter(q => q.section_id == section.id).map((question) => (
                              <div key={question.id} className=" w-full bg-gray-50 mt-10 relative border p-4 rounded-md">
                                <div className="mb-8">
                                  <Button size="icon" type="button" variant="ghost" className="absolute -top-0 right-0 hover:bg-gray-100" onClick={() => deleteQuestion(question.id)}>
                                    <CircleX />
                                  </Button>
                                </div>



                                <div className="mt-8">
                                  <Select onValueChange={(value) => updateQuestion(question.id, "priority", value)} value={question.priority}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Low">Low</SelectItem>
                                      <SelectItem value="Medium">Medium</SelectItem>
                                      <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Textarea
                                  placeholder="Question"
                                  value={question.question}
                                  onChange={(e) => updateQuestion(question.id, "question", e.target.value)}
                                  className="mt-2"
                                />

                                <h2 className="text-md mt-4">Important Info</h2>
                                {
                                  question.importance_info.map((info, index) => (
                                    <div className="flex items-center mt-2 gap-2" key={index}>
                                      <Input
                                        key={index}
                                        placeholder="Important Info"
                                        value={info}
                                        onChange={(e) => updateImportanceInfo(question.id, index, e.target.value)}
                                        className="mt-2 flex-1"
                                      />
                                      <div className="flex items-center">
                                        <Button type="button" onClick={() => addImportanceInfo(question.id)} className="mt-2"><PlusCircle /></Button>
                                        <Button type="button" onClick={() => deleteImportantInfo(question.id, index)} className="mt-2 ml-1"><CircleX /></Button>
                                      </div>
                                    </div>
                                  ))
                                }

                                <h2 className="text-md mt-4">Follow Up Question</h2>
                                {
                                  question.followup_questions.map((info, index) => (
                                    <div className="flex items-center mt-2 gap-2" key={index}>
                                      <Input
                                        key={index}
                                        placeholder="Follow Up Question"
                                        value={info}
                                        onChange={(e) => updateFollowupQuestion(question.id, index, e.target.value)}
                                        className="mt-2"
                                      />
                                      <div className="flex items-center">
                                        <Button type="button" onClick={() => addFollowupQuestion(question.id)} className="mt-2"><PlusCircle /></Button>
                                        <Button type="button" onClick={() => deleteFollowupQuestion(question.id, index)} className="mt-2 ml-2"><CircleX /></Button>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            ))}

                            <div className="flex items-center justify-end w-full mt-4">
                              <Button type="button" onClick={() => addQuestion(section.id, section.name)}>Add Question</Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-center justify-end w-full mt-4">
                        <Button type="button" onClick={addSection}>Add Section</Button>
                      </div>
                    </div>


                    <div className="p-4 border rounded w-full bg-gray-50">
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Prompt</label>


                        <Textarea
                          placeholder="Prompt"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="h-[10rem]"
                        />
                      </div>


                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Final Prompt</label>


                        <Textarea
                          placeholder="Final Prompt"
                          value={finalPrompt}
                          readOnly
                          className="h-[10rem]"
                        />
                      </div>
                    </div>
                    {
                      error && <p className="text-red-500">{error}</p>
                    }
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
                            Save Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
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
