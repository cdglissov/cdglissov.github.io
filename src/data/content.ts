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
  'As a kid growing up in Copenhagen in the \'90s, I was fascinated by space, nature, and science. I spent hours tinkering with computers, exploring nature, and gaming with friends.',
  'I had a strange obsession with observing ants and introducing grape snails to our garden (we didn\'t have any, but my aunt had plenty, and I thought they were amazing - much to my parents\' delight). I\'ve always been captivated by space: a vast, dark, mysterious expanse where you can gaze at the stars and let your thoughts drift. What\'s out there? Why is it there? Why are we here? I credit that fascination with the unknown for my love of science fiction, and science.',
  'In my teenage years, I took up strength training. I didn\'t know much about anatomy and physiology at the time - but I wanted to. That curiosity led me to specialize in powerlifting and eventually become a certified strength coach. The same drive to understand how things work - whether the human body or tiny bits - has shaped my path ever since. It led me to a career at the intersection of research and engineering where I specialised in generative machine learning.',
  'Today, I\'m a Senior AI Specialist, working on building AI systems and experimenting with emerging technologies. In my free time I code, hike, powerlift, and spend time with my lovely family and friends.'
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
