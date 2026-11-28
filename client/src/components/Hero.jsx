import { ArrowRight, Check, Star } from "lucide-react";

import { Button } from "./common";
import {
  getCourseLessonsCount,
  getCoursePrice,
  getInstructorName,
} from "../utils/coursePresentation";

const HERO_IMAGE = "/images/mentora-hero-studio.jpg";
const HERO_BULLETS = [
  "Expert-led lessons",
  "Learn at your pace",
  "Certificate included",
];

/** Landing hero: outcome-led copy, one primary action, and a real course artifact. */
export default function Hero({ course }) {
  const instructorName =
    course?.instructor?.name || getInstructorName(course);
  const lessonsCount = getCourseLessonsCount(course);
  const price = getCoursePrice(course);
  const originalPrice = Number(course?.originalPrice ?? 0) || 0;

  return (
    <section id="home" className="bg-transparent" aria-labelledby="hero-title">
      <div className="hero-reveal mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-6 sm:px-8 lg:min-h-[calc(100vh-96px)] lg:grid-cols-12 lg:items-stretch lg:gap-12 lg:px-16 lg:py-10">
        <div className="flex flex-col justify-center space-y-6 lg:col-span-6">
          <p className="type-label-md flex flex-wrap items-center gap-1.5 text-slate-700">
            <Star
              className="h-4 w-4 fill-amber-400 text-amber-500"
              aria-hidden="true"
            />
            <span>Freshly updated catalog</span>
            <span className="text-amber-400" aria-hidden="true">
              ·
            </span>
            <span>New cohort releases</span>
          </p>

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

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Button
              to="#latest-courses"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
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

          <ul className="type-body-sm flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-slate-600">
            {HERO_BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-soft lg:h-full lg:min-h-[420px]">
            <img
              src={HERO_IMAGE}
              alt="Students collaborating around a laptop in a sunlit studio"
              width="1200"
              height="900"
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent"
              aria-hidden="true"
            />

            {course ? (
              <div
                className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-xl border border-white/70 bg-white/95 p-3.5 shadow-lg backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-4"
                role="group"
                aria-label={`Popular course: ${course.title}`}
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50"
                    aria-hidden="true"
                  >
                    <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className="type-title-md truncate text-slate-900"
                      title={course.title}
                    >
                      {course.title}
                    </p>
                    <p className="type-body-sm truncate text-slate-600">
                      {instructorName} · {lessonsCount} lessons
                    </p>
                  </div>
                </div>

                <div className="hidden shrink-0 items-baseline gap-2 sm:flex">
                  {originalPrice > price ? (
                    <span className="type-body-sm text-slate-400 line-through tabular-nums">
                      ${originalPrice}
                    </span>
                  ) : null}
                  <span className="type-title-md font-bold text-amber-700 tabular-nums">
                    ${price}
                  </span>
                </div>

                <Button
                  to={`/courses/${course._id}`}
                  variant="ghost"
                  size="sm"
                  className="!min-h-9 !rounded-lg !border-slate-200 !px-3 !py-1.5 !text-xs !text-brand-700 hover:!text-brand-800"
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
