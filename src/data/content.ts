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
  'As a kid I was fascinated by space, nature, and science. I have spent hours tinkering with computers, observing ants, and reading about technology and math.',
  'I\'ve always been captivated by space: a vast, dark, mysterious expanse where you can gaze at the stars and let your thoughts drift. Space always inspires to many existential thoughts; What\'s out there? Why is it there? Why are we here? I credit that fascination with the unknown for my love of science fiction, science, and the design of this website.',
  'In my teenage years, I took up strength training. I wanted to learn biomechanics, anatomy, and physiology. That curiosity led me to specialize in powerlifting and eventually become a certified strength coach. The same drive to understand how things work - whether the human body or transistors in a computer - has shaped my path ever since. It motivated me to pursue a career at the intersection of research and engineering. During my studies I specialised in generative machine learning.',
  'Today, I\'m a Senior AI Specialist, working on building AI systems and experimenting with emerging technologies. In my free time I code, hike, lift heavy things, and spend time with my lovely family and friends.',
  'I love learning and I\'m always excited to connect with like-minded people. If you want to chat about a project, build something, or anything else, feel free to <a href="https://www.linkedin.com/in/christian-glissov/" class="text-accent underline" target="_blank" rel="noreferrer">reach out</a>!'
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
