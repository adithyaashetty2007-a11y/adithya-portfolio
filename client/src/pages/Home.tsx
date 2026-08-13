import React, { useState, useEffect } from "react";
import { 
  Terminal, Github, Linkedin, Phone, Mail, FileText, ExternalLink, 
  Code2, Cpu, Layers, Award, GraduationCap, User, Home as HomeIcon, 
  BookOpen, Briefcase, Radio, Send, CheckCircle2, Sparkles, Command, 
  ChevronRight, Download, Menu, X, ArrowUpRight, ArrowUp, ShieldCheck, TerminalSquare, Plus, Image as ImageIcon, MessageSquare, TrendingUp, Compass
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

interface LinkedInPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  postUrl: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  techStack: string;
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Certificate management state
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "internshala-inamigos",
      title: "AI Web Development Internship Selection",
      issuer: "Internshala & InAmigos Foundation",
      date: "July 07, 2026",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      credentialUrl: "https://internshala.com/verify_certificate"
    }
  ]);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "", imageUrl: "", credentialUrl: "" });

  // LinkedIn Posts state
  const [linkedinPosts, setLinkedinPosts] = useState<LinkedInPost[]>([
    {
      id: "1",
      title: "SGPA Jump to 8.05 in 2nd Semester!",
      summary: "Thrilled to share my academic progress! Improved my SGPA from 7.5 in 1st sem to 8.05 in 2nd sem, alongside solving 20+ LeetCode problems in C++ over the last 2 weeks.",
      date: "August 2026",
      postUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    },
    {
      id: "2",
      title: "Building AI-Assisted Frontend Web Projects",
      summary: "Exploring web development and building interactive projects with AI assistance. Growing my frontend skills every single day.",
      date: "July 2026",
      postUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    }
  ]);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", summary: "", date: "", postUrl: "" });
  
  // Projects showcase state
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProjectImage, setSelectedProjectImage] = useState<string | null>(null);
  const [isAddProjModalOpen, setIsAddProjModalOpen] = useState(false);
  const [newProj, setNewProj] = useState({ title: "", description: "", imageUrl: "", githubUrl: "", techStack: "" });

  // Admin PIN Protection State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [pendingActionType, setPendingActionType] = useState<"cert" | "post" | "proj" | null>(null);

  const [showBackToTop, setShowBackToTop] = useState(false);

  // Intro animation timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll spy & back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sections = ["home", "about", "dsa", "visual-skills", "skills", "certifications", "posts", "projects", "education", "mentor", "contact"];
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
    
    // Escape key listener for lightboxes and modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProjectImage(null);
        setSelectedCertImage(null);
        setIsAddCertModalOpen(false);
        setIsAddPostModalOpen(false);
        setIsAddProjModalOpen(false);
        setIsAdminModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      toast.error("Please enter a valid email address (e.g., name@domain.com).");
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

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.summary) {
      toast.error("Please provide at least a title and summary.");
      return;
    }
    const post: LinkedInPost = {
      id: Date.now().toString(),
      title: newPost.title,
      summary: newPost.summary,
      date: newPost.date || "Recent",
      postUrl: newPost.postUrl || "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    };
    setLinkedinPosts([...linkedinPosts, post]);
    setNewPost({ title: "", summary: "", date: "", postUrl: "" });
    setIsAddPostModalOpen(false);
    toast.success("LinkedIn post added successfully!");
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title || !newProj.description) {
      toast.error("Please provide at least a project title and description.");
      return;
    }
    const proj: ProjectItem = {
      id: Date.now().toString(),
      title: newProj.title,
      description: newProj.description,
      imageUrl: newProj.imageUrl || "",
      githubUrl: newProj.githubUrl || "https://github.com/adithyaashetty2007-a11y",
      techStack: newProj.techStack || "React, TypeScript"
    };
    setProjects([...projects, proj]);
    setNewProj({ title: "", description: "", imageUrl: "", githubUrl: "", techStack: "" });
    setIsAddProjModalOpen(false);
    toast.success("Project added successfully!");
  };

  const handleProtectedAction = (type: "cert" | "post" | "proj") => {
    if (isAdminAuthenticated) {
      if (type === "cert") setIsAddCertModalOpen(true);
      if (type === "post") setIsAddPostModalOpen(true);
      if (type === "proj") setIsAddProjModalOpen(true);
    } else {
      setPendingActionType(type);
      setIsAdminModalOpen(true);
    }
  };

  const verifyAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default secret admin PIN for Adithya is "2026"
    if (adminPinInput === "2026") {
      setIsAdminAuthenticated(true);
      setIsAdminModalOpen(false);
      setAdminPinInput("");
      toast.success("Admin authenticated successfully!");
      if (pendingActionType === "cert") setIsAddCertModalOpen(true);
      if (pendingActionType === "post") setIsAddPostModalOpen(true);
      if (pendingActionType === "proj") setIsAddProjModalOpen(true);
      setPendingActionType(null);
    } else {
      toast.error("Incorrect admin PIN. Access denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans relative selection:bg-white/20 selection:text-white">
      {/* INTRO CURSIVE SIGNATURE OVERLAY */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-700">
          <div className="text-center space-y-4 px-4">
            <h1 className="font-cursive text-6xl sm:text-8xl text-white tracking-wide animate-pulse drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              Adithya A Shetty
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 animate-fade-in">
              Initializing Developer Portfolio...
            </p>
          </div>
        </div>
      )}

      {/* CRT Scanline & Grid Background Textures */}
      <div className="fixed inset-0 crt-scanlines z-40 pointer-events-none opacity-50"></div>
      <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none opacity-70"></div>

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
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
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "dsa", label: "DSA" },
              { id: "visual-skills", label: "Visual Skills" },
              { id: "certifications", label: "Certifications" },
              { id: "posts", label: "LinkedIn Posts" },
              { id: "projects", label: "Projects" },
              { id: "education", label: "Education" },
              { id: "mentor", label: "Mentor" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all ${
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
              { id: "visual-skills", label: "Visual Skills" },
              { id: "certifications", label: "Certifications" },
              { id: "posts", label: "LinkedIn Posts" },
              { id: "projects", label: "Projects" },
              { id: "education", label: "Education" },
              { id: "mentor", label: "Mentor" },
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

      {/* Fixed Left Vertical Dock */}
      <aside className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-20 flex-col items-center py-6 px-3 bg-[#141416]/80 backdrop-blur-md border-r border-y border-white/10 rounded-r-xl space-y-6 shadow-2xl">
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
          onClick={() => scrollToSection("visual-skills")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Visual Skills"
        >
          <Code2 className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Visual Skills
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("certifications")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Certifications & Gallery"
        >
          <Award className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Certifications Gallery
          </span>
        </button>
        <button 
          onClick={() => scrollToSection("mentor")} 
          className="p-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition group relative"
          title="Career Mentor"
        >
          <Compass className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2 py-1 bg-zinc-900 border border-white/20 text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
            Career Mentor
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-xs font-mono text-[#ccff00]">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                SGPA Improved: 7.5 (Sem 1) → 8.05 (Sem 2)
              </div>

              <div className="space-y-2">
                <p className="text-zinc-400 font-mono text-sm sm:text-base">Hello, I'm</p>
                <h1 className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-white">
                  Adithya A Shetty<span className="text-zinc-500">.</span>
                </h1>
              </div>

              <div className="space-y-4 text-zinc-300 text-base sm:text-lg font-sans leading-relaxed max-w-2xl">
                <p>
                  I'm a Computer Science Engineering student at St. Joseph Engineering College, Mangaluru, currently in my 2nd Semester. I enjoy turning ideas into practical software solutions and continuously improving my technical skills.
                </p>
                <p>
                  I'm currently exploring Python, Web Development, Artificial Intelligence, and Data Structures & Algorithms (DSA) while building projects that strengthen my understanding of software development.
                </p>
                
                <div className="pt-2 space-y-2">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-white font-bold">// What I Enjoy</h3>
                  <ul className="space-y-1.5 text-sm font-sans text-zinc-300">
                    <li className="flex items-center gap-2"><span>💻</span> Building responsive and modern web applications.</li>
                    <li className="flex items-center gap-2"><span>🤖</span> Exploring Artificial Intelligence and Computer Vision projects.</li>
                    <li className="flex items-center gap-2"><span>🚀</span> Solving programming challenges and learning new technologies.</li>
                    <li className="flex items-center gap-2"><span>🌱</span> Continuously improving through real-world projects, workshops, and hackathons.</li>
                    <li className="flex items-center gap-2"><span>🤝</span> Open to internships, collaborations, and networking opportunities.</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#resume-download"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const { jsPDF } = await import("jspdf");
                      const doc = new jsPDF({ unit: "mm", format: "a4" });
                      
                      // Page margins & dimensions
                      const margin = 15;
                      const pageWidth = 210;
                      const contentWidth = pageWidth - (margin * 2);
                      let y = 20;

                      // Header Name
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(22);
                      doc.setTextColor(20, 20, 20);
                      doc.text("ADITHYA A SHETTY", margin, y);
                      y += 7;

                      // Subtitle
                      doc.setFont("Helvetica", "normal");
                      doc.setFontSize(10);
                      doc.setTextColor(80, 80, 80);
                      doc.text("Software Engineer & Frontend Developer  |  Mangalore, India", margin, y);
                      y += 5;
                      doc.text("Phone: 8088814686  |  GitHub: github.com/adithyaashetty2007-a11y", margin, y);
                      y += 5;
                      doc.text("LinkedIn: linkedin.com/in/adithya-a-shetty-421097382", margin, y);
                      y += 8;

                      // Divider Line
                      doc.setDrawColor(200, 200, 200);
                      doc.setLineWidth(0.5);
                      doc.line(margin, y, pageWidth - margin, y);
                      y += 8;

                      // Section Title Helper
                      const addSectionTitle = (title: string) => {
                        if (y > 270) { doc.addPage(); y = 20; }
                        doc.setFont("Helvetica", "bold");
                        doc.setFontSize(12);
                        doc.setTextColor(20, 20, 20);
                        doc.text(title.toUpperCase(), margin, y);
                        y += 3;
                        doc.setDrawColor(50, 50, 50);
                        doc.setLineWidth(0.3);
                        doc.line(margin, y, pageWidth - margin, y);
                        y += 6;
                      };

                      // SUMMARY
                      addSectionTitle("Professional Summary");
                      doc.setFont("Helvetica", "normal");
                      doc.setFontSize(10);
                      doc.setTextColor(50, 50, 50);
                      const summaryText = "Second-semester engineering student with consistent academic growth (SGPA: 8.05, up from 7.5 in Sem 1). Building robust frontend web applications with AI assistance (~60% accuracy). Solid college-level basics in C, C++, and Python, with an active C++ Data Structures & Algorithms problem-solving streak (20+ LeetCode problems solved).";
                      const splitSummary = doc.splitTextToSize(summaryText, contentWidth);
                      doc.text(splitSummary, margin, y);
                      y += (splitSummary.length * 5) + 6;

                      // EDUCATION
                      addSectionTitle("Education");
                      doc.setFont("Helvetica", "bold");
                      doc.setFontSize(10);
                      doc.setTextColor(30, 30, 30);
                      doc.text("Bachelor of Engineering (B.E.) - 2nd Semester Completed", margin, y);
                      y += 5;
                      doc.setFont("Helvetica", "normal");
                      doc.setTextColor(50, 50, 50);
                      doc.text("- Semester 2 SGPA: 8.05 (Significant Improvement from 7.5 in Sem 1)", margin, y);
                      y += 5;
                      doc.text("- Core Coursework: C Programming, C++ & Data Structures, Python Fundamentals, Mathematics.", margin, y);
                      y += 8;

                      // SKILLS
                      addSectionTitle("Skills & Proficiencies");
                      doc.setFont("Helvetica", "normal");
                      doc.text("- Programming Languages: C (College Basics), C++ (DSA Active), Python (College Basics)", margin, y);
                      y += 5;
                      doc.text("- Frontend Development: AI-Assisted UI/UX Construction, React, Tailwind CSS, HTML5, CSS3", margin, y);
                      y += 5;
                      doc.text("- Tools & Environment: Git, GitHub (10+ Repositories), VS Code, Terminal", margin, y);
                      y += 5;
                      doc.text("- Problem Solving & DSA: 20+ LeetCode Problems Solved in C++ (2 Weeks Active)", margin, y);
                      y += 5;
                      doc.text("- Verified Badges: Google Cloud Skills Boost Badge (ID: 26703417)", margin, y);
                      doc.setTextColor(0, 102, 204);
                      doc.text("https://www.skills.google/public_profiles/da312414-e867-4b0d-b22f-3c22a89c9c40/badges/26703417", margin, y + 4);
                      doc.setTextColor(50, 50, 50);
                      y += 12;

                      // CERTIFICATIONS & EXPERIENCE
                      addSectionTitle("Certifications & Internships");
                      doc.setFont("Helvetica", "bold");
                      doc.text("AI Web Development Internship Selection", margin, y);
                      doc.setFont("Helvetica", "normal");
                      doc.text("Internshala & InAmigos Foundation (July 2026)", margin + 60, y);
                      y += 5;
                      doc.text("Secured AI Web Development internship focused on AI-assisted web development, rapid prototyping, debugging, and modern AI coding tools.", margin, y);
                      y += 8;

                      // PROJECTS
                      addSectionTitle("Projects & Repositories (10+ GitHub Repos)");
                      doc.setFont("Helvetica", "bold");
                      doc.text("1. Retro-Terminal Portfolio Web App", margin, y);
                      y += 5;
                      doc.setFont("Helvetica", "normal");
                      doc.text("Dark obsidian retro-terminal portfolio featuring interactive modals, dynamic certificate galleries, project screenshot showcases, and smooth navigation. (Tech: React, TypeScript, Tailwind)", margin, y);
                      y += 7;
                      doc.setFont("Helvetica", "bold");
                      doc.text("2. C++ Algorithm Practice & DSA Tracker", margin, y);
                      y += 5;
                      doc.setFont("Helvetica", "normal");
                      doc.text("Daily algorithmic problem-solving repository covering arrays, strings, searching, and sorting algorithms in C++.", margin, y);
                      y += 8;

                      // MENTORSHIP
                      addSectionTitle("Mentorship & Guidance");
                      doc.setFont("Helvetica", "normal");
                      doc.text("Guided by professional mentors and college guides including Raghavendra Sooda,", margin, y);
                      y += 5;
                      doc.text("shaping career goals and engineering standards.", margin, y);

                      // Save PDF
                      doc.save("Adithya_A_Shetty_Resume.pdf");
                      toast.success("Professional PDF Resume downloaded successfully!");
                    } catch (err) {
                      console.error(err);
                      toast.error("Failed to generate PDF. Please try again.");
                    }
                  }}
                  className="px-6 py-3 bg-[#ccff00] text-black font-mono font-bold text-xs sm:text-sm rounded hover:bg-[#b8ff00] transition flex items-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)] cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD RESUME (PDF)
                </a>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-black/60 border border-[#ccff00]/40 text-[#ccff00] font-mono font-bold text-xs sm:text-sm rounded hover:bg-[#ccff00]/10 transition flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#ccff00] font-bold">8.05 SGPA</span> (Sem 2)
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">20+</span> LeetCode Solved
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">10+</span> GitHub Repos
                </div>
              </div>
            </div>

            {/* Right Column: Profile Photo with White Edge Light standalone */}
            <div className="lg:col-span-5 flex justify-center relative items-center py-6">
              <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[410px] lg:h-[410px] rounded-full overflow-hidden border-2 border-white bg-[#141416] relative shadow-[0_0_40px_rgba(255,255,255,0.4)] ring-4 ring-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
                  }}
                  alt="Adithya A Shetty" 
                  className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 01. BACKGROUND & GROWTH</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">About Adithya</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-sans text-base sm:text-lg">
              <p>
                Hello! I am <strong className="text-white font-semibold">Adithya A Shetty</strong>. I have successfully completed my second semester of engineering, showing consistent academic improvement with an <strong className="text-emerald-400 font-semibold">8.05 SGPA in Sem 2</strong> (up from <strong className="text-white">7.5 SGPA in Sem 1</strong>).
              </p>
              <p>
                I am building my foundation in programming with college-level basics in C, C++, and Python. I started practicing Data Structures and Algorithms (DSA) in C++ 2 weeks ago, and I have already solved 20+ problems on LeetCode.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-[#141416] border border-white/10">
                  <h4 className="text-white font-mono text-sm font-bold mb-1">Academic Growth</h4>
                  <p className="text-xs text-zinc-400">Sem 1: 7.5 SGPA → Sem 2: 8.05 SGPA (Consistent improvement).</p>
                </div>
                <div className="p-4 rounded-lg bg-[#141416] border border-white/10">
                  <h4 className="text-white font-mono text-sm font-bold mb-1">DSA in C++ (2 Weeks)</h4>
                  <p className="text-xs text-zinc-400">Started DSA 2 weeks ago in C++, with 20+ LeetCode problems solved so far.</p>
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
                  <span className="text-zinc-500">Sem 2 SGPA:</span>
                  <span className="text-emerald-400 font-bold">8.05 (Improved)</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-zinc-500">Sem 1 SGPA:</span>
                  <span className="text-white">7.5</span>
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
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">DSA Journey (2 Weeks In)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="text-zinc-500 font-mono text-xs uppercase mb-2">LeetCode Progress</div>
              <div className="text-3xl font-bold font-mono text-white mb-1">20+ Solved</div>
              <p className="text-xs text-zinc-400">Started practicing Data Structures and Algorithms in C++ 2 weeks ago. Solving problems daily to build solid fundamentals.</p>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs font-mono">
                <span className="text-emerald-400">Language: C++</span>
                <span className="text-zinc-300">Active Streak</span>
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

        {/* VISUAL SKILLS SECTION */}
        <section id="visual-skills" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 03. VISUAL SKILLS & PROFICIENCY</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Language & Academic Metrics</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6 bg-[#141416] border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              <h3 className="font-mono text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                Programming Languages
              </h3>

              <div className="space-y-5 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold">C Programming (College Basics)</span>
                    <span className="text-zinc-400">75%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-white rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold">C++ & DSA (2 Weeks Active)</span>
                    <span className="text-zinc-400">65%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold">Python (College Basics)</span>
                    <span className="text-zinc-400">70%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold">Frontend / Web Dev (AI-Assisted)</span>
                    <span className="text-zinc-400">60%</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 bg-[#141416] border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
              <h3 className="font-mono text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Academic & Problem Solving Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-zinc-500 font-mono text-xs uppercase block mb-1">Sem 2 SGPA</span>
                  <span className="text-3xl font-bold font-mono text-emerald-400">8.05</span>
                  <span className="text-[10px] font-mono text-zinc-400 block mt-1">Up from 7.5 in Sem 1</span>
                </div>

                <div className="p-5 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-zinc-500 font-mono text-xs uppercase block mb-1">LeetCode Solved</span>
                  <span className="text-3xl font-bold font-mono text-white">20+</span>
                  <span className="text-[10px] font-mono text-emerald-400 block mt-1">Started 2 weeks ago</span>
                </div>

                <div className="p-5 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-zinc-500 font-mono text-xs uppercase block mb-1">GitHub Repos</span>
                  <span className="text-3xl font-bold font-mono text-white">10+</span>
                  <span className="text-[10px] font-mono text-blue-400 block mt-1">Active commits</span>
                </div>

                <div className="p-5 bg-black/50 border border-white/10 rounded-xl text-center">
                  <span className="text-zinc-500 font-mono text-xs uppercase block mb-1">Builder Mode</span>
                  <span className="text-xl font-bold font-mono text-white">AI-Assisted</span>
                  <span className="text-[10px] font-mono text-purple-400 block mt-1">~60% Frontend Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 04. TECHNICAL SKILLS</span>
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

        {/* CERTIFICATIONS & DEDICATED CERTIFICATE IMAGE GALLERY SECTION */}
        <section id="certifications" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 05. CREDENTIALS & GALLERY</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Certifications & Image Gallery</h2>
            </div>
            <button
              onClick={() => {
                setIsAdminAuthenticated(true);
                setIsAddCertModalOpen(true);
              }}
              className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded hover:bg-zinc-200 transition flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Certificate Image</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-[#141416] border border-white/10 rounded-xl p-6 flex flex-col justify-between group glow-card">
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

          {/* Dedicated Certificate Image Gallery Grid */}
          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-mono text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-zinc-400" />
                  Certificate Image Showcase Gallery
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-1">All uploaded and verified certificates displayed in high-resolution grid.</p>
              </div>
              <button
                onClick={() => setIsAddCertModalOpen(true)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs rounded transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.filter(c => c.imageUrl).length > 0 ? (
                certificates.filter(c => c.imageUrl).map((cert) => (
                  <div 
                    key={cert.id + "-gallery"} 
                    onClick={() => setSelectedCertImage(cert.imageUrl || null)}
                    className="group relative rounded-xl overflow-hidden border border-white/15 bg-black h-48 cursor-pointer shadow-lg"
                  >
                    <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">{cert.issuer}</span>
                      <h4 className="text-sm font-bold font-mono text-white truncate">{cert.title}</h4>
                      <span className="text-[10px] font-mono text-zinc-400 mt-1 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" /> Click to expand image
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center border border-dashed border-white/15 rounded-xl bg-black/20 space-y-3">
                  <ImageIcon className="w-10 h-10 mx-auto text-zinc-600" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono text-zinc-300">No certificate images uploaded yet</p>
                    <p className="text-xs text-zinc-500 font-mono">Click the button above to add your first certificate image URL or upload.</p>
                  </div>
                  <button
                    onClick={() => setIsAddCertModalOpen(true)}
                    className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded hover:bg-zinc-200 transition inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Upload Certificate Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PROJECTS & SCREENSHOTS SHOWCASE SECTION */}
        <section id="projects" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 06. PORTFOLIO PROJECTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Projects & Screenshots Showcase</h2>
            </div>
            <button
              onClick={() => handleProtectedAction("proj")}
              className="px-4 py-2 bg-white text-black font-mono text-xs font-bold rounded hover:bg-zinc-200 transition flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project Screenshot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* FEATURED PROJECT 1: YOLOv8n Traffic Density Estimation */}
            <div className="bg-[#141416] border border-[#ccff00]/30 rounded-2xl overflow-hidden flex flex-col justify-between group glow-card">
              <div className="space-y-4">
                <div className="h-56 bg-black/60 overflow-hidden relative border-b border-white/10 flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/10 via-transparent to-transparent"></div>
                  <div className="space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-xs font-mono text-[#ccff00]">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                      Computer Vision & AI
                    </div>
                    <h3 className="text-lg font-bold font-mono text-white">YOLOv8n Traffic Density Estimation</h3>
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#ccff00] px-2.5 py-1 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full">YOLOv8n / Python / OpenCV</span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white">Traffic Density Estimation Project</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    Engineered an intelligent computer vision system utilizing YOLOv8n object detection to analyze real-time video feeds, detect vehicles, and dynamically calculate traffic density for smart city traffic management.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                <span className="text-xs font-mono text-zinc-500">AI & Deep Learning</span>
                <a
                  href="https://github.com/adithyaashetty2007-a11y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* FEATURED 'LEVEL UP: GAMIFIED LEARNING' POSTER CARD */}
            <div className="bg-[#141416] border border-cyan-500/30 rounded-2xl overflow-hidden flex flex-col justify-between group glow-card">
              <div className="space-y-4">
                <div 
                  onClick={() => setSelectedProjectImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")}
                  className="h-64 bg-black overflow-hidden relative cursor-pointer border-b border-white/10 group/img"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" 
                    alt="Level Up: Gamified Learning Poster" 
                    className="w-full h-full object-cover group-hover/img:scale-105 transition duration-500" 
                  />
                  <div className="absolute top-3 right-3 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono px-2.5 py-1 rounded-full backdrop-blur-md">
                    Featured Poster
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-xs font-mono text-cyan-300 gap-2">
                    <ImageIcon className="w-5 h-5" /> Click to View Full Screen Lightbox
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">3D Isometric Design</span>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white">Level Up: Gamified Learning</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                    A vibrant 3D isometric poster featuring a glowing neon video game controller transforming into an open magical book with floating educational symbols and claymation render style.
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                <span className="text-xs font-mono text-zinc-500">High-Res Render</span>
                <button
                  onClick={() => setSelectedProjectImage("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80")}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded transition border border-cyan-500/30"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>View Lightbox</span>
                </button>
              </div>
            </div>

            {projects.length > 0 ? (
              projects.map((proj) => (
                <div key={proj.id} className="bg-[#141416] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group glow-card">
                  <div className="space-y-4">
                    {/* Project Screenshot Thumbnail */}
                    {proj.imageUrl ? (
                      <div 
                        onClick={() => setSelectedProjectImage(proj.imageUrl)}
                        className="h-56 bg-black overflow-hidden relative cursor-pointer border-b border-white/10 group/img"
                      >
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover/img:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-xs font-mono text-white gap-1.5">
                          <ImageIcon className="w-4 h-4" /> View Full Screenshot
                        </div>
                      </div>
                    ) : (
                      <div className="h-44 bg-black/40 border-b border-white/10 flex flex-col items-center justify-center text-zinc-500 text-xs font-mono gap-2 p-4 text-center">
                        <Code2 className="w-8 h-8 opacity-40 text-emerald-400" />
                        <span>No project screenshot uploaded</span>
                        <button
                          onClick={() => setIsAddProjModalOpen(true)}
                          className="text-white underline hover:text-zinc-300 text-[11px]"
                        >
                          Upload Screenshot Image
                        </button>
                      </div>
                    )}

                    <div className="p-6 pt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">{proj.techStack}</span>
                      </div>
                      <h3 className="text-xl font-bold font-mono text-white">{proj.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-mono">{proj.description}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition border border-white/10"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                    {proj.imageUrl && (
                      <button
                        onClick={() => setSelectedProjectImage(proj.imageUrl)}
                        className="text-xs font-mono text-zinc-400 hover:text-white"
                      >
                        Preview Image
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center border border-dashed border-white/15 rounded-2xl bg-black/30 space-y-4">
                <Code2 className="w-12 h-12 mx-auto text-emerald-400 opacity-60" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-mono text-white">No Projects Added Yet</h3>
                  <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">Upload screenshots, add titles, descriptions, and GitHub links for your 10+ repositories.</p>
                </div>
                <button
                  onClick={() => setIsAddProjModalOpen(true)}
                  className="px-4 py-2.5 bg-white text-black font-mono text-xs font-bold rounded hover:bg-zinc-200 transition inline-flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" /> Add Your First Project
                </button>
              </div>
            )}
          </div>
        </section>

        {/* LINKEDIN POSTS SECTION */}
        <section id="posts" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 06. SOCIAL FEED & INSIGHTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">LinkedIn Posts & Articles</h2>
            </div>
            <button
              onClick={() => handleProtectedAction("post")}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs rounded transition flex items-center gap-2 w-fit"
            >
              <Plus className="w-4 h-4" />
              <span>Add LinkedIn Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {linkedinPosts.map((post) => (
              <div key={post.id} className="bg-[#141416] border border-white/10 rounded-xl p-6 flex flex-col justify-between group hover:border-white/30 transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn Update</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{post.date}</span>
                  </div>

                  <h3 className="text-lg font-bold font-mono text-white">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">{post.summary}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between">
                  <a 
                    href={post.postUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition flex items-center gap-1.5"
                  >
                    <span>View on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] font-mono text-zinc-500">Adithya A Shetty</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 07. PRACTICE WORK</span>
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

        {/* EDUCATION & JOURNEY TIMELINE SECTION */}
        <section id="education" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ccff00] uppercase tracking-widest">// 08. EXPERIENCE & ACADEMIC JOURNEY</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Where I've Been & Academic Growth</h2>
            <p className="text-sm font-mono text-zinc-400">Consistent upward trajectory in engineering and problem solving.</p>
          </div>

          <div className="relative border-l-2 border-[#ccff00]/40 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
            {/* Timeline Item 6: Cisco NetAcad Python Essentials 1 */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] group-hover:scale-125 transition"></div>
              
              <div className="bg-[#141416] border border-[#ccff00]/30 rounded-xl p-6 sm:p-8 space-y-4 glow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
                    Course Completion // [python]
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Cisco Networking Academy</span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white">Python Essentials 1 (PE1)</h3>
                <p className="text-xs font-mono text-[#ccff00]">CISCO NETWORKING ACADEMY (30 Hours | 30 Labs)</p>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Learned fundamental concepts of computer programming, syntax, and data structures with Python. Note: Course completed, paid certification exam not taken.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Programming Basics", "Procedural Programming", "30 Labs"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-zinc-400 italic">Course Final Exam Completed</span>
                </div>
              </div>
            </div>

            {/* Timeline Item 5: AI for Techies */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] group-hover:scale-125 transition"></div>
              
              <div className="bg-[#141416] border border-[#ccff00]/30 rounded-xl p-6 sm:p-8 space-y-4 glow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
                    Professional Milestone // [artificial-intelligence]
                  </span>
                  <span className="text-xs font-mono text-zinc-400">LinkedIn Milestones</span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white">AI for Techies Certification & Workshop</h3>
                <p className="text-xs font-mono text-[#ccff00]">PROFESSIONAL DEVELOPMENT</p>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Engaged in specialized training on "AI for Techies", focusing on practical applications of machine learning, modern AI workflows, and software development integrations.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["Artificial Intelligence", "Techies", "AI Workflows"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://www.linkedin.com/posts/adithya-a-shetty-421097382_ai-for-techies-activity-7385958617696620544-FPR6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1.5"
                  >
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Timeline Item 4: Prompt Engineering & AI Workshop (The Agent Blazer Club SJEC) */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] group-hover:scale-125 transition"></div>
              
              <div className="bg-[#141416] border border-[#ccff00]/30 rounded-xl p-6 sm:p-8 space-y-4 glow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
                    Workshop & Activity // [ai-ml]
                  </span>
                  <span className="text-xs font-mono text-zinc-400">The Agent Blazer Club SJEC</span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white">Prompt Engineering & Generative AI Workshop</h3>
                <p className="text-xs font-mono text-[#ccff00]">ST. JOSEPH ENGINEERING COLLEGE</p>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Participated in the Agent Blazer Club SJEC workshop exploring prompt engineering, generative AI tools, and AI ecosystem fundamentals.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["Prompt Engineering", "Generative AI", "AI Ecosystem"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://www.linkedin.com/posts/theagentblazerclubsjec_promptengineering-ai-generativeai-activity-7443638504024268800-BCPn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1.5"
                  >
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Timeline Item 3: CS50 Web Programming Certification */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] group-hover:scale-125 transition"></div>
              
              <div className="bg-[#141416] border border-[#ccff00]/30 rounded-xl p-6 sm:p-8 space-y-4 glow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
                    Certification Milestone // [web-dev]
                  </span>
                  <span className="text-xs font-mono text-zinc-400">Harvard CS50W</span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white">CS50's Web Programming with Python and JavaScript</h3>
                <p className="text-xs font-mono text-[#ccff00]">ONLINE CERTIFICATION</p>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Completed rigorous coursework in web programming covering Python, JavaScript, Django, and modern frontend-backend integration concepts.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "Django", "Web Dev"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://www.linkedin.com/posts/adithya-a-shetty-421097382_cs50s-web-programming-with-python-and-javascript-activity-7430943036278439936-2q8h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1.5"
                  >
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Timeline Item: 2nd Year BE in CSE */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] group-hover:scale-125 transition"></div>
              
              <div className="bg-[#141416] border border-[#ccff00]/30 rounded-xl p-6 sm:p-8 space-y-4 glow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
                    2nd Year BE in CSE // [current]
                  </span>
                  <span className="text-xs font-mono text-zinc-400">St. Joseph Engineering College</span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white">Computer Science Engineering</h3>
                <p className="text-xs font-mono text-[#ccff00]">SJEC, MANGALURU</p>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Currently pursuing 2nd year BE in Computer Science Engineering at St. Joseph Engineering College. Actively learning Data Structures & Algorithms in C++, mastering AI vibecoding (Lovable, Cursor, Manus) and 10+ modern tech stacks, building responsive web development projects, and solving LeetCode problems (around 15+ and moving ahead).
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {["DSA in C++", "AI Vibecoding (Lovable, Cursor, Manus)", "Web Development", "LeetCode (15+ & Moving Ahead)"].map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Item: Internshala AI Web Development Internship */}
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] group-hover:scale-125 transition"></div>
              
              <div className="bg-[#141416] border border-[#ccff00]/30 rounded-xl p-6 sm:p-8 space-y-4 glow-card">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#ccff00] px-3 py-1 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
                    Internship Selection // [experience]
                  </span>
                  <span className="text-xs font-mono text-zinc-400">July 07, 2026</span>
                </div>

                <h3 className="text-2xl font-bold font-mono text-white">AI Web Development Internship</h3>
                <p className="text-xs font-mono text-[#ccff00]">INTERNSHALA & INAMIGOS FOUNDATION</p>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Contributed to a practical AI Web Development program through Internshala in collaboration with InAmigos Foundation. Focused on AI-assisted web development, rapid prototyping, debugging, and modern AI coding tools.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["AI Web Dev", "InAmigos Foundation", "Internshala", "Rapid Prototyping"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/40 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://internshala.com/verify_certificate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ccff00] hover:underline flex items-center gap-1.5"
                  >
                    <span>Verify Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MENTOR & CAREER GUIDE SECTION */}
        <section id="mentor" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 09. MENTORSHIP & GUIDANCE</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Career Mentor & Guide</h2>
          </div>

          <div className="bg-[#141416] border border-white/20 rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-xs font-mono text-zinc-300">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  Guiding Light & Career Direction
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white">Raghavendra Sooda</h3>
                <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
                  Mentors including college mentors and guides who show the right path to achieve my career goals and engineering milestones. Their invaluable guidance inspires my academic growth, C++ problem-solving, and continuous learning journey.
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <a 
                  href="https://www.linkedin.com/in/raghavendra-sooda-808bab239/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-white text-black font-mono font-bold text-xs sm:text-sm rounded hover:bg-zinc-200 transition flex items-center gap-2 shadow-xl w-full sm:w-auto justify-center"
                >
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <span>Connect with Raghavendra Sooda</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 10. TRANSMIT MESSAGE</span>
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

                <div 
                  onClick={() => {
                    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=adithyaashetty2007@gmail.com", "_blank");
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#141416] border border-white/10 group hover:border-white/30 transition cursor-pointer"
                  title="Click to open Gmail compose"
                >
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-500">Email Address (Click to Open Gmail)</div>
                    <a 
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=adithyaashetty2007@gmail.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()} 
                      className="text-white hover:underline font-bold text-xs block mt-0.5 truncate"
                    >
                      adithyaashetty2007@gmail.com
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

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Connect Directly:</span>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.linkedin.com/in/adithya-a-shetty-421097382"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center gap-1.5 transition"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/adithyaashetty2007-a11y"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center gap-1.5 transition"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4 text-emerald-400" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-4 sm:px-8 border-t border-white/10 text-center text-xs font-mono text-zinc-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} Adithya A Shetty. Engineering Student (Sem 2 SGPA: 8.05).
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
        <div 
          onClick={() => setSelectedCertImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#141416] border border-white/20 rounded-xl overflow-hidden p-4 shadow-2xl"
          >
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
              <h3 className="font-mono text-base font-bold text-white">Upload Certificate Image</h3>
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
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LINKEDIN POST MODAL */}
      {isAddPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141416] border border-white/20 rounded-xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-mono text-base font-bold text-white">Add LinkedIn Post</h3>
              <button onClick={() => setIsAddPostModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Post Title / Heading *</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="e.g. Sem 2 SGPA Jump to 8.05!"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Post Summary / Content *</label>
                <textarea
                  rows={3}
                  required
                  value={newPost.summary}
                  onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
                  placeholder="Write a brief summary of your LinkedIn post..."
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Date</label>
                <input
                  type="text"
                  value={newPost.date}
                  onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                  placeholder="e.g. August 2026"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">LinkedIn Post URL</label>
                <input
                  type="url"
                  value={newPost.postUrl}
                  onChange={(e) => setNewPost({ ...newPost, postUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/feed/update/..."
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddPostModalOpen(false)}
                  className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-white text-black font-bold rounded hover:bg-zinc-200 transition"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {isAddProjModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141416] border border-white/20 rounded-xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-mono text-base font-bold text-white">Add Project Screenshot</h3>
              <button onClick={() => setIsAddProjModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProj.title}
                  onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                  placeholder="e.g. Retro Portfolio Web App"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newProj.description}
                  onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                  placeholder="Describe your project, features, and tech..."
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Tech Stack Badge</label>
                <input
                  type="text"
                  value={newProj.techStack}
                  onChange={(e) => setNewProj({ ...newProj, techStack: e.target.value })}
                  placeholder="e.g. React, TypeScript, Tailwind"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Screenshot Image URL</label>
                <input
                  type="url"
                  value={newProj.imageUrl}
                  onChange={(e) => setNewProj({ ...newProj, imageUrl: e.target.value })}
                  placeholder="https://example.com/screenshot.jpg"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">GitHub Repository URL</label>
                <input
                  type="url"
                  value={newProj.githubUrl}
                  onChange={(e) => setNewProj({ ...newProj, githubUrl: e.target.value })}
                  placeholder="https://github.com/adithyaashetty2007-a11y/..."
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddProjModalOpen(false)}
                  className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-white text-black font-bold rounded hover:bg-zinc-200 transition"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT IMAGE LIGHTBOX MODAL */}
      {selectedProjectImage && (
        <div 
          onClick={() => setSelectedProjectImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#141416] border border-white/20 rounded-2xl overflow-hidden p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="font-mono text-xs text-zinc-400">// Project Screenshot Preview</span>
              <button 
                onClick={() => setSelectedProjectImage(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto flex items-center justify-center bg-black rounded-xl p-2 border border-white/10">
              <img src={selectedProjectImage} alt="Project Preview" className="max-w-full max-h-[75vh] object-contain rounded" />
            </div>
          </div>
        </div>
      )}

      {/* ADMIN PIN AUTHENTICATION MODAL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-[#141416] border border-white/20 rounded-xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-mono text-sm font-bold text-white">🔒 Admin Authentication</h3>
              <button onClick={() => setIsAdminModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={verifyAdminPin} className="space-y-4 font-mono text-xs">
              <p className="text-zinc-400 text-xs">
                Enter your secure admin passcode to unlock certificate, post, and project uploads.
              </p>

              <div className="space-y-1">
                <label className="text-zinc-400 uppercase">Admin Passcode (PIN)</label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="Enter passcode (default: 2026)"
                  className="w-full bg-black/50 border border-white/15 rounded px-3 py-2 text-white outline-none focus:border-white tracking-widest text-center text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="w-1/2 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded border border-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-white text-black font-bold rounded hover:bg-zinc-200 transition"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection("home")}
          className="fixed bottom-6 right-6 z-50 p-3 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
