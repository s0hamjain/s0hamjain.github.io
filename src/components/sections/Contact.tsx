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
      <SectionShell id="contact" containerClassName="max-w-4xl">
        <div className="animate-fade-up">
          <SectionHeader kicker="contact" title="Contact Me" />
          <div
            className="card-surface flex flex-col items-center justify-center p-12 text-center sm:p-16"
            style={{
              boxShadow:
                '0 0 0 1px rgba(148, 163, 184, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px -10px rgba(34, 197, 94, 0.2)',
            }}
          >
            <div className="mb-6 rounded-full bg-emerald-500/10 p-4">
              <CheckCircle2 className="h-14 w-14 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-white sm:text-3xl">
              Message sent
            </h3>
            <p className="text-base text-white sm:text-lg">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="contact" containerClassName="max-w-4xl">
      <div className="animate-fade-up">
        <SectionHeader kicker="contact" title="Contact Me" />

        <div className="card-surface shadow-card-glow p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="h-10 bg-[#1a1a1f] border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
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
                  className="h-10 bg-[#1a1a1f] border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
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
                placeholder="e.g. Project inquiry, collaboration, or opportunity"
                className="h-10 bg-[#1a1a1f] border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
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
                placeholder="Type your message here..."
                rows={5}
                className="min-h-[128px] bg-[#1a1a1f] border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none rounded-xl py-3"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm" />
            </div>

            <Button
              type="submit"
              size="default"
              disabled={state.submitting}
              className="w-full border-0 primary-gradient font-medium text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 rounded-xl"
            >
              {state.submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </SectionShell>
  );
};

export default Contact;
