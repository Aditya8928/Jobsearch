import React from "react";
import { Facebook, Twitter, Linkedin, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-16 text-gray-300 bg-gray-900 border-t border-gray-800">
      <div className="grid grid-cols-1 gap-10 px-6 py-12 mx-auto max-w-7xl md:grid-cols-3">
        
        {/* --- Brand Section --- */}
        <div>
          <h2 className="mb-3 text-2xl font-bold text-white">Job Portal</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Discover your dream job or find the best candidates in seconds. 
            Join India’s most trusted job portal today!
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="transition hover:text-blue-400">🏠 Home</Link></li>
            <li><Link to="/jobs" className="transition hover:text-blue-400">💼 Browse Jobs</Link></li>
            <li><Link to="/about" className="transition hover:text-blue-400">ℹ️ About Us</Link></li>
            <li><Link to="/contact" className="transition hover:text-blue-400">📞 Contact</Link></li>
          </ul>
        </div>

        {/* --- Social Media --- */}
        <div>
          <h3 className="mb-3 text-lg font-semibold text-white">Follow Us</h3>

          {/* Icons just below heading */}
          <div className="flex items-center gap-6 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transition-transform hover:scale-110">
              <Facebook className="w-6 h-6 text-gray-300 transition-colors hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-transform hover:scale-110">
              <Twitter className="w-6 h-6 text-gray-300 transition-colors hover:text-sky-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition-transform hover:scale-110">
              <Linkedin className="w-6 h-6 text-gray-300 transition-colors hover:text-blue-600" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
          >
            <ArrowUp className="w-4 h-4" /> Back to Top
          </button>
        </div>
      </div>

      {/* --- Bottom Line --- */}
      <div className="py-4 text-sm text-center text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-400">Job Portal</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
