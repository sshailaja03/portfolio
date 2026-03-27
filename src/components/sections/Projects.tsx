"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import Image from "next/image";
import sofiaImage from "../../assets/sofia_chess_engine.png";
import revizoImage from "../../assets/revizo_app.png";
import encryptorImage from "../../assets/python_encryptor.jpg";

const projects = [
  {
    id: "sofia",
    title: "Sofia Chess Engine",
    role: "Core Developer",
    problem: "Building a high-performance chess engine requiring optimized search algorithms and heuristics.",
    process: "Implemented alpha-beta negamax with iterative deepening, quiescence search, and 5 move-ordering heuristics. Parallelized perft.",
    outcome: "Achieved depth 6 search in under 1 second on mid-game positions with 85%+ fail-high-first rate. 10x throughput improvement.",
    tools: ["C++17", "Algorithms", "Concurrency"],
    github: "https://github.com/sshailaja03/Chess-Engine",
    image: sofiaImage
  },
  {
    id: "revizo",
    title: "Revizo – Gamified Learning App",
    role: "Android Developer & UI/UX",
    problem: "Students struggle with passive learning and finding engaging ways to retain information.",
    process: "Designed and built an app integrating SM-2 spaced repetition with a 15s/question real-time battle mode. Focused on engaging UI/UX and analytics tracking.",
    outcome: "Delivered 40+ flashcards across 5 decks with user XP tracking and response time analytics.",
    tools: ["Kotlin", "MVVM", "Jetpack", "Room", "Figma"],
    github: "https://github.com/sshailaja03/Revizo-Learning-App",
    image: revizoImage
  },
  {
    id: "encryptor",
    title: "Python File Encryptor",
    role: "Developer",
    problem: "Need for a lightweight, secure, and simple CLI tool for file encryption.",
    process: "Developed a minimal CLI using argparse, integrating AES-128 Fernet encryption for a secure encrypt/decrypt flow.",
    outcome: "Created a robust, less-than-70 LOC utility that guarantees secure file handling without bloat.",
    tools: ["Python", "Cryptography", "CLI"],
    github: "https://github.com/sshailaja03/file-encryptor",
    image: encryptorImage
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="space-y-4 mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-widest text-accent font-bold">Featured Work</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Selected projects & case studies.
          </h3>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex flex-col gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full lg:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden bg-muted/50 border border-muted-foreground/10 relative group shadow-sm transition-shadow hover:shadow-md">
                <Image
                  src={project.image}
                  alt={`${project.title} Preview`}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-2">
                  <h4 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{project.title}</h4>
                  <p className="text-secondary font-medium tracking-wide uppercase text-xs">{project.role}</p>
                </div>

                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <div>
                    <strong className="block text-[0.65rem] uppercase tracking-widest text-foreground/70 mb-1.5">Problem</strong>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <strong className="block text-[0.65rem] uppercase tracking-widest text-foreground/70 mb-1.5">Process</strong>
                    <p>{project.process}</p>
                  </div>
                  <div>
                    <strong className="block text-[0.65rem] uppercase tracking-widest text-foreground/70 mb-1.5">Outcome</strong>
                    <p className="text-foreground">{project.outcome}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 text-xs font-medium border border-muted-foreground/20 rounded-full text-muted-foreground bg-primary">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-6 flex items-center gap-6">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex flex-col text-sm uppercase tracking-widest text-foreground font-bold hover:text-accent transition-colors group">
                    <span className="flex items-center gap-2">
                      View Source Code
                      <GitBranch size={18} className="group-hover:scale-110 transition-transform" />
                    </span>
                    <span className="h-px w-0 bg-accent mt-1 transition-all group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
