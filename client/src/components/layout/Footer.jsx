import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import DeveloperSignature from "./DeveloperSignature";

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg lg:text-xl text-accent">About Mentora</h3>
          <p className="text-sm text-accent-dark">
            Empowering learners worldwide with quality education and practical
            skills for success.
          </p>
          <div className="flex space-x-3">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-soDark hover:bg-primary transition-colors"
              >
                <Icon className="w-5 h-5 text-accent hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg lg:text-xl text-accent">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { label: "Courses", to: "/courses" },
              { label: "About Us", to: "/about" },
              { label: "Contact", to: "/contact" },
              { label: "Blog", to: "/blog" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="flex items-center gap-2 text-sm text-accent-dark hover:text-accent transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-accent-dark group-hover:text-accent transition-colors" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg lg:text-xl text-accent">Contact Info</h3>
          <ul className="space-y-2 text-sm text-accent-dark">
            <li className="flex items-start gap-2">
              <Mail className="w-5 h-5 text-accent mt-0.5" />
              info@Mentora.com
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-5 h-5 text-accent mt-0.5" />
              +1 (555) 123-4567
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-accent mt-0.5" />
              123 Education St, Learning City, ED 12345
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-heading text-lg lg:text-xl text-accent">Newsletter</h3>
          <p className="text-sm text-accent-dark">
            Subscribe to our newsletter for updates and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-lg bg-soDark text-accent-dark placeholder:text-accent-dark focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Send className="w-4 h-4 text-white" />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright + developer signature */}
      <div className="mt-12 border-t border-soDark pt-8">
        <DeveloperSignature brandName="Mentora" />
      </div>
    </footer>
  );
}
