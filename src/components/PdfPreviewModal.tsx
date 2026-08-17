import React, { useEffect, useState } from 'react';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';
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
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Body scroll lock & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fetch fresh PDF blob with cache: 'no-store'
  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    if (isOpen && pdfUrl) {
      setLoading(true);
      setBlobUrl(null);

      const timestampedUrl = pdfUrl.includes('?')
        ? `${pdfUrl}&t=${Date.now()}`
        : `${pdfUrl}?t=${Date.now()}`;

      fetch(timestampedUrl, { cache: 'no-store' })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load PDF blob');
          return res.blob();
        })
        .then((blob) => {
          if (!active) return;
          createdUrl = URL.createObjectURL(blob);
          setBlobUrl(createdUrl);
          setLoading(false);
        })
        .catch(() => {
          if (!active) return;
          setBlobUrl(timestampedUrl);
          setLoading(false);
        });
    }

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [isOpen, pdfUrl]);

  const directDownloadUrl = pdfUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] flex flex-col bg-[#0b1121] rounded-2xl border border-white/[0.14] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 border-b border-white/[0.08] bg-[#0f172a]/95 backdrop-blur-xl">
              <div className="flex items-center gap-2 sm:gap-3 truncate mr-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary flex-shrink-0" />
                <h3 className="text-xs sm:text-base font-bold text-white tracking-wide truncate">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <a
                  href={directDownloadUrl}
                  download={downloadName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-md shadow-primary/20 active:scale-95 cursor-pointer min-h-[36px] focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
                <a
                  href={directDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ touchAction: 'manipulation' }}
                  title="Open in new tab"
                  aria-label="Open in new tab"
                >
                  <ExternalLink size={15} />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ touchAction: 'manipulation' }}
                  aria-label="Close modal"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Modal Content - PDF Viewer */}
            <div className="relative flex-1 w-full bg-[#1e293b]/40 overflow-hidden flex flex-col items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-3 text-gray-300">
                  <Loader2 className="w-7 h-7 animate-spin text-primary" />
                  <span className="text-xs sm:text-sm font-medium">Chargement du document...</span>
                </div>
              ) : blobUrl ? (
                <iframe
                  key={blobUrl}
                  src={`${blobUrl}#toolbar=1&view=FitH`}
                  title={title}
                  className="w-full h-full border-0"
                >
                  <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <p className="text-gray-300 text-sm">
                      Votre navigateur ne supporte pas l'affichage PDF direct.
                    </p>
                    <a
                      href={directDownloadUrl}
                      download={downloadName}
                      className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white font-semibold rounded-xl text-sm"
                    >
                      <Download size={16} />
                      Download {title}
                    </a>
                  </div>
                </iframe>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
