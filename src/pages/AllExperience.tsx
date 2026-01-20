import React, { useEffect } from 'react';
import { Experience } from '../components/Experience';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AllExperience = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 mb-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2" size={20} /> Home
        </Link>
      </div>
      
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white mb-4">Full Career History</h1>
        <p className="text-gray-400">Every step of my professional journey.</p>
      </div>

      <Experience />
    </div>
  );
};