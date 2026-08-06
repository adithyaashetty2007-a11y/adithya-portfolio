import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal, Github, Linkedin, Phone, Mail, FileText, ExternalLink, 
  Code2, Cpu, Layers, Award, GraduationCap, User, Home as HomeIcon, 
  BookOpen, Briefcase, Radio, Send, CheckCircle2, Sparkles, Command, 
  ChevronRight, Download, Menu, X, ArrowUpRight, ShieldCheck, TerminalSquare
} from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "AdithyaOS v4.2.0 (x86_64-pc-terminal)",
    "Type 'help' to see available commands or click navigation tabs.",
    "--------------------------------------------------",
    "SUCCESS: Loaded kernel profile [Adithya A Shetty]",
    "SYSTEM READY."
  ]);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "dsa", "development", "leadership", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalLogs, `$ ${terminalInput}`];

    if (cmd === "help") {
      newLogs.push("Available commands: about, skills, projects, contact, clear, resume, sudo rm -rf /");
    } else if (cmd === "about") {
      newLogs.push("Adithya A Shetty: Software Engineer, Full Stack Web Developer & AIML enthusiast specializing in scalable backend systems and high-performance frontend architectures.");
    } else if (cmd === "skills") {
      newLogs.push("Languages: TypeScript, JavaScript, Python, C++, Java, SQL | Frontend: React 19, Tailwind CSS, Next.js | Backend: Node.js, Express, Docker, REST APIs, PostgreSQL, MongoDB");
    } else if (cmd === "projects") {
      newLogs.push("1. DevPulse OS | 2. NeuralSynth AI | 3. Algorithmic Vision | 4. Nexus Cloud Engine");
    } else if (cmd === "contact") {
      newLogs.push("Phone: 8088814686 | Email: adithya@shetty.dev | LinkedIn: /in/adithya-a-shetty-421097382");
    } else if (cmd === "resume") {
      newLogs.push("Downloading Adithya_A_Shetty_Resume.pdf...");
      toast.success("Resume downloaded successfully!");
    } else if (cmd === "clear") {
      setTerminalLogs(["AdithyaOS v4.2.0 terminal session cleared."]);
      setTerminalInput("");
      return;
    } else if (cmd.includes("sudo")) {
      newLogs.push("Permission denied: Root access requires coffee and GitHub contribution streaks.");
    } else {
      newLogs.push(`Command not recognized: '${cmd}'. Type 'help' for available commands.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill in all fields before transmitting.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Transmission received successfully! Adithya will respond shortly.");
      setContactForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("8088814686");
    setIsCopiedPhone(true);
    toast.success("Phone number copied to clipboard: 8088814686");
    setTimeout(() => setIsCopiedPhone(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans relative selection:bg-white/20 selection:text-white">
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 crt-scanline z-50 pointer-events-none opacity-40"></div>

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-8 h-8 rounded bg-white/10 border border-white/20 flex items-center justify-center font-mono text-sm font-bold text-white">
              A
            </div>
            <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-white">
              ADITHYA<span className="text-zinc-400">.SHETTY</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "dsa", label: "DSA" },
              { id: "development", label: "Development" },
              { id: "leadership", label: "Leadership" },
              { id: "projects", label: "Projects" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  activeSection === item.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action / Phone */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={copyPhone}
              className="px-3 py-1.5 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-2 transition"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>8088814686</span>
              {isCopiedPhone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-zinc-400 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#141416] border-b border-white/10 px-4 pt-2 pb-4 space-y-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "dsa", label: "DSA" },
              { id: "development", label: "Development" },
              { id: "leadership", label: "Leadership" },
              { id: "projects", label: "Projects" },
              { id: "education", label: "Education" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm font-mono ${
                  activeSection === item.id
                    ? "bg-white text-black font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">Direct Contact:</span>
              <button onClick={copyPhone} className="text-xs font-mono text-white underline flex items-center gap-1">
                <Phone className="w-3 h-3" /> 8088814686
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Fixed Left Vertical Dock (Reference Style) */}
      <aside className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-30 flex-col items-center py-6 px-3 bg-[#141416]/80 backdrop-blur-md border-r border-y border-white/10 rounded-r-xl space-y-6 shadow-2xl">
        <a 
          href="https://github.com/adithyaashetty2007-a11y" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="GitHub Profile"
        >
          <Github className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            GitHub
          </span>
        </a>
        <a 
          href="https://www.linkedin.com/in/adithya-a-shetty-421097382" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="LinkedIn Profile"
        >
          <Linkedin className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            LinkedIn
          </span>
        </a>
        <button 
          onClick={() => scrollToSection("development")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Development & Skills"
        >
          <Code2 className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Development
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("dsa")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="DSA & Algorithms"
        >
          <Cpu className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            DSA Stats
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("contact")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Contact Adithya"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Contact
          </span>
        </button>
        <div className="w-6 h-[1px] bg-white/10"></div>
        <div className="text-[10px] font-mono text-zinc-500 writing-mode-vertical tracking-widest uppercase">
          0(1)
        </div>
      </aside>

      {/* Main Container */}
      <main className="lg:pl-16 pt-16">
        {/* HERO SECTION */}
        <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-8 border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a] pointer-events-none"></div>
          
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Software Engineer & Web Developer
              </div>

              <div className="space-y-2">
                <p className="text-zinc-400 font-mono text-sm sm:text-base">Hello, I'm</p>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-white glow-text">
                  Adithya A<br />Shetty<span className="text-zinc-500">.</span>
                </h1>
              </div>

              <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-sans leading-relaxed">
                I build robust full-stack web applications, architect high-performance backend systems, and solve complex algorithmic problems with clean, scalable code.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={() => {
                    toast.success("Downloading resume: Adithya_A_Shetty_Resume.pdf");
                  }}
                  className="px-6 py-3 bg-white text-black font-mono font-semibold text-xs sm:text-sm rounded hover:bg-zinc-200 transition flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD RESUME
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-white/5 border border-white/20 text-white font-mono font-semibold text-xs sm:text-sm rounded hover:bg-white/10 transition flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs font-mono text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">350+</span> LeetCode Solved
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">45+</span> Repositories
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">100%</span> Reliable
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Retro Terminal Display */}
            <div className="lg:col-span-5">
              <div className="bg-[#141416] border border-white/15 rounded-xl p-5 glow-box relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1 bg-white/10 text-[10px] font-mono text-zinc-300 rounded-bl-lg">
                  PORTFOLIO_OS // v4.2
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="text-xs font-mono text-zinc-500 ml-2">adithya@shetty-mbp:~</span>
                </div>

                <div className="space-y-2 font-mono text-xs sm:text-sm text-zinc-300 h-64 overflow-y-auto pr-2 bg-black/40 p-3 rounded border border-white/5">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith("$") ? "text-white font-semibold" : "text-zinc-400"}>
                      {log}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                <form onSubmit={handleTerminalSubmit} className="mt-3 flex items-center gap-2 bg-black/60 border border-white/10 rounded px-3 py-2">
                  <span className="text-emerald-400 font-mono text-xs">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Type 'help' or command..."
                    className="bg-transparent border-none outline-none text-xs font-mono text-white w-full placeholder:text-zinc-600"
                  />
                  <button type="submit" className="text-xs font-mono text-zinc-400 hover:text-white">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 01. BACKGROUND</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">About Adithya</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-sans text-base sm:text-lg">
              <p>
                I am <strong className="text-white font-semibold">Adithya A Shetty</strong>, a passionate software engineer and full-stack web developer dedicated to building exceptional digital experiences. My journey in technology is driven by curiosity, mathematical precision, and an unrelenting pursuit of clean code architecture.
              </p>
              <p>
                Whether crafting lightning-fast React frontends, engineering resilient Node.js backends, or training intelligent machine learning models, I focus on performance, accessibility (<span className="text-mono text-xs bg-white/10 px-2 py-0.5 rounded text-white">a11y</span>), and maintainability.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-[#141416] border border-white/10">
                  <h4 className="text-white font-mono text-sm font-bold mb-1">Full Stack Craft</h4>
                  <p className="text-xs text-zinc-400">End-to-end web architectures using modern TypeScript & Python toolchains.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#141416] border border-white/10">
                  <h4 className="text-white font-mono text-sm font-bold mb-1">Algorithm Mastery</h4>
                  <p className="text-xs text-zinc-400">Deep foundation in data structures, time complexity optimization, and problem solving.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#141416] border border-white/10 rounded-xl p-6 space-y-6">
              <h3 className="font-mono text-sm text-white font-bold tracking-wider uppercase border-b border-white/10 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-400" />
                Quick Profile Spec
              </h3>
              <ul className="space-y-4 font-mono text-xs sm:text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Full Name:</span>
                  <span className="text-white font-semibold">Adithya A Shetty</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Role:</span>
                  <span className="text-white">Software Engineer</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Phone:</span>
                  <span className="text-white">8088814686</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">GitHub:</span>
                  <a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300">
                    adithyaashetty2007-a11y
                  </a>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-zinc-500">LinkedIn:</span>
                  <a href="https://www.linkedin.com/in/adithya-a-shetty-421097382" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-zinc-300 truncate max-w-[180px]">
                    adithya-a-shetty
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DSA & COMPETITIVE PROGRAMMING SECTION */}
        <section id="dsa" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 02. ALGORITHMIC PROBLEM SOLVING</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">DSA & Competitive Programming</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="text-zinc-500 font-mono text-xs uppercase mb-2">LeetCode Profile</div>
              <div className="text-3xl font-bold font-mono text-white mb-1">350+ Solved</div>
              <p className="text-xs text-zinc-400">Consistent solver across Easy, Medium, and Hard algorithmic problems with optimized runtime.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-emerald-400">Easy: 120+</span>
                <span className="text-yellow-400">Medium: 185+</span>
                <span className="text-red-400">Hard: 45+</span>
              </div>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="text-zinc-500 font-mono text-xs uppercase mb-2">GitHub Activity</div>
              <div className="text-3xl font-bold font-mono text-white mb-1">45+ Repos</div>
              <p className="text-xs text-zinc-400">Active commit history, robust pull requests, and production-grade open source contributions.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Public Repos: 45</span>
                <span className="text-emerald-400">Status: Active</span>
              </div>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="text-zinc-500 font-mono text-xs uppercase mb-2">Core Competencies</div>
              <div className="text-3xl font-bold font-mono text-white mb-1">O(1) Optimized</div>
              <p className="text-xs text-zinc-400">Specialized in dynamic programming, graph theory, trees, greedy algorithms, and bit manipulation.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Complexity: O(n log n)</span>
                <span className="text-emerald-400">Verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPMENT & SKILLS SECTION */}
        <section id="development" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 03. TECHNICAL EXPERTISE</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Development & Engineering Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Frontend Engineering",
                icon: <Code2 className="w-5 h-5 text-white" />,
                skills: ["React 19", "TypeScript", "Tailwind CSS v4", "Next.js", "HTML5/CSS3", "Vite"]
              },
              {
                title: "Backend Systems",
                icon: <Layers className="w-5 h-5 text-white" />,
                skills: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "MongoDB", "Redis"]
              },
              {
                title: "DevOps & Tools",
                icon: <Cpu className="w-5 h-5 text-white" />,
                skills: ["Git & GitHub", "Docker", "Linux / Unix", "Vercel", "Postman", "CI/CD Pipelines"]
              },
              {
                title: "Languages & Core",
                icon: <TerminalSquare className="w-5 h-5 text-white" />,
                skills: ["JavaScript (ES6+)", "Python", "C++", "Java", "SQL", "Data Structures"]
              }
            ].map((cat, idx) => (
              <div key={idx} className="bg-[#141416] border border-white/10 rounded-xl p-6 hover:border-white/30 transition group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-mono font-bold text-white mb-4">{cat.title}</h3>
                <ul className="space-y-2">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section id="leadership" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 04. LEADERSHIP & COLLABORATION</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Leadership & Community</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#141416] border border-white/10 rounded-xl p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 bg-white/10 text-white rounded">Tech Lead & Coordinator</span>
                <Award className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold font-mono text-white">Coding Society & Hackathons</h3>
              <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                Spearheaded technical workshops on data structures, web development, and modern JavaScript frameworks. Mentored junior engineering students and organized collegiate hackathons.
              </p>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 bg-white/10 text-white rounded">Open Source Contributor</span>
                <ShieldCheck className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold font-mono text-white">Collaborative Software Engineering</h3>
              <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                Contributed to accessibility (<span className="font-mono text-xs text-white">a11y</span>) standards and developer tooling repositories on GitHub, maintaining high code quality and test coverage.
              </p>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 05. FEATURED WORK</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Software Engineering Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "DevPulse OS",
                desc: "A browser-based retro terminal operating system featuring command-line execution, real-time code runner, and stateful workspace management.",
                tech: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
                github: "https://github.com/adithyaashetty2007-a11y",
                live: "#"
              },
              {
                title: "NeuralSynth AI Dashboard",
                desc: "Full-stack AI model training and tensor inference dashboard with live performance metrics, latency benchmarks, and RESTful API integration.",
                tech: ["React", "Python", "FastAPI", "Tailwind CSS"],
                github: "https://github.com/adithyaashetty2007-a11y",
                live: "#"
              },
              {
                title: "Algorithmic Vision (DSA Hub)",
                desc: "Interactive data structures and algorithms visualizer built for sorting trees, Dijkstra's pathfinding, and dynamic programming state tables.",
                tech: ["TypeScript", "HTML5 Canvas", "Tailwind CSS"],
                github: "https://github.com/adithyaashetty2007-a11y",
                live: "#"
              },
              {
                title: "Nexus Cloud Engine",
                desc: "Scalable microservices backend engine with containerized Docker deployment, Redis caching layers, and robust JWT authentication.",
                tech: ["Node.js", "Express", "Docker", "Redis", "PostgreSQL"],
                github: "https://github.com/adithyaashetty2007-a11y",
                live: "#"
              }
            ].map((proj, idx) => (
              <div key={idx} className="bg-[#141416] border border-white/10 rounded-xl p-8 flex flex-col justify-between hover:border-white/30 transition group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">PROJECT_0{idx + 1}</span>
                    <div className="flex items-center gap-3">
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white group-hover:text-zinc-200 transition">{proj.title}</h3>
                  <p className="text-zinc-400 text-sm font-sans leading-relaxed">{proj.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap gap-2">
                  {proj.tech.map((t, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 06. ACADEMIC CREDENTIALS</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Education</h2>
          </div>

          <div className="bg-[#141416] border border-white/10 rounded-xl p-8 max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-500">Computer Science & Engineering</span>
                <h3 className="text-xl font-bold font-mono text-white">Bachelor of Technology (B.Tech)</h3>
                <p className="text-zinc-400 text-sm font-sans">
                  Specialized in Software Engineering, Data Structures, Algorithms, and Artificial Intelligence & Machine Learning (AIML).
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span>Status: Pursuing / Completed</span>
                  <span>•</span>
                  <span className="text-white">Adithya A Shetty</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 07. TRANSMIT MESSAGE</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Get In Touch</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-zinc-400 text-base font-sans leading-relaxed">
                Looking for a dedicated software engineer or web developer? Feel free to reach out via phone, email, LinkedIn, or send a direct transmission below.
              </p>

              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#141416] border border-white/10">
                  <Phone className="w-5 h-5 text-zinc-400" />
                  <div>
                    <div className="text-xs text-zinc-500">Direct Phone</div>
                    <button onClick={copyPhone} className="text-white hover:underline font-bold">8088814686</button>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#141416] border border-white/10">
                  <Mail className="w-5 h-5 text-zinc-400" />
                  <div>
                    <div className="text-xs text-zinc-500">Email Address</div>
                    <span className="text-white font-bold">adithya@shetty.dev</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#141416] border border-white/10">
                  <Linkedin className="w-5 h-5 text-zinc-400" />
                  <div>
                    <div className="text-xs text-zinc-500">LinkedIn Profile</div>
                    <a href="https://www.linkedin.com/in/adithya-a-shetty-421097382" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold text-xs truncate block max-w-[240px]">
                      /in/adithya-a-shetty-421097382
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#141416] border border-white/10">
                  <Github className="w-5 h-5 text-zinc-400" />
                  <div>
                    <div className="text-xs text-zinc-500">GitHub Profile</div>
                    <a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold text-xs">
                      adithyaashetty2007-a11y
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#141416] border border-white/10 rounded-xl p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. Recruiter / Collaborator"
                    className="w-full bg-black/50 border border-white/15 rounded px-4 py-3 text-sm font-mono text-white focus:border-white outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Your Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-black/50 border border-white/15 rounded px-4 py-3 text-sm font-mono text-white focus:border-white outline-none transition"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Write your project inquiry or collaboration message here..."
                    className="w-full bg-black/50 border border-white/15 rounded px-4 py-3 text-sm font-mono text-white focus:border-white outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-mono font-bold text-sm rounded hover:bg-zinc-200 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-4 sm:px-8 border-t border-white/10 text-center text-xs font-mono text-zinc-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} Adithya A Shetty. Built with precision & retro-terminal aesthetic.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
              <a href="https://www.linkedin.com/in/adithya-a-shetty-421097382" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
              <button onClick={() => scrollToSection("home")} className="hover:text-white transition">Back to Top ↑</button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
