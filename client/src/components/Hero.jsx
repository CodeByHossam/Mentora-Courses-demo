import { ArrowRight, Check } from "lucide-react";

import { Button } from "./common";
import {
  getCourseLessonsCount,
  getCoursePrice,
  getInstructorName,
} from "../utils/coursePresentation";

const HERO_IMAGE = "/images/hero-modern-university-students.png";
const HERO_BULLETS = [
  "Expert-led lessons",
  "Learn at your pace",
  "Certificate included",
];

/** Landing hero: one outcome, one primary action, and one real course artifact. */
export default function Hero({ course }) {
  const instructorName =
    course?.instructor?.name || getInstructorName(course);
  const lessonsCount = getCourseLessonsCount(course);
  const price = getCoursePrice(course);
  const originalPrice = Number(course?.originalPrice ?? 0) || 0;

  return (
    <section className="bg-transparent" aria-labelledby="hero-title">
      <div className="hero-reveal mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-4 py-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-10">
        <div className="space-y-7 lg:col-span-6">
          <div className="type-label-md inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-accent-800">
            <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
            <span>Freshly updated catalog</span>
            <span className="text-accent-700">★ New releases</span>
          </div>

          <h1 id="hero-title" className="type-display-hero text-slate-900">
            <span className="block whitespace-nowrap">Practcial course for</span>
            <span className="block whitespace-nowrap">
              the <span className="text-brand-600">future</span> you are
            </span>
            <span className="block whitespace-nowrap">building</span>
          </h1>

          <p className="type-body-lg max-w-xl text-slate-600">
            Learn web development, data, and design with short, expert-led
            lessons you can put to work right away.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button to="#latest-courses" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Browse courses
            </Button>
            <Button
              to="/about"
              variant="ghost"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              About Mentora
            </Button>
          </div>

          <ul className="type-body-sm grid grid-cols-1 gap-3 pt-4 text-slate-600 sm:grid-cols-3">
            {HERO_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-50 text-xs text-brand-600"
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center lg:col-span-6 lg:justify-end">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-soft lg:max-w-lg">
            <img
              src={HERO_IMAGE}
              alt="Students learning and collaborating together"
              width="1200"
              height="900"
              loading="eager"
              decoding="async"
              className="h-[460px] w-full object-cover object-center"
            />

            {course ? (
              <div
                className="absolute inset-x-3 bottom-3 mx-auto flex max-w-[19rem] items-center gap-2 rounded-full border border-white/70 bg-white/95 p-1.5 pl-2 shadow-lg backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:max-w-[20rem]"
                role="group"
                aria-label={`Popular course: ${course.title}`}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-100 text-sm text-accent-700"
                  aria-hidden="true"
                >
                  ★
                </span>
                <div className="min-w-0 flex-1">
                  <h2
                    className="type-label-md truncate text-slate-900"
                    title={course.title}
                  >
                    {course.title}
                  </h2>
                  <p className="type-body-sm truncate text-slate-500">
                    {instructorName} · {lessonsCount} lessons
                  </p>
                </div>
                <span
                  className="type-label-md shrink-0 text-accent-700 tabular-nums"
                  title={`$${price} USD`}
                >
                  {originalPrice > price ? (
                    <span className="mr-1 text-slate-400 line-through">
                      ${originalPrice}
                    </span>
                  ) : null}
                  ${price}
                </span>
                <Button
                  to={`/courses/${course._id}`}
                  variant="ghost"
                  size="sm"
                  className="!min-h-8 !rounded-full !border-slate-200 !px-3 !py-1 !text-xs !text-brand-600 hover:!text-brand-700"
                  rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                >
                  View
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
