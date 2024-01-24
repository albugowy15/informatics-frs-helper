import Typography from "@/components/typography";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { socialMedia } from "@/config/social-media";

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full justify-between px-4 py-4 text-muted-foreground md:px-10">
      <Typography
        variant="label1"
        className="text-center leading-normal md:text-left"
      >
        Built by{" "}
        <a
          href="https://github.com/albugowy15"
          className="underline underline-offset-4 hover:text-primary"
        >
          albugowy15
        </a>
        . The source code is available on{" "}
        <a
          href="https://github.com/albugowy15/informatics-frs-helper"
          className="underline underline-offset-4 hover:text-primary"
        >
          GitHub
        </a>
        .
      </Typography>
      <div className="hidden gap-5 md:flex">
        {socialMedia.map((social, idx) => (
          <TooltipProvider key={idx}>
            <Tooltip>
              <TooltipTrigger>
                <a href={social.url} className="hover:text-primary">
                  {social.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent>{social.username}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
