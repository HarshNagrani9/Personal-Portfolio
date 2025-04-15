import { Github, Linkedin, Mail, Code, ExternalLink, Trophy, Zap, TrendingUp } from "lucide-react";

// Social icons
export const SocialIcons = {
  Github: <Github />,
  Linkedin: <Linkedin />,
  Mail: <Mail />,
  Code: <Code />
};

// Project icons
export const ProjectIcons = {
  Github: <Github />,
  ExternalLink: <ExternalLink />,
  Trophy: <Trophy className="text-yellow-500" />,
  Zap: <Zap className="text-yellow-500" />,
  TrendingUp: <TrendingUp className="text-green-500" />
};

// Export icon sizes
export const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

export const getIconWithSize = (icon: JSX.Element, size: number) => {
  return {
    ...icon,
    props: {
      ...icon.props,
      size
    }
  };
};
