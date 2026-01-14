export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export const socials: SocialLink[] = [
  {
    name: 'ArtStation',
    url: 'https://artstation.com/yourusername',
    icon: 'artstation',
    username: '@yourusername',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github',
    username: '@yourusername',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin',
    username: 'Your Name',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter',
    username: '@yourusername',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@yourusername',
    icon: 'youtube',
    username: '@yourusername',
  },
];

export const contactEmail = 'your.email@example.com';
