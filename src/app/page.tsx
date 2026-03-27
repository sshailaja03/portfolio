import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Leadership } from "@/components/sections/Leadership";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Projects />
      <Process />
      <Skills />
      <Education />
      <Certifications />
      <Leadership />
      <Contact />
    </main>
  );
}
