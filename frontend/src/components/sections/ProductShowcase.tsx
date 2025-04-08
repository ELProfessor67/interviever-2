
import { Check } from "lucide-react";
import Section from "../ui-custom/Section";
import Button from "../ui-custom/Button";
import Card from "../ui-custom/Card";
import Reveal from "../ui-custom/Reveal";

const ProductShowcase = () => {
  const plans = [
    {
      name: "Essential",
      price: "$XX",
      description: "Perfect for individuals and small teams just getting started.",
      features: [
        "Qualitative data analysis",
        "Basic visualization tools",
        "5 projects",
        "2 team members",
        "Export in PDF format"
      ]
    },
    {
      name: "Professional",
      price: "$XX",
      description: "Advanced features for professional researchers and medium teams.",
      features: [
        "Everything in Essential",
        "Advanced pattern recognition",
        "Unlimited projects",
        "10 team members",
        "Export in multiple formats",
        "Priority support"
      ],
      featured: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations with complex needs.",
      features: [
        "Everything in Professional",
        "Custom integrations",
        "Unlimited team members",
        "Advanced security features",
        "Dedicated support manager",
        "On-premise deployment option"
      ]
    }
  ];

  return (
    <Section id="products">
      <div className="container px-4 mx-auto">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="inline-block mb-4 px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
              Pricing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find the Perfect Plan for Your Needs
            </h2>
            <p className="text-muted-foreground text-pretty">
              Choose the plan that works best for you and your team. All plans include core features with different levels of access and support.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={100 * index}>
              <Card className={`h-full flex flex-col ${plan.featured ? 'ring-2 ring-primary relative' : ''}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground ml-2">per month</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                </div>
                
                <div className="mt-auto">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={plan.featured ? "primary" : "outline"} 
                    className="w-full"
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProductShowcase;
