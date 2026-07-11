import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import profileImage from '@/assets/8898.jpg';
import { HERO_SECTION_LINKS } from '@/lib/siteRoutes';

const NAME_TYPEWRITER = 'Soham Jain';

const INTRO_COMMAND = 'cat sections.txt';

const NAME_TYPING_DURATION_MS = 900;
const TERMINAL_TYPING_MS = 50;

const SOCIAL_LINKS = [
  { href: 'mailto:jainsoham01@gmail.com', label: 'Email', icon: Mail, colorClass: 'text-rose-400' },
  {
    href: 'https://www.linkedin.com/in/soham-jain1/',
    label: 'LinkedIn',
    icon: Linkedin,
    colorClass: 'text-blue-400',
  },
  { href: 'https://github.com/sjain2025', label: 'GitHub', icon: Github, colorClass: 'text-slate-300' },
  {
    href: 'https://www.youtube.com/@CodingWithSohamJain',
    label: 'YouTube',
    icon: Youtube,
    colorClass: 'text-red-500',
  },
];

const ROLES = ['Software Engineer', 'AI Researcher', 'Innovator'];

const Hero = () => {
  const navigate = useNavigate();
  const [nameProgress, setNameProgress] = useState(0);
  const [terminalChars, setTerminalChars] = useState(0);
  const [showSections, setShowSections] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const nameStartRef = useRef<number | null>(null);
  const nameMeasureRef = useRef<HTMLSpanElement>(null);
  const [nameGradientWidthPx, setNameGradientWidthPx] = useState<number>();

  const updateNameGradientWidth = useCallback(() => {
    const el = nameMeasureRef.current;
    if (el) setNameGradientWidthPx(el.offsetWidth);
  }, []);

  // Lock gradient to the final name width so it never rescales mid-animation.
  useLayoutEffect(() => {
    updateNameGradientWidth();
    void document.fonts?.ready?.then(updateNameGradientWidth);
  }, [updateNameGradientWidth]);

  useEffect(() => {
    const el = nameMeasureRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => updateNameGradientWidth());
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateNameGradientWidth]);

  // Name typing: rAF-driven linear progress for a constant speed.
  useEffect(() => {
    let rafId: number;
    const tick = (timestamp: number) => {
      if (nameStartRef.current === null) nameStartRef.current = timestamp;
      const elapsed = timestamp - nameStartRef.current;
      const t = Math.min(elapsed / NAME_TYPING_DURATION_MS, 1);
      setNameProgress(t * NAME_TYPEWRITER.length);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const nameChars = Math.floor(nameProgress);
  const nameTyping = nameChars < NAME_TYPEWRITER.length;

  // Terminal typing: type command, then reveal section links.
  useEffect(() => {
    if (terminalChars < INTRO_COMMAND.length) {
      const t = setTimeout(() => setTerminalChars((c) => c + 1), TERMINAL_TYPING_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowSections(true), 400);
    return () => clearTimeout(t);
  }, [terminalChars]);

  // Blinking cursor (blinks only once typing is done; solid while typing, like a real terminal)
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 520);
    return () => clearInterval(id);
  }, []);

  const terminalTyping = terminalChars < INTRO_COMMAND.length;
  const heroCursorOn = nameTyping || cursorVisible;
  const terminalCursorOn = terminalTyping || cursorVisible;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        {/* "Hi, I'm" + name. The invisible sizer reserves the final width so the
            centered line never shifts while characters are typed (no stutter). */}
        <div className="mb-8 text-center lg:mb-10">
          <h1
            className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            aria-label={`Hi, I'm ${NAME_TYPEWRITER}`}
          >
            <span className="relative inline-block whitespace-nowrap" aria-hidden>
              <span className="invisible">
                <span>Hi, I'm </span>
                <span ref={nameMeasureRef}>{NAME_TYPEWRITER}</span>
                <span className="ml-0.5 inline-block w-1" />
              </span>
              <span className="absolute left-0 top-0 whitespace-nowrap">
                <span className="text-slate-300">Hi, I'm </span>
                <span
                  className="inline-block bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 bg-clip-text bg-no-repeat text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
                  style={
                    nameGradientWidthPx != null
                      ? {
                          backgroundSize: `${nameGradientWidthPx}px 100%`,
                          backgroundPosition: 'left center',
                        }
                      : undefined
                  }
                >
                  {NAME_TYPEWRITER.slice(0, nameChars)}
                </span>
                <span
                  className={`ml-0.5 inline-block h-[0.9em] w-1 bg-blue-500 align-middle ${heroCursorOn ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transition: 'opacity 0.15s ease-out', transform: 'translateY(-2px)' }}
                />
              </span>
            </span>
          </h1>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base sm:text-lg">
            {ROLES.map((role, i) => (
              <span key={role} className="contents">
                {i > 0 && (
                  <span className="text-slate-500" aria-hidden>
                    ·
                  </span>
                )}
                <span className="rounded-md bg-slate-800/60 px-3 py-1.5 font-medium text-slate-300 ring-1 ring-slate-700/50">
                  {role}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Terminal + photo */}
        <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
          <div className="card-surface shadow-terminal mx-auto w-full max-w-xl overflow-hidden lg:mx-0">
            <div className="flex items-center gap-2 border-b border-slate-700/60 bg-[#2d2d2d] px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" title="Close" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" title="Minimize" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" title="Maximize" />
              </div>
              <span className="flex-1 text-center font-mono text-xs tracking-wide text-slate-400">
                portfolio — zsh
              </span>
            </div>
            <div className="flex h-[360px] flex-col overflow-hidden bg-[#1a1a1f] p-4 font-mono text-sm sm:p-5 sm:text-base">
              <div className="mb-2 flex shrink-0 flex-wrap items-center gap-1">
                <span className="shrink-0 text-emerald-400">{'~'}</span>
                <span className="shrink-0 text-slate-500">{' $ '}</span>
                <span className="text-slate-100">{INTRO_COMMAND.slice(0, terminalChars)}</span>
                <span
                  className={`ml-0.5 inline-block h-4 w-1 bg-emerald-400 align-middle ${terminalCursorOn ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transition: 'opacity 0.15s ease-out',
                    transform: 'translate(-0.5px, -1px)',
                  }}
                  aria-hidden
                />
              </div>
              {showSections && (
                <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-1">
                  {HERO_SECTION_LINKS.map(({ to, description }, index) => (
                    <button
                      key={to}
                      type="button"
                      onClick={() => navigate(to)}
                      className="animate-terminal-item-in flex min-h-0 w-full flex-1 items-center rounded-xl border border-transparent bg-transparent px-3 py-2 text-left font-mono text-sm text-slate-300 transition-all duration-200 hover:border-slate-600/50 hover:bg-slate-700/40 hover:text-emerald-400 sm:text-base"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {description}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-shrink-0 justify-center lg:ml-12 lg:items-start lg:justify-end">
            <div className="card-surface shadow-terminal relative h-72 w-72 overflow-hidden sm:h-80 sm:w-80 lg:h-[408px] lg:w-[408px]">
              <img
                src={profileImage}
                alt="Soham Jain"
                className="h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, colorClass }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/30 transition-all duration-200 hover:border-slate-600/50 hover:bg-slate-700/40 ${colorClass}`}
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
