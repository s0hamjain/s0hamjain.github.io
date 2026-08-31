import type { ReactNode } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle2, Mail, Send, Type, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { cn } from '@/lib/utils';

const fieldClass =
  'h-11 rounded-xl border-slate-700/50 bg-slate-950/50 pl-11 pr-4 text-white placeholder:text-slate-500 transition-colors duration-200 hover:border-slate-600/60 focus:border-sky-400/50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0';

const FieldShell = ({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof User;
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn('relative', className)}>
    <Icon
      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
      aria-hidden
    />
    {children}
  </div>
);

const TerminalChrome = ({ title }: { title: string }) => (
  <div className="relative flex shrink-0 items-center gap-2 border-b border-slate-700/60 bg-[#2d2d2d] px-4 py-2.5">
    <div className="relative z-10 flex gap-2">
      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
      <div className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
      <div className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
    </div>
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-20">
      <span className="text-center font-mono text-xs tracking-wide text-slate-400">{title}</span>
    </div>
  </div>
);

const Contact = () => {
  const [state, handleSubmit] = useForm('mjgedlad');

  return (
    <SectionShell
      id="contact"
      className="flex h-full min-h-0 flex-col overflow-hidden pb-4 md:pb-5"
      containerClassName="mx-auto flex max-w-3xl min-h-0 flex-1 flex-col"
    >
      <SectionHeader title="Contact" className="mb-5 shrink-0 md:mb-6" />

      <div className="card-surface shadow-terminal animate-fade-up flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <TerminalChrome title="contact - zsh" />

        {state.succeeded ? (
          <div className="flex flex-1 flex-col items-center justify-center bg-[#14151a] px-8 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" strokeWidth={1.75} />
            </div>
            <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">Message sent</h3>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col gap-3 bg-[#14151a] p-5 sm:gap-3.5 sm:p-6"
          >
            <div className="grid shrink-0 gap-3 sm:grid-cols-2">
              <div>
                <FieldShell icon={User}>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    aria-label="Name"
                    placeholder="Name"
                    className={fieldClass}
                  />
                </FieldShell>
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="mt-1.5 text-sm text-red-400"
                />
              </div>
              <div>
                <FieldShell icon={Mail}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-label="Email"
                    placeholder="Email"
                    className={fieldClass}
                  />
                </FieldShell>
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="mt-1.5 text-sm text-red-400"
                />
              </div>
            </div>

            <div className="shrink-0">
              <FieldShell icon={Type}>
                <Input
                  id="subject"
                  name="subject"
                  required
                  aria-label="Subject"
                  placeholder="Subject"
                  className={fieldClass}
                />
              </FieldShell>
              <ValidationError
                prefix="Subject"
                field="subject"
                errors={state.errors}
                className="mt-1.5 text-sm text-red-400"
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <Textarea
                id="message"
                name="message"
                required
                aria-label="Message"
                placeholder="Write your message..."
                className="min-h-0 flex-1 resize-none rounded-xl border-slate-700/50 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-500 transition-colors duration-200 hover:border-slate-600/60 focus:border-sky-400/50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="mt-1.5 text-sm text-red-400"
              />
            </div>

            <Button
              type="submit"
              disabled={state.submitting}
              className="h-11 w-full shrink-0 rounded-xl border-0 bg-gradient-to-r from-sky-500 to-violet-500 font-medium text-white shadow-md transition-all duration-200 hover:from-sky-400 hover:to-violet-400 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50"
            >
              {state.submitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send message
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </SectionShell>
  );
};

export default Contact;
