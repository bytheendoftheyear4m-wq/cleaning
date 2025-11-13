import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1761312834150-4beefff097a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjB3YXNofGVufDB8fHx8MTc2MzAxMDQ4MHww&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-100 text-sm font-medium">Calgary's #1 Mobile Cleaning Service</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Premium Cleaning
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
              For Cars & Homes
            </span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Professional car detailing, home cleaning, event services, and contract cleaning delivered to your location in Calgary. We bring excellence to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              onClick={scrollToBooking}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Book Your Service
            </Button>
            <Button 
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
            >
              View Services
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-1">Mobile Service</h3>
                <p className="text-gray-300 text-sm">Cars, homes & events - we come to you</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-1">Full Service</h3>
                <p className="text-gray-300 text-sm">Car detailing & property cleaning</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-1">Satisfaction Guaranteed</h3>
                <p className="text-gray-300 text-sm">100% quality assurance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;