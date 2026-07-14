// Centralized single source of truth for portfolio documents
export const DOCUMENTS = {
  cv: '/assets/documents/CV/CV_Omar_Djebbi_2026_Final.pdf',
  resume: '/assets/documents/Resume/Resume_Omar_Djebbi_2026_Final.pdf',
} as const;

export const CV_PATH = DOCUMENTS.cv;
export const RESUME_PATH = DOCUMENTS.resume;

export const CV_FILENAME = 'CV_Omar_Djebbi_2026_Final.pdf';
export const RESUME_FILENAME = 'Resume_Omar_Djebbi_2026_Final.pdf';

export const DOCUMENT_CONFIG = {
  cv: {
    path: DOCUMENTS.cv,
    filename: CV_FILENAME,
    url: DOCUMENTS.cv,
    title: 'Omar Djebbi — Curriculum Vitae (CV 2026)',
  },
  resume: {
    path: DOCUMENTS.resume,
    filename: RESUME_FILENAME,
    url: DOCUMENTS.resume,
    title: 'Omar Djebbi — Professional Resume',
  },
} as const;
