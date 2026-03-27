"use client";

import { motion } from "framer-motion";
import { Code, LayoutTemplate, HeartHandshake, Layers } from "lucide-react";
import Image from "next/image";
import profilePic from "../../assets/cartoon_profile.png";

const valueCards = [
  {
    id: "product-thinking",
    title: "Product Thinking",
    description: "Aligning user needs with business goals to build cohesive, viable solutions.",
    icon: <LayoutTemplate size={24} className="text-accent" />
  },
  {
    id: "design-systems",
    title: "Design Systems",
    description: "Creating scalable, consistent visual languages that speed up development.",
    icon: <Layers size={24} className="text-secondary" />
  },
  {
    id: "user-empathy",
    title: "User Empathy",
    description: "Listening to the user to craft inclusive, accessible, and frustration-free flows.",
    icon: <HeartHandshake size={24} className="text-accent" />
  },
  {
    id: "technical-execution",
    title: "Technical Execution",
    description: "Writing robust code to ensure the design is implemented exactly as envisioned.",
    icon: <Code size={24} className="text-secondary" />
  }
];

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-primary">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
          
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <h2 className="text-sm uppercase tracking-widest text-secondary font-bold">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                Bridging the gap between engineering and design.
              </h3>
            </div>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                As a Computer Science student with a concentration in UI/UX design, I approach problem-solving from both a creative and technical perspective. I don't just design interfaces; I understand how they are built, enabling me to create practical, high-performance solutions.
              </p>
              <p>
                Currently studying at Lovely Professional University, I am deeply passionate about clarity, usability, clean interfaces, and thoughtful motion. I believe the best digital experiences are those where complex engineering feels entirely invisible to the user.
              </p>
            </div>
          </motion.div>

          {/* Visual/Image Area */}
          <motion.div 
            className="lg:w-1/2 w-full flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-md aspect-square rounded-[3rem] border border-secondary/20 shadow-md overflow-hidden bg-primary/50">
              <Image 
                src={profilePic} 
                alt="Shailaja Singh" 
                fill 
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Value Cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-muted/30 border border-muted-foreground/10 hover:border-secondary/30 transition-all hover:shadow-sm"
            >
              <div className="mb-6 inline-block p-4 rounded-xl bg-primary border border-secondary/5 shadow-sm">
                {card.icon}
              </div>
              <h4 className="text-xl font-heading font-bold mb-3 text-foreground">{card.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
