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
            className="w-full px-3 py-2.5 text-xs font-semibold text-gray-200 bg-primary/[0.1] hover:bg-primary/[0.18] border border-primary/30 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Eye size={14} className="text-primary" /> Preview CV
          </button>
          <a
            href={DOCUMENT_CONFIG.cv.url}
            download={DOCUMENT_CONFIG.cv.filename}
            className="w-full px-3 py-2.5 text-xs font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-primary/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download size={14} /> Download CV
          </a>
          <button
            type="button"
            onClick={handlePreviewResume}
            className="w-full px-3 py-2.5 text-xs font-semibold text-gray-200 bg-secondary/[0.1] hover:bg-secondary/[0.18] border border-secondary/30 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <Eye size={14} className="text-secondary" /> Preview Resume
          </button>
          <a
            href={DOCUMENT_CONFIG.resume.url}
            download={DOCUMENT_CONFIG.resume.filename}
            className="w-full px-3 py-2.5 text-xs font-semibold text-white bg-secondary hover:bg-secondary/90 rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-secondary/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-secondary"
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
            <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/25">
              Verified 2026
            </span>
          </div>

          <div className="space-y-3">
            {/* CV Section */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
              <div className="flex items-center gap-2">
                <FileCheck size={16} className="text-primary" />
                <span className="text-sm font-semibold text-white">Curriculum Vitae (CV)</span>
                <span className="text-xs text-gray-400 ml-auto font-medium">Detailed • 2026</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePreviewCV}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.12] text-gray-200 hover:text-white font-medium rounded-xl transition-all active:scale-[0.98] cursor-pointer text-xs focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Eye size={14} className="text-primary" /> Preview CV
                </button>
                <a
                  href={DOCUMENT_CONFIG.cv.url}
                  download={DOCUMENT_CONFIG.cv.filename}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all active:scale-[0.98] cursor-pointer text-xs shadow-md shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Download size={14} /> Download CV
                </a>
              </div>
            </div>

            {/* Resume Section */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-secondary" />
                <span className="text-sm font-semibold text-white">Professional Resume</span>
                <span className="text-xs text-gray-400 ml-auto font-medium">Concise • 1 Page</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePreviewResume}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.12] text-gray-200 hover:text-white font-medium rounded-xl transition-all active:scale-[0.98] cursor-pointer text-xs focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <Eye size={14} className="text-secondary" /> Preview Resume
                </button>
                <a
                  href={DOCUMENT_CONFIG.resume.url}
                  download={DOCUMENT_CONFIG.resume.filename}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-xl transition-all active:scale-[0.98] cursor-pointer text-xs shadow-md shadow-secondary/20 focus-visible:ring-2 focus-visible:ring-secondary"
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

  // Hero variant
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-3xl mt-1">
        {/* CV Group */}
        <div className="inline-flex items-center bg-[#070a13]/85 border border-[#36E3FF]/30 rounded-xl p-1 shadow-md shadow-[#36E3FF]/10 backdrop-blur-md">
          <button
            type="button"
            onClick={handlePreviewCV}
            className="px-3.5 py-2 hover:bg-[#36E3FF]/15 text-[#F5F7FA] hover:text-white font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[#36E3FF]"
          >
            <Eye size={14} className="text-[#36E3FF]" /> CV Preview
          </button>
          <div className="w-px h-4 bg-white/[0.15] mx-0.5" />
          <a
            href={DOCUMENT_CONFIG.cv.url}
            download={DOCUMENT_CONFIG.cv.filename}
            className="px-3.5 py-2 bg-gradient-to-r from-[#6366f1] to-[#36E3FF] hover:opacity-95 text-white font-bold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download size={14} /> Download CV
          </a>
        </div>

        {/* Resume Group */}
        <div className="inline-flex items-center bg-[#070a13]/85 border border-[#7C5CFF]/30 rounded-xl p-1 shadow-md shadow-[#7C5CFF]/10 backdrop-blur-md">
          <button
            type="button"
            onClick={handlePreviewResume}
            className="px-3.5 py-2 hover:bg-[#7C5CFF]/15 text-[#F5F7FA] hover:text-white font-semibold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
          >
            <Eye size={14} className="text-[#B17DFF]" /> Resume Preview
          </button>
          <div className="w-px h-4 bg-white/[0.15] mx-0.5" />
          <a
            href={DOCUMENT_CONFIG.resume.url}
            download={DOCUMENT_CONFIG.resume.filename}
            className="px-3.5 py-2 bg-gradient-to-r from-[#7C5CFF] to-[#B17DFF] hover:opacity-95 text-white font-bold rounded-lg transition-all duration-200 active:scale-[0.97] cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-[#7C5CFF]"
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
