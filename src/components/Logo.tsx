
import React from 'react';

interface LogoProps {
  variant?: 'small' | 'medium' | 'large' | 'mega';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    mega: 'w-48 h-48'
  };

  return (
    <div className={`${sizeClasses[variant]} ${className} transition-transform duration-300 hover:scale-105`}>
      <img
        src="/lovable-uploads/b9179f2c-17af-41d8-ac78-c340c51e4c2b.png"
        alt="Novakinetix Academy Logo"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </div>
  );
};
