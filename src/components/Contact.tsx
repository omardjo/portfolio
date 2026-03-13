// Contact section - clean premium design
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
      alert("Échec de l'envoi. Veuillez réessayer ou m'envoyer un email directement.");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl">
        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-semibold tracking-widest uppercase mb-3"
          >
            Contact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Get in Touch
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6">Contact Info</h3>
              <div className="space-y-5">
                <a href="mailto:omar.djebbi@tijari.biz" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 bg-primary/[0.1] rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <p className="text-gray-300 font-medium text-sm group-hover:text-primary transition-colors">omar.djebbi@tijari.biz</p>
                  </div>
                </a>
                <a href="tel:+21653115231" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 bg-secondary/[0.1] rounded-xl flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Phone</p>
                    <p className="text-gray-300 font-medium text-sm group-hover:text-secondary transition-colors">+216 53 115 231</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-accent/[0.1] rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-gray-300 font-medium text-sm">Tunis – Monplaisir, Tunisie</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV Download */}
            <a
              href="/assets/documents/Omar_Djebbi_CV.pdf"
              download="Omar_Djebbi_CV.pdf"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all active:scale-[0.97] cursor-pointer text-[15px]"
            >
              <Download size={18} /> Download CV
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-500 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[15px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[15px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-600"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-500 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[15px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-600 resize-none"
                  placeholder="How can I help?"
                />
              </div>
              <div>
                <label htmlFor="captcha" className="block text-sm text-gray-500 mb-2">Anti-spam: 2 + 3 = ?</label>
                <input
                  type="number"
                  id="captcha"
                  required
                  value={formData.captcha}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-[15px] focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-gray-600"
                  placeholder="Enter the number"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer text-[15px]"
              >
                {status === 'sending' ? (
                  <><Loader2 className="animate-spin" size={18} /> Sending...</>
                ) : status === 'success' ? (
                  'Message Sent!'
                ) : status === 'error' ? (
                  'Failed to Send'
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};