"use client";

import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";

const projects = [
  { id: "expense-tracker", title: "AI Expense Tracker", role: "Full-Stack Developer", problem: "Managing expenses becomes harder when transaction data is difficult to search, sort, and summarize.", process: "Built a React and Node.js application with MongoDB, algorithmic expense processing, visual analytics, and AI-generated spending insights.", outcome: "Combines practical full-stack development with Merge Sort, Binary Search, HashMap aggregation, and bounded heap-based top-expense analysis.", tools: ["React", "Node.js", "MongoDB", "DSA", "Gemini"], github: "https://github.com/sshailaja03/AI-Expense-Tracker", mark: "AI" },
  { id: "devlink", title: "DevLink", role: "Full-Stack Developer", problem: "Developers need a simple way to manage projects and present a structured public developer profile.", process: "Built a React and Express platform with JWT authentication, protected project CRUD, public profiles, MongoDB persistence, and reusable API handling.", outcome: "Implemented ownership checks, secure session cookies, centralized API access, and automated backend authorization tests.", tools: ["React", "Node.js", "Express", "MongoDB", "JWT"], github: "https://github.com/sshailaja03/project-showcase", mark: "DL" },
  { id: "aura-shop", title: "Aura Shop", role: "Frontend Developer", problem: "E-commerce interfaces need fast product discovery, predictable cart behavior, and responsive interactions without unnecessary complexity.", process: "Built a TypeScript React storefront with Zustand state management, validated forms, product discovery, wishlist/cart flows, responsive UI, and motion interactions.", outcome: "Added automated tests for variant-aware cart merging, quantities, totals, and wishlist state.", tools: ["React", "TypeScript", "Zustand", "Vitest", "Tailwind"], github: "https://github.com/sshailaja03/aura-shop", mark: "AS" }
]

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
              <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-muted-foreground/10 bg-muted/40 shadow-sm lg:w-1/2">
                <span className="font-heading text-7xl font-bold tracking-tight text-foreground/15 md:text-9xl">{project.mark}</span>
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
