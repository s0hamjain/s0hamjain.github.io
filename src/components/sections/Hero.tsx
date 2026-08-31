import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import profileImage from '@/assets/8898.jpg';
import { HERO_SECTION_LINKS } from '@/lib/siteRoutes';

const NAME_TYPEWRITER = 'Soham Jain';

const INTRO_COMMAND = 'cat sections.txt';

const NAME_TYPING_MS = 60;
const TERMINAL_TYPING_MS = 35;

const SOCIAL_LINKS = [
  { href: 'mailto:jainsoham01@gmail.com', label: 'Email', icon: Mail, color: 'text-emerald-400/80' },
  { href: 'https://linkedin.com/in/sohamja1n', label: 'LinkedIn', icon: Linkedin, color: 'text-[#5b9bd5]' },
  { href: 'https://github.com/s0hamjain', label: 'GitHub', icon: Github, color: 'text-slate-300' },
  { href: 'https://www.youtube.com/@CodingWithSohamJain', label: 'YouTube', icon: Youtube, color: 'text-[#e06060]' },
];

const ROLES = ['Student', 'Software Engineer', 'AI Developer'];

const Hero = () => {
  const navigate = useNavigate();
  const [nameChars, setNameChars] = useState(0);
  const [terminalChars, setTerminalChars] = useState(0);
  const [showSections, setShowSections] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (nameChars < NAME_TYPEWRITER.length) {
      const t = setTimeout(() => setNameChars((c) => c + 1), NAME_TYPING_MS);
      return () => clearTimeout(t);
    }
  }, [nameChars]);

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
  const heroCursorOn = nameChars < NAME_TYPEWRITER.length || cursorVisible;
  const terminalCursorOn = terminalTyping || cursorVisible;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center lg:mb-10">
          <h1
            className="text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            aria-label={`Hi, I'm ${NAME_TYPEWRITER}`}
          >
            <span className="font-sans text-white/60">Hi, I'm </span>
            <span className="font-sans font-bold text-emerald-400" aria-hidden>
              {NAME_TYPEWRITER.slice(0, nameChars)}
            </span>
            <span
              className={`inline-block h-[0.82em] w-[3px] bg-emerald-400 align-middle ${heroCursorOn ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'opacity 0.15s ease-out', transform: 'translateY(-3px)' }}
            />
            <span className="font-sans font-bold text-transparent" aria-hidden>
              {NAME_TYPEWRITER.slice(nameChars)}
            </span>
          </h1>
          <p className="mt-5 font-mono text-[13px] tracking-wide text-slate-400 sm:text-sm">
            {ROLES.map((role, i) => (
              <span key={role}>
                {i > 0 && <span className="mx-2 text-slate-600">/</span>}
                <span>{role.toLowerCase()}</span>
              </span>
            ))}
          </p>
        </div>

        {/* Terminal + photo */}
        <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:gap-8">
          <div className="card-surface shadow-terminal order-2 mx-auto w-full max-w-xl overflow-hidden lg:order-1 lg:mx-0">
            <div className="relative flex items-center gap-2 border-b border-slate-700/60 bg-[#2d2d2d] px-4 py-3">
              <div className="relative z-10 flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[#ff5f57]" title="Close" />
                <div className="h-3 w-3 rounded-full bg-[#febc2e]" title="Minimize" />
                <div className="h-3 w-3 rounded-full bg-[#28c840]" title="Maximize" />
              </div>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-20">
                <span className="text-center font-mono text-xs tracking-wide text-slate-400">
                  portfolio — zsh
                </span>
              </div>
            </div>
            <div className="flex h-[300px] flex-col overflow-hidden bg-[#1a1a1f] p-4 font-mono text-sm sm:h-[320px] sm:p-5 sm:text-base lg:h-[360px]">
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
                      className="animate-terminal-item-in flex min-h-0 w-full flex-1 items-center gap-2 rounded-md px-3 py-2 text-left font-mono text-sm text-slate-400 transition-all duration-150 hover:bg-slate-800/60 hover:text-emerald-400 sm:text-base"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <span className="text-slate-600">{'>'}</span>
                      {description.toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="order-1 flex flex-shrink-0 justify-center lg:order-2 lg:ml-12 lg:items-start lg:justify-end">
            <div className="card-surface shadow-terminal relative h-56 w-56 overflow-hidden sm:h-72 sm:w-72 lg:h-[380px] lg:w-[380px]">
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
          {SOCIAL_LINKS.map(({ href, label, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/30 ${color} transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/60`}
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
