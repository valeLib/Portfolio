export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export const socials: SocialLink[] = [
  // {
  //   name: 'ArtStation',
  //   url: 'https://artstation.com/valentina_sofia',
  //   icon: 'artstation',
  //   username: '@yourusername',
  // },
  {
    name: 'GitHub',
    url: 'https://github.com/valeLib',
    icon: 'github',
    username: '@valeLib',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/valentina-liberona/?locale=en_US',
    icon: 'linkedin',
    username: 'Valentina Liberona',
  },
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/yourusername',
  //   icon: 'twitter',
  //   username: '@yourusername',
  // },
  // {
  //   name: 'YouTube',
  //   url: 'https://youtube.com/@yourusername',
  //   icon: 'youtube',
  //   username: '@yourusername',
  // },
];

export const contactEmail = 'your.email@example.com';
