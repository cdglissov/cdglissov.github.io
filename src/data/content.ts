export type SkillGroup = {
  title: string;
  items: string[];
};

export type LearningEntry = {
  period: string;
  topic: string;
  description: string;
};

export type AboutExperienceEntry = {
  period: string;
  place: string;
  label: string;
  type: 'education' | 'work';
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  href: string;
};

export const aboutParagraphs = [
  'As a kid I was fascinated by space, nature, and science. I spent hours tinkering with computers, observing ants, and reading about technology and mathematics.',
  'I\'ve always been captivated by space - a vast, dark expanse where you can gaze at the stars and let your thoughts drift. It always invites existential questions; What\'s out there? Why is it there? Why are we here? I credit that fascination with the unknown for my love of science fiction, science, and even the design of this website.',
  'In my teenage years, I took up strength training. I wanted to learn anatomy and physiology - and like most teenagers, I had ambitions involving bigger biceps. That journey led me into powerlifting and eventually to becoming a certified strength coach. The same drive to understand how things work - whether muscles and tendons or neurons in a neural network - has shaped my path ever since. It ultimately led me to pursue a career at the intersection of research and engineering, where I later specialized in generative machine learning.',
  'Today, I\'m a Senior AI Specialist, building AI systems and experimenting with emerging technologies. In my free time, I code, hike, lift heavy things, and spend time with my family and friends.',
  'I love learning and connecting with curious people. If you\'d like to chat about a project, build something together, or just exchange ideas, feel free to <a href="https://www.linkedin.com/in/christian-glissov/" class="text-accent underline" target="_blank" rel="noreferrer">reach out</a>!'
];

export const aboutExperience: AboutExperienceEntry[] = [
  {
    period: '2025 - Present',
    place: 'If Insurance',
    label: 'Senior AI Specialist',
    type: 'work'
  },
  {
    period: '2024 - 2025',
    place: 'Netcompany',
    label: 'Senior Data Specialist',
    type: 'work'
  },
  {
    period: '2021 - 2024',
    place: 'Netcompany',
    label: 'Data Consultant',
    type: 'work'
  },
  {
    period: '2019 - 2021',
    place: 'Technical University of Denmark',
    label: 'Mathematical Modelling and Computation, MSc',
    type: 'education'
  }
];

export const learningTimeline: LearningEntry[] = [
  {
    period: '2026 February',
    topic: 'Claude and Copilot plugings',
    description:
      'Deep dive into agents and skills, and how to use hand-offs, subagents. This stuff will be huge.'
  },
  {
    period: '2026 January',
    topic: 'Postgresql',
    description:
      'Replacing MongoDB with Azure DB for Postgresql. Created a DB and used alembic for migrations. Learned about pgvector for vector search. I still prefer Qdrant.'
  },
];

export const projects: Project[] = [
  {
    name: 'Recurrent Flow Networks',
    description:
      'Proposing an unsupervised algorithm to generalise the underlying distribution of video data.',
    stack: ['Python', 'Bash', 'High-performance computing', 'GitHub'],
    href: 'https://github.com/cdglissov/recurrent-flows-msc/blob/master/MSC_Thesis.pdf'
  },
  {
    name: 'COVID-19 in New York City',
    description:
      'Visualising and analysing the relationship between COVID-19 and socioeconomic status.',
    stack: ['Python', 'HTML', 'JS', 'CSS', 'd3js', 'Bokeh', 'GitHub'],
    href: 'https://cdglissov.github.io/nyc.covid19/'
  },
  {
    name: 'My Portfolio Website',
    description:
      'A modern, responsive portfolio website built with Astro and TypeScript.',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS'],
    href: 'https://github.com/cdglissov/cdglissov.github.io'
  },
  {
    name: 'Exploring Adversarial Attacks with Data Augmentation',
    description:
      'An investigation of how data augmentation can be used to defend against adversarial attacks.',
    stack: ['Python', 'Paper'],
    href: 'https://github.com/samuelepapa/adversarial_augmentation/blob/master/Adversarial_Attacks.pdf'
  },
  {
    name: 'Topic Modelling of Danish Parliament Transcripts',
    description:
      'Using probabilistic LDA to extract and analyse topics in transcript data.',
    stack: ['Python'],
    href: 'https://github.com/cdglissov/MBML_project/blob/master/main.ipynb'
  },
  {
    name: 'Applying Linear and Non-linear Time Series Models',
    description:
      'A collection of time series models used to analyse and model different problems.',
    stack: ['R'],
    href: 'https://github.com/cdglissov/Time-series-analysis/tree/main'
  },
];
