export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  resume?: string;
  calLink?: string;
  socialLinks: SocialLink[];
}

export const profileData: ProfileData = {
  name: "Vansh Mundhra",
  tagline: "Software Engineer | Full Stack Developer | AI Engineer",
  bio: "Passionate about building scalable apps with cutting-edge technologies that solve real-world problems.",
  email: "vanshmundhra10may@gmail.com",
  phone: "+91 9098660071",
  location: "Chennai, India",
  avatar: "/profile.jpg",
  resume: "https://drive.google.com/file/d/1Veo9BgGlwh539JXPqQXGnblqJyTRO23k/view?usp=drive_link",
  calLink: "https://cal.com/vansh-mundhra-lricat",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/vansh007",
      icon: "github"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/vanshmundhra",
      icon: "linkedin"
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/VanshOnChain",
      icon: "twitter"
    },
    {
      platform: "Email",
      url: "mailto:vanshmundhra10may@gmail.com",
      icon: "mail"
    }
  ]
};
