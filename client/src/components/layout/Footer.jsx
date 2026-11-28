import { ArrowUpRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../common";

const FOOTER_COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Courses", to: "/courses" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Your learning",
    links: [
      { label: "My courses", to: "/my-courses" },
      { label: "Certificates", to: "/certificates" },
      { label: "Help", to: "/help" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Log in", to: "/login" },
      { label: "Sign up", to: "/register" },
      { label: "Become an instructor", to: "/instructor-register" },
    ],
  },
];

const FOOTER_LINKS = [
  { label: "Privacy", to: "/terms-and-conditions" },
  { label: "Terms", to: "/terms-and-conditions" },
  { label: "Support", to: "/help" },
  { label: "Student Discount", to: "/courses", isEmphasized: true },
];

const footerCtaClass =
  "!h-11 !px-4 !text-sm whitespace-nowrap focus-visible:ring-accent-400 focus-visible:ring-offset-slate-900";

const footerLinkClass = (isEmphasized) =>
  `type-label-md rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
    isEmphasized
      ? "text-accent-400 hover:text-accent-200"
      : "text-slate-300 hover:text-white"
  }`;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-footer text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-16 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-md shadow-brand-500/25 transition group-hover:bg-brand-500">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                <span
                  className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-slate-950"
                  aria-hidden="true"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="type-headline-sm text-white">Mentora</span>
                <span className="type-label-sm mt-0.5 uppercase text-accent-400">
                  Learning Hub
                </span>
              </span>
            </Link>

            <p className="type-body-md mt-5 max-w-sm text-slate-300">
              Learn web development, data, and design with short, expert-led
              lessons you can put to work right away.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                to="/courses"
                fullWidth
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                className={footerCtaClass}
              >
                Browse courses
              </Button>
              <Button
                to="/about"
                variant="ghost"
                fullWidth
                className={`${footerCtaClass} border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white`}
              >
                About Mentora
              </Button>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3 lg:gap-10"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="type-label-md uppercase text-white">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className={footerLinkClass(false)}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-sm text-slate-400">
            © {new Date().getFullYear()} Mentora Platform. All rights reserved.
          </p>

          <nav aria-label="Footer legal and support">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className={footerLinkClass(link.isEmphasized)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
