import { ArrowUpRight, Award } from 'lucide-react';
import SectionShell from '@/components/layout/SectionShell';
import Reveal from '@/components/layout/Reveal';
import { cn } from '@/lib/utils';

type Publication = {
  /** Venue acronym shown on the card. */
  short: string;
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

const publications: Publication[] = [
  {
    short: "ICRCV",
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
    short: "ICACTE",
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
    short: "ICBAIE",
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
    short: "JSSR",
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

const PublicationCard = ({ pub }: { pub: Publication }) => (
  <article
    className={cn(
      'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/60 p-6 transition-colors duration-300 sm:p-8',
      pub.award ? 'border-amber-300/25 hover:border-amber-300/40' : 'border-border hover:border-foreground/20'
    )}
  >
    <div className="relative flex flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-md bg-foreground px-2 py-1 tracking-wide text-background">{pub.short}</span>
        <span className="rounded-md border border-border px-2 py-1 text-muted-foreground">{pub.type}</span>
        {pub.award && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-300/10 px-2 py-1 text-amber-200">
            <Award className="h-3.5 w-3.5" />
            {pub.award}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-[22px]">
        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0">
          {pub.title}
        </a>
      </h3>
      {pub.impact && <p className="mt-3 leading-relaxed text-muted-foreground">{pub.impact}</p>}

      <div className="mb-7 mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground/80">
        {pub.keywords.map((k) => (
          <span key={k}>#{k.replace(/\s+/g, '')}</span>
        ))}
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-end border-t border-border pt-5 text-sm font-medium">
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-foreground transition-colors group-hover:text-primary"
        >
          View paper
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  </article>
);

const Publications = () => (
  <SectionShell id="publications" title="Publications">
    <div className="grid gap-5 md:grid-cols-2">
      {publications.map((pub, i) => (
        <Reveal key={pub.link} delay={(i % 2) * 80} className="h-full">
          <PublicationCard pub={pub} />
        </Reveal>
      ))}
    </div>
  </SectionShell>
);

export default Publications;
