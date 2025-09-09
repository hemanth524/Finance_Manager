import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 relative w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Finance Assistant</h3>
            <p className="text-gray-400 text-sm">
              Your personal finance tracker to manage income, expenses, and stay on top of your financial goals effortlessly.
            </p>
          </div>

          {/* Quick Links */}
         

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: support@financeassistant.com</p>
            <p className="text-sm mt-2">Phone: +91 12345 67890</p>
            <p className="text-sm mt-2">Address: 123 Finance Street, Hyderabad, India</p>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-white transition"><FaTwitter /></a>
              <a href="#" className="hover:text-white transition"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Finance Assistant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
