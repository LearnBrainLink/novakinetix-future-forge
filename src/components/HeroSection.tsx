
import React from 'react';
import { Logo } from './Logo';
import { GraduationCap, Play } from 'lucide-react';

interface HeroSectionProps {
  onWatchDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchDemo }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="3"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Logo with glow effect */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 animate-pulse"></div>
            <Logo variant="mega" className="relative z-10 w-48 h-48 md:w-64 md:h-64" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Novakinetix Academy
          </span>
        </h1>

        <p className="text-xl md:text-3xl lg:text-4xl mb-4 font-light leading-relaxed text-blue-100">
          Empowering Future <span className="font-bold text-yellow-300">Innovators</span>
        </p>

        <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed">
          Join the next generation of technology leaders through cutting-edge STEM education, 
          hands-on learning experiences, and real-world applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-12 py-6 rounded-full text-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 transform">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <GraduationCap className="mr-3 w-6 h-6" />
              Start Your Journey
            </div>
          </button>

          <button
            onClick={onWatchDemo}
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-12 py-6 rounded-full text-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 transform"
          >
            <div className="flex items-center">
              <Play className="mr-3 w-6 h-6" />
              Watch Demo
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
