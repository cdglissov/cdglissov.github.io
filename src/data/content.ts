export type SkillGroup = {
  title: string;
  items: string[];
};

export type LearningEntry = {
  period: string;
  topic: string;
  description: string;
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  href: string;
};

export const aboutParagraphs = [
  'I design and ship AI systems that stay usable after launch: measurable, observable, and aligned with real business constraints.',
  'My background in mathematical modelling and scientific computing helps me bridge research depth and production reliability, especially for optimization-heavy and data-intensive workflows.'
];

export const learningTimeline: LearningEntry[] = [
  {
    period: '2025 - Present',
    topic: 'Evaluation-first AI delivery',
    description:
      'Building regression-based evaluation loops so product teams can ship LLM updates with measurable quality and lower operational risk.'
  },
  {
    period: '2024 - Present',
    topic: 'Observability for model systems',
    description:
      'Instrumenting prompts, traces, and cost signals end-to-end to improve debugging speed and keep production behavior predictable.'
  },
  {
    period: '2023 - 2024',
    topic: 'Production retrieval workflows',
    description:
      'Designing source-grounded search and assistant pipelines for technical users who need reliable answers with clear provenance.'
  },
  {
    period: '2021 - 2023',
    topic: 'Scientific computing at scale',
    description:
      'Modernizing data-heavy simulation and optimization workflows with stronger automation, testing, and reproducibility.'
  },
  {
    period: '2019 - 2021',
    topic: 'Applied modelling foundations',
    description:
      'Deepening mathematical modelling practice across constrained optimization, numerical methods, and practical decision systems.'
  }
];

export const projects: Project[] = [
  {
    name: 'Research Copilot for Technical Teams',
    description:
      'A retrieval-augmented assistant that answers domain questions with source-backed responses and quality scoring.',
    stack: ['Astro', 'TypeScript', 'Python', 'Vector Search', 'OpenTelemetry'],
    href: 'https://github.com/cdglissov'
  },
  {
    name: 'Model Evaluation Harness',
    description:
      'A reproducible benchmark framework for prompt and model versions with dataset snapshots, golden tests, and drift alerts.',
    stack: ['TypeScript', 'Node.js', 'CI', 'Statistical testing'],
    href: 'https://github.com/cdglissov'
  },
  {
    name: 'Optimization Pipeline Modernization',
    description:
      'Migrated legacy scientific workflows to resilient cloud jobs with queue-based orchestration and observability.',
    stack: ['Python', 'Numerical methods', 'Docker', 'GitHub Actions'],
    href: 'https://github.com/cdglissov'
  }
];
