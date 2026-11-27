import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle2, Clock3 } from "lucide-react";

const HERO_IMAGE = "/images/photo-1522202176988-66273c2fd55f.jpg";

/**
 * The single landing hero. One outcome claim, one primary action, and one real
 * course artifact — no competing stat wall or decorative illustration.
 */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-canvas"
      aria-labelledby="hero-title"
    >
      <div className="hero-reveal mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h1
            id="hero-title"
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]"
          >
            Practical courses for the <span className="text-brand">future</span>{" "}
            you are building.
          </h1>

          <p className="mt-6 max-w-[58ch] text-lg leading-8 text-ink-soft">
            Learn web development, data, and design with short, expert-led
            lessons you can put to work right away.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/courses"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold"
            >
              Browse courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/about"
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold"
            >
              See how it works
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2
                className="h-4 w-4 text-brand-600"
                aria-hidden="true"
              />
              Expert-led lessons
            </li>
            <li className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Learn at your pace
            </li>
            <li className="inline-flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-brand-600" aria-hidden="true" />
              Certificate included
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-brand-100 shadow-[0_18px_45px_rgba(15,23,42,0.14)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src={HERO_IMAGE}
              alt="Learners collaborating around laptops in a coding session"
              width="800"
              height="1000"
              className="h-full w-full object-cover"
            />
            <div className="image-scrim absolute inset-0" aria-hidden="true" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <div className="max-w-sm rounded-xl bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.16)]">
                <p className="text-base font-semibold text-ink">
                  Modern React from Scratch
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-ink-soft">
                  <span>Dr. Sarah Hassan</span>
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    6 lessons
                  </span>
                </div>
                <Link
                  to="/courses/course-1"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  View course
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
