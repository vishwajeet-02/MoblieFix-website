import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#001f8e] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">
            Mobile<span className="text-green-500">Fix</span>
          </h2>
          <p className="mt-4 text-gray-300">
            Fast, reliable, and affordable mobile repair services at your
            doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">Services</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Track Repair
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Screen Repair</li>
            <li>Battery Replacement</li>
            <li>Water Damage</li>
            <li>Software Issues</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <FaPhone />
              9754727732
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope />
              support@mobilefix.com
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Bhopal, Madhya Pradesh
            </p>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-8 mt-10 text-xl">
        <FaFacebookF className="cursor-pointer hover:text-yellow-400" />
        <FaInstagram className="cursor-pointer hover:text-yellow-400" />
        <FaTwitter className="cursor-pointer hover:text-yellow-400" />
        <FaLinkedinIn className="cursor-pointer hover:text-yellow-400" />
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        &copy; 2026 MobileFix. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;