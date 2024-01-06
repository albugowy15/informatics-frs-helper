import Typography from "@/components/typography";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://github.com/albugowy15"
                className="hover:text-primary"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>albugowy15</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a href="https://bughowi.com" className="hover:text-primary">
                <GlobeIcon className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>https://bughowi.com</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://twitter.com/bughowy"
                className="hover:text-primary"
              >
                <TwitterLogoIcon className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>@bughowy</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                href="https://www.linkedin.com/in/bughowi/"
                className="hover:text-primary"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>bughowi</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
};

export default Footer;
