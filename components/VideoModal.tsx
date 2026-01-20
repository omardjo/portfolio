import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-black rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 p-4 z-10">
              <button 
                onClick={onClose}
                className="bg-black/50 p-2 rounded-full text-white hover:text-primary transition-colors hover:bg-white/10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="relative pt-[56.25%]">
               {/* Use iframe if it's youtube/vimeo, or video tag if local mp4 */}
               {/* For this demo, assuming standard MP4 based on user input */}
               <video 
                 className="absolute inset-0 w-full h-full"
                 controls 
                 autoPlay 
                 playsInline
                 src={videoUrl}
               >
                 Your browser does not support the video tag.
               </video>
            </div>
            
            <div className="p-4 bg-gray-900 border-t border-gray-800">
               <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};