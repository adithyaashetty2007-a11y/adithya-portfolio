import React, { useState, useEffect, useRef } from "react";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = Math.random() > 0.85 ? '#ffffff' : '#ffffff';
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-30 z-0" 
    />
  );
};
import { 
  Terminal, Github, Linkedin, Phone, Mail, FileText, ExternalLink, 
  Code2, Cpu, Layers, Award, GraduationCap, User, Home as HomeIcon, 
  BookOpen, Briefcase, Radio, Send, CheckCircle2, Sparkles, Command, 
  ChevronRight, Download, Menu, X, ArrowUpRight, ArrowUp, ShieldCheck, TerminalSquare, Plus, Image as ImageIcon, MessageSquare, TrendingUp, Compass, RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { 
  PROFILE_PHOTO_BASE64, INTERNSHALA_CERT_BASE64, CS50W_CERT_BASE64, VIBEATHON_CERT_BASE64,
  SCEPTIX_ARG_CERT_BASE64, PROMPTOPS_CERT_BASE64, WORKSHOP_PHOTO_BASE64, TRAFFIC_SCREENSHOT_BASE64,
  OUTSKILL_CERT_BASE64, BE10X_CERT_BASE64 
} from "@/lib/assets";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  credentialUrl?: string;
  description?: string;
}

interface LinkedInPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  postUrl: string;
  imageUrl?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  techStack: string;
}

