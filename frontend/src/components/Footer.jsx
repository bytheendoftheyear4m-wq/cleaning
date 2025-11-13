import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PG</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Pure Gold Solutions</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Calgary's premier mobile car wash and detailing service. Bringing professional care to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-400 transition-colors">
                  Book Now
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-400 transition-colors">Exterior Wash & Wax</li>
              <li className="hover:text-amber-400 transition-colors">Interior Detailing</li>
              <li className="hover:text-amber-400 transition-colors">Premium Full Detail</li>
              <li className="hover:text-amber-400 transition-colors">Engine Bay Cleaning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Calgary, Alberta</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>(403) 555-0123</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>info@puregoldsolutions.ca</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Mon-Sun: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Pure Gold Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;