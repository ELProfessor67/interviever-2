
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import Section from "@/components/ui-custom/Section";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin, Twitter } from "lucide-react";
import Reveal from "@/components/ui-custom/Reveal";

// Images uploaded by the user
const scottImg = "/lovable-uploads/983bcfc1-e817-46a1-a6a6-4d175257b1dc.png";
const michaelyImg = "/lovable-uploads/bf89dba3-10dc-400d-98f1-2c0464e1f005.png";
const company365Img = "/lovable-uploads/287c4b95-3d95-4659-9ead-d91d9ae4a9d7.png";

interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

interface Partner {
  name: string;
  description: string;
  logo: string;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Scott Johnson",
      title: "Founder",
      image: scottImg,
      bio: [
        "Scott Johnson brings extensive leadership experience to PersonaAI, with a background in educational product development, market research, business development, and managing large organizations. He has served an executive in several education businesses, including eight years as CEO of Interactive Composition Corporation, operating in Portland, Oregon, and New Delhi, India.",
        "Currently, Scott owns SparkWave AI, where he helps businesses integrate AI solutions, and Fight Flow Academy, a martial arts and personal development center in Raleigh, NC. At PersonaAI, he combines his expertise to create innovative tools that revolutionize market research through AI and blockchain."
      ],
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Michaelyn Williams",
      title: "Chief Research Strategist",
      image: michaelyImg,
      bio: [
        "Michaelyn is a seasoned entrepreneur and co-founder of Amplify Research Partners, a company focused on precision, quality, and seamless execution of qualitative market research projects. With 25 years of experience overseeing reliable, high-impact research studies, she has built a reputation for creating innovative solutions tailored to client needs.",
        "At PersonaAI, Michaelyn leverages her extensive expertise in qualitative research to guide the development of AI-driven insights. Her dedication to precision and client-focused solutions helps bridge the gap between advanced technology and actionable research outcomes, ensuring PersonaAI delivers meaningful value across industries."
      ],
      socials: {
        linkedin: "https://linkedin.com"
      }
    }
  ];

  const partners: Partner[] = [
    {
      name: "365 AI Tech",
      description: "365 AI Tech is a leading AI and automation agency with a strong background in creating advanced AI-driven systems tailored for high-impact projects. Their team brings broad skills across software development, enabling seamless integration of diverse technologies into a cohesive platform. Their expertise in automating complex workflows—from onboarding and content creation to project management and sales—directly aligns with PersonaAI's mission to deliver seamless, efficient market research solutions. With their proven ability to integrate cutting-edge AI with practical applications, 365 AI Tech is critical to building our platform's robust and dynamic capabilities, ensuring an exceptional user experience and operational efficiency.",
      logo: company365Img,
      socials: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        {/* Team Members Section */}
        <Section className="py-16">
          <div className="container px-4 mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center font-plasmik">
                Our Team
              </h1>
            </Reveal>

            <div className="space-y-16">
              {teamMembers.map((member, index) => (
                <Reveal key={member.name} delay={index * 100}>
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-64 h-64 shrink-0">
                      <Avatar className="w-64 h-64 rounded-full border-4 border-primary/10">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="text-4xl">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="text-xl text-muted-foreground">{member.title}</div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{member.name}</h2>
                      <div className="space-y-4">
                        {member.bio.map((paragraph, i) => (
                          <p key={i} className="text-muted-foreground">{paragraph}</p>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-4">
                        {member.socials.linkedin && (
                          <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                            <Linkedin className="w-6 h-6" />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                            <Twitter className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* Partners Section */}
        <Section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="space-y-16">
              {partners.map((partner, index) => (
                <Reveal key={partner.name} delay={index * 100}>
                  <Card className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="text-xl text-muted-foreground mb-2">Technology Partner</div>
                          <h3 className="text-3xl font-bold mb-6 text-primary">{partner.name}</h3>
                          <p className="text-muted-foreground">{partner.description}</p>
                        </div>
                        <div className="flex gap-3 mt-6">
                          {partner.socials.linkedin && (
                            <a href={partner.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                              <Linkedin className="w-6 h-6" />
                            </a>
                          )}
                          {partner.socials.twitter && (
                            <a href={partner.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                              <Twitter className="w-6 h-6" />
                            </a>
                          )}
                        </div>
                      </div>
                      {/* Removed the image div that was here */}
                    </div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
