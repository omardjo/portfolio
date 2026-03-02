// FIX MOBILE: Contact section with proper touch targets
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', captcha: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const PUBLIC_KEY = "ArSp_jvOyAPn-eywl";
  const SERVICE_ID = "service_eagsj3e";
  const TEMPLATE_ADMIN_ID = "template_admin";
  const TEMPLATE_AUTOREPLY_ID = "template_autoreply";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.captcha) !== 5) {
      alert("Protection anti-spam: Réponse incorrecte. Veuillez entrer 5.");
      return;
    }
    setStatus('sending');
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      title: "Portfolio Inquiry",
      date: new Date().toLocaleDateString()
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ADMIN_ID, templateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_AUTOREPLY_ID, templateParams, PUBLIC_KEY);
      setStatus('success');
      alert('Merci ! Votre message a été envoyé avec succès.');
      setFormData({ name: '', email: '', message: '', captcha: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      alert('Échec de l\'envoi. Veuillez réessayer ou m\'envoyer un email directement.');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Me Contacter</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-card/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-xl h-fit"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-primary">Informations de Contact</h3>
            <div className="space-y-6 md:space-y-8">
              {/* FIX MOBILE: Touch-friendly contact links */}
              <a href="mailto:omar.djebbi@tijari.biz" className="flex items-center gap-4 group min-h-[48px]" style={{ touchAction: 'manipulation' }}>
                <div className="w-12 h-12 min-w-[48px] bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold text-white group-hover:text-primary transition-colors text-sm md:text-base">omar.djebbi@tijari.biz</p>
                </div>
              </a>
              <a href="tel:+21653115231" className="flex items-center gap-4 group min-h-[48px]" style={{ touchAction: 'manipulation' }}>
                <div className="w-12 h-12 min-w-[48px] bg-secondary/20 rounded-xl flex items-center justify-center group-hover:bg-secondary/30 transition-all">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p className="font-semibold text-white group-hover:text-secondary transition-colors">+216 53 115 231</p>
                </div>
              </a>
              <div className="flex items-center gap-4 min-h-[48px]">
                <div className="w-12 h-12 min-w-[48px] bg-accent/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Localisation</p>
                  <p className="font-semibold text-white">Tunis, Tunisie</p>
                </div>
              </div>
            </div>

            {/* FIX MOBILE: CV download button in contact section */}
            <a
              href="/assets/documents/Resume.pdf"
              download="Omar_Djebbi_CV.pdf"
              className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              <Download size={18} /> Télécharger Mon CV
            </a>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-card/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-700/50 shadow-xl"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-secondary">Envoyer un Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nom</label>
                <input type="text" id="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[48px] bg-gray-900/50 border border-gray-700 rounded-xl text-white text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Votre Nom" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" id="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[48px] bg-gray-900/50 border border-gray-700 rounded-xl text-white text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="votre@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea id="message" rows={4} required value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Comment puis-je vous aider ?" />
              </div>
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-400 mb-2">Protection anti-spam : 2 + 3 = ?</label>
                <input type="number" id="captcha" required value={formData.captcha} onChange={handleChange}
                  className="w-full px-4 py-3 min-h-[48px] bg-gray-900/50 border border-gray-700 rounded-xl text-white text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Entrez le nombre" />
              </div>
              {/* FIX MOBILE: Submit button with proper touch target */}
              <button type="submit" disabled={status === 'sending'}
                className="w-full px-6 py-4 min-h-[52px] bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1 active:scale-95 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              >
                {status === 'sending' ? (<><Loader2 className="animate-spin mr-2" /> Envoi en cours...</>) : status === 'success' ? "Message Envoyé !" : status === 'error' ? "Échec de l'envoi" : (<>Envoyer le Message <Send size={18} className="ml-2" /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};