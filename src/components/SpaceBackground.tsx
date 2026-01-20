import React from 'react';

export const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* This renders the CSS star layers */}
      <div className="stars"></div>
      <div className="stars2"></div>
    </div>
  );
};