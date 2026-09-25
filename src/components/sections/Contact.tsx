import { useForm, ValidationError } from '@formspree/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SectionShell from '@/components/layout/SectionShell';
import Reveal from '@/components/layout/Reveal';

const fieldClass =
  'rounded-xl border-input bg-background/60 px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-foreground/20 focus-visible:border-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0';

const errorClass = 'mt-1.5 text-left text-sm text-red-400';

const Contact = () => {
  const [state, handleSubmit] = useForm('mjgedlad');

  return (
    <SectionShell id="contact" title="Contact" centered>
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-primary/25 via-border to-transparent opacity-70"
            aria-hidden
          />
          <div className="relative rounded-[1.75rem] bg-card p-6 text-left sm:p-8">
            {state.succeeded ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
                <p className="mt-4 text-lg font-medium text-foreground">Message sent. Thanks!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Input
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Name"
                      aria-label="Name"
                      className={`h-12 ${fieldClass}`}
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className={errorClass} />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="Email"
                      aria-label="Email"
                      className={`h-12 ${fieldClass}`}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className={errorClass} />
                  </div>
                </div>
                <div>
                  <Textarea
                    name="message"
                    required
                    placeholder="Message"
                    aria-label="Message"
                    className={`min-h-[160px] resize-none py-3 ${fieldClass}`}
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className={errorClass} />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background transition-colors hover:bg-foreground/90 disabled:pointer-events-none disabled:opacity-50"
                >
                  {state.submitting ? 'Sending…' : 'Send message'}
                  {!state.submitting && (
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
};

export default Contact;
