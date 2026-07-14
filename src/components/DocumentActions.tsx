import React, { useState } from 'react';
import { Eye, Download, FileText, FileCheck } from 'lucide-react';
import { PdfPreviewModal } from './PdfPreviewModal';
import { DOCUMENT_CONFIG } from '../config/documents';

interface DocumentActionsProps {
  variant?: 'hero' | 'contact' | 'navbar-mobile';
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({ variant = 'hero' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<{
    url: string;
    title: string;
    downloadName: string;
  } | null>(null);

  const handlePreviewCV = () => {
    setActiveDoc({
      url: DOCUMENT_CONFIG.cv.url,
      title: DOCUMENT_CONFIG.cv.title,
      downloadName: DOCUMENT_CONFIG.cv.filename,
    });
    setModalOpen(true);
  };

  const handlePreviewResume = () => {
    setActiveDoc({
      url: DOCUMENT_CONFIG.resume.url,
      title: DOCUMENT_CONFIG.resume.title,
      downloadName: DOCUMENT_CONFIG.resume.filename,
    });
    setModalOpen(true);
  };

  if (variant === 'navbar-mobile') {
    return (
      <>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handlePreviewCV}
            className="w-full px-3 py-2.5 text-xs font-semibold text-gray-200 bg-primary/[0.08] hover:bg-primary/[0.15] border border-primary/25 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Eye size={14} className="text-primary" /> Preview CV
          </button>
          <a
            href={DOCUMENT_CONFIG.cv.url}
            download={DOCUMENT_CONFIG.cv.filename}
            className="w-full px-3 py-2.5 text-xs font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-primary/20 cursor-pointer"
          >
            <Download size={14} /> Download CV
          </a>
          <button
            type="button"
            onClick={handlePreviewResume}
            className="w-full px-3 py-2.5 text-xs font-semibold text-gray-200 bg-secondary/[0.08] hover:bg-secondary/[0.15] border border-secondary/25 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Eye size={14} className="text-secondary" /> Preview Resume
          </button>
          <a
            href={DOCUMENT_CONFIG.resume.url}
            download={DOCUMENT_CONFIG.resume.filename}
            className="w-full px-3 py-2.5 text-xs font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-secondary/20 cursor-pointer"
          >
            <Download size={14} /> Download Resume
          </a>
        </div>

        {activeDoc && (
          <PdfPreviewModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            pdfUrl={activeDoc.url}
            title={activeDoc.title}
            downloadName={activeDoc.downloadName}
          />
        )}
      </>
    );
  }

  if (variant === 'contact') {
    return (
      <>
        <div className="glass-card rounded-2xl p-5 md:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Credentials & Documents
            </h4>
            <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              Verified 2026
            </span>
          </div>

          <div className="space-y-3">
            {/* CV Section */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex items-center gap-2">
                <FileCheck size={16} className="text-primary" />
                <span className="text-sm font-semibold text-white">Curriculum Vitae (CV)</span>
                <span className="text-xs text-gray-500 ml-auto">Detailed • 2026</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePreviewCV}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] text-gray-200 hover:text-white font-medium rounded-lg transition-all active:scale-[0.98] cursor-pointer text-xs"
                >
                  <Eye size={14} className="text-primary" /> Preview CV
                </button>
                <a
                  href={DOCUMENT_CONFIG.cv.url}
                  download={DOCUMENT_CONFIG.cv.filename}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all active:scale-[0.98] cursor-pointer btn-primary-glow text-xs"
                >
                  <Download size={14} /> Download CV
                </a>
              </div>
            </div>

            {/* Resume Section */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-secondary" />
                <span className="text-sm font-semibold text-white">Professional Resume</span>
                <span className="text-xs text-gray-500 ml-auto">Concise • 1 Page</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePreviewResume}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] text-gray-200 hover:text-white font-medium rounded-lg transition-all active:scale-[0.98] cursor-pointer text-xs"
                >
                  <Eye size={14} className="text-secondary" /> Preview Resume
                </button>
                <a
                  href={DOCUMENT_CONFIG.resume.url}
                  download={DOCUMENT_CONFIG.resume.filename}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-lg transition-all active:scale-[0.98] cursor-pointer shadow-sm shadow-secondary/20 text-xs"
                >
                  <Download size={14} /> Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {activeDoc && (
          <PdfPreviewModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            pdfUrl={activeDoc.url}
            title={activeDoc.title}
            downloadName={activeDoc.downloadName}
          />
        )}
      </>
    );
  }

  // Hero variant - Premium distinct pill buttons
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-3xl mt-1">
        {/* CV Group */}
        <div className="inline-flex items-center bg-[#111827]/80 border border-primary/25 rounded-xl p-1 shadow-md shadow-primary/5">
          <button
            type="button"
            onClick={handlePreviewCV}
            className="px-3.5 py-2 hover:bg-primary/15 text-gray-200 hover:text-white font-medium rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <Eye size={14} className="text-primary" /> CV Preview
          </button>
          <div className="w-px h-4 bg-white/[0.1] mx-0.5" />
          <a
            href={DOCUMENT_CONFIG.cv.url}
            download={DOCUMENT_CONFIG.cv.filename}
            className="px-3.5 py-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm shadow-sm"
          >
            <Download size={14} /> Download CV
          </a>
        </div>

        {/* Resume Group */}
        <div className="inline-flex items-center bg-[#111827]/80 border border-secondary/25 rounded-xl p-1 shadow-md shadow-secondary/5">
          <button
            type="button"
            onClick={handlePreviewResume}
            className="px-3.5 py-2 hover:bg-secondary/15 text-gray-200 hover:text-white font-medium rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <Eye size={14} className="text-secondary" /> Resume Preview
          </button>
          <div className="w-px h-4 bg-white/[0.1] mx-0.5" />
          <a
            href={DOCUMENT_CONFIG.resume.url}
            download={DOCUMENT_CONFIG.resume.filename}
            className="px-3.5 py-2 bg-secondary/80 hover:bg-secondary text-white font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm shadow-sm"
          >
            <Download size={14} /> Download Resume
          </a>
        </div>
      </div>

      {activeDoc && (
        <PdfPreviewModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          pdfUrl={activeDoc.url}
          title={activeDoc.title}
          downloadName={activeDoc.downloadName}
        />
      )}
    </>
  );
};
