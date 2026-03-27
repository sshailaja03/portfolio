"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Artificial delay to simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Thanks for reaching out! This is a demo form so no email was actually sent, but you can contact me directly via sshailaja2004@gmail.com");
    reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-background border-t border-muted-foreground/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Info */}
          <motion.div 
            className="lg:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <h2 className="text-sm uppercase tracking-widest text-accent font-bold">Get In Touch</h2>
              <h3 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-[1.1]">
                Let’s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">beautiful</span>.
              </h3>
              <p className="text-lg text-muted-foreground font-light max-w-md pt-4">
                Whether you have a project in mind, want to discuss design systems, or just want to say hi, my inbox is always open.
              </p>
            </div>

            <div className="flex flex-col gap-6 pt-4">
              <a href="mailto:sshailaja2004@gmail.com" className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/5 transition-all">
                  <Mail size={20} className="text-foreground group-hover:text-secondary transition-colors" />
                </div>
                <span className="text-lg font-medium text-foreground group-hover:text-secondary transition-colors">sshailaja2004@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/shailaja-singh2004" target="_blank" rel="noreferrer" className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-[#0A66C2] group-hover:bg-[#0A66C2]/5 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-[#0A66C2] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <span className="text-lg font-medium text-foreground group-hover:text-[#0A66C2] transition-colors">shailaja-singh2004</span>
              </a>
              <a href="https://github.com/sshailaja03" target="_blank" rel="noreferrer" className="flex items-center gap-4 group w-fit hover:text-foreground">
                <div className="w-12 h-12 rounded-full border border-muted-foreground/20 flex items-center justify-center group-hover:border-foreground group-hover:bg-foreground/5 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </div>
                <span className="text-lg font-medium text-foreground transition-colors">sshailaja03</span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-primary p-8 md:p-10 rounded-[2rem] border border-muted-foreground/10 shadow-sm glass">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-widest font-bold text-foreground mb-3">Name</label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full bg-background border border-muted-foreground/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-secondary transition-colors shadow-sm"
                  placeholder="ramesh babu"
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message as string}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-widest font-bold text-foreground mb-3">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full bg-background border border-muted-foreground/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-secondary transition-colors shadow-sm"
                  placeholder="ramesh@dev.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message as string}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-widest font-bold text-foreground mb-3">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="w-full bg-background border border-muted-foreground/20 rounded-xl px-5 py-4 text-foreground focus:outline-none focus:border-secondary transition-colors resize-none shadow-sm"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message.message as string}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-secondary text-primary rounded-xl font-bold tracking-wide hover:bg-secondary/90 hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-32 pt-8 border-t border-muted-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm font-medium">
          <p>© {new Date().getFullYear()} Shailaja Singh. All rights reserved.</p>
          <p>Designed with passion & built with Next.js.</p>
        </div>
      </div>
    </section>
  );
}
