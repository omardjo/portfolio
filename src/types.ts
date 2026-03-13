export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  image: string;
  images?: string[];
  videoUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  period?: string;
  type?: string;
  mockupType?: 'phone' | 'pc'; // phone frame or laptop/browser frame
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  details: string[];
  color: string;
}

export interface Certificate {
  id: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  icon: string;
  color: string;
  pdfUrl: string; // <--- Added this field
}