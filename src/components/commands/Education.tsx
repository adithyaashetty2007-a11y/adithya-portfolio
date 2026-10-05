import { EduIntro, EduList } from "../styles/Education.styled";
import { Wrapper } from "../styles/Output.styled";

const Education: React.FC = () => (
  <Wrapper data-testid="education">
    <EduIntro>Education and experience background:</EduIntro>
    {eduBg.map(({ title, desc }) => (
      <EduList key={title}>
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
      </EduList>
    ))}
  </Wrapper>
);

const eduBg = [
  { title: "B.E. Computer Science & Engineering", desc: "St. Joseph Engineering College, Mangaluru | 2024 ~ 2028 (Expected)" },
  { title: "Web Development Internship", desc: "InAmigos | Completed" },
  { title: "Smart India Hackathon (SIH)", desc: "Currently participating with a team on a real-world problem statement" },
];

export default Education;
