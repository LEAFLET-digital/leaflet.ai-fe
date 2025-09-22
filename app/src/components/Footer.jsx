import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdCall, MdMessage } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative text-white">
      {/* Background with gradient */}
      <div className="glass-effect border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2 lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 glow-text text-center md:text-left">LEAFLET.ai</h2>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0">
                Transform your data into actionable insights with our advanced AI-powered 
                Computer Vision platform. Join thousands of companies already leveraging 
                the power of artificial intelligence.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-center md:text-left">Stay Updated</h3>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all text-sm"
                    />
                  </div>
                  <button className="modern-btn px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
                {[
                  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
                  { icon: FaTwitter, href: "#", label: "Twitter" },
                  { icon: FaGithub, href: "#", label: "GitHub" },
                  { icon: FaFacebook, href: "#", label: "Facebook" },
                  { icon: FaInstagram, href: "#", label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-2.5 sm:p-3 rounded-xl glass-effect hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Solutions</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Computer Vision",
                  "AI Analytics", 
                  "Real-time Processing",
                  "Machine Learning",
                  "Data Insights",
                  "Enterprise AI"
                ].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 relative group inline-block"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center md:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Resources</h3>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {[
                  "Documentation",
                  "API Reference",
                  "Tutorials",
                  "Blog",
                  "Community",
                  "Support"
                ].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors duration-300 relative group inline-block"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
              
              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3 text-gray-300 justify-center md:justify-start">
                  <MdCall className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-gray-300 justify-center md:justify-start">
                  <MdMessage className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">hello@leaflet.ai</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-gray-300 justify-center md:justify-start">
                  <HiLocationMarker className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div className="text-xs sm:text-sm text-gray-400">
                © 2025 LEAFLET.ai. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <a 
                    key={item}
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;