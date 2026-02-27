export type SkillGroup = {
  title: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
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

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI Engineering',
    items: ['LLM applications', 'RAG architecture', 'Evaluation pipelines', 'Prompt and agent design']
  },
  {
    title: 'Data + MLOps',
    items: ['Feature pipelines', 'Model monitoring', 'Experiment tracking', 'CI/CD for ML']
  },
  {
    title: 'Scientific Computing',
    items: ['Numerical methods', 'Optimization', 'Simulation tooling', 'Python and TypeScript']
  }
];

export const experiences: Experience[] = [
  {
    role: 'Senior AI Specialist',
    company: 'Independent Consulting',
    period: '2023 - Present',
    bullets: [
      'Delivered production-ready LLM systems for internal search, analyst copilots, and structured report generation.',
      'Built evaluation suites with regression checks to keep model quality stable during rapid iteration.',
      'Introduced observability and cost controls that reduced inference waste while improving reliability.'
    ]
  },
  {
    role: 'Applied ML Engineer',
    company: 'Scientific Software Team',
    period: '2019 - 2023',
    bullets: [
      'Scaled data processing and simulation workflows for high-dimensional modelling use cases.',
      'Moved research prototypes into maintained services with testing, versioning, and deployment automation.',
      'Partnered with domain experts to formalize problem constraints into robust optimization strategies.'
    ]
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
