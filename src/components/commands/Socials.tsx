import { useContext, useEffect } from "react";
import { ProjectsIntro } from "../styles/Projects.styled";
import { Cmd, CmdDesc, CmdList, HelpWrapper } from "../styles/Help.styled";
import { checkRedirect, generateTabs, getCurrentCmdArry, isArgInvalid } from "../../utils/funcs";
import { termContext } from "../Terminal";
import Usage from "../Usage";

const Socials: React.FC = () => {
  const { arg, history, rerender } = useContext(termContext);
  const currentCommand = getCurrentCmdArry(history);

  useEffect(() => {
    if (checkRedirect(rerender, currentCommand, "socials")) {
      socials.forEach(({ id, url }) => {
        if (id === parseInt(arg[1])) window.open(url, "_blank");
      });
    }
  }, [arg, rerender, currentCommand]);

  const checkArg = () => isArgInvalid(arg, "go", ["1", "2", "3"]) ? <Usage cmd="socials" /> : null;

  return arg.length > 0 || arg.length > 2 ? checkArg() : (
    <HelpWrapper data-testid="socials">
      <ProjectsIntro>Connect with Adithya:</ProjectsIntro>
      {socials.map(({ id, title, url, tab }) => (
        <CmdList key={title}>
          <Cmd>{`${id}. ${title}`}</Cmd>
          {generateTabs(tab)}
          <CmdDesc>- {url}</CmdDesc>
        </CmdList>
      ))}
      <Usage cmd="socials" marginY />
    </HelpWrapper>
  );
};

const socials = [
  { id: 1, title: "GitHub", url: "https://github.com/adithyaashetty2007-a11y", tab: 3 },
  { id: 2, title: "LinkedIn", url: "https://www.linkedin.com/in/adithya-a-shetty-421097382", tab: 2 },
  { id: 3, title: "Email", url: "mailto:adithyaashetty2007@gmail.com", tab: 2 },
];

export default Socials;
