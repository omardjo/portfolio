import { Project, Experience, Certificate } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'kidora',
    title: 'Kidora Tutoring App',
    description: 'Comprehensive tutoring app with learning games for ages 4-12. Features parental dashboard and real-time progress tracking.',
    tags: ['React Native', 'Spring Boot'],
    image: '/assets/images/kidora_cap.png',
    videoUrl: '/assets/videos/NewVideoKiodraFixed.mp4', // Matches your original file name
    demoUrl: '#'
  },
  {
    id: 'career',
    title: 'Career Recommendation',
    description: 'Web scraping integration from GitHub/LinkedIn with 95% accuracy to recommend career paths.',
    tags: ['Flutter', 'Flask'],
    image: '/assets/images/career-recommendation-screenshot.png',
    videoUrl: '/assets/videos/CareerRecommendation.mp4'
  },
  {
    id: 'mes',
    title: 'Production Tracking (MES)',
    description: 'Manufacturing Execution System monitoring 50+ production lines with real-time analytics.',
    tags: ['Dynamics BC', 'Flutter'],
    image: '/assets/images/mes-screenshot.png',
    videoUrl: '/assets/videos/MesPresentationLV.mp4'
  },
  {
    id: 'stripe',
    title: 'Stripe Integration App',
    description: 'Secure payment gateway handling transactions with zero errors using Nest.js backend.',
    tags: ['Flutter', 'Nest.js'],
    image: '/assets/images/stripe-screenshot.png',
    videoUrl: '/assets/videos/StripeIntegration.mp4'
  },
  {
    id: 'learnverse',
    title: 'Learnverse Platform',
    description: 'Educational platform supporting 50+ courses with enrollment tracking.',
    tags: ['Angular', 'Django'],
    image: '/assets/images/learnverse-screenshot.png',
    videoUrl: '/assets/videos/LearnVerseVideo.mp4'
  },
  {
    id: 'safetravel',
    title: 'Safe Travel App',
    description: 'AI-enhanced safety application serving 200+ simulated users with emergency response features.',
    tags: ['Node.js', 'AI'],
    image: '/assets/images/safe-travel-screenshot.png',
    repoUrl: 'https://github.com/safeTravel-IA/SafeTravelFrontEnd'
  },
  {
    id: 'solar',
    title: '3D Solar System',
    description: '3D simulation with real orbital mechanics.',
    tags: ['Unity', 'C#'],
    image: '/assets/images/solar-system-screenshot.jpg',
    repoUrl: 'https://gitlab.com/omardjo/solar_system_project.git'
  }
];

export const EXPERIENCES: Experience[] = [
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