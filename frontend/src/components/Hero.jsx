import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              <span>Event Management Excellence</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              When the pressure is on,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                so are we
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Your go-to partner for effective strategic management, advanced logistics, and flawless event execution. From MICE events to multimedia production, we deliver excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg group"
                size="lg"
              >
                Make it happen
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button
                onClick={() => scrollToSection('services')}
                variant="outline"
                className="border-2 border-gray-300 hover:border-amber-600 hover:text-amber-600 px-8 py-6 text-lg"
                size="lg"
              >
                Explore Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold text-amber-600">10+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">500+</div>
                <div className="text-sm text-gray-600 mt-1">Events Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600">100+</div>
                <div className="text-sm text-gray-600 mt-1">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">M</div>
                </div>
                <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">I</div>
                </div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="h-48 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center text-white text-5xl font-bold">C</div>
                </div>
                <div className="h-64 bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">E</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
