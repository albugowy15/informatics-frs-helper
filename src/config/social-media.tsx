import {
  GitHubLogoIcon,
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

interface SocialMediaLink {
  name: string;
  username: string;
  url: string;
  icon: React.ReactNode;
}

export const socialMedia: SocialMediaLink[] = [
  {
    name: "Github",
    username: "albugowy15",
    url: "https://github.com/albugowy15",
    icon: <GitHubLogoIcon className="h-5 w-5" />,
  },
  {
    name: "Blog",
    username: "https://bughowi.com",
    url: "https://bughowi.com",
    icon: <GlobeIcon className="h-5 w-5" />,
  },
  {
    name: "Twitter",
    username: "@bughowy",
    url: "https://twitter.com/bughowy",
    icon: <TwitterLogoIcon className="h-5 w-5" />,
  },
  {
    name: "LinkedIn",
    username: "Mohamad Kholid Bughowi",
    url: "https://www.linkedin.com/in/bughowi",
    icon: <LinkedInLogoIcon className="h-5 w-5" />,
  },
];
