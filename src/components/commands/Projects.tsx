import { useContext, useEffect } from "react";
import { checkRedirect, getCurrentCmdArry, isArgInvalid } from "../../utils/funcs";
import { ProjectContainer, ProjectDesc, ProjectsIntro, ProjectTitle } from "../styles/Projects.styled";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Projects: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);
  const currentCommand = getCurrentCmdArry(history);

  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "projects")) {
      projects.forEach(({ id, url }) => {
        if (id === parseInt(arg[1])) window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  const checkArg = () => isArgInvalid(arg, "go", ["1", "2"]) ? <Usage cmd="projects" /> : null;

  return arg.length > 0 || arg.length > 2 ? checkArg() : (
    <div data-testid="projects">
      <ProjectsIntro>Practical software projects and experiments:</ProjectsIntro>
      {projects.map(({ id, title, desc }) => (
        <ProjectContainer key={id}>
          <ProjectTitle>{`${id}. ${title}`}</ProjectTitle>
          <ProjectDesc>{desc}</ProjectDesc>
        </ProjectContainer>
      ))}
      <Usage cmd="projects" marginY />
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: "Library Management System",
    desc: "A Python and OOP-based system with JSON persistence for book inventory, members, search, and issue/return workflows.",
    url: "https://github.com/adithyaashetty2007-a11y/LibraryManagementSystem",
  },
  {
    id: 2,
    title: "Traffic Density Estimation System",
    desc: "A computer vision project using Python, OpenCV, and YOLOv8 to detect vehicles, classify traffic density, and log trends.",
    url: "https://github.com/adithyaashetty2007-a11y",
  },
];

export default Projects;
