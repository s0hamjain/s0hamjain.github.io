import { smoothScrollTo } from '@/lib/smoothScroll';

/** Section ids on the single-page site (match each section's `id`). */
export const SECTION_IDS = ['home', 'projects', 'publications', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
];

/** Old URLs that now point at a renamed section. */
const SECTION_ALIASES: Record<string, SectionId> = { research: 'publications' };

export const resolveSection = (value: string): SectionId | null =>
  (SECTION_IDS as readonly string[]).includes(value) ? (value as SectionId) : (SECTION_ALIASES[value] ?? null);

/** Smooth-scroll to a section and reflect it in the URL hash. */
export const scrollToSection = (id: SectionId) => {
  const el = document.getElementById(id);
  if (!el) return;
  smoothScrollTo(id === 'home' ? 0 : el);
  window.history.replaceState(null, '', id === 'home' ? '/' : `#${id}`);
};
