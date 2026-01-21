import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', captcha: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Replace with your actual EmailJS keys if they changed
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
      alert("Spam Protection: Incorrect answer. Please enter 5.");
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
      alert('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '', captcha: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      alert('Failed to send message. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Get In Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl h-fit"
          >
            <h3 className="text-2xl font-bold mb-8 text-primary">Contact Information</h3>
            <div className="space-y-8">
              <a href="mailto:omar.djebbi@tijari.biz" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-semibold text-white group-hover:text-primary transition-colors">omar.djebbi@tijari.biz</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="font-semibold text-white">+216 53 115 231</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="font-semibold text-white">El-Hrairia, Tunis, Tunisia</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-card/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-secondary">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" id="name" required value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" id="email" required value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea id="message" rows={4} required value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="How can I help you?" />
              </div>
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-400 mb-2">Spam Protection: 2 + 3 = ?</label>
                <input type="number" id="captcha" required value={formData.captcha} onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Enter number" />
              </div>
              <button type="submit" disabled={status === 'sending'}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'sending' ? (<><Loader2 className="animate-spin mr-2" /> Sending...</>) : status === 'success' ? "Message Sent!" : status === 'error' ? "Failed to Send" : (<>Send Message <Send size={18} className="ml-2" /></>)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};