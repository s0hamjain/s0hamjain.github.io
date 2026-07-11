import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';

const Contact = () => {
  const [state, handleSubmit] = useForm('mjgedlad');

  if (state.succeeded) {
    return (
      <SectionShell id="contact" containerClassName="max-w-5xl">
        <div className="animate-fade-up">
          <SectionHeader title="Contact" />
          <div className="card-surface shadow-card-glow flex flex-col items-center justify-center p-10 text-center sm:p-14">
            <div className="mb-6 rounded-full bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">Message sent</h3>
            <p className="text-base text-muted-foreground">
              Thanks for reaching out! I&apos;ll reply soon.
            </p>
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="contact" containerClassName="max-w-5xl">
      <div className="animate-fade-up">
        <SectionHeader title="Contact" />
        <p className="mx-auto mb-10 max-w-2xl text-center text-base text-muted-foreground">
          Open to internships, research collaborations, and full-stack projects. Share a few
          details and I&apos;ll respond quickly.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div className="card-surface shadow-card-glow p-6">
              <h3 className="text-lg font-semibold text-white">Quick details</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based in Pittsburgh during the school year and Washington, DC in the summer.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                  <a className="text-primary hover:text-primary/80" href="mailto:jainsoham01@gmail.com">
                    jainsoham01@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">LinkedIn</p>
                  <a
                    className="text-primary hover:text-primary/80"
                    href="https://linkedin.com/in/sohamja1n"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/sohamja1n
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/50 bg-[#101216] p-6 text-sm text-muted-foreground">
              <p className="font-medium text-white">Preferred topics</p>
              <ul className="mt-3 space-y-2">
                <li>Incident response tooling and platform engineering</li>
                <li>AI-assisted developer workflows</li>
                <li>Full-stack product builds</li>
              </ul>
            </div>
          </div>

          <div className="card-surface shadow-card-glow p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="h-11 rounded-lg border-slate-700/60 bg-[#0f1115] text-white placeholder:text-slate-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="h-11 rounded-lg border-slate-700/60 bg-[#0f1115] text-white placeholder:text-slate-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-white">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Project inquiry, research opportunity, or collaboration"
                  className="h-11 rounded-lg border-slate-700/60 bg-[#0f1115] text-white placeholder:text-slate-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-400 text-sm" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about the role or project..."
                  rows={5}
                  className="min-h-[140px] resize-none rounded-lg border-slate-700/60 bg-[#0f1115] py-3 text-white placeholder:text-slate-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm" />
              </div>

              <Button
                type="submit"
                size="default"
                disabled={state.submitting}
                className="w-full rounded-lg border-0 bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
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
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default Contact;