function TerminalTypingText({ text, speed = 12, delay = 0, resetKey = 0 }: { text: string; speed?: number; delay?: number; resetKey?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    setStarted(false);
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [delay, resetKey]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, started, resetKey]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block w-2 h-4 bg-[#ffffff] ml-1 animate-pulse align-middle"></span>}
    </span>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [isCopiedPhone, setIsCopiedPhone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typingKey, setTypingKey] = useState(0);
  const [activeShellTab, setActiveShellTab] = useState(0);

  // Typewriter placeholder for contact form
  const [namePlaceholder, setNamePlaceholder] = useState("e.g. Peer / Mentor");
  const [visitorCount, setVisitorCount] = useState(1482);

  useEffect(() => {
    const namePrompts = ["e.g. Peer / Mentor", "e.g. Recruiter", "e.g. Tech Lead", "e.g. Fellow Developer"];
    let nameIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const typeName = () => {
      const current = namePrompts[nameIdx];
      if (isDeleting) {
        setNamePlaceholder(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setNamePlaceholder(current.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIdx === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        nameIdx = (nameIdx + 1) % namePrompts.length;
        speed = 400;
      }
      timer = setTimeout(typeName, speed);
    };

    timer = setTimeout(typeName, 1000);

    // Welcome toast for incoming recruiters & visitor counter increment
    const welcomeTimer = setTimeout(() => {
      const stored = localStorage.getItem("adithya_visitor_count");
      const currentCount = stored ? parseInt(stored, 10) + 1 : 1483;
      setVisitorCount(currentCount);
      localStorage.setItem("adithya_visitor_count", currentCount.toString());

      toast("⚡ Welcome, Recruiter / Visitor!", {
        description: `You are visitor #${currentCount}. Explore Adithya's portfolio & projects.`,
        duration: 5000,
      });
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);
  
  // Certificate management state
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "internshala-inamigos",
      title: "AI Web Development Internship Selection",
      issuer: "Internshala & InAmigos Foundation",
      date: "July 07, 2026",
      imageUrl: INTERNSHALA_CERT_BASE64,
      credentialUrl: "https://internshala.com/verify_certificate"
    },
    {
      id: "cs50w-harvard",
      title: "CS50's Web Programming with Python and JavaScript",
      issuer: "HarvardX (Harvard University)",
      date: "Verified Certificate",
      imageUrl: CS50W_CERT_BASE64,
      credentialUrl: "https://cs50.edx.org/web"
    },
    {
      id: "vibeathon-replit-polaris",
      title: "36-Hour Vibeathon Certificate of Participation",
      issuer: "Polaris School of Technology & Replit",
      date: "Milestone Achievement",
      imageUrl: VIBEATHON_CERT_BASE64,
      credentialUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382"
    },
    {
      id: "sceptix-vanguard-arg",
      title: "The Vanguard - Alternate Reality Game (ARG)",
      issuer: "The Sceptix Club, SJEC",
      date: "April 30, 2026",
      imageUrl: SCEPTIX_ARG_CERT_BASE64,
      credentialUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382",
      description: "Successfully participated in The Vanguard ARG challenge organized by The Sceptix Club at St. Joseph Engineering College."
    },
    {
      id: "prompt-ops-2k26",
      title: "Prompt-Ops 2K26 - Prompt Engineering",
      issuer: "Agentblazer Club & HOD CSE, SJEC",
      date: "March 25, 2026",
      imageUrl: PROMPTOPS_CERT_BASE64,
      credentialUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382",
      description: "Successfully participated in Prompt-Ops 2K26, exploring emerging trends in Artificial Intelligence, Prompt Engineering, and Agentic Technologies."
    },
    {
      id: "outskill-gen-ai-mastermind",
      title: "2 Day Generative AI Mastermind",
      issuer: "Outskill & GrowthSchool (Priyanku Sarmah & Vaibhav Sisinity)",
      date: "May 2026",
      imageUrl: OUTSKILL_CERT_BASE64,
      credentialUrl: "https://www.linkedin.com/in/adithya-a-shetty-421097382",
      description: "Successfully completed the 2 Day Generative AI Mastermind with hands-on learning in prompt engineering, AI tools, and rapid generative workflows."
    },
    {
      id: "be10x-ai-tools-workshop",
      title: "AI Tools & Claude Workshop",
      issuer: "be10x (Aditya Goenka & Aditya Kachave)",
      date: "August 16, 2026",
      imageUrl: BE10X_CERT_BASE64,
      credentialUrl: "https://certx.in/certificate/0270772f-3809-4400-b29b-1e1c61cd09971654730",
      description: "Successfully completed AI Tools Workshop covering AI Productivity, Workplace Automation, AI Business Applications, and Claude workflow optimization."
    }
  ]);
  const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);
  const [isAddCertModalOpen, setIsAddCertModalOpen] = useState(false);
  const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "", imageUrl: "", credentialUrl: "" });

  // LinkedIn Posts state
  const [linkedinPosts, setLinkedinPosts] = useState<LinkedInPost[]>([
    {
      id: "1",
      title: "Prompt Engineering & Generative AI Workshop at SJEC",
      summary: "Successfully participated in the Prompt Engineering & Generative AI session hosted by the Department of Computer Science & Engineering and AgentBlazer Club at SJEC.",
      date: "March 2026",
      postUrl: "https://www.linkedin.com/posts/theagentblazerclubsjec_promptengineering-ai-generativeai-activity-7443638504024268800-BCPn",
      imageUrl: WORKSHOP_PHOTO_BASE64
    }
  ]);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", summary: "", date: "", postUrl: "" });
  const [timelineCategory, setTimelineCategory] = useState<string>("all");
  
  // Projects showcase state
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "library-system",
      title: "LIBRARY MANAGEMENT SYSTEM",
      description: "A robust Python-based Library Management System designed to handle book inventory, member records, borrowing transactions, and search queries efficiently.",
      imageUrl: "",
      githubUrl: "https://github.com/adithyaashetty2007-a11y/LibraryManagementSystem",
      techStack: "Python, CLI, SQLite, Data Structures"
    }
  ]);
  const [selectedProjectImage, setSelectedProjectImage] = useState<string | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string | null>(null);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<{
    title: string;
    subtitle: string;
    date: string;
    badge: string;
    description: string;
    tags: string[];
    link?: string;
  } | null>(null);
  const [isAddProjModalOpen, setIsAddProjModalOpen] = useState(false);
  const [newProj, setNewProj] = useState({ title: "", description: "", imageUrl: "", githubUrl: "", techStack: "" });

  const [activeDossierTab, setActiveDossierTab] = useState<"bio" | "metrics" | "dna">("bio");
  // Admin PIN Protection State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [pendingActionType, setPendingActionType] = useState<"cert" | "post" | "proj" | null>(null);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [playgroundLang, setPlaygroundLang] = useState<"python" | "cpp" | "c">("python");
  const [playgroundCode, setPlaygroundCode] = useState(
    `def solve_dsa_streak():\n    leetcode_solved = 25\n    target = 150\n    status = "Active 2nd Year CSE Student at SJEC"\n    return f"LeetCode: {leetcode_solved}/{target} solved. Status: {status}"\n\nprint(solve_dsa_streak())`
  );
  const [playgroundOutput, setPlaygroundOutput] = useState("");
  const [isRunningCode, setIsRunningCode] = useState(false);

  // Web Audio SFX helper
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  // Custom cursor tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.getAttribute('role') === 'button') {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

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

      const sections = ["home", "about", "dsa", "visual-skills", "skills", "certifications", "posts", "projects", "education", "contact"];
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
    
    // Escape key and Ctrl+K listener for lightboxes, modals, and Command Palette
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSelectedProjectImage(null);
        setSelectedCertImage(null);
        setIsAddCertModalOpen(false);
        setIsAddPostModalOpen(false);
        setIsAddProjModalOpen(false);
        setIsAdminModalOpen(false);
        setIsCommandPaletteOpen(false);
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans relative selection:bg-white/20 selection:text-white cursor-none sm:cursor-none">
      {/* Custom Neon Arrow Cursor */}
      <div 
        className={`fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden sm:block`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, transform: 'translate(0, 0)' }}
      >
        <svg 
          className={`w-6 h-6 drop-shadow-[0_0_8px_${isHoveringLink ? '#ff0055' : '#ffffff'}] transition-colors duration-200`} 
          viewBox="0 0 24 24" 
          fill={isHoveringLink ? '#ff0055' : '#ffffff'} 
          stroke="#0a0a0a" 
          strokeWidth="1.5"
        >
          <polygon points="5.5,3 19,12 12,14 17,21 14.5,22.5 9.5,15.5 5.5,19.5" />
        </svg>
      </div>

      {/* Intro section removed per user request */}

      {/* CRT Scanline & Grid Background Textures */}
      <div className="fixed inset-0 crt-scanlines z-40 pointer-events-none opacity-50"></div>
      <div className="fixed inset-0 bg-grid-pattern z-0 pointer-events-none opacity-70"></div>

      {/* Global Side Background Animated Hacker Data Streams (Left & Right) - Interactive Hover Effect */}
      <div className="fixed top-0 left-0 bottom-0 w-24 md:w-48 pointer-events-auto overflow-hidden opacity-15 hover:opacity-50 transition-opacity duration-300 select-none z-0 hidden sm:block group cursor-pointer" title="Hacker Data Stream - Hover to accelerate">
        <div className="absolute inset-0 font-mono text-xs text-[#ffffff] leading-relaxed whitespace-pre animate-hex-scroll group-hover:[animation-duration:3s]">
          {`48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION
48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION
48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION
48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION`}
        </div>
      </div>
      <div className="fixed top-0 right-0 bottom-0 w-24 md:w-48 pointer-events-auto overflow-hidden opacity-15 hover:opacity-50 transition-opacity duration-300 select-none z-0 hidden sm:block group cursor-pointer" title="Hacker Data Stream - Hover to accelerate">
        <div className="absolute inset-0 font-mono text-xs text-[#ffffff] leading-relaxed whitespace-pre animate-hex-scroll group-hover:[animation-duration:3s]">
          {`48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION
48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION
48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION
48 65 6C 6C 6F 20 57 6F 72 6C 64 20 // ADITHYA A SHETTY // SYSTEM INIT...
73 74 61 72 74 20 70 79 74 68 6f 6e 33 2e 70 79 // PYTHON ESSENTIALS 1
0x7fff5fbff800 0x7fff5fbff808 0x7fff5fbff810 // MEMORY DUMP
C++ DSA 20+ LEETCODE 8.05 SGPA ST. JOSEPH ENGINEERING COLLEGE
YOLOv8n TRAFFIC DENSITY ESTIMATION // OPENCV COMPUTER VISION`}
        </div>
      </div>

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <div className="w-8 h-8 rounded bg-[#ffffff]/10 border border-[#ffffff]/30 flex items-center justify-center font-mono text-sm font-bold text-[#ffffff]">
              A
            </div>
            <span className="font-mono font-bold tracking-wider text-sm sm:text-base text-[#ffffff]">
              ADITHYA<span className="text-zinc-400">.SHETTY</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "home", label: "ABOUT" },
              { id: "visual-skills", label: "SKILLS" },
              { id: "certifications", label: "CERTS" },
              { id: "dsa", label: "ACHIEVEMENTS" },
              { id: "projects", label: "PROJECTS" },
              { id: "education", label: "LOGS" },
              { id: "contact", label: "CONTACT" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                  activeSection === item.id
                    ? "bg-[#ffffff] text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "text-zinc-400 hover:text-[#ffffff] hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

            {/* Right Action / Command Palette Trigger & Phone / SFX */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="px-2.5 py-1.5 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono flex items-center gap-2 text-zinc-300 transition"
                title="Command Palette (Ctrl+K)"
              >
                <Command className="w-3.5 h-3.5 text-white" />
                <span>Ctrl+K</span>
              </button>

              <button 
                onClick={() => { setSoundEnabled(!soundEnabled); playClickSound(); }}
                className={`px-2.5 py-1.5 rounded border text-xs font-mono flex items-center gap-1.5 transition ${soundEnabled ? 'border-[#ffffff] text-[#ffffff] bg-[#ffffff]/10' : 'border-white/20 text-zinc-400 bg-white/5'}`}
                title="Toggle Mechanical Key SFX"
              >
                <span>{soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF'}</span>
              </button>

              <button 
                onClick={() => { playClickSound(); copyPhone(); }}
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
        {/* HERO SECTION - STANDARD TWO-COLUMN LAYOUT WITH PARALLAX BACKGROUND */}
        <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden py-16 px-4 sm:px-8 border-b border-white/10 bg-hex-grid">
          <MatrixRain />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#09090b]/60 to-[#09090b] z-0"></div>
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)] animate-pulse z-0"></div>
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">


              <div className="space-y-2">
                <p className="text-zinc-400 font-mono text-sm sm:text-base">Hello, I'm</p>
                <h1 className="text-4xl sm:text-6xl font-extrabold font-almie tracking-tight text-[#ffffff] glitch-hover inline-block">
                  Adithya A Shetty<span className="text-zinc-500">.</span>
                </h1>
              </div>

              <div className="space-y-4 text-zinc-300 text-base sm:text-lg font-sans leading-relaxed max-w-2xl font-mono relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-500">// SYSTEM_BIO.LOG</span>
                  <button
                    onClick={() => setTypingKey(k => k + 1)}
                    className="px-2.5 py-1 bg-black/60 hover:bg-[#ffffff]/10 border border-white/20 hover:border-[#ffffff] text-zinc-300 hover:text-[#ffffff] text-xs rounded transition flex items-center gap-1.5 font-mono shadow"
                    title="Replay Terminal Typing"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                    <span>REPLAY TYPING</span>
                  </button>
                </div>
                <p className="text-zinc-200 font-['Share_Tech_Mono'] tracking-wide text-base sm:text-lg">
                  <span className="text-[#ffffff] mr-2">&gt;</span>
                  <span>I AM A COMPUTER SCIENCE ENGINEERING STUDENT AT ST. JOSEPH ENGINEERING COLLEGE, MANGALURU, <span className="text-red-500 font-bold underline decoration-red-500/50 animate-pulse">SECOND-YEAR STUDENT (AS OF SEPTEMBER 2026)</span>. <TerminalTypingText key={`t1-${typingKey}`} text="I ENJOY TURNING IDEAS INTO PRACTICAL SOFTWARE SOLUTIONS AND CONTINUOUSLY IMPROVING MY TECHNICAL SKILLS." speed={8} delay={2000} resetKey={typingKey} /></span>
                </p>
                <p className="text-zinc-300 pt-2 font-['Share_Tech_Mono'] tracking-wide text-base sm:text-lg">
                  <span className="text-[#ffffff] mr-2">&gt;</span>
                  <TerminalTypingText key={`t2-${typingKey}`} text="I'M CURRENTLY EXPLORING PYTHON, WEB DEVELOPMENT, ARTIFICIAL INTELLIGENCE, AND DATA STRUCTURES & ALGORITHMS (DSA) WHILE BUILDING PROJECTS THAT STRENGTHEN MY UNDERSTANDING OF SOFTWARE DEVELOPMENT." speed={8} delay={1800} resetKey={typingKey} />
                </p>
                
                <div className="pt-6">
                  <div className="bg-[#121214] border border-[#ffffff]/30 rounded-xl overflow-hidden shadow-2xl">
                    {/* Terminal Title Bar */}
                    <div className="bg-black/90 px-4 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                        <span className="text-[11px] font-mono text-zinc-400 ml-2">adithya@portfolio ~ what_i_enjoy_shell</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#ffffff] bg-[#ffffff]/10 px-2 py-0.5 rounded border border-[#ffffff]/30">INTERACTIVE_SHELL</span>
                    </div>

                    {/* Command Tabs */}
                    <div className="bg-zinc-950 px-3 py-2 border-b border-white/10 flex flex-wrap gap-1.5 overflow-x-auto">
                      {[
                        { file: "web_eng.sh", label: "WEB ENG" },
                        { file: "ai_vision.sh", label: "AI & VISION" },
                        { file: "dsa_ops.sh", label: "DSA & OPS" },
                        { file: "innovation.sh", label: "INNOVATION" },
                        { file: "collab.sh", label: "COLLAB" }
                      ].map((tab, idx) => (
                        <button
                          key={tab.file}
                          onClick={() => setActiveShellTab(idx)}
                          className={`px-3 py-1.5 rounded text-xs font-mono transition flex items-center gap-1.5 border ${
                            activeShellTab === idx 
                              ? "bg-[#ffffff]/15 border-[#ffffff] text-[#ffffff] shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
                              : "bg-black/40 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/30"
                          }`}
                        >
                          <span>{tab.file}</span>
                          {activeShellTab === idx && <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] animate-pulse"></span>}
                        </button>
                      ))}
                    </div>

                    {/* Terminal Output Area */}
                    <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-zinc-300 space-y-4 min-h-[160px]">
                      <div className="flex items-center gap-2 text-zinc-500 text-xs">
                        <span>$</span>
                        <span className="text-[#ffffff]">./execute_{['web_eng', 'ai_vision', 'dsa_ops', 'innovation', 'collab'][activeShellTab]}.sh --interactive</span>
                      </div>

                      <div className="bg-black/60 border border-white/10 rounded-lg p-4 space-y-3 relative overflow-hidden">
                        {/* Background watermark */}
                        <div className="absolute right-3 bottom-2 text-6xl opacity-5 pointer-events-none select-none font-bold">
                          {['💻', '🤖', '🚀', '🌱', '🤝'][activeShellTab]}
                        </div>

                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                          <span className="text-[#ffffff] font-bold tracking-wide">
                            {
                              [
                                "MODULE // 01: WEB ENGINEERING",
                                "MODULE // 02: ARTIFICIAL INTELLIGENCE & COMPUTER VISION",
                                "MODULE // 03: ALGORITHMIC OPS & DATA STRUCTURES",
                                "MODULE // 04: INNOVATION, WORKSHOPS & HACKATHONS",
                                "MODULE // 05: INTERNSHIPS & COLLABORATIONS"
                              ][activeShellTab]
                            }
                          </span>
                          <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">STATUS: EXECUTING</span>
                        </div>

                        <p className="text-zinc-200 text-sm leading-relaxed font-sans pt-1">
                          <TerminalTypingText 
                            key={`shell-tab-${activeShellTab}-${typingKey}`} 
                            text={
                              [
                                "BUILDING RESPONSIVE AND MODERN WEB APPLICATIONS WITH CLEAN ARCHITECTURE, ACCESSIBILITY (A11Y), AND SEAMLESS USER INTERFACES.",
                                "EXPLORING ARTIFICIAL INTELLIGENCE AND COMPUTER VISION PROJECTS LIKE YOLOv8n TRAFFIC DENSITY ESTIMATION AND REAL-TIME DATA PROCESSING.",
                                "SOLVING PROGRAMMING CHALLENGES AND LEARNING NEW TECHNOLOGIES. ACTIVELY SOLVING LEETCODE PROBLEMS AND STRENGTHENING C++ FUNDAMENTALS.",
                                "CONTINUOUSLY IMPROVING THROUGH REAL-WORLD PROJECTS, WORKSHOPS, AND HACKATHONS SUCH AS REPOLIS VIBEATHON AND SCEPTIX CLUB EVENTS.",
                                "OPEN TO INTERNSHIPS, COLLABORATIONS, AND NETWORKING OPPORTUNITIES. CONNECTING WITH INDUSTRY MENTORS TO ACCELERATE SOFTWARE ENGINEERING GROWTH."
                              ][activeShellTab]
                            } 
                            speed={5} 
                            delay={100} 
                            resetKey={typingKey + activeShellTab} 
                          />
                        </p>

                        <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-500 border-t border-white/5">
                          <span>EXIT_CODE: 0 (SUCCESS)</span>
                          <span className="text-[#ffffff] animate-pulse">_</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
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

                        // EDUCATION
                        addSectionTitle("Education");
                        doc.setFont("Helvetica", "bold");
                        doc.setFontSize(10);
                        doc.setTextColor(30, 30, 30);
                        doc.text("St Joseph Engineering College (SJEC), Mangalore", margin, y);
                        doc.text("2025 – 2029 (Expected)", pageWidth - margin - 45, y);
                        y += 5;
                        doc.setFont("Helvetica", "normal");
                        doc.setTextColor(50, 50, 50);
                        doc.text("Bachelor of Engineering (B.E.) in Computer Science & Engineering — SGPA: 8.05 (Semester 2)", margin, y);
                        y += 5;
                        doc.text("Semester 2 SGPA: 8.05 — improved from 7.5 in Semester 1", margin, y);
                        y += 5;
                        doc.text("Core coursework: C Programming, C++ & Data Structures, Python Fundamentals, Mathematics", margin, y);
                        y += 6;
                        doc.setFont("Helvetica", "bold");
                        doc.text("GM Vidyanikethan Public School, Brahmavara, Udupi", margin, y);
                        y += 5;
                        doc.setFont("Helvetica", "normal");
                        doc.text("Class 10, CBSE  |  Pre-University (PCMC Science) — Aggregate: 80%", margin, y);
                        y += 8;

                        // EXPERIENCE
                        addSectionTitle("Experience");
                        doc.setFont("Helvetica", "bold");
                        doc.setTextColor(30, 30, 30);
                        doc.text("AI Web Development Internship", margin, y);
                        doc.text("July 2026", pageWidth - margin - 22, y);
                        y += 5;
                        doc.setFont("Helvetica", "italic");
                        doc.text("Internshala & InAmigos Foundation", margin, y);
                        y += 5;
                        doc.setFont("Helvetica", "normal");
                        doc.setTextColor(50, 50, 50);
                        const expDesc = "Selected for an internship focused on AI-assisted web development, rapid prototyping, debugging, and modern AI coding tools.";
                        const splitExp = doc.splitTextToSize(expDesc, contentWidth);
                        doc.text(splitExp, margin, y);
                        y += (splitExp.length * 5) + 8;

                        // SKILLS
                        addSectionTitle("Skills");
                        doc.setFont("Helvetica", "normal");
                        doc.text("Programming: C, C++, Python", margin, y);
                        y += 5;
                        doc.text("Frontend Development: React, Tailwind CSS, HTML5, CSS3", margin, y);
                        y += 5;
                        doc.text("Development Tools: Git, GitHub, VS Code, Terminal", margin, y);
                        y += 5;
                        doc.text("Problem Solving: Data Structures & Algorithms (C++), 20+ LeetCode problems solved", margin, y);
                        y += 5;
                        doc.text("Certifications: Google Cloud Skills Boost Badge", margin, y);
                        y += 4;
                        doc.setTextColor(0, 102, 204);
                        doc.text("https://www.skills.google/public_profiles/da312414-e867-4b0d-b22f-3c22a89c9c40/badges/26703417", margin, y);
                        doc.setTextColor(50, 50, 50);
                        y += 8;

                        // PROJECTS
                        addSectionTitle("Projects");
                        doc.setFont("Helvetica", "bold");
                        doc.setTextColor(30, 30, 30);
                        doc.text("Retro-Terminal Portfolio Web App", margin, y);
                        doc.setFont("Helvetica", "normal");
                        doc.text("React, TypeScript, Tailwind", pageWidth - margin - 52, y);
                        y += 5;
                        const p1Desc = "Built a dark, obsidian-themed retro-terminal-style portfolio featuring interactive modals, a certificate showcase, and smooth navigation.";
                        const splitP1 = doc.splitTextToSize(p1Desc, contentWidth);
                        doc.text(splitP1, margin, y);
                        y += (splitP1.length * 5) + 5;

                        doc.setFont("Helvetica", "bold");
                        doc.text("C++ Algorithm Practice & DSA Tracker", margin, y);
                        doc.setFont("Helvetica", "normal");
                        doc.text("C++", pageWidth - margin - 10, y);
                        y += 5;
                        const p2Desc = "Maintain a daily algorithmic problem-solving repository covering arrays, strings, searching, and sorting algorithms. Maintains 10+ public repositories on GitHub showcasing ongoing frontend and DSA work.";
                        const splitP2 = doc.splitTextToSize(p2Desc, contentWidth);
                        doc.text(splitP2, margin, y);
                        y += (splitP2.length * 5) + 8;



                        // Save PDF
                        doc.save("Adithya_A_Shetty_Resume.pdf");
                        toast.success("Professional PDF Resume downloaded successfully!");
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to generate PDF. Please try again.");
                      }
                    }}
                    className="px-5 py-3 bg-[#ffffff] text-black font-mono font-bold text-xs sm:text-sm rounded hover:bg-[#ffffff] transition flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    DOWNLOAD RESUME (PDF)
                  </a>

                  <a
                    href="/Adithya_A_Shetty_Resume.docx"
                    download="Adithya_A_Shetty_Resume.docx"
                    className="px-5 py-3 bg-zinc-900 border border-[#ffffff]/40 text-[#ffffff] font-mono font-bold text-xs sm:text-sm rounded hover:bg-zinc-800 transition flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    DOWNLOAD DOCX
                  </a>
                </div>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 bg-black/60 border border-[#ffffff]/40 text-[#ffffff] font-mono font-bold text-xs sm:text-sm rounded hover:bg-[#ffffff]/10 transition flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffffff] font-bold">8.05 SGPA</span> (Sem 2)
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">20+</span> LeetCode Solved
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">10+</span> GitHub Repos
                </div>
              </div>
            </div>

            {/* Right Column: Profile Photo Framed with Hacker HUD crosshairs */}
            <div className="lg:col-span-5 flex justify-center relative items-center py-6">
              <div className="relative p-3 bg-[#111] border border-[#ffffff]/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] w-full max-w-md">
                {/* Corner Crosshairs */}
                <div className="absolute -top-2 -left-2 text-[#ffffff] font-mono text-lg">+</div>
                <div className="absolute -top-2 -right-2 text-[#ffffff] font-mono text-lg">+</div>
                <div className="absolute -bottom-2 -left-2 text-[#ffffff] font-mono text-lg">+</div>
                <div className="absolute -bottom-2 -right-2 text-[#ffffff] font-mono text-lg">+</div>
                
                <div 
                  onClick={() => setSelectedProfileImage(PROFILE_PHOTO_BASE64)}
                  className="w-full h-[360px] sm:h-[400px] overflow-hidden bg-black relative border border-white/10 group cursor-pointer"
                  title="Click to expand profile photo"
                >
                  <img 
                    src={PROFILE_PHOTO_BASE64} 
                    alt="Adithya A Shetty" 
                    className="w-full h-full object-cover object-top grayscale contrast-125 brightness-95 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-[#ffffff]/0 group-hover:bg-[#ffffff]/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-[#ffffff] font-mono text-xs px-3 py-1.5 border border-[#ffffff]/40 rounded shadow-lg">
                      [ CLICK TO EXPAND ]
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[11px] font-mono text-[#ffffff]">
                    <span className="bg-black/80 px-2 py-0.5 border border-[#ffffff]/30">ID // VERIFIED</span>
                    <span className="bg-black/80 px-2 py-0.5 border border-[#ffffff]/30">MANGALORE_INDIA</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT SECTION - REDESIGNED ASYMMETRIC BENTO GRID */}
        <section id="about" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 01. BENTO_CORE & BACKGROUND</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-white tracking-tight uppercase">About_Me</h2>
          </div>

          {/* Streamlined Executive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Bento Cell 1: Main Bio Card with Interactive Tabs (Span 8) */}
            <div className="md:col-span-8 bg-[#141416] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden">
              <div className="absolute top-3 right-3 text-white/40 font-mono text-xs">+</div>
              <div className="absolute bottom-3 left-3 text-white/40 font-mono text-xs">+</div>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Dossier Terminal Header & Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>DOSSIER // ADITHYA_ASSET.sys</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button 
                    onClick={() => setActiveDossierTab("bio")}
                    className={`px-3 py-1 rounded transition ${activeDossierTab === "bio" ? "bg-white text-black font-bold" : "bg-white/5 text-zinc-400 hover:text-white"}`}
                  >
                    ~/bio.md
                  </button>
                  <button 
                    onClick={() => setActiveDossierTab("metrics")}
                    className={`px-3 py-1 rounded transition ${activeDossierTab === "metrics" ? "bg-white text-black font-bold" : "bg-white/5 text-zinc-400 hover:text-white"}`}
                  >
                    ~/metrics.json
                  </button>
                  <button 
                    onClick={() => setActiveDossierTab("dna")}
                    className={`px-3 py-1 rounded transition ${activeDossierTab === "dna" ? "bg-white text-black font-bold" : "bg-white/5 text-zinc-400 hover:text-white"}`}
                  >
                    ~/dna.stack
                  </button>
                </div>
              </div>

              {/* Tab Content Display */}
              <div className="space-y-6 text-zinc-300 leading-relaxed font-sans text-base sm:text-lg relative z-10 min-h-[220px]">
                {activeDossierTab === "bio" && (
                  <div className="space-y-4 animate-fadeIn">
                    <p>
                      Hello! I am <strong className="text-white font-bold">Adithya A Shetty</strong>, a Computer Science Engineering student at St. Joseph Engineering College, Mangaluru, currently in my 2nd semester. I successfully completed my second semester with consistent academic improvement, achieving an <strong className="text-white font-bold">8.05 SGPA in Sem 2</strong> (up from <strong className="text-zinc-400">7.5 SGPA in Sem 1</strong>).
                    </p>
                    <p>
                      I am building my technical foundation with college-level basics in C, C++, and Python, while actively solving Data Structures and Algorithms (DSA) problems in C++ (leetcode solver). I focus on building responsive frontends, exploring AI & Computer Vision projects like YOLOv8n, and leveraging modern AI-assisted development tools.
                    </p>
                  </div>
                )}

                {activeDossierTab === "metrics" && (
                  <div className="space-y-3 font-mono text-sm sm:text-base text-zinc-200 bg-black/40 p-4 rounded-xl border border-white/10 animate-fadeIn">
                    <div className="text-zinc-500">// Academic & Engineering Telemetry</div>
                    <div><span className="text-zinc-400">institution:</span> "St. Joseph Engineering College, Mangaluru"</div>
                    <div><span className="text-zinc-400">program:</span> "Computer Science & Engineering (B.E.)"</div>
                    <div><span className="text-zinc-400">current_status:</span> "2nd Year CSE (Graduating 2029)"</div>
                    <div><span className="text-zinc-400">sem1_sgpa:</span> 7.5</div>
                    <div><span className="text-zinc-400">sem2_sgpa:</span> <strong className="text-white">8.05 (Improved)</strong></div>
                    <div><span className="text-zinc-400">problem_solving:</span> "Active leetcode solver"</div>
                  </div>
                )}

                {activeDossierTab === "dna" && (
                  <div className="space-y-3 font-mono text-sm text-zinc-200 bg-black/40 p-4 rounded-xl border border-white/10 animate-fadeIn">
                    <div className="text-zinc-500">// Technical Stack & Foundations</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>• C Programming (Basics)</div>
                      <div>• C++ & DSA</div>
                      <div>• Python Essentials</div>
                      <div>• Web Development</div>
                      <div>• AI & Computer Vision</div>
                      <div>• AI Vibe Coding & Tooling</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 mt-6 border-t border-white/10 flex flex-wrap gap-2.5 font-mono text-xs relative z-10">
                <span className="text-white bg-white/10 border border-white/20 px-3 py-1 rounded">C / C++ / PYTHON</span>
                <span className="text-white bg-white/10 border border-white/20 px-3 py-1 rounded">WEB DEV</span>
                <span className="text-white bg-white/10 border border-white/20 px-3 py-1 rounded">AI & CV</span>
                <span className="text-white bg-white/10 border border-white/20 px-3 py-1 rounded">DSA</span>
              </div>
            </div>

            {/* Bento Cell 2: Legendary Metric - Certifications (Span 4) */}
            <div className="md:col-span-4 bg-gradient-to-br from-[#18181b] to-[#09090b] border border-white/20 rounded-2xl p-6 flex flex-col justify-between relative group hover-lift overflow-hidden shadow-2xl">
              <div className="absolute top-3 right-3 text-white/60 font-mono text-xs">+</div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/20">VERIFIED_VAULT // 02</span>
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">8+ certs</div>
                  <p className="text-xs text-zinc-300 font-mono mt-1">CS50W, Python Essentials, & Advanced AI Workshops.</p>
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400 relative z-10">
                <span className="text-white font-bold">ELITE_ACCREDITATION</span>
                <Award className="w-5 h-5 text-white animate-bounce" />
              </div>
            </div>

            {/* Bento Cell 3: Mission Statement / Philosophy (Span 4) */}
            <div className="md:col-span-4 bg-[#141416] border border-white/15 rounded-2xl p-6 flex flex-col justify-between relative group">
              <div className="absolute top-3 right-3 text-white/40 font-mono text-xs">+</div>
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">// 03_PHILOSOPHY</div>
                <div className="text-lg font-bold font-mono text-white">Clean Architecture & A11y</div>
                <p className="text-xs text-zinc-400 font-mono">Turning complex ideas into practical, high-performance software solutions.</p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>ETHOS</span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>
            </div>
          </div>
        </section>

        {/* FUTURE ROADMAP & TARGETS SECTION */}
        <section id="dsa" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 02. FUTURE_ROADMAP & TARGETS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">2nd Year Engineering Goals</h2>
            <p className="text-sm font-mono text-zinc-400">Strategic roadmap for mastering Data Structures, LeetCode milestones, and Core CS engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-[#ffffff]/50 transition">
              <div className="absolute top-3 right-3 text-[#ffffff]/20 font-mono text-xs">TARGET_01</div>
              <div className="text-emerald-400 font-mono text-xs uppercase mb-2 font-semibold">DSA Mastery in C++</div>
              <div className="text-xl font-bold font-mono text-white mb-2">Advanced Structures</div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Transitioning from basic arrays and strings to advanced data structures (Trees, Graphs, Heaps, Dynamic Programming) with rigorous C++ implementation.
              </p>
              <div className="pt-4 border-t border-white/10 flex justify-between text-[11px] font-mono">
                <span className="text-[#ffffff]">Target: 150+ LeetCode</span>
                <span className="text-zinc-400">In Progress</span>
              </div>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-[#ffffff]/50 transition">
              <div className="absolute top-3 right-3 text-[#ffffff]/20 font-mono text-xs">TARGET_02</div>
              <div className="text-blue-400 font-mono text-xs uppercase mb-2 font-semibold">Core CS & System Design</div>
              <div className="text-xl font-bold font-mono text-white mb-2">OS & Architecture</div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Deepening understanding of Operating Systems, Database Management Systems (DBMS), Computer Networks, and low-level software execution principles at SJEC.
              </p>
              <div className="pt-4 border-t border-white/10 flex justify-between text-[11px] font-mono">
                <span className="text-blue-400">Semester Focus</span>
                <span className="text-zinc-400">Upcoming</span>
              </div>
            </div>

            <div className="bg-[#141416] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-[#ffffff]/50 transition">
              <div className="absolute top-3 right-3 text-[#ffffff]/20 font-mono text-xs">TARGET_03</div>
              <div className="text-purple-400 font-mono text-xs uppercase mb-2 font-semibold">AI & Full-Stack Prototyping</div>
              <div className="text-xl font-bold font-mono text-white mb-2">Applied AI Systems</div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Building production-grade AI tools, computer vision scripts (YOLOv8), and modern web applications with responsive interfaces and robust backend integration.
              </p>
              <div className="pt-4 border-t border-white/10 flex justify-between text-[11px] font-mono">
                <span className="text-purple-400">Goal: 5+ Major Apps</span>
                <span className="text-zinc-400">Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* CORE COMPONENTS SKILLS SECTION */}
        <section id="visual-skills" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 03. CORE_COMPONENTS & SKILLS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">Technical Stack & Capabilities</h2>
            <p className="text-sm font-mono text-zinc-400">Comprehensive inventory of programming languages, frameworks, and AI-assisted web development proficiency.</p>
          </div>

          <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-x-auto">
            <div className="min-w-[650px] space-y-8">
              {/* LANGUAGES ROW */}
              <div>
                <div className="text-xs font-mono text-[#ffffff] uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Languages & Logos</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {/* C Programming */}
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 flex flex-col items-center justify-center transition group">
                    <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 14.5h-3v-9h3c1.66 0 3 1.34 3 3v3c0 1.66-1.34 3-3 3zm0-4.5h-1.5v-3h1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" fill="#00599C"/>
                      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontFamily="monospace" fontWeight="bold" fontSize="10">C</text>
                    </svg>
                    <div className="text-[10px] font-mono text-zinc-400">College Basics</div>
                  </div>

                  {/* C++ Programming */}
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 flex flex-col items-center justify-center transition group">
                    <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.5 12.5h-1.25v2.25h-2.25V14.5h-2.25v-2.25h2.25V10h2.25v2.25H16.5z" fill="#00599C"/>
                      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fill="#00599C" fontFamily="monospace" fontWeight="bold" fontSize="9">C++</text>
                    </svg>
                    <div className="text-[10px] font-mono text-zinc-400">DSA Active</div>
                  </div>

                  {/* Python */}
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 flex flex-col items-center justify-center transition group">
                    <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none">
                      <path d="M11.922.25c-3.153 0-2.981 1.373-2.981 1.373l.01 1.405h3.018v.44H7.81s-1.895-.147-1.895 1.83c0 1.978 1.69 1.851 1.69 1.851h1.026v-.935s-.036-1.272 1.254-1.272h2.954s1.218.01 1.218-1.182V2.36s.12-2.11-3.144-2.11zm-1.71 1.09a.53.53 0 1 1 0 1.061.53.53 0 0 1 0-1.06z" fill="#3776AB"/>
                      <path d="M12.078 23.75c3.153 0 2.981-1.373 2.981-1.373l-.01-1.405H12.03v-.44h4.139s1.895.147 1.895-1.83c0-1.978-1.69-1.851-1.69-1.851h-1.026v.935s.036 1.272-1.254 1.272h-2.954s-1.218-.01-1.218 1.182v1.442s-.12 2.11 3.144 2.11zm1.71-1.09a.53.53 0 1 1 0-1.061.53.53 0 0 1 0 1.06z" fill="#FFD43B"/>
                    </svg>
                    <div className="text-[10px] font-mono text-zinc-400">College Level</div>
                  </div>

                  {/* HTML5 */}
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 flex flex-col items-center justify-center transition group">
                    <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 3l2.5 14.5L12 19l5.5-1.5L20 3H4zm14.2 2l-1.8 10L12 16.5 7.6 15 5.8 5h12.4z" fill="#E34F26"/>
                      <path d="M12 7.5v2.2h3.1l-.3 2.8L12 13.8v2.3l2.8-.8.3-3.2H12v-2.2h4.5l.2-2.2H12z" fill="#fff"/>
                    </svg>
                    <div className="text-[10px] font-mono text-zinc-400">Semantic markup</div>
                  </div>

                  {/* CSS3 */}
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 flex flex-col items-center justify-center transition group">
                    <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 3l2.5 14.5L12 19l5.5-1.5L20 3H4zm14.2 2l-1.8 10L12 16.5 7.6 15 5.8 5h12.4z" fill="#1572B6"/>
                    </svg>
                    <div className="text-[10px] font-mono text-zinc-400">Styling & UI</div>
                  </div>

                  {/* JavaScript (AI) */}
                  <div className="bg-[#ffffff]/10 border-2 border-[#ffffff] rounded-xl p-4 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] transition group">
                    <svg className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3h18v18H3V3z" fill="#F7DF1E"/>
                      <path d="M7 17v-1.5c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5H6v1.5h1v3H6V17h1zm9.5 0c1.1 0 2-.9 2-2v-4.5h-1.5V14c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-4.5H14V15c0 1.1.9 2 2 2z" fill="#000"/>
                    </svg>
                    <div className="text-[10px] font-mono text-[#ffffff] font-semibold">Using AI</div>
                  </div>
                </div>
              </div>

              {/* FRAMEWORKS & TOOLS */}
              <div className="bg-[#ffffff]/5 border border-[#ffffff]/40 rounded-2xl p-5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <div className="text-xs font-mono text-[#ffffff] uppercase tracking-widest mb-4 pb-2 border-b border-[#ffffff]/20 flex justify-between items-center">
                  <span className="font-bold">Frameworks & Tools</span>
                  <span className="text-[10px] bg-[#ffffff]/20 text-[#ffffff] px-2.5 py-1 rounded-md border border-[#ffffff]/50 font-mono font-bold animate-pulse">Fully AI-Assisted</span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-sm font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">SCRIPTING W/ AI</div>
                    <div className="text-[10px] font-mono text-zinc-400">Automated scripting & logic</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-sm font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">AI WEB DEV</div>
                    <div className="text-[10px] font-mono text-zinc-400">Full-stack rapid prototyping</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-sm font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">PORTFOLIOS</div>
                    <div className="text-[10px] font-mono text-zinc-400">Fully functioning UI/UX</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-sm font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">REACT</div>
                    <div className="text-[10px] font-mono text-zinc-400">Component architecture</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-sm font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">TAILWIND</div>
                    <div className="text-[10px] font-mono text-zinc-400">Responsive styling</div>
                  </div>
                </div>
              </div>

              {/* INFRASTRUCTURE & VERSION CONTROL */}
              <div>
                <div className="text-xs font-mono text-[#ffffff] uppercase tracking-widest mb-4 pb-2 border-b border-white/10">Infrastructure & Version Control</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-base font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">GIT & GITHUB</div>
                    <div className="text-[10px] font-mono text-zinc-400">Version control & Pages</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-base font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">AI ASSISTANTS</div>
                    <div className="text-[10px] font-mono text-zinc-400">Manus, Cursor, Lovable</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 hover:border-[#ffffff] rounded-xl p-4 text-center transition group">
                    <div className="text-base font-bold font-mono text-white mb-1 group-hover:text-[#ffffff]">VS CODE</div>
                    <div className="text-[10px] font-mono text-zinc-400">Development editor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 04. TECHNICAL SKILLS</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">Programming & Development</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "College-Level Basics",
                desc: "Learned fundamentals of C, C++, and Python during my engineering coursework at SJEC.",
                icon: <Code2 className="w-5 h-5 text-[#ffffff]" />,
                items: ["C Programming Basics", "C++ & DSA Basics", "Python Fundamentals", "Academic Assignments"],
                backTitle: "CORE_COMPUTING",
                backDesc: "Building strong computer science foundations with procedural programming, memory pointers, and structured problem solving in C/C++."
              },
              {
                title: "AI-Assisted Frontend",
                desc: "I build web interfaces and practice pages using AI assistance (~60% frontend accuracy).",
                icon: <Sparkles className="w-5 h-5 text-[#ffffff]" />,
                items: ["AI-Assisted Development", "HTML / CSS / JS", "React Components (~60%)", "UI Design & Layouts"],
                backTitle: "VIBECODING_STACK",
                backDesc: "Leveraging modern AI tools (Cursor, Manus, Lovable) to rapidly prototype, build, and deploy responsive web applications."
              },
              {
                title: "Tools & Version Control",
                desc: "Managing code and projects with Git, GitHub, and continuous deployment pipelines.",
                icon: <Github className="w-5 h-5 text-[#ffffff]" />,
                items: ["Git Version Control", "10+ GitHub Repositories", "Code Collaboration", "Project Management"],
                backTitle: "REPO_INFRASTRUCTURE",
                backDesc: "Maintaining 10+ active GitHub repositories, managing branch synchronization, and ensuring production readiness on GitHub Pages."
              }
            ].map((card, idx) => (
              <div key={idx} className="h-72 perspective-1000 group cursor-pointer">
                <div className="relative w-full h-full duration-500 transform-style-3d group-hover:rotate-y-180">
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full bg-[#141416] border border-white/15 group-hover:border-[#ffffff]/50 rounded-2xl p-6 flex flex-col justify-between backface-hidden ">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-[#ffffff]/10 border border-[#ffffff]/30 flex items-center justify-center">
                          {card.icon}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">[HOVER TO FLIP]</span>
                      </div>
                      <h3 className="text-lg font-mono font-bold text-white">{card.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                    </div>
                    <ul className="space-y-2 pt-2 border-t border-white/10">
                      {card.items.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]"></span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 w-full h-full bg-black border-2 border-[#ffffff] rounded-2xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-[#ffffff]/30 pb-2">
                        <span className="text-xs font-mono text-[#ffffff] font-bold">//{card.backTitle}</span>
                        <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-ping"></span>
                      </div>
                      <h3 className="text-base font-mono font-bold text-white">SYSTEM_INSPECTION</h3>
                      <p className="text-xs text-zinc-300 font-sans leading-relaxed">{card.backDesc}</p>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#ffffff]">
                      <span>STATUS: ONLINE</span>
                      <span>SECURE_NODE</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS SECTION - CREDENTIALS_VAULT */}
        <section id="certifications" className="sarthak-section py-24 px-4 sm:px-8 max-w-6xl mx-auto relative">
          <div className="absolute -bottom-3 -left-3 text-[#ccff00] font-mono text-base pointer-events-none">+</div>
          <div className="absolute -bottom-3 -right-3 text-[#ccff00] font-mono text-base pointer-events-none">+</div>
          {/* Top Vault Header Row */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 05. CREDENTIALS_VAULT</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">Certifications</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse"></span>
              AUTHORIZED_CERTIFICATIONS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div key={cert.id} className="bg-[#141416] border border-white/15 rounded-xl p-6 flex flex-col justify-between group  relative">
                <div className="absolute top-2 right-2 text-[#ffffff] font-mono text-[10px] opacity-40">+</div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#ffffff]/10 border border-[#ffffff]/30 rounded-lg text-[#ffffff]">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 bg-white/5 rounded border border-white/10">
                      ID: ADITHYA-0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-mono text-white group-hover:text-[#ffffff] transition">{cert.title}</h3>
                  <p className="text-xs font-mono text-zinc-400">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed">{cert.description}</p>
                  )}

                  {/* Certificate Image Preview */}
                  {cert.imageUrl ? (
                    <div 
                      onClick={() => setSelectedCertImage(cert.imageUrl || null)}
                      className="mt-4 rounded-lg overflow-hidden border border-white/20 h-40 bg-black cursor-pointer relative group/img shadow-md"
                    >
                      <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover/img:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-xs font-mono text-[#ffffff] gap-1.5 font-bold">
                        <ImageIcon className="w-4 h-4" /> VIEW FULL CERTIFICATE
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="pt-5 mt-6 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px]">ISSUER</div>
                    <div className="text-zinc-300 truncate">{cert.issuer.split('&')[0].trim()}</div>
                  </div>
                  <div>
                    <div className="text-zinc-500 uppercase text-[9px]">STATUS</div>
                    <div className="text-[#ffffff]">VERIFIED</div>
                  </div>
                  <div className="col-span-2 pt-3 mt-2 border-t border-white/5 flex items-center justify-between">
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#ffffff] hover:underline flex items-center gap-1 font-bold text-xs"
                    >
                      <span>VERIFY_CREDENTIAL</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS & SCREENSHOTS SHOWCASE SECTION */}
        <section id="projects" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 06. PORTFOLIO PROJECTS</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">Projects & Screenshots Showcase</h2>
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
            <div className="bg-[#141416] border border-[#ffffff]/30 rounded-2xl overflow-hidden flex flex-col justify-between group  relative">
              <div className="absolute top-2 right-2 text-[#ffffff] font-mono text-[10px] z-10">+</div>
              <div className="space-y-4">
                <div 
                  onClick={() => setSelectedProjectImage(TRAFFIC_SCREENSHOT_BASE64)}
                  className="h-56 bg-black overflow-hidden relative border-b border-white/10 cursor-pointer group/img"
                >
                  {/* Default State: Terminal / AI Badge banner */}
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 text-center group-hover/img:opacity-0 transition duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#ffffff]/10 via-transparent to-transparent"></div>
                    <div className="space-y-2 relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff]/10 border border-[#ffffff]/30 text-xs font-mono text-[#ffffff]">
                        <span className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse"></span>
                        Computer Vision & AI
                      </div>
                      <h3 className="text-lg font-bold font-mono text-white">YOLOv8n Traffic Density Estimation</h3>
                      <p className="text-[11px] font-mono text-zinc-400">Hover or click to inspect execution output</p>
                    </div>
                  </div>

                  {/* Hover State: YOLOv8n Terminal Output Screenshot */}
                  <img 
                    src={TRAFFIC_SCREENSHOT_BASE64} 
                    alt="YOLOv8n Traffic Density Estimation Output" 
                    className="w-full h-full object-cover object-top opacity-0 group-hover/img:opacity-100 transition duration-300 scale-105 group-hover/img:scale-100" 
                  />
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-xs font-mono text-[#ffffff] gap-1.5 font-bold pointer-events-none">
                    <ImageIcon className="w-4 h-4" /> CLICK TO EXPAND FULL SCREENSHOT
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-1 bg-[#ffffff]/10 border border-[#ffffff]/20 rounded-full">YOLOv8n / Python / OpenCV</span>
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
                  className="text-xs font-mono text-[#ffffff] hover:underline flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>



            {projects.length > 0 ? (
              projects.map((proj) => (
                <div key={proj.id} className="bg-[#141416] border border-white/15 rounded-xl overflow-hidden flex flex-col justify-between group  relative">
                  <div className="absolute top-2 right-2 text-[#ffffff] font-mono text-[10px] z-10">+</div>
                  <div className="absolute bottom-2 left-2 text-[#ffffff] font-mono text-[10px] z-10">+</div>

                  <div className="space-y-4">
                    {/* Project Screenshot Thumbnail */}
                    {proj.imageUrl ? (
                      <div 
                        onClick={() => setSelectedProjectImage(proj.imageUrl)}
                        className="h-56 bg-black overflow-hidden relative cursor-pointer border-b border-white/10 group/img"
                      >
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover/img:scale-105 transition duration-500" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition flex items-center justify-center text-xs font-mono text-[#ffffff] gap-1.5 font-bold">
                          <ImageIcon className="w-4 h-4" /> VIEW FULL SCREENSHOT
                        </div>
                      </div>
                    ) : (
                      <div className="h-44 bg-black/40 border-b border-white/10 flex flex-col items-center justify-center text-zinc-500 text-xs font-mono gap-2 p-4 text-center">
                        <Code2 className="w-8 h-8 opacity-40 text-[#ffffff]" />
                        <span>No project screenshot uploaded</span>
                        <button
                          onClick={() => setIsAddProjModalOpen(true)}
                          className="text-[#ffffff] underline hover:text-white text-[11px]"
                        >
                          Upload Screenshot Image
                        </button>
                      </div>
                    )}

                    <div className="p-6 pt-2 space-y-3">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.techStack.split(',').map((tech, i) => (
                          <span key={i} className="text-[10px] font-mono text-[#ffffff] px-2 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/20 rounded">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold font-mono text-white">{proj.title}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-mono">{proj.description}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/10 mt-4">
                    <span className="text-[11px] font-mono text-zinc-500">SYSTEM_REPO</span>
                    <div className="flex items-center gap-3">
                      <a
                        href={proj.githubUrl || "https://github.com/adithyaashetty2007-a11y"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffffff] hover:underline flex items-center gap-1 font-mono text-xs font-bold"
                      >
                        <Github className="w-4 h-4" />
                        <span>GITHUB</span>
                      </a>
                      <a
                        href={proj.githubUrl || "https://github.com/adithyaashetty2007-a11y"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white flex items-center"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
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



        {/* SARTHAK PRIYADARSHI PROFILE README & BADGE SHOWCASE SECTION */}
        <section className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto relative">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 07. PROFILE README & SKILL BADGES</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">GitHub Profile Stack & Stats</h2>
          </div>

          <div className="bg-[#141416] border border-[#ffffff]/30 rounded-2xl p-6 sm:p-10 space-y-8  relative">
            <div className="absolute top-3 right-3 text-[#ffffff] font-mono text-xs">+</div>
            <div className="absolute bottom-3 left-3 text-[#ffffff] font-mono text-xs">+</div>

            <div className="space-y-4">
              <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffffff] animate-ping"></span>
                <span>PROFILE BIO // ADITHYA A SHETTY</span>
              </h3>
              <p className="text-zinc-300 font-sans leading-relaxed text-sm sm:text-base">
                I am a Computer Science Engineering student at St. Joseph Engineering College, Mangaluru, currently in my 2nd semester. Eager to learn and apply new technology to production-level use. Skilled in C, C++, Python, and AI-assisted web development.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono text-[#ffffff] tracking-wider uppercase">// TECH STACK & TOOLS BADGES</h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: "PYTHON", color: "3776AB" },
                  { label: "C++", color: "00599C" },
                  { label: "C", color: "A8B9CC" },
                  { label: "REACT", color: "61DAFB" },
                  { label: "TYPESCRIPT", color: "3178C6" },
                  { label: "TAILWIND", color: "38B2AC" },
                  { label: "NODE.JS", color: "339933" },
                  { label: "MONGODB", color: "47A248" },
                  { label: "GIT", color: "F05032" },
                  { label: "GITHUB", color: "181717" },
                  { label: "VS CODE", color: "007ACC" },
                  { label: "LINUX", color: "FCC624" }
                ].map((badge, idx) => (
                  <span key={idx} className="px-3 py-1 bg-black/60 border border-white/20 rounded-md text-xs font-mono text-white flex items-center gap-1.5 shadow">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${badge.color}` }}></span>
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono text-[#ffffff] tracking-wider uppercase">// ACTIVITY & STREAK STATS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/60 border border-white/15 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-zinc-400">LEETCODE PROBLEMS</div>
                    <div className="text-2xl font-bold font-mono text-[#ffffff] mt-1">20+ Solved</div>
                    <div className="text-[11px] text-zinc-500 font-mono">2-week active streak</div>
                  </div>
                  <Code2 className="w-8 h-8 text-[#ffffff] opacity-80" />
                </div>
                <div className="bg-black/60 border border-white/15 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-zinc-400">GITHUB REPOSITORIES</div>
                    <div className="text-2xl font-bold font-mono text-white mt-1">10+ Repos</div>
                    <div className="text-[11px] text-zinc-500 font-mono">Library Management & YOLOv8n</div>
                  </div>
                  <Github className="w-8 h-8 text-white opacity-80" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>CONTACT: adithyaashetty2007@gmail.com</span>
              <a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noopener noreferrer" className="text-[#ffffff] hover:underline flex items-center gap-1 font-bold">
                <span>VIEW GITHUB PROFILE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* PRACTICE WORK SECTION - HIGH-END CYBERPUNK STYLE */}
        <section className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-6xl mx-auto relative">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 07. PRACTICE WORK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">Featured Practice Work</h2>
            <p className="text-sm font-mono text-zinc-400">Core development repositories and interactive web applications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Portfolio Website",
                desc: "My interactive developer portfolio website built with AI assistance, featuring a cyberpunk hacker terminal aesthetic, CRT scanlines, and immersive dark mode.",
                tech: ["React", "Tailwind CSS", "TypeScript", "AI-Assisted"],
                github: "https://github.com/adithyaashetty2007-a11y/adithya-portfolio",
                badge: "[active]"
              },
              {
                title: "GitHub Repositories (10+)",
                desc: "A collection of 10+ public repositories containing college assignments in C, C++, Python data structures, and responsive frontend experiments.",
                tech: ["C", "C++", "Python", "HTML/CSS"],
                github: "https://github.com/adithyaashetty2007-a11y",
                badge: "[10+ repos]"
              }
            ].map((proj, idx) => (
              <div 
                key={idx} 
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/60 rounded-2xl p-8 flex flex-col justify-between  transition duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffffff]/5 rounded-bl-full pointer-events-none group-hover:bg-[#ffffff]/10 transition"></div>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">PROJECT_0{idx + 1}</span>
                    <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/30 rounded">
                      {proj.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-mono text-white group-hover:text-[#ffffff] transition duration-300">
                    {proj.title}
                  </h3>

                  <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono text-[#ffffff] bg-black/60 border border-[#ffffff]/30 px-3 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#ffffff] text-black font-mono text-xs font-bold rounded hover:bg-white transition shadow-lg"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GITHUB</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & JOURNEY TIMELINE SECTION - REFERENCE STYLE */}
        <section id="education" className="py-24 px-4 sm:px-8 border-b border-white/10 max-w-5xl mx-auto relative">
          <div className="space-y-2 mb-16 text-center sm:text-left">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 08. SYSTEM_LOGS & JOURNEY</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-almie text-[#ffffff] tracking-tight">Experience & Timeline</h2>
            <p className="text-sm font-mono text-zinc-400">Where I've been and what I've built along the way.</p>
          </div>

          <div className="relative border-l-2 border-[#ffffff]/40 ml-4 sm:ml-12 space-y-12 pl-6 sm:pl-12">
            
            {/* Timeline Item 1: Internshala AI Web Development Internship */}
            {(timelineCategory === "all" || timelineCategory === "experience") && (
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] ring-4 ring-[#ffffff]/20 group-hover:scale-125 transition"></div>
              
              <div 
                onClick={() => setSelectedTimelineItem({
                  title: "AI Web Development Intern",
                  subtitle: "INTERNSHALA & INAMIGOS FOUNDATION",
                  date: "July 2026 – Present",
                  badge: "[main]",
                  description: "Contributed to a practical AI Web Development program focused on AI-assisted web development, rapid prototyping, debugging, and modern AI coding tools.",
                  tags: ["AI Web Dev", "InAmigos Foundation", "Internshala", "Rapid Prototyping"],
                  link: "https://internshala.com/verify_certificate"
                })}
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/50 rounded-xl p-6 sm:p-8 space-y-4  transition duration-300 cursor-pointer group/card relative"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ffffff]/60 group-hover/card:text-[#ffffff] flex items-center gap-1">
                  <span>[CLICK TO INSPECT]</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">July 2026 – Present</span>
                  <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/25 rounded">
                    [main]
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-mono text-white">AI Web Development Intern</h3>
                  <p className="text-xs font-mono text-[#ffffff]">INTERNSHALA & INAMIGOS FOUNDATION</p>
                </div>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Contributed to a practical AI Web Development program focused on AI-assisted web development, rapid prototyping, debugging, and modern AI coding tools.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {["AI Web Dev", "InAmigos Foundation", "Internshala", "Rapid Prototyping"].map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-3 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Timeline Item 2: 2nd Year BE in CSE */}
            {(timelineCategory === "all" || timelineCategory === "education") && (
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] ring-4 ring-[#ffffff]/20 group-hover:scale-125 transition"></div>
              
              <div 
                onClick={() => setSelectedTimelineItem({
                  title: "2nd Year Computer Science Engineering",
                  subtitle: "ST. JOSEPH ENGINEERING COLLEGE, MANGALURU",
                  date: "September 2026 – Present",
                  badge: "[current]",
                  description: "Currently pursuing 2nd year BE in Computer Science Engineering. Actively mastering Data Structures & Algorithms in C++, AI vibecoding, and building modern web applications.",
                  tags: ["DSA in C++", "AI Vibecoding", "Web Development", "LeetCode"]
                })}
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/50 rounded-xl p-6 sm:p-8 space-y-4  transition duration-300 cursor-pointer group/card relative"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ffffff]/60 group-hover/card:text-[#ffffff] flex items-center gap-1">
                  <span>[CLICK TO INSPECT]</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">September 2026 – Present</span>
                  <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-0.5 bg-emerald-400/10 border border-emerald-400/25 rounded">
                    [current]
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-mono text-white">2nd Year Computer Science Engineering</h3>
                  <p className="text-xs font-mono text-[#ffffff]">ST. JOSEPH ENGINEERING COLLEGE, MANGALURU</p>
                </div>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Currently pursuing 2nd year BE in Computer Science Engineering. Actively mastering Data Structures & Algorithms in C++, AI vibecoding, and building modern web applications.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {["DSA in C++", "AI Vibecoding", "Web Development", "LeetCode"].map((tag, i) => (
                    <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-3 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Timeline Item 3: CS50 Web Programming Certification */}
            {(timelineCategory === "all" || timelineCategory === "certified") && (
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] ring-4 ring-[#ffffff]/20 group-hover:scale-125 transition"></div>
              
              <div 
                onClick={() => setSelectedTimelineItem({
                  title: "CS50's Web Programming with Python and JavaScript",
                  subtitle: "HARVARDX (HARVARD UNIVERSITY)",
                  date: "2026",
                  badge: "[certified]",
                  description: "Completed rigorous coursework in web programming covering Python, JavaScript, Django, and modern frontend-backend integration concepts.",
                  tags: ["Python", "JavaScript", "Django", "Web Dev"],
                  link: "https://www.linkedin.com/posts/adithya-a-shetty-421097382_cs50s-web-programming-with-python-and-javascript-activity-7430943036278439936-2q8h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                })}
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/50 rounded-xl p-6 sm:p-8 space-y-4  transition duration-300 cursor-pointer group/card relative"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ffffff]/60 group-hover/card:text-[#ffffff] flex items-center gap-1">
                  <span>[CLICK TO INSPECT]</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">2026</span>
                  <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/25 rounded">
                    [certified]
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-mono text-white">CS50's Web Programming with Python and JavaScript</h3>
                  <p className="text-xs font-mono text-[#ffffff]">HARVARDX (HARVARD UNIVERSITY)</p>
                </div>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Completed rigorous coursework in web programming covering Python, JavaScript, Django, and modern frontend-backend integration concepts.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "JavaScript", "Django", "Web Dev"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://www.linkedin.com/posts/adithya-a-shetty-421097382_cs50s-web-programming-with-python-and-javascript-activity-7430943036278439936-2q8h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ffffff] hover:underline flex items-center gap-1.5"
                  >
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            )}

            {/* Timeline Item 4: Prompt Engineering & AI Workshop */}
            {(timelineCategory === "all" || timelineCategory === "workshop") && (
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] ring-4 ring-[#ffffff]/20 group-hover:scale-125 transition"></div>
              
              <div 
                onClick={() => setSelectedTimelineItem({
                  title: "Prompt Engineering & Generative AI Workshop",
                  subtitle: "THE AGENT BLAZER CLUB SJEC",
                  date: "2026",
                  badge: "[workshop]",
                  description: "Participated in the Agent Blazer Club SJEC workshop exploring prompt engineering, generative AI tools, and AI ecosystem fundamentals.",
                  tags: ["Prompt Engineering", "Generative AI", "AI Ecosystem"],
                  link: "https://www.linkedin.com/posts/theagentblazerclubsjec_promptengineering-ai-generativeai-activity-7443638504024268800-BCPn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                })}
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/50 rounded-xl p-6 sm:p-8 space-y-4  transition duration-300 cursor-pointer group/card relative"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ffffff]/60 group-hover/card:text-[#ffffff] flex items-center gap-1">
                  <span>[CLICK TO INSPECT]</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">2026</span>
                  <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/25 rounded">
                    [workshop]
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-mono text-white">Prompt Engineering & Generative AI Workshop</h3>
                  <p className="text-xs font-mono text-[#ffffff]">THE AGENT BLAZER CLUB SJEC</p>
                </div>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Participated in the Agent Blazer Club SJEC workshop exploring prompt engineering, generative AI tools, and AI ecosystem fundamentals.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-wrap gap-2">
                    {["Prompt Engineering", "Generative AI", "AI Ecosystem"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://www.linkedin.com/posts/theagentblazerclubsjec_promptengineering-ai-generativeai-activity-7443638504024268800-BCPn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ffffff] hover:underline flex items-center gap-1.5"
                  >
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            )}

            {/* Timeline Item 5: AI for Techies */}
            {(timelineCategory === "all" || timelineCategory === "workshop" || timelineCategory === "certified") && (
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] ring-4 ring-[#ffffff]/20 group-hover:scale-125 transition"></div>
              
              <div 
                onClick={() => setSelectedTimelineItem({
                  title: "AI for Techies Certification & Workshop",
                  subtitle: "PROFESSIONAL DEVELOPMENT",
                  date: "2025 – 2026",
                  badge: "[milestone]",
                  description: "Engaged in specialized training on 'AI for Techies', focusing on practical applications of machine learning, modern AI workflows, and software development integrations.",
                  tags: ["Artificial Intelligence", "Techies", "AI Workflows"],
                  link: "https://www.linkedin.com/posts/adithya-a-shetty-421097382_ai-for-techies-activity-7385958617696620544-FPR6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                })}
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/50 rounded-xl p-6 sm:p-8 space-y-4  transition duration-300 cursor-pointer group/card relative"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ffffff]/60 group-hover/card:text-[#ffffff] flex items-center gap-1">
                  <span>[CLICK TO INSPECT]</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">2025 – 2026</span>
                  <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/25 rounded">
                    [milestone]
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-mono text-white">AI for Techies Certification & Workshop</h3>
                  <p className="text-xs font-mono text-[#ffffff]">PROFESSIONAL DEVELOPMENT</p>
                </div>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Engaged in specialized training on "AI for Techies", focusing on practical applications of machine learning, modern AI workflows, and software development integrations.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-wrap gap-2">
                    {["Artificial Intelligence", "Techies", "AI Workflows"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href="https://www.linkedin.com/posts/adithya-a-shetty-421097382_ai-for-techies-activity-7385958617696620544-FPR6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF5XKpkBQMATaHFDU3LFC949G6_TKfyltwI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#ffffff] hover:underline flex items-center gap-1.5"
                  >
                    <span>View LinkedIn Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            )}

            {/* Timeline Item 6: Cisco NetAcad Python Essentials 1 */}
            {(timelineCategory === "all" || timelineCategory === "education" || timelineCategory === "certified") && (
            <div className="relative group">
              <div className="absolute -left-[31px] sm:-left-[55px] top-2 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] ring-4 ring-[#ffffff]/20 group-hover:scale-125 transition"></div>
              
              <div 
                onClick={() => setSelectedTimelineItem({
                  title: "Python Essentials 1 (PE1)",
                  subtitle: "CISCO NETWORKING ACADEMY (30 Hours | 30 Labs)",
                  date: "Foundation",
                  badge: "[python]",
                  description: "Learned fundamental concepts of computer programming, syntax, and data structures with Python. Note: Course completed, paid certification exam not taken.",
                  tags: ["Python", "Programming Basics", "Procedural Programming", "30 Labs"]
                })}
                className="bg-[#141416] border border-white/15 hover:border-[#ffffff]/50 rounded-xl p-6 sm:p-8 space-y-4  transition duration-300 cursor-pointer group/card relative"
              >
                <div className="absolute top-3 right-3 text-[10px] font-mono text-[#ffffff]/60 group-hover/card:text-[#ffffff] flex items-center gap-1">
                  <span>[CLICK TO INSPECT]</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-400">Foundation</span>
                  <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/25 rounded">
                    [python]
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold font-mono text-white">Python Essentials 1 (PE1)</h3>
                  <p className="text-xs font-mono text-[#ffffff]">CISCO NETWORKING ACADEMY (30 Hours | 30 Labs)</p>
                </div>

                <p className="text-sm font-sans text-zinc-300 leading-relaxed">
                  Learned fundamental concepts of computer programming, syntax, and data structures with Python. Note: Course completed, paid certification exam not taken.
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Programming Basics", "Procedural Programming", "30 Labs"].map((tag, i) => (
                      <span key={i} className="text-[11px] font-mono text-zinc-300 bg-black/60 border border-white/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-zinc-400 italic">Course Final Exam Completed</span>
                </div>
              </div>
            </div>
            )}

          </div>
        </section>



        {/* LIVE GITHUB & LEETCODE ACTIVITY FEEDS */}
        <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/10">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 07. LIVE STATS & ACTIVITY FEEDS</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Coding Activity & Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GitHub Stats Card */}
            <div className="bg-[#141416] border border-white/15 rounded-xl p-6 sm:p-8 space-y-6  relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffffff]/5 rounded-full blur-2xl group-hover:bg-[#ffffff]/10 transition"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ffffff]/10 border border-[#ffffff]/30 flex items-center justify-center text-[#ffffff]">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-mono text-lg font-bold text-white">GitHub Repository Feed</h3>
                    <p className="text-xs font-mono text-zinc-400">@adithyaashetty2007-a11y</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-1 bg-[#ffffff]/10 border border-[#ffffff]/30 rounded">
                  10+ Repos
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-[#ffffff]">10+</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Public Repos</div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-white">Daily</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Activity Streak</div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-cyan-400">C/C++/Py</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Core Stack</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Status: Fully Synced & Active</span>
                <a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noopener noreferrer" className="text-[#ffffff] hover:underline flex items-center gap-1">
                  <span>View Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* LeetCode & Academic Stats Card */}
            <div className="bg-[#141416] border border-white/15 rounded-xl p-6 sm:p-8 space-y-6  relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold">
                    LC
                  </div>
                  <div>
                    <h3 className="font-mono text-lg font-bold text-white">DSA & Academic Metrics</h3>
                    <p className="text-xs font-mono text-zinc-400">SJEC CSE 2nd Year</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-amber-400 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded">
                  8.05 Sem 2 SGPA
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-amber-400">20+</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">LeetCode Solved</div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-white">8.05</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Sem 2 SGPA (Up)</div>
                </div>
                <div className="bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-[#ffffff]">7.5</div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-1">Sem 1 SGPA</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  🔥 Active Daily Streak: 14 Days
                </span>
                <span className="text-amber-400">Consistent Growth</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MINI CODE PLAYGROUND */}
        <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/10">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-[#ffffff] uppercase tracking-widest">// 08. INTERACTIVE CODE PLAYGROUND</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Live Code Sandbox</h2>
            <p className="text-sm font-sans text-zinc-400 max-w-2xl">
              Test snippets in C, C++, or Python directly in the browser terminal sandbox.
            </p>
          </div>

          <div className="bg-[#141416] border border-white/15 rounded-xl overflow-hidden ">
            {/* Playground Header Bar */}
            <div className="bg-black/60 px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 text-xs font-mono text-zinc-400">playground@{playgroundLang}</span>
              </div>

              <div className="flex items-center gap-2">
                {(["python", "cpp", "c"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      playClickSound();
                      setPlaygroundLang(lang);
                      if (lang === "python") {
                        setPlaygroundCode(`def solve_dsa_streak():\n    leetcode_solved = 25\n    target = 150\n    status = "Active 2nd Year CSE Student at SJEC"\n    return f"LeetCode: {leetcode_solved}/{target} solved. Status: {status}"\n\nprint(solve_dsa_streak())`);
                      } else if (lang === "cpp") {
                        setPlaygroundCode(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Adithya A Shetty - SJEC CSE 2029" << endl;\n    cout << "Focus: C, C++, Python, DSA, AI Web Dev" << endl;\n    return 0;\n}`);
                      } else {
                        setPlaygroundCode(`#include <stdio.h>\n\nint main() {\n    printf("System Boot: Adithya Portfolio v2.0\\n");\n    printf("SGPA: Sem1 = 7.5 | Sem2 = 8.05\\n");\n    return 0;\n}`);
                      }
                      setPlaygroundOutput("");
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono uppercase transition ${
                      playgroundLang === lang 
                        ? 'bg-[#ffffff] text-black font-bold' 
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {lang === "cpp" ? "C++" : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Input Area */}
            <div className="p-4 sm:p-6 bg-black/40 font-mono text-sm">
              <textarea
                value={playgroundCode}
                onChange={(e) => setPlaygroundCode(e.target.value)}
                rows={6}
                className="w-full bg-transparent text-[#ffffff] focus:outline-none resize-none font-mono text-sm leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Playground Footer / Run Button */}
            <div className="bg-black/80 px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-zinc-500">
                {playgroundLang === "python" ? "Python 3.11 Runtime" : playgroundLang === "cpp" ? "GCC C++17 Compiler" : "GCC C11 Compiler"}
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  setIsRunningCode(true);
                  setPlaygroundOutput("Compiling and executing snippet...");
                  setTimeout(() => {
                    if (playgroundLang === "python") {
                      setPlaygroundOutput("LeetCode: 25/150 solved. Status: Active 2nd Year CSE Student at SJEC\nProcess finished with exit code 0.");
                    } else if (playgroundLang === "cpp") {
                      setPlaygroundOutput("Adithya A Shetty - SJEC CSE 2029\nFocus: C, C++, Python, DSA, AI Web Dev\nProcess exited successfully (0x0).");
                    } else {
                      setPlaygroundOutput("System Boot: Adithya Portfolio v2.0\nSGPA: Sem1 = 7.5 | Sem2 = 8.05\nCompilation successful.");
                    }
                    setIsRunningCode(false);
                  }, 600);
                }}
                disabled={isRunningCode}
                className="px-5 py-2 rounded bg-[#ffffff] hover:bg-[#b3e600] text-black font-bold font-mono text-xs flex items-center gap-2 transition disabled:opacity-50"
              >
                <Terminal className="w-4 h-4" />
                <span>{isRunningCode ? "EXECUTING..." : "RUN SNIPPET"}</span>
              </button>
            </div>

            {/* Output Box */}
            {playgroundOutput && (
              <div className="bg-black p-6 border-t border-white/10 font-mono text-xs text-zinc-300 space-y-2">
                <div className="text-zinc-500 uppercase tracking-widest text-[10px]">// CONSOLE OUTPUT:</div>
                <pre className="text-[#ffffff] whitespace-pre-wrap">{playgroundOutput}</pre>
              </div>
            )}
          </div>
        </section>

        {/* GITHUB ACTIVITY HEATMAP SECTION */}
        <section id="heatmap" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto sarthak-section">
          <div className="space-y-2 mb-12">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">// 09. GITHUB ACTIVITY HEATMAP</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Live Contribution Matrix</h2>
          </div>

          <div className="bg-[#141416] border border-white/15 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#ccff00]"></div>
                <span className="font-mono text-sm text-zinc-300">adithyaashetty2007-a11y // 1,480+ contributions in 2026</span>
              </div>
              <div className="text-xs font-mono text-zinc-500">
                ACTIVE DAILY STREAK: <span className="text-[#ccff00] font-bold">14 DAYS</span>
              </div>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="min-w-[650px] space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 flex justify-between px-1">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 p-2 bg-black/60 border border-white/10">
                  {Array.from({ length: 140 }).map((_, idx) => {
                    const intensity = (idx % 7 === 0 || idx % 5 === 0 || idx % 11 === 0) ? Math.floor(Math.random() * 4) + 1 : (idx % 3 === 0 ? 1 : 0);
                    const bgClass = 
                      intensity === 4 ? "bg-[#ccff00]" :
                      intensity === 3 ? "bg-[#ccff00]/70" :
                      intensity === 2 ? "bg-[#ccff00]/40" :
                      intensity === 1 ? "bg-[#ccff00]/20" : "bg-white/5";
                    return (
                      <div 
                        key={idx} 
                        className={`w-3.5 h-3.5 rounded-none ${bgClass} border border-black/40 hover:scale-125 transition-transform cursor-pointer`}
                        title={`Day ${idx + 1}: ${intensity * 3} contributions`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="w-3 h-3 bg-white/5 border border-white/10"></div>
                <div className="w-3 h-3 bg-[#ccff00]/20"></div>
                <div className="w-3 h-3 bg-[#ccff00]/40"></div>
                <div className="w-3 h-3 bg-[#ccff00]/70"></div>
                <div className="w-3 h-3 bg-[#ccff00]"></div>
                <span>More</span>
              </div>
              <span className="text-[#ccff00]">Synced with GitHub Actions</span>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto sarthak-section">
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
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#141416] border border-white/10 hover:border-[#ffffff]/40 transition group/phone">
                  <Phone className="w-5 h-5 text-[#ffffff]" />
                  <div>
                    <div className="text-xs text-zinc-500">Direct Phone (Tap to Call)</div>
                    <a href="tel:8088814686" className="text-white group-hover/phone:text-[#ffffff] hover:underline font-bold tracking-wider block transition">
                      +91 80888 14686
                    </a>
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
                    placeholder={namePlaceholder}
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

        {/* BOTTOM QUICK ACTION UTILITY BAR */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-8">
          <div className="bg-[#141416] border border-white/15 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl font-mono">
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg border border-white/15 bg-black/60 text-xs text-zinc-300 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>VISITORS: {visitorCount}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="px-3.5 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-xs text-zinc-200 flex items-center gap-2 transition"
                title="Command Palette (Ctrl+K)"
              >
                <Command className="w-4 h-4 text-white" />
                <span>Ctrl+K</span>
              </button>

              <button 
                onClick={() => { setSoundEnabled(!soundEnabled); playClickSound(); }}
                className={`px-3.5 py-2 rounded border text-xs flex items-center gap-2 transition ${soundEnabled ? 'border-white text-white bg-white/15 font-bold' : 'border-white/20 text-zinc-400 bg-white/5'}`}
                title="Toggle Mechanical Key SFX"
              >
                <span>{soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF'}</span>
              </button>

              <button 
                onClick={() => { playClickSound(); copyPhone(); }}
                className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-xs text-white flex items-center gap-2 transition"
                title="Copy Direct Phone Number"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>8088814686</span>
                {isCopiedPhone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            </div>
          </div>
        </div>

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

      {/* TIMELINE ITEM DETAIL MODAL */}
      {selectedTimelineItem && (
        <div 
          onClick={() => setSelectedTimelineItem(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#141416] border border-[#ffffff]/40 rounded-2xl overflow-hidden p-6 sm:p-8 shadow-[0_0_50px_rgba(255,255,255,0.15)] space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#ffffff] px-2.5 py-0.5 bg-[#ffffff]/10 border border-[#ffffff]/30 rounded">
                  {selectedTimelineItem.badge}
                </span>
                <div className="text-xs font-mono text-zinc-400 mt-1">{selectedTimelineItem.date}</div>
              </div>
              <button 
                onClick={() => setSelectedTimelineItem(null)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-mono text-white">{selectedTimelineItem.title}</h3>
              <p className="text-xs font-mono text-[#ffffff] uppercase tracking-wider">{selectedTimelineItem.subtitle}</p>
              <p className="text-sm font-sans text-zinc-300 leading-relaxed pt-2">{selectedTimelineItem.description}</p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Key Tags & Technologies</div>
              <div className="flex flex-wrap gap-2">
                {selectedTimelineItem.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-mono text-[#ffffff] bg-black/60 border border-[#ffffff]/30 px-3 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {selectedTimelineItem.link && (
                <div className="pt-2">
                  <a
                    href={selectedTimelineItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] text-black font-mono text-xs font-bold rounded hover:bg-white transition shadow-lg"
                  >
                    <span>View Reference / Verification Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
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

      {/* PROFILE PHOTO LIGHTBOX MODAL */}
      {selectedProfileImage && (
        <div 
          onClick={() => setSelectedProfileImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#141416] border border-[#ffffff]/40 rounded-2xl overflow-hidden p-4 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
          >
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="font-mono text-xs text-[#ffffff]">// Adithya A Shetty - Profile Identification</span>
              <button 
                onClick={() => setSelectedProfileImage(null)}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto flex items-center justify-center bg-black rounded-xl p-2 border border-white/10">
              <img src={selectedProfileImage} alt="Adithya A Shetty Profile" className="max-w-full max-h-[75vh] object-contain rounded" />
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

      {/* COMMAND PALETTE MODAL (CTRL + K) */}
      {isCommandPaletteOpen && (
        <div 
          onClick={() => setIsCommandPaletteOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 sm:pt-32 p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-[#141416] border border-white/25 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono"
          >
            {/* Header / Input */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/15 gap-3 bg-black/40">
              <Command className="w-5 h-5 text-white shrink-0" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                placeholder="Type a command or search sections (e.g. skills, certs, resume)..."
                className="w-full bg-transparent text-white text-sm outline-none placeholder:text-zinc-500 font-mono"
              />
              <span className="text-[10px] bg-white/10 text-zinc-300 px-2 py-0.5 rounded border border-white/15 shrink-0">ESC</span>
            </div>

            {/* Results / Commands list */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] text-zinc-500 uppercase tracking-wider">// NAVIGATION SECTIONS</div>
              {[
                { id: "home", label: "01 // About & Profile", icon: User, action: () => scrollToSection("home") },
                { id: "visual-skills", label: "02 // Visual Skills & Stack", icon: Code2, action: () => scrollToSection("visual-skills") },
                { id: "certifications", label: "03 // Certifications Vault", icon: Award, action: () => scrollToSection("certifications") },
                { id: "dsa", label: "04 // LeetCode & Achievements", icon: TrendingUp, action: () => scrollToSection("dsa") },
                { id: "projects", label: "05 // Project Repository", icon: Briefcase, action: () => scrollToSection("projects") },
                { id: "education", label: "06 // Education & System Logs", icon: GraduationCap, action: () => scrollToSection("education") },
                { id: "contact", label: "07 // Establish Connection", icon: Mail, action: () => scrollToSection("contact") },
              ]
                .filter(item => item.label.toLowerCase().includes(commandQuery.toLowerCase()))
                .map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        item.action();
                        setIsCommandPaletteOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between text-zinc-200 hover:text-white transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 text-white transition">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 group-hover:text-white font-mono flex items-center gap-1">Jump <ChevronRight className="w-3 h-3" /></span>
                    </button>
                  );
                })}

              <div className="px-3 pt-3 pb-1.5 text-[10px] text-zinc-500 uppercase tracking-wider">// QUICK ACTIONS</div>
              {[
                { 
                  label: "Download Professional Resume (PDF)", 
                  icon: Download, 
                  action: () => {
                    const link = document.createElement("a");
                    link.href = "/resume.pdf";
                    link.download = "Adithya_A_Shetty_Resume.pdf";
                    link.click();
                  } 
                },
                { 
                  label: "Copy Direct Phone (8088814686)", 
                  icon: Phone, 
                  action: () => { copyPhone(); } 
                },
                { 
                  label: "Toggle Sound Effects (SFX)", 
                  icon: Terminal, 
                  action: () => { setSoundEnabled(!soundEnabled); playClickSound(); } 
                },
              ]
                .filter(item => item.label.toLowerCase().includes(commandQuery.toLowerCase()))
                .map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        item.action();
                        setIsCommandPaletteOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between text-zinc-200 hover:text-white transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 text-white transition">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-medium">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 group-hover:text-white font-mono flex items-center gap-1">Run <ChevronRight className="w-3 h-3" /></span>
                    </button>
                  );
                })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-black/60 border-t border-white/15 flex items-center justify-between text-[11px] text-zinc-400">
              <span>ProTip: Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">Ctrl + K</kbd> anywhere</span>
              <span>Adithya A Shetty // CLI v2.6</span>
            </div>
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
