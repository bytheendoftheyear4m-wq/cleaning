import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_puregold-carwash/artifacts/iusyof5u_pure%20gold.jpg" 
                alt="Pure Gold Solutions Logo"
                className="h-14 w-auto object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h3 className="text-white font-bold text-lg">Pure Gold Solutions</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Calgary's premier mobile cleaning service for cars and homes. Bringing professional care to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-blue-400 transition-colors">
                  Book Now
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 transition-colors">Car Detailing</li>
              <li className="hover:text-blue-400 transition-colors">Home Cleaning</li>
              <li className="hover:text-blue-400 transition-colors">Event Cleaning</li>
              <li className="hover:text-blue-400 transition-colors">Contract Cleaning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Calgary, Alberta</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:6477875942" className="hover:text-blue-300 transition-colors">(647) 787-5942</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:amasarpong206@gmail.com" className="hover:text-blue-300 transition-colors">amasarpong206@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Mon-Sun: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <div className="flex items-center justify-center gap-4 mb-2">
            <p>&copy; 2025 Pure Gold Solutions. All rights reserved.</p>
            <span className="text-gray-600">|</span>
            <a href="/admin/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;