import React, { useState, useEffect } from "react";
import { 
  Terminal, Github, Linkedin, Phone, Mail, FileText, ExternalLink, 
  Code2, Cpu, Layers, Award, GraduationCap, User, Home as HomeIcon, 
  BookOpen, Briefcase, Radio, Send, CheckCircle2, Sparkles, Command, 
  ChevronRight, Download, Menu, X, ArrowUpRight, ShieldCheck, TerminalSquare, Plus, Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Certificate management state
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "1",
      title: "Programming Fundamentals (C/C++/Python)",
      issuer: "Engineering College Coursework",
      date: "2026",
      imageUrl: "",
      credentialUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    },
    {
      id: "2",
      title: "Data Structures & Algorithms in C++",
      issuer: "Self-Driven / LeetCode (20+ Solved)",
      date: "2026",
      imageUrl: "",
      credentialUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    }
  ]);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "", imageUrl: "", credentialUrl: "" });

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "dsa", "skills", "certifications", "projects", "education", "contact"];
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) {
      toast.error("Please provide at least a title and issuer.");
      return;
    }
    const cert: Certificate = {
      id: Date.now().toString(),
      title: newCert.title,
      issuer: newCert.issuer,
      date: newCert.date || "2026",
      imageUrl: newCert.imageUrl || "",
      credentialUrl: newCert.credentialUrl || "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    };
    setCertificates([...certificates, cert]);
    setNewCert({ title: "", issuer: "", date: "", imageUrl: "", credentialUrl: "" });
    setIsAddCertModalOpen(false);
    toast.success("Certificate added successfully!");
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
              { id: "skills", label: "Skills" },
              { id: "certifications", label: "Certifications" },
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
              { id: "skills", label: "Skills" },
              { id: "certifications", label: "Certifications" },
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
          onClick={() => scrollToSection("skills")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Skills"
        >
          <Code2 className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Skills
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("dsa")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="DSA Journey"
        >
          <Cpu className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            DSA Journey
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("certifications")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Certifications"
        >
          <Award className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Certifications
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("contact")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Contact"
        >
          <Mail className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Contact
          </span>
        </button>
        <div className="w-6 h-[1px] bg-white/10"></div>
        <div className="text-[10px] font-mono text-zinc-500 writing-mode-vertical tracking-widest uppercase">
          DEV
        </div>
      </aside>

      {/* Main Container */}
      <main className="lg:pl-16 pt-16">
        {/* HERO SECTION - STANDARD TWO-COLUMN LAYOUT */}
        <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-8 border-b border-white/10">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Engineering Student (2nd Sem Completed) & Aspiring Developer
              </div>

              <div className="space-y-2">
                <p className="text-zinc-400 font-mono text-sm sm:text-base">Hello, I'm</p>
                <h1 className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-white">
                  Adithya A Shetty<span className="text-zinc-500">.</span>
                </h1>
              </div>

              <p className="text-zinc-300 text-base sm:text-lg font-sans leading-relaxed max-w-xl">
                Completed 2nd semester of engineering. College-level basics in C, C++, and Python, started DSA in C++ (20+ LeetCode solved), and building web projects with AI assistance (~60% frontend accuracy).
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button 
                  onClick={() => {
                    toast.success("Downloading resume: Adithya_A_Shetty_Resume.pdf");
                  }}
                  className="px-6 py-3 bg-white text-black font-mono font-bold text-xs sm:text-sm rounded hover:bg-zinc-200 transition flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD RESUME
                </button>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-white/5 border border-white/20 text-white font-mono font-bold text-xs sm:text-sm rounded hover:bg-white/10 transition flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">20+</span> LeetCode Solved
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">10+</span> GitHub Repos
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">2nd Sem</span> Completed
                </div>
              </div>
            </div>

            {/* Right Column: Profile Photo inside Glowing Ring Frame */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border border-white/20 relative flex items-center justify-center shadow-[0_0_80px_rgba(255,255,255,0.12)]">
                <div className="absolute inset-6 rounded-full border border-dashed border-white/15 animate-spin-slow"></div>
                
                {/* Profile Photo Card */}
                <div className="w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[390px] lg:h-[390px] rounded-full overflow-hidden border-2 border-white/20 bg-[#141416] relative shadow-2xl">
                  <img 
                    src="/manus-storage/WhatsAppImage2026-07-27at17.09.12_0f7a6855.jpeg" 
                    alt="Adithya A Shetty" 
                    className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
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
                Hello! I am <strong className="text-white font-semibold">Adithya A Shetty</strong>. I have just completed my second semester of engineering. I am building my foundation in programming with college-level basics in C, C++, and Python.
              </p>
              <p>
                I am not a backend developer; I build frontend and web projects with AI assistance (achieving ~60% frontend accuracy). I started learning Data Structures and Algorithms (DSA) in C++ just 3 days ago, and I have already solved 20+ problems.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-[#141416] border border-white/10">
                  <h4 className="text-white font-mono text-sm font-bold mb-1">AI-Assisted Builder</h4>
                  <p className="text-xs text-zinc-400">Building user interfaces and web applications with AI tools (~60% frontend accuracy).</p>
                </div>
                <div className="p-4 rounded-lg bg-[#141416] border border-white/10">
                  <h4 className="text-white font-mono text-sm font-bold mb-1">DSA in C++ (3 Days)</h4>
                  <p className="text-xs text-zinc-400">Started DSA 3 days ago in C++, with 20+ LeetCode problems solved so far.</p>
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
                  <span className="text-zinc-500">Stage:</span>
                  <span className="text-white">2nd Sem Engineering Completed</span>
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
                    /in/adithya-a-shetty
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DSA SECTION */}
        <section id="dsa" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 02. DSA IN C++</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">DSA Journey (3 Days In)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="text-zinc-500 font-mono text-xs uppercase mb-2">LeetCode Progress</div>
              <div className="text-3xl font-bold font-mono text-white mb-1">20+ Solved</div>
              <p className="text-xs text-zinc-400">Started practicing Data Structures and Algorithms in C++ 3 days ago. Solving problems daily to build solid fundamentals.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-emerald-400">Language: C++</span>
                <span className="text-zinc-300">Streak: Active</span>
              </div>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="text-zinc-500 font-mono text-xs uppercase mb-2">GitHub Repositories</div>
              <div className="text-3xl font-bold font-mono text-white mb-1">10+ Repos</div>
              <p className="text-xs text-zinc-400">Created 10+ public repositories containing college practice assignments, C/C++/Python code, and frontend web pages.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-zinc-300">Public Repos: 10+</span>
                <span className="text-emerald-400">Growing</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 03. TECHNICAL SKILLS</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Programming & Development</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#141416] border border-white/10 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white mb-2">College-Level Basics</h3>
              <p className="text-xs text-zinc-400 mb-4">Learned fundamentals of C, C++, and Python during my engineering coursework.</p>
              <ul className="space-y-2">
                {["C Programming Basics", "C++ & DSA Basics", "Python Fundamentals", "Academic Assignments"].map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white mb-2">AI-Assisted Frontend</h3>
              <p className="text-xs text-zinc-400 mb-4">I build web interfaces and practice pages using AI assistance (~60% frontend accuracy).</p>
              <ul className="space-y-2">
                {["AI-Assisted Development", "HTML / CSS / JS", "React Components (~60%)", "UI Design & Layouts"].map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Github className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white mb-2">Tools & Version Control</h3>
              <p className="text-xs text-zinc-400 mb-4">Managing code and projects with Git and GitHub.</p>
              <ul className="space-y-2">
                {["Git Version Control", "10+ GitHub Repositories", "Code Collaboration", "Project Management"].map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS SECTION (WITH CERTIFICATE IMAGE GALLERY & ADD BUTTON) */}
        <section id="certifications" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 04. CREDENTIALS</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Certifications & Achievements</h2>
            </div>
            <button
              onClick={() => setIsAddCertModalOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs rounded transition flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certificate Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-[#141416] border border-white/10 rounded-xl p-6 flex flex-col justify-between group hover:border-white/30 transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{cert.date}</span>
                  </div>

                  <h3 className="text-lg font-bold font-mono text-white">{cert.title}</h3>
                  <p className="text-xs text-zinc-400">{cert.issuer}</p>

                  {/* Certificate Image Thumbnail / Preview */}
                  {cert.imageUrl ? (
                    <div 
                      onClick={() => setSelectedCertImage(cert.imageUrl || null)}
                      className="mt-4 rounded-lg overflow-hidden border border-white/15 h-36 bg-black cursor-pointer relative group/img"
                    >
                      <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover/img:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-xs font-mono text-white gap-1">
                        <ImageIcon className="w-4 h-4" /> View Full Image
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-lg border border-dashed border-white/15 h-28 bg-black/30 flex flex-col items-center justify-center text-zinc-500 text-xs font-mono gap-1">
                      <ImageIcon className="w-5 h-5 opacity-40" />
                      <span>No certificate image added</span>
                      <button 
                        onClick={() => setIsAddCertModalOpen(true)}
                        className="text-white underline hover:text-zinc-300 text-[10px] mt-1"
                      >
                        Upload / Link Image
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <span>LinkedIn Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {cert.imageUrl && (
                    <button 
                      onClick={() => setSelectedCertImage(cert.imageUrl || null)}
                      className="text-xs font-mono text-white bg-white/10 px-2.5 py-1 rounded hover:bg-white/20 transition"
                    >
                      Preview
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 05. PRACTICE WORK</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Featured Practice Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Portfolio Website",
                desc: "My interactive developer portfolio website built with AI assistance, featuring clean two-column hero layout and dark aesthetic.",
                tech: ["React", "Tailwind CSS", "TypeScript", "AI-Assisted"],
                github: "https://github.com/adithyaashetty2007-a11y",
                live: "#"
              },
              {
                title: "GitHub Repositories (10+)",
                desc: "A collection of 10+ public repositories containing college assignments, C/C++/Python code snippets, and frontend practice work.",
                tech: ["C", "C++", "Python", "HTML/CSS"],
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
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 06. ACADEMIC STATUS</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Education</h2>
          </div>

          <div className="bg-[#141416] border border-white/10 rounded-xl p-8 max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-500">Engineering Undergraduate</span>
                <h3 className="text-xl font-bold font-mono text-white">Completed 2nd Semester</h3>
                <p className="text-zinc-400 text-sm font-sans">
                  Completed 2nd semester of engineering studies, with coursework covering C, C++, and Python programming basics.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span>Student: Adithya A Shetty</span>
                  <span>•</span>
                  <span className="text-emerald-400">Motivated Learner</span>
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
                I am eager to connect with peers, mentors, and developers. Feel free to reach out via phone, LinkedIn, GitHub, or send a direct message below.
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
                    placeholder="e.g. Peer / Mentor / Recruiter"
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
                    placeholder="Write your message here..."
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
              © {new Date().getFullYear()} Adithya A Shetty. Engineering Student (2nd Sem Completed).
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
              <a href="https://www.linkedin.com/in/adithya-a-shetty-421097382" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
              <button onClick={() => scrollToSection("home")} className="hover:text-white transition">Back to Top ↑</button>
            </div>
          </div>
        </footer>
      </main>

      {/* CERTIFICATE IMAGE LIGHTBOX MODAL */}
      {selectedCertImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#141416] border border-white/20 rounded-xl overflow-hidden p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <span className="font-mono text-sm text-white font-bold">Certificate Preview</span>
              <button 
                onClick={() => setSelectedCertImage(null)}
                className="p-2 text-zinc-400 hover:text-white rounded bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center max-h-[75vh] overflow-auto">
              <img src={selectedCertImage} alt="Certificate" className="max-w-full object-contain rounded" />
            </div>
          </div>
        </div>
      )}

      {/* ADD CERTIFICATE MODAL */}
      {isAddCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141416] border border-white/20 rounded-xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-mono text-base font-bold text-white">Add Certificate Image</h3>
              <button onClick={() => setIsAddCertModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCertificate} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  placeholder="e.g. Python Advanced Bootcamp"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Issuer *</label>
                <input
                  type="text"
                  required
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                  placeholder="e.g. Coursera / LinkedIn / College"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Date / Year</label>
                <input
                  type="text"
                  value={newCert.date}
                  onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                  placeholder="e.g. 2026"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Certificate Image URL</label>
                <input
                  type="url"
                  value={newCert.imageUrl}
                  onChange={(e) => setNewCert({ ...newCert, imageUrl: e.target.value })}
                  placeholder="https://example.com/certificate.jpg"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
                <p className="text-[10px] text-zinc-500">Tip: You can upload your certificate image using the chat or paste a direct image URL.</p>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">LinkedIn Credential URL</label>
                <input
                  type="url"
                  value={newCert.credentialUrl}
                  onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddCertModalOpen(false)}
                  className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-white text-black font-bold rounded hover:bg-zinc-200 transition"
                >
                  Add Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
