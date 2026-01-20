import React, { useEffect } from 'react';
import { Projects } from '../components/Projects';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AllProjects = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="pt-10">
      <div className="container mx-auto px-4 mb-4">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2" size={20} /> Home
        </Link>
      </div>
      
      {/* No params = Show ALL */}
      <Projects />
    </div>
  );
};