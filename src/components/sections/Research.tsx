import { FileText, Award, Users, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import SectionShell from '@/components/layout/SectionShell';
import SectionHeader from '@/components/layout/SectionHeader';

const Research = () => {
  type Publication = {
    title: string;
    authors: string;
    venue: string;
    type: string;
    award: string | null;
    description: string;
    keywords: string[];
    impact: string | null;
    link: string;
  };

  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  // Show just the first couple sentences to keep cards clean
  const getTruncatedAbstract = (text: string) => {
    const sentences = text.split('. ');
    if (sentences.length <= 2) return text;
    return sentences.slice(0, 2).join('. ') + '...';
  };

  const publications: Publication[] = [
    {
      title: "LapseNet: A Hybrid CNN-LSTM Approach for Accurate and Efficient Vision-Based Fall Detection",
      authors: "Soham Jain, Shaurya Jain, Anmol Karan",
      venue: "6th International Conference on Robotics and Computer Vision (ICRCV)",
      type: "First Author",
      award: "Best Presentation Award",
      description: "Falls are a major cause of injury and death among the elderly population, particularly in unsupervised settings where victims often remain unattended for extended periods of time. Such incidents can lead to long-term physical and mental disturbances such as fractures, skin burns, blood loss, and trauma. A reliable and effective fall detection system can ensure that support is provided immediately, improving chances of recovery for victims. A diverse range of fall detection methods have been studied and tested, but most have high false positive rates and limited robustness in real-world scenarios. In this study, we present LapseNet, a hybrid convolutional neural network with long short-term memory to detect falls in indoor settings. We utilized data from four publicly available sources, with a total of 250 videos for training and testing the model, which distinguishes between a) falls and b) activities of daily living. LapseNet achieved a training accuracy of 99.43% and a promising testing and validation accuracy of 100%. These results demonstrate the potential to significantly improve elderly care and safety by enabling timely interventions and reducing the risk of long-term complications from falls.",
      keywords: ["Computer Vision", "Deep Learning", "CNN-LSTM", "Fall Detection", "Healthcare AI"],
      impact: "Indoor fall detection using hybrid CNN and LSTM model.",
      link: "https://ieeexplore.ieee.org/document/10758566"
    },
    {
      title: "A Transformer-Based Approach to Diagnose Amyotrophic Lateral Sclerosis via EEG Analysis",
      authors: "Soham Jain",
      venue: "17th International Conference on Advanced Computer Theory and Engineering (ICACTE)",
      type: "First Author",
      award: null,
      description: "Neurodegenerative disorders are the leading cause of physical disability worldwide. In particular, amyotrophic lateral sclerosis (ALS) is one such condition that significantly impacts the quality of life for millions by impairing nerve cell function in the central nervous system. Despite extensive research, ALS remains difficult to diagnose in its early stages and the exact cause is largely unknown, with contemporary methods taking up to 15 months for a definitive diagnosis. Electroencephalogram (EEG) analysis, a non-invasive method for recording brain electrical activity, has shown promise in identifying subtle neural changes associated with neurodegenerative disorders. Transformers, known for their ability to capture complex data dependencies, offer a novel framework for analyzing EEG signals with high temporal resolution. This study introduces a Transformer-based approach to diagnose ALS by leveraging the EEG and eye-tracking dataset of ALS patients (EEGET-ALS), comprising a total of 1,989 recordings. The model achieved exceptional accuracies of 98.49% in training and 99.33% in both validation and testing. Furthermore, with an area under the curve (AUC) of 0.9963, precision of 100.0%, and recall of 96.36% in testing, the model demonstrates promise in enhancing the accuracy and timeliness of ALS diagnosis with a low rate of false positives and false negatives. Overall, this approach represents a significant advancement in the field of neurodegenerative disease diagnosis, potentially improving patient outcomes and quality of life through a two-minute recording.",
      keywords: ["Transformers", "EEG Analysis", "Medical AI", "Neural Networks", "ALS Diagnosis"],
      impact: "Two-minute ALS diagnosis with Transformer-based EEG analysis.",
      link: "https://ieeexplore.ieee.org/document/10871346"
    },
    {
      title: "ConVox: A Robust Deep Learning Approach for Voice Disorder Detection with Multilingual Capabilities",
      authors: "Soham Jain, Jason Hao, Shaurya Jain, Anmol Karan",
      venue: "5th International Conference on Big Data, Artificial Intelligence and Internet of Things Engineering (ICBAIE)",
      type: "First Author",
      award: null,
      description: "Voice disorders significantly impact an individual's ability to communicate verbally, particularly affecting the elderly community. Diagnosing these disorders is complex, often hindered by the limitations of traditional imaging techniques. This study presents a novel deep learning framework for voice disorder detection through audio classification, addressing the challenge of diagnosing these disorders that affect a large proportion of elderly adults in America. Our model, ConVox, utilizes a sequential stack of one-dimensional convolutional neural networks to conduct binary classification of voice disorders. We leverage four large datasets: Advanced Voice Function Assessment Databases, Saarbrücken Voice Database, TORGO Database, and UA Speech Database, which together comprise 22,883 audio samples in Waveform Audio File Format. The model achieved notable accuracies of 99.89% in training, 99.91% in validation, and 99.74% in testing, outperforming existing models. With an area-under-curve of 0.999995, precision of 0.9972, and recall of 0.9994, our model demonstrates exceptional performance in accurately identifying voice disorders with a very low rate of false positives and false negatives. Additionally, this model demonstrates promising performance across multiple languages and voice pathologies. ConVox's comprehensiveness and high accuracy demonstrate that it is a promising tool for audio classification, potentially enhancing healthcare outcomes for individuals with voice disorders.",
      keywords: ["Voice Analysis", "Multilingual AI", "Healthcare", "Deep Learning", "Signal Processing"],
      impact: "Multilingual voice disorder detection using neural network audio classification.",
      link: "https://ieeexplore.ieee.org/document/11116805"
    },
    {
      title: "RexDash: A Comprehensive Dashboard for Analyzing the Technical Performance of Replica Exchange Molecular Dynamics Simulations",
      authors: "Soham Jain, Christopher Lockhart",
      venue: "Journal of Student-Scientists' Research",
      type: "First Author",
      award: null,
      description: "Replica exchange molecular dynamics (REMD) simulations have emerged as an effective tool to explore the conformational ensemble of biomolecular systems. By initiating several molecular dynamics simulations under different conditions and periodically swapping structures generated from adjacent conditions, REMD enhances sampling from simulations and facilitates the computation of thermodynamic properties. However, despite REMD's advantages, there is neither a standardized technique nor a widely adopted toolkit to ensure that REMD simulations are performing as expected. We address these limitations by developing RexDash, an extensive dashboard that features various metrics for assessing the technical performance of REMD simulations. Currently, the dashboard implements Python as the front-end framework to display plots for exchange rates, replica mixing parameters, replica trajectories, and potential energy distributions. RexDash utilizes the Plotly graphing library to render these metrics for REMD data supplied by the user in comma-separated value format. In addition, RexDash employs HTML and Flask, a backend web framework that enables visualization of REMD simulation results by deploying the webpage as an online server. To validate and test metrics generated by the dashboard, we conducted REMD simulations of alanine dipeptide, a standard model system for molecular simulations. RexDash will provide future researchers and simulation practitioners with a readily available resource to analyze the technical setup of their REMD simulations and, therefore, is an important first step in the standardization of REMD results.",
      keywords: ["Machine Learning", "Molecular Dynamics", "Data Visualization", "Scientific Computing"],
      impact: "Flask dashboard for standardizing assessment of REMD simulations.",
      link: "https://journals.gmu.edu/index.php/jssr/article/view/3926"
    }
  ];


  return (
    <SectionShell id="research">
      <SectionHeader title="Research & Publications" />

      <div className="space-y-8">
        {publications.map((pub, index) => (
          <article
            key={index}
            role="button"
            tabIndex={0}
            className="card-surface shadow-card-glow animate-fade-up cursor-pointer p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-600/60 focus:outline-none focus:ring-2 focus:ring-primary/40 md:p-8"
            style={{ animationDelay: `${index * 0.08}s` }}
            onClick={() => setSelectedPublication(pub)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setSelectedPublication(pub);
              }
            }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {pub.type}
                  </span>
                  {pub.impact && (
                    <span className="rounded-full border border-slate-700/60 bg-slate-800/50 px-3 py-1 text-sm font-medium text-slate-300">
                      {pub.impact}
                    </span>
                  )}
                  {pub.award && (
                    <span className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                      <Award className="h-4 w-4" />
                      {pub.award}
                    </span>
                  )}
                </div>

                <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
                  {pub.title}
                </h3>

                <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{pub.authors}</span>
                  </div>
                </div>

                <p className="mb-4 text-base font-medium text-primary/90">{pub.venue}</p>

                <p className="leading-relaxed text-muted-foreground">
                  {getTruncatedAbstract(pub.description)}
                </p>
              </div>

              <Button
                variant="outline"
                className="shrink-0 border-slate-700/60 bg-transparent text-slate-300 transition-all duration-200 hover:border-slate-500/70 hover:bg-slate-800/50 hover:text-slate-100"
                onClick={(event) => {
                  event.stopPropagation();
                  window.open(pub.link, '_blank');
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Read Paper
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!selectedPublication} onOpenChange={(open) => !open && setSelectedPublication(null)}>
        {selectedPublication && (
          <DialogContent className="max-w-5xl sm:max-w-6xl p-8 sm:p-10 max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedPublication.title}</DialogTitle>
              <DialogDescription className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">{selectedPublication.authors}</p>
                  <p className="text-primary text-base font-semibold">{selectedPublication.venue}</p>
                  <p className="text-foreground">
                    <span className="font-medium">Role: </span>
                    {selectedPublication.type}
                  </p>
                  {selectedPublication.award && (
                    <p className="flex items-center gap-2 font-semibold text-amber-300">
                      <Award className="h-4 w-4" />
                      {selectedPublication.award}
                    </p>
                  )}
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  {selectedPublication.description}
                </p>
                {!!selectedPublication.keywords.length && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPublication.keywords.map((keyword) => (
                      <span key={keyword} className="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary rounded-full">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-end">
              <Button
                size="lg"
                variant="outline"
                className="transition-transform duration-200 px-6 py-3 text-base hover:text-white hover:border-white hover:bg-transparent gap-2"
                onClick={() => window.open(selectedPublication.link, '_blank')}
              >
                <ExternalLink className="h-5 w-5" />
                Read Paper
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </SectionShell>
  );
};

export default Research;