import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionShell from '@/components/layout/SectionShell';
import resumePdf from '@/assets/resume.pdf';

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Soham_Jain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionShell id="about" containerClassName="max-w-7xl">
      <div className="mx-auto w-[min(100%,57rem)]">
        <div className="card-surface shadow-terminal overflow-hidden">
            <div className="relative flex min-h-12 items-center border-b border-slate-700/60 bg-[#2d2d2d] px-4 py-3 sm:px-5">
              <div className="relative z-10 flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              {/* True horizontal center of the bar (ignores uneven left/right control widths) */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-24 sm:px-28">
                <div className="pointer-events-auto flex max-w-full min-w-0 items-center justify-center gap-2 text-sm font-medium text-slate-200">
                  <FileText className="h-4 w-4 shrink-0 text-slate-200" aria-hidden />
                  <span className="truncate">Soham_Jain_Resume.pdf</span>
                </div>
              </div>
              <div className="relative z-10 ml-auto shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="text-slate-200 hover:text-emerald-400 hover:bg-slate-800/40"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          <div className="relative bg-[#111118]" style={{ height: 'min(78vh, 960px)' }}>
              <iframe
                src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-0"
                title="Soham Jain Resume"
                loading="lazy"
              />
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default Resume;
