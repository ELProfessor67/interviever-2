"use client";
import { supabase } from '@/lib/supabase';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Section = {
    id: number;
    name: string;
    priority: string;
    time: string;
    questions: string[];
};

type StateContextType = {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    industry: string;
    setIndustry: React.Dispatch<React.SetStateAction<string>>;
    experience: string;
    setExperience: React.Dispatch<React.SetStateAction<string>>;
    goal: string;
    setGoal: React.Dispatch<React.SetStateAction<string>>;
    age: string;
    setAge: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    BD: string;
    setBD: React.Dispatch<React.SetStateAction<string>>;
    GM: string;
    setGM: React.Dispatch<React.SetStateAction<string>>;
    PC: string;
    setPC: React.Dispatch<React.SetStateAction<string>>;
    IB: string;
    setIB: React.Dispatch<React.SetStateAction<string>>;
    prompt: String;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

type StateProviderProps = {
    children: ReactNode;
};

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {


    const [industry, setIndustry] = useState("");
    const [experience, setExperience] = useState("");
    const [goal, setGoal] = useState("");


    const [name, setName] = useState<string>("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [BD, setBD] = useState(""); //Background & Demographics
    const [GM, setGM] = useState(""); //Goals & Motivations
    const [PC, setPC] = useState(""); //Pain Points & Challenges
    const [IB, setIB] = useState(""); //Interests & Behaviors
    const [prompt, setPrompt] = useState("You are interview conducter.");


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

            setPrompt(data.final_prompt || "You are interview conducter.");
        };

        fetchPersona();
    }, []);

    return (
        <StateContext.Provider value={{prompt, name, setName, industry, setIndustry, experience, setExperience, goal, setGoal, age, setAge, gender, setGender, BD, setBD, GM, setGM, PC, setPC, IB, setIB }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): StateContextType => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStateContext must be used within a StateProvider");
    }
    return context;
};