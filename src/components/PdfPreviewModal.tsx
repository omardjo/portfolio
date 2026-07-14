import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  downloadName: string;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  downloadName,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Dynamic cache-buster so old cached versions are never served in the iframe
  const cacheBustedUrl = pdfUrl.includes('?') ? `${pdfUrl}&cb=${Date.now()}` : `${pdfUrl}?cb=${Date.now()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[88vh] flex flex-col bg-[#0b1121] rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#0f172a]/90 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary/80" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={cacheBustedUrl}
                  download={downloadName}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md shadow-primary/20 active:scale-95"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>
                <a
                  href={cacheBustedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-9 h-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content - PDF Viewer */}
            <div className="relative flex-1 w-full bg-[#1e293b]/40 overflow-hidden flex flex-col items-center justify-center">
              <iframe
                src={`${cacheBustedUrl}#toolbar=1&view=FitH`}
                title={title}
                className="w-full h-full border-0"
              >
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <p className="text-gray-300">
                    Your browser does not support inline PDF viewing.
                  </p>
                  <a
                    href={cacheBustedUrl}
                    download={downloadName}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl"
                  >
                    <Download size={18} />
                    Download {title}
                  </a>
                </div>
              </iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
