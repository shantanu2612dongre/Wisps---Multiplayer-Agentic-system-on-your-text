import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Dotie — Join Our Team" },
      {
        name: "description",
        content:
          "We're always looking for talented people to join our mission of reimagining email.",
      },
      { property: "og:title", content: "Careers at Dotie — Join Our Team" },
      { property: "og:description", content: "Join our team and help build the future of email." },
    ],
  }),
  component: Careers,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowRight } from "lucide-react";

const ALL_JOBS = [
  { departmentId: "Product-Marketing", department: "Product-Marketing", role: "Growth & AI Creative Producer", contractType: "internship", isRemote: true, studentsOnly: false },
  { departmentId: "ai-engineering", department: "AI & Engineering", role: "AI Research Intern", contractType: "internship", isRemote: true, studentsOnly: true },
  { departmentId: "ai-engineering", department: "AI & Engineering", role: "Backend Engineer Intern", contractType: "internship", isRemote: true, studentsOnly: false },
  { departmentId: "design", department: "Design", role: "Product + Design Interns", contractType: "internship", isRemote: true, studentsOnly: true },
];

function Careers() {
  const [department, setDepartment] = useState("all");
  const [contractType, setContractType] = useState("all");
  const [location, setLocation] = useState("any");
  const [studentsOnly, setStudentsOnly] = useState(false);

  // Extract unique filter options dynamically from ALL_JOBS
  const uniqueDepartments = Array.from(new Set(ALL_JOBS.map(job => job.departmentId))).map(id => ({
    id,
    name: ALL_JOBS.find(job => job.departmentId === id)?.department || id
  }));
  const uniqueContractTypes = Array.from(new Set(ALL_JOBS.map(job => job.contractType)));


  const filteredJobs = ALL_JOBS.filter(job => {
    if (department !== "all" && job.departmentId !== department) return false;
    if (contractType !== "all" && job.contractType !== contractType) return false;
    if (location === "remote" && !job.isRemote) return false;
    if (studentsOnly && !job.studentsOnly) return false;
    return true;
  });

  return (
    <main className="relative min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-primary-glow/10 via-transparent to-transparent pointer-events-none" />
      <Nav />
      <section className="relative py-12 md:py-24">
        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="flex flex-col items-center justify-center text-center mt-12 mb-16 md:mb-24"
          >
            <h1
              className="text-6xl md:text-[7.5rem] leading-[1] text-foreground flex flex-col items-center gap-2 md:gap-4"
              style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }}
            >
              <span className="italic font-normal">Come build</span>
              <span className="font-normal text-4xl md:text-[5rem] text-muted-foreground/80 italic">at</span>
              <span className="font-normal">Dotie</span>
            </h1>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="flex flex-col items-center space-y-8 mb-20"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[180px] bg-card rounded-full border-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] py-5 px-4 font-medium text-foreground/80">
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All departments</SelectItem>
                  {uniqueDepartments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={contractType} onValueChange={setContractType}>
                <SelectTrigger className="w-[180px] bg-card rounded-full border-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] py-5 px-4 font-medium text-foreground/80">
                  <SelectValue placeholder="All contract types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All contract types</SelectItem>
                  {uniqueContractTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[180px] bg-card rounded-full border-0 shadow-[0_2px_10px_rgba(0,0,0,0.05)] py-5 px-4 font-medium text-foreground/80">
                  <SelectValue placeholder="Any locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Checkbox
                id="students"
                checked={studentsOnly}
                onCheckedChange={(checked) => setStudentsOnly(checked as boolean)}
                className="border-muted-foreground/30 data-[state=checked]:bg-foreground data-[state=checked]:text-background rounded-sm"
              />
              <label
                htmlFor="students"
                className="text-[15px] text-muted-foreground cursor-pointer font-medium"
              >
                Show only jobs suitable for students or new grads
              </label>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="space-y-10 pb-16"
          >
            {filteredJobs.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                No jobs found matching your filters.
              </div>
            ) : (
              Array.from(new Set(filteredJobs.map(j => j.departmentId))).map(deptId => {
                const deptJobs = filteredJobs.filter(j => j.departmentId === deptId);
                const deptName = deptJobs[0].department;
                return (
                  <div key={deptId} className="space-y-4">
                    <h2 className="text-[15px] font-semibold px-2 text-foreground/90">{deptName}</h2>
                    <div className="space-y-4">
                      {deptJobs.map((job, index) => (
                        <div key={`${job.departmentId}-${index}`} className="bg-card rounded-[32px] p-4 pl-8 md:pr-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border/40">
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/90">{job.role}</h3>
                          <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <p className="text-sm text-muted-foreground/90 max-w-[280px] leading-relaxed">
                              Fully remote from <Link to="/faq" className="underline cursor-pointer hover:text-foreground transition-colors">eligible countries</Link>
                            </p>
                            <a 
                              href={`mailto:founders@dotie.in?subject=Application%20for%20${encodeURIComponent(job.role)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-14 w-[88px] rounded-full bg-[#222222] text-white flex items-center justify-center shrink-0 hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                            >
                              <ArrowRight className="h-5 w-5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
