// Centralized single source of truth for portfolio documents
export const DOCUMENTS = {
  cv: "/assets/documents/CV/CV_Omar_Djebbi.pdf",
  resume: "/assets/documents/Resume/Resume_Omar_Djebbi.pdf",
} as const;

export const CV_PATH = DOCUMENTS.cv;
export const RESUME_PATH = DOCUMENTS.resume;

export const CV_FILENAME = "CV_Omar_Djebbi.pdf";
export const RESUME_FILENAME = "Resume_Omar_Djebbi.pdf";

export const DOCUMENT_CONFIG = {
  cv: {
    path: DOCUMENTS.cv,
    filename: CV_FILENAME,
    url: DOCUMENTS.cv,
    title: "Omar Djebbi — Curriculum Vitae (CV)",
  },
  resume: {
    path: DOCUMENTS.resume,
    filename: RESUME_FILENAME,
    url: DOCUMENTS.resume,
    title: "Omar Djebbi — Professional Resume",
  },
} as const;
