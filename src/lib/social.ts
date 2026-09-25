import { FaEnvelope, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export const SOCIAL_LINKS: {
  href: string;
  label: string;
  icon: IconType;
  /** Brand color, a lighter tint readable on the dark page, and the text color to use on top of the brand. */
  brand: string;
  ink: string;
  onBrand: string;
}[] = [
  {
    href: 'https://linkedin.com/in/sohamja1n',
    label: 'LinkedIn',
    icon: FaLinkedin,
    brand: '#0A66C2',
    ink: '#5AA2F0',
    onBrand: '#FFFFFF',
  },
  {
    href: 'https://github.com/s0hamjain',
    label: 'GitHub',
    icon: FaGithub,
    brand: '#F0F6FC',
    ink: '#F0F6FC',
    onBrand: '#0D1117',
  },
  {
    href: 'https://www.youtube.com/@CodingWithSohamJain',
    label: 'YouTube',
    icon: FaYoutube,
    brand: '#FF0033',
    ink: '#FF4D6D',
    onBrand: '#FFFFFF',
  },
  {
    href: 'mailto:jainsoham01@gmail.com',
    label: 'Email',
    icon: FaEnvelope,
    brand: '#8AB4F8',
    ink: '#8AB4F8',
    onBrand: '#0B0B0F',
  },
];

export const socialLinkProps = (href: string) =>
  href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
