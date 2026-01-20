export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  videoUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
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