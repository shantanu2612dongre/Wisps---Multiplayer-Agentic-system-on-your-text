import { Sparkles, Linkedin, Twitter, Instagram, Youtube, Facebook, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-textured-paper pt-20 pb-10 overflow-hidden">
      {/* Background Wordmark "wisps" */}
      <div className="absolute bottom-[-2.5rem] md:bottom-[-4rem] left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 pointer-events-none select-none z-0">
        <h2 className="text-[9rem] sm:text-[12rem] md:text-[18rem] lg:text-[22rem] font-bold text-center tracking-tighter text-foreground/[0.03] dark:text-foreground/[0.02] leading-none uppercase">
          wisps
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Left Column (Logo, YC badge, App links, socials) */}
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <a
              href="#"
              className="flex items-center gap-1.5 font-semibold text-foreground tracking-tight text-xl"
            >
              <img src="/wispsmascot.png" alt="Wisps logo" className="h-9 w-9 object-contain" />
              Wisps
            </a>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              From email overload to inbox zero, on autopilot.
            </p>

            {/* App Store / Google Play Buttons */}
            {/* <div className="flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="flex items-center gap-2.5 rounded-lg bg-black border border-zinc-850 px-3.5 py-1.5 text-white hover:bg-zinc-900 transition-colors w-max"
              >
                <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.05-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.06 1.005 1.45 2.19 3.07 3.766 3.01 1.524-.06 2.099-.98 3.94-.98 1.829 0 2.365.98 3.96.948 1.627-.027 2.668-1.477 3.655-2.924 1.154-1.688 1.627-3.327 1.655-3.414-.038-.016-3.179-1.22-3.21-4.825-.027-3.01 2.447-4.454 2.56-4.522-1.41-2.072-3.578-2.3-4.324-2.355-1.992-.163-3.417.828-4.301.828zm2.668-4.144c.806-.976 1.352-2.33 1.203-3.69-1.17.047-2.585.782-3.424 1.766-.749.869-1.405 2.24-1.228 3.585 1.306.1 2.643-.687 3.449-1.66z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-wider text-zinc-400 font-medium leading-none">Download on the</div>
                  <div className="text-xs font-semibold mt-0.5 leading-none">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-2.5 rounded-lg bg-black border border-zinc-855 px-3.5 py-1.5 text-white hover:bg-zinc-900 transition-colors w-max"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.60986 20.8801C3.85986 21.3901 4.38986 21.7501 5.00986 21.7501C5.35986 21.7501 5.68986 21.6501 5.97986 21.4901L16.2799 15.5401L12.3099 11.5701L3.60986 20.8801Z" fill="#EA4335" />
                  <path d="M20.21 10.9201L16.92 9.02011L12.98 12.9601L16.92 16.9001L20.21 15.0001C21.29 14.3801 22.03 13.2501 22.03 11.9601C22.03 10.6701 21.29 9.54011 20.21 10.9201Z" fill="#FBBC05" />
                  <path d="M3.60986 3.03994C3.38986 3.48994 3.25986 4.00994 3.25986 4.58994V19.3399C3.25986 19.9199 3.38986 20.4399 3.60986 20.8899L12.9999 11.4999L3.60986 3.03994Z" fill="#4285F4" />
                  <path d="M5.97986 2.42993C5.68986 2.26993 5.35986 2.16992 5.00986 2.16992C4.38986 2.16992 3.85986 2.52993 3.60986 3.03993L12.3099 11.7399L16.2799 7.76993L5.97986 2.42993Z" fill="#34A853" />
                </svg>
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-wider text-zinc-400 font-medium leading-none">GET IT ON</div>
                  <div className="text-xs font-semibold mt-0.5 leading-none">Google Play</div>
                </div>
              </a>
            </div> */}

            {/* Social List */}
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground mt-2">
              <h4 className="text-sm font-semibold text-foreground tracking-tight">Socials</h4>
              <a
                href="https://linkedin.com/company/wisps"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4 shrink-0" />
                <span>@wisps-email</span>
              </a>
              <a
                href="https://x.com/wisps"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4 shrink-0" />
                <span>@usewisps</span>
              </a>
              <a
                href="https://instagram.com/wisps"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                <span>@usewisps</span>
              </a>
              <a
                href="https://youtube.com/wisps"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <Youtube className="h-4 w-4 shrink-0" />
                <span>@usewisps</span>
              </a>
              <a
                href="https://facebook.com/wisps"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <Facebook className="h-4 w-4 shrink-0" />
                <span>Wisps</span>
              </a>
              <a
                href="mailto:contact@usewisps.com"
                className="flex items-center gap-2.5 hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@usewisps.com</span>
              </a>
            </div>
          </div>

          {/* Right section: Links grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-foreground tracking-tight">Product</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Inbox
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Drafts
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Agents
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Search
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-foreground tracking-tight">Company</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="/careers" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="/enterprise" className="hover:text-foreground transition-colors">
                    Enterprise
                  </a>
                </li>
                <li>
                  <a href="/for-agents" className="hover:text-foreground transition-colors">
                    For Agents
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-foreground tracking-tight">Resources</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="/changelog" className="hover:text-foreground transition-colors">
                    Changelog
                  </a>
                </li>
                <li>
                  <a href="/status" className="hover:text-foreground transition-colors">
                    System Status
                  </a>
                </li>
                <li>
                  <a href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-foreground tracking-tight">Legal</h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="/legal/dpa" className="hover:text-foreground transition-colors">
                    DPA
                  </a>
                </li>
                <li>
                  <a href="/legal/api-terms" className="hover:text-foreground transition-colors">
                    API Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lower footer bar */}
        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div>© {new Date().getFullYear()} Wisps. All rights reserved.</div>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-6">
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="/legal/data-deletion" className="hover:text-foreground transition-colors">
              Data Deletion
            </a>
            <a href="/legal/cookies" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
