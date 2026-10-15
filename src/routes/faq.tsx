import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Dotie Careers" },
      {
        name: "description",
        content: "Find answers to frequently asked questions about working at Dotie.",
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-page-wash text-foreground antialiased font-sans">
      <Nav />
      
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row gap-16 relative">
        {/* Sidebar */}
        <div className="w-full md:w-[280px] shrink-0">
          <div className="sticky top-24">
            <Link 
              to="/careers" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-24 md:mb-32 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="underline underline-offset-4">Back to jobs</span>
            </Link>

            <div className="space-y-4">
              <h3 className="text-sm text-muted-foreground mb-4">Index</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button 
                    onClick={() => scrollToSection('working')}
                    className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity text-left"
                  >
                    <span className="w-3">→</span>
                    <span className="underline underline-offset-4 decoration-black/30">Working at Dotie</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('applying')}
                    className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity text-left"
                  >
                    <span className="w-3">→</span>
                    <span className="underline underline-offset-4 decoration-black/30">Applying for a job</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('remote')}
                    className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity text-left"
                  >
                    <span className="w-3">→</span>
                    <span className="underline underline-offset-4 decoration-black/30">Remote work and relocation</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pt-12 md:pt-0">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-24 md:mb-32">
            Frequently asked questions
          </h1>

          <div className="space-y-24 md:space-y-32">
            {/* Working at Dotie */}
            <section id="working" className="scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">Working at Dotie</h2>
              <Accordion type="multiple" className="w-full border-t border-black/10">
                <AccordionItem value="item-1" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70">
                    Is it true that Dotie is a demanding workplace?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Yes, we maintain high standards and expect strong dedication, but we also ensure you have the best tools, smart colleagues, and support to do your best work.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70">
                    How long do internships last?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Internships typically last between 3 to 6 months, depending on the role and the project scope you'll be tackling.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Applying for a job */}
            <section id="applying" className="scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">Applying for a job</h2>
              <Accordion type="multiple" className="w-full border-t border-black/10">
                <AccordionItem value="item-3" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    How does the application process work?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    After you apply, we review your application. If it's a match, you'll go through a series of technical and cultural interviews designed to assess your skills and fit for Dotie.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    Can I apply for more than one job at the same time?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    We recommend focusing on the role that best matches your skills. If we think you're a better fit for another open position, we'll let you know.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    I applied and, after completing some tasks and interviews, I wasn't selected. Can I reapply?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Yes, absolutely! We encourage you to gain more experience and reapply after at least 6 months.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    I'm interested in working at Dotie, but I don't have any experience. What do you recommend?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Look for our internship or entry-level opportunities. We value potential, curiosity, and a drive to learn just as much as past experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    I'd love to work at Dotie, but I don't see an open job that fits my skill set. Do you accept general applications?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Yes, you can submit an open application through our careers portal, and we'll keep your profile in mind for future openings.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    I received an email telling me that Dotie won't be continuing with my application. Can I have some feedback?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Due to the high volume of applications, we unfortunately cannot provide individualized feedback for candidates before the interview stage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    I've been invited to an interview. How can I prepare?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Review the job description thoroughly, practice your problem-solving skills out loud, and come prepared with questions about our product and culture.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    What are the application deadlines?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    We hire on a rolling basis unless a specific deadline is mentioned on the job posting. It's always best to apply as soon as you're ready!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-11" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    I'm in need of assistance or accommodations. What should I do?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Please let our recruiting team know when you are contacted for an interview, and we will do our best to accommodate your needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Remote work and relocation */}
            <section id="remote" className="scroll-mt-24 mb-32">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-8">Remote work and relocation</h2>
              <Accordion type="multiple" className="w-full border-t border-black/10">
                <AccordionItem value="item-12" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    Do I have to always work on site?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    No, we offer highly flexible remote options depending on the role. Many of our team members work fully remotely.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-13" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    From which countries can I work remotely?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    We support remote work across multiple regions, primarily in timezones that allow reasonable overlap with the rest of the team. We'll clarify exact eligible locations during the interview process.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-14" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    To relocate for the job, I'd need a visa or a residency permit. Do you sponsor them?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Yes, for eligible roles, we offer comprehensive visa sponsorship and relocation assistance to help you get settled smoothly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-15" className="border-b border-black/10">
                  <AccordionTrigger className="text-lg md:text-xl font-normal py-6 hover:no-underline hover:opacity-70 text-left">
                    Is there any support for relocating to Italy, Poland, Spain, or the UK?
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    Absolutely. We provide tailored relocation packages including temporary housing, administrative support, and moving stipends to ease your transition.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
            
            {/* Footer help */}
            <div className="pb-32 text-center text-muted-foreground">
              <p>Can't find what you're looking for?</p>
              <a href="mailto:contact@dotie.com" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">Contact us</a>.
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
