import {
  FaFacebookF,
  FaInstagram,
  
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowUp,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import {FaTwitter} from "react-icons/fa"
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/",
    },
    {
     name: "X",
  icon: FaTwitter,
  url: "https://x.com/",

    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      url: "https://www.linkedin.com/",
    },];
  

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Services", path: "/Home" },
    { name: "Book a Repair", path: "/BookRepair" },
    { name: "My Bookings", path: "/mybookings" },
  ];

  const services = [
    "Screen Replacement",
    "Battery Replacement",
    "Water Damage Repair",
    "Charging Port Repair",
    "Software & Performance",
  ];

  return (
    <footer className="relative overflow-hidden bg-[#061126] text-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
        {/* Top CTA */}
        <div className="mb-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Your trusted repair partner
            </span>

            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Your phone deserves
              <span className="text-emerald-400"> expert care.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              From cracked screens to battery issues, MobileFix helps you
              get back to what matters with convenient doorstep repair
              booking and easy repair tracking.
            </p>
          </div>

          <Link
            to="/BookRepair"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Book a Repair
            <FaArrowRight />
          </Link>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 to-emerald-500 text-xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                M
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  Mobile<span className="text-emerald-400">Fix</span>
                </h2>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
                  Repair made simple
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Smart solutions for your everyday tech. Book your mobile
              repair, manage your bookings, and follow your repair journey
              with MobileFix.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                <FaShieldAlt className="text-emerald-400" />
                Quality-focused
              </span>

              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                <FaClock className="text-emerald-400" />
                Convenient booking
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-bold tracking-wide">
              Quick Links
            </h3>

            <div className="mb-5 mt-3 h-1 w-10 rounded-full bg-emerald-400" />

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:translate-x-1 hover:text-emerald-300"
                  >
                    <FaArrowRight className="text-[10px] text-emerald-500 opacity-0 transition group-hover:opacity-100" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold tracking-wide">
              Repair Services
            </h3>

            <div className="mb-5 mt-3 h-1 w-10 rounded-full bg-emerald-400" />

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2 text-sm text-slate-400"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-xs text-emerald-400" />
                  {service}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs leading-5 text-slate-500">
              Available repair options depend on your device and service
              requirements.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold tracking-wide">
              Get in Touch
            </h3>

            <div className="mb-5 mt-3 h-1 w-10 rounded-full bg-emerald-400" />

            <p className="mb-5 text-sm leading-6 text-slate-400">
              Have a question about a repair or booking? Contact our
              support team.
            </p>

            <div className="space-y-4">
              <a
                href="tel:+919754727732"
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-400 transition group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10">
                  <FaPhone />
                </span>

                <span>
                  <span className="block text-xs text-slate-500">
                    Call us
                  </span>
                  <span className="mt-1 block text-sm text-slate-300 transition group-hover:text-emerald-300">
                    +91 97547 27732
                  </span>
                </span>
              </a>

              <a
                href="mailto:support@mobilefix.com"
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-400 transition group-hover:border-emerald-400/40 group-hover:bg-emerald-400/10">
                  <FaEnvelope />
                </span>

                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">
                    Email us
                  </span>
                  <span className="mt-1 block break-all text-sm text-slate-300 transition group-hover:text-emerald-300">
                    support@mobilefix.com
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-400">
                  <FaMapMarkerAlt />
                </span>

                <span>
                  <span className="block text-xs text-slate-500">
                    Location
                  </span>
                  <span className="mt-1 block text-sm text-slate-300">
                    Bhopal, Madhya Pradesh, India
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social section */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-7 sm:flex-row">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold">
              Stay connected with MobileFix
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Follow these platforms to stay connected online.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, icon: Icon, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-400 hover:text-slate-950 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <Icon className="text-base" />
              </a>
            ))}

            <a
              href="#top"
              aria-label="Back to top"
              title="Back to top"
              className="ml-2 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white/20"
            >
              <FaArrowUp />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © {currentYear} MobileFix. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Built with care for your everyday tech.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;