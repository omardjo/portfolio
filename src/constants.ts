import { Project, Experience, Certificate } from './types';

// FLUTTER FOCUS: Projects reordered - Flutter projects first
// AJOUT PROJET TICK8ING - Freelance prioritaire en tête
export const PROJECTS: Project[] = [
  {
    id: 'tick8ing',
    title: 'Tick8ing – Gestion de Planning',
    description: 'Application Flutter de gestion de planning en freelance : intégration de nouveaux modules et connexion backend PHP via API REST.',
    fullDescription: 'Développement et amélioration d\'une application Flutter de gestion de planning : intégration de nouveaux modules et connexion avec un backend PHP via API REST. Collaboration via Kchat et GitLab (tickets & versioning).',
    tags: ['Flutter', 'Dart', 'PHP', 'API REST', 'GitLab'],
    image: '/assets/images/tick8ing-1.jpg',
    images: ['/assets/images/tick8ing-1.jpg', '/assets/images/tick8ing-2.jpg', '/assets/images/tick8ing-3.jpg', '/assets/images/tick8ing-4.jpg'],
    period: 'Février 2026 (1 mois)',
    type: 'Freelance On-site (Tunisie)',
    mockupType: 'phone'
  },
  {
    id: 'stripe',
    title: 'Stripe Integration App',
    description: 'Application mobile de paiement sécurisé avec gateway Stripe, gestion fournisseurs/inventaire et chatbot IA. Zéro erreur de transaction.',
    tags: ['Flutter', 'Nest.js', 'Stripe', 'Firebase'],
    image: '/assets/images/stripe-screenshot.png',
    videoUrl: '/assets/videos/StripeIntegration.mp4',
    mockupType: 'pc'
  },
  {
    id: 'career',
    title: 'Career Recommendation',
    description: 'Application Flutter avec web scraping GitHub/LinkedIn et recommandation de carrière IA avec 95% de précision.',
    tags: ['Flutter', 'Flask', 'AI', 'Firebase'],
    image: '/assets/images/career-recommendation-screenshot.png',
    videoUrl: '/assets/videos/CareerRecommendation.mp4',
    mockupType: 'pc'
  },
  {
    id: 'mes',
    title: 'Production Tracking (MES)',
    description: 'Système MES de suivi de production en temps réel pour 50+ lignes avec analytics avancées.',
    tags: ['Flutter Web', 'Dynamics BC', 'AL'],
    image: '/assets/images/mes-screenshot.png',
    videoUrl: '/assets/videos/MesPresentationLV.mp4',
    mockupType: 'pc'
  },
  {
    id: 'kidora',
    title: 'Kidora Tutoring App',
    description: 'Application éducative gamifiée pour enfants 4-12 ans avec tableau de bord parental et suivi de progression en temps réel.',
    tags: ['React Native', 'Spring Boot'],
    image: '/assets/images/kidora_cap.png',
    videoUrl: '/assets/videos/NewVideoKiodraFixed.mp4',
    demoUrl: '#',
    mockupType: 'pc'
  },
  {
    id: 'safetravel',
    title: 'Safe Travel App',
    description: 'Application de sécurité enrichie par IA servant 200+ utilisateurs avec fonctions d\'urgence.',
    tags: ['Node.js', 'AI', 'Flutter'],
    image: '/assets/images/safe-travel-screenshot.png',
    repoUrl: 'https://github.com/safeTravel-IA/SafeTravelFrontEnd',
    mockupType: 'pc'
  },
  {
    id: 'learnverse',
    title: 'Learnverse Platform',
    description: 'Plateforme éducative web supportant 50+ cours avec suivi d\'inscription.',
    tags: ['Angular', 'Django'],
    image: '/assets/images/learnverse-screenshot.png',
    videoUrl: '/assets/videos/LearnVerseVideo.mp4',
    mockupType: 'pc'
  },
  {
    id: 'solar',
    title: '3D Solar System',
    description: 'Simulation 3D avec mécanique orbitale réaliste.',
    tags: ['Unity', 'C#'],
    image: '/assets/images/solar-system-screenshot.jpg',
    repoUrl: 'https://gitlab.com/omardjo/solar_system_project.git',
    mockupType: 'phone'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'tick8ing_freelance',
    role: 'Freelance Flutter Developer',
    company: 'Tick8ing, On-site – Tunisie',
    period: 'Feb 2026 (1 mois)',
    details: [
      'Développement et amélioration d\'une application Flutter de gestion de planning.',
      'Intégration de nouveaux modules et connexion avec un backend PHP via API REST.',
      'Collaboration via Kchat et GitLab (tickets & versioning).'
    ],
    color: 'primary'
  },
  {
    id: 'solo',
    role: 'Solo Developer',
    company: 'Self Employed, Remotely',
    period: 'Nov 2025 - Dec 2025',
    details: [
      'Engineered an interactive, gamified learning experience for children aged 4-12.',
      'Developed a comprehensive parental dashboard with real-time progress tracking.',
      'Architected a scalable cross-platform mobile solution focused on accessibility.'
    ],
    color: 'primary'
  },
  {
    id: 'freelance',
    role: 'Freelance Mobile App Developer',
    company: 'Self-Employed, Remotely',
    period: 'Jun 2025 - Jul 2025',
    details: [
      'Developed a Flutter and Nest.js mobile application for supplier/inventory management.',
      'Integrated Perplexity API-powered chatbot for client interactions.',
      'Incorporated Stripe payment gateway for secure transactions.'
    ],
    color: 'secondary'
  },
  {
    id: 'intern',
    role: 'Intern Developer',
    company: 'MAVISION, Manar 2, Tunis',
    period: 'Jan 2025 - Jul 2025',
    details: [
      'Developed business applications using Microsoft Dynamics 365, AL, and Flutter Web.',
      'Designed critical ERP functionalities.',
      'Improved user experience by 40% with responsive web interfaces.'
    ],
    color: 'accent'
  },
  {
    id: 'independent',
    role: 'Independent Mobile App Developer',
    company: 'Self-Employed, Remotely',
    period: 'Jul 2024 - Aug 2024',
    details: [
      'Delivered customized mobile application using Flutter and Node.js.',
      'Developed and launched a weather application featuring real-time API integration.',
      'Implemented AI-powered chatbot functionality to enhance customer interaction.',
      'Optimized mobile applications for performance, reducing crash rates by 25%.'
    ],
    color: 'primary'
  },
  {
    id: 'intern_esprit',
    role: 'Mobile Development Intern',
    company: 'ESPRIT, cité El Ghazela, Tunis',
    period: 'Jun 2024 - Aug 2024',
    details: [
      'Implemented web scraping functionality from GitHub/LinkedIn to match user CVs with jobs.',
      'Developed a user review system enhancing platform credibility and engagement by 45%.',
      'Integrated advanced filtering algorithms improving recommendation accuracy by 35%.'
    ],
    color: 'secondary'
  },
  {
    id: 'uni_project',
    role: 'Mobile Development University Project',
    company: 'ESPRIT, cité El Ghazela, Tunis',
    period: 'Feb 2024 - May 2024',
    details: [
      'Integrated AI-powered chatbot handling 1,000+ daily queries with 85% resolution rate.',
      'Implemented Azure API for real-time translation supporting 20+ languages.',
      'Optimized application performance resulting in 50% faster load times.'
    ],
    color: 'accent'
  },
  {
    id: 'web_intern',
    role: 'Web Development Intern',
    company: 'ESPRIT, cité El Ghazela, Tunis',
    period: 'Jul 2023 - Sep 2023',
    details: [
      'Developed a full-stack web application using Angular and Django.',
      'Implemented robust CRUD operations handling over 1000 daily transactions.',
      'Improved application response time by 30% through code optimization.'
    ],
    color: 'primary'
  },
  {
    id: 'web_uni',
    role: 'Web Development University Project',
    company: 'ESPRIT, cité El Ghazela, Tunis',
    period: 'Jan 2021 - Jun 2021',
    details: [
      'Developed a profile management system using PHP, SQL, HTML, CSS, and MVC.',
      'Processed over 1,000 submissions monthly with a 98% success rate.',
      'Implemented secure multi-factor authentication preventing unauthorized access.'
    ],
    color: 'secondary'
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'rn',
    title: 'Learning React Native',
    date: 'Dec 2025',
    description: 'Leveraged the Expo framework for rapid development. Implemented dynamic state management using React Hooks to enable real-time background color manipulation.',
    tags: ['React Native', 'Expo'],
    icon: 'smartphone',
    color: 'primary',
    pdfUrl: '/assets/certificates/Learning_React_Native.pdf'
  },
  {
    id: 'flutter',
    title: 'Flutter Masterclass - (Dart, Api & More)',
    date: 'Nov 2025',
    description: 'Mastered cross-platform development. Handled asynchronous programming/streams in Dart and applied best practices in debugging and testing.',
    tags: ['Flutter', 'Dart'],
    icon: 'layers',
    color: 'secondary',
    pdfUrl: '/assets/certificates/Flutter_Masterclass.pdf'
  },
  {
    id: 'biz',
    title: 'FREELANCING PROFESSIONAL',
    date: 'Dec 2024',
    description: 'Certified Freelance Business Consultant focused on digital transformation and ERP solutions.',
    tags: ['Business', 'Freelance'],
    icon: 'briefcase',
    color: 'accent',
    pdfUrl: '/assets/certificates/Freelancing_Professional.pdf'
  },
  {
    id: 'hash',
    title: 'Attendance Hashgraph Developer',
    date: 'Dec 2024',
    description: 'Certified Hashgraph Developer from Hedera Hashgraph Foundation. Validated skills in distributed ledger technology.',
    tags: ['Blockchain', 'Hedera'],
    icon: 'box',
    color: '#22c55e', // Green
    pdfUrl: '/assets/certificates/Hashgraph_Developer.pdf'
  },
  {
    id: 'web',
    title: 'WEB DEVELOPMENT PROFESSIONAL',
    date: 'Dec 2024',
    description: 'Validated comprehensive knowledge of HTML5, CSS3, JavaScript, and modern web development frameworks.',
    tags: ['HTML/CSS', 'JS'],
    icon: 'globe',
    color: '#a855f7', // Purple
    pdfUrl: '/assets/certificates/Web_Development_Professional.pdf'
  },
  {
    id: 'sql',
    title: 'Advanced SQL for Data Engineering',
    date: 'Nov 2024',
    description: 'Demonstrated comprehensive knowledge of advanced SQL querying techniques including complex joins, subqueries, and window functions.',
    tags: ['SQL', 'Data'],
    icon: 'database',
    color: '#f97316', // Orange
    pdfUrl: '/assets/certificates/Advanced_SQL.pdf'
  },
  {
    id: 'css',
    title: 'Front End Development-CSS',
    date: 'Jun 2024',
    description: 'Certified CSS Developer from Great Learning. Mastered layout techniques and responsive design principles.',
    tags: ['CSS', 'Design'],
    icon: 'layout',
    color: '#ec4899', // Pink
    pdfUrl: '/assets/certificates/CSS_Developer.pdf'
  }
];