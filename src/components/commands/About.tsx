import { AboutWrapper, HighlightAlt, HighlightSpan } from "../styles/About.styled";

const summary = [
  "I’m a Computer Science Engineering student passionate about technology, problem-solving, and building practical solutions.",
  "Currently focused on strengthening my programming fundamentals and mastering Data Structures & Algorithms.",
  "I have completed a Web Development internship with InAmigos, gaining hands-on development experience.",
  "I actively participate in college clubs, technical events, and hackathons.",
  "I have successfully completed 2 hackathons, gaining experience in teamwork, innovation, and problem-solving.",
  "Currently participating in the Smart India Hackathon (SIH), working with a team on a real-world problem statement.",
  "I enjoy learning beyond the traditional academic syllabus through hands-on projects and experimentation.",
  "My current goal is to become strong in DSA and core computer science fundamentals.",
  "My next goal is to explore and master Machine Learning, Deep Learning, and Computer Vision.",
  "Always learning, building, participating, and looking forward to creating meaningful technology."
];

const About: React.FC = () => (
  <AboutWrapper data-testid="about">
    <p>Hi, my name is <HighlightSpan>Adithya A Shetty</HighlightSpan>.</p>
    {summary.map((line, index) => (
      <p key={line}>{index === 0 ? <HighlightAlt>{line}</HighlightAlt> : line}</p>
    ))}
  </AboutWrapper>
);

export default About;
