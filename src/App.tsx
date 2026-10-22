import { createContext } from "react";
import { DefaultTheme } from "styled-components";
import "./landing.css";

export const themeContext = createContext<((theme: DefaultTheme) => void) | null>(null);

const projects = [
  {
    number: "01",
    title: "Library Management System",
    description:
      "A Python and OOP-based system with JSON persistence for inventory, member records, search, and issue/return workflows.",
    tags: ["Python", "OOP", "JSON"],
    href: "https://github.com/adithyaashetty2007-a11y",
  },
  {
    number: "02",
    title: "Traffic Density Estimation",
    description:
      "A computer vision project using Python, OpenCV, and YOLOv8 to detect vehicles, classify traffic density, and log trends.",
    tags: ["Python", "OpenCV", "YOLOv8"],
    href: "https://github.com/adithyaashetty2007-a11y",
  },
];

const resumeHref = "/adithya-portfolio/Adithya_A_Shetty_Resume_clean.pdf";

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Adithya A Shetty home">
          ADITHYA<span>/</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#projects">PROJECTS</a>
          <a href="#experience">EXPERIENCE</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow">// COMPUTER SCIENCE ENGINEERING STUDENT</p>
            <h1>
              ADITHYA<span>A SHETTY.</span>
            </h1>
            <div className="location-line">
              <span>Mangaluru, India</span>
              <i aria-hidden="true" />
              <strong>Available for opportunities</strong>
            </div>
            <p className="hero-lede">Building practical solutions through code, curiosity, and continuous learning.</p>
            <p className="hero-description">
              I am focused on DSA, full-stack development, and exploring Machine Learning, Deep Learning, and Computer Vision through hands-on projects.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">SEE MY WORK <span>↗</span></a>
              <a className="button button-outline" href="#contact">GET IN TOUCH <span>↗</span></a>
            </div>
          </div>

          <div className="terminal-card" aria-label="Adithya profile summary">
            <div className="terminal-topbar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="terminal-title">adithya@portfolio ~</span>
            </div>
            <div className="terminal-body">
              <p><b className="prompt">▸</b> cat biography.ts</p>
              <p className="code-muted">class <em>Adithya</em> &#123;</p>
              <p className="code-line"><span>name</span> = <em>'Adithya A Shetty'</em>;</p>
              <p className="code-line"><span>role</span> = <em>'CSE Student // Builder'</em>;</p>
              <p className="code-line"><span>focus</span> = <em>'DSA &amp; Computer Vision'</em>;</p>
              <p className="code-muted">&#125;</p>
              <br />
              <p><b className="prompt">▸</b> ./launch_mission --status</p>
              <p className="terminal-green">▸ System stable. Learning in progress.</p>
              <p className="terminal-green">▸ Current goal: Build meaningful technology.</p>
              <p><b className="prompt">▸</b> <span className="cursor" /></p>
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">// SELECTED WORK</p>
            <h2>Projects<span>.</span></h2>
            <p>Experiments and practical systems built while learning.</p>
          </div>
          <div className="project-grid">
            {projects.map(project => (
              <article className="project-card" key={project.number}>
                <div className="project-number">{project.number}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <a className="text-link" href={project.href} target="_blank" rel="noreferrer">VIEW ON GITHUB ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="content-section split-section">
          <div className="section-heading">
            <p className="eyebrow">// EXPERIENCE &amp; JOURNEY</p>
            <h2>What I’m building<span>.</span></h2>
          </div>
          <div className="timeline">
            <div className="timeline-item"><span>2025 — PRESENT</span><div><h3>Computer Science Engineering Student</h3><p>Strengthening programming fundamentals, DSA, and core computer science concepts.</p></div></div>
            <div className="timeline-item"><span>COMPLETED</span><div><h3>Web Development Intern · InAmigos</h3><p>Gained hands-on experience building and understanding practical web development workflows.</p></div></div>
            <div className="timeline-item"><span>ONGOING</span><div><h3>Smart India Hackathon · Team Participant</h3><p>Working with a team on a real-world problem statement through research, ideation, and implementation.</p></div></div>
          </div>
        </section>

        <section id="about" className="content-section about-section">
          <div className="section-heading"><p className="eyebrow">// OUT OF SYLLABUS</p><h2>About me<span>.</span></h2></div>
          <div className="about-copy">
            <p>I’m passionate about technology, problem-solving, and building practical solutions. I actively participate in college clubs, technical events, and hackathons, and have successfully completed two hackathons.</p>
            <p>I enjoy learning beyond the traditional academic syllabus through hands-on projects and experimentation. My next goal is to explore and master Machine Learning, Deep Learning, and Computer Vision.</p>
            <a className="resume-link" href={resumeHref} target="_blank" rel="noreferrer">DOWNLOAD RESUME ↗</a>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <p className="eyebrow">// LET’S CONNECT</p>
          <h2>Have a project or idea<span>?</span></h2>
          <p>I’m always open to learning, building, and creating meaningful technology.</p>
          <a className="button button-primary" href="mailto:adithyaashetty2007@gmail.com">SEND AN EMAIL <span>↗</span></a>
          <div className="contact-links"><a href="https://github.com/adithyaashetty2007-a11y" target="_blank" rel="noreferrer">GITHUB</a><a href="https://www.linkedin.com/in/adithya-a-shetty-421097382" target="_blank" rel="noreferrer">LINKEDIN</a><a href={resumeHref}>RESUME</a></div>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} ADITHYA A SHETTY</span><span>BUILT WITH CURIOSITY // ALWAYS LEARNING</span></footer>
    </div>
  );
}

export default App;
