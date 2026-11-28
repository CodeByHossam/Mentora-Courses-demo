import { ArrowRight, Star } from "lucide-react";

import { Button } from "../common";
import {
  getCoursePrice,
  getCourseRating,
  getCourseRatingsCount,
  getInstructorName,
} from "../../utils/coursePresentation";

export default function FeaturedBanner({ course }) {
  const rating = getCourseRating(course);
  const ratingsCount = getCourseRatingsCount(course);
  const instructorName = getInstructorName(course);
  const price = getCoursePrice(course);

  return (
    <section
      className="mx-auto mt-6 max-w-[1440px] px-4 sm:px-8 lg:px-16"
      aria-labelledby="featured-title"
    >
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-[linear-gradient(120deg,#0B0F19_0%,#1E1B4B_100%)] px-6 py-6 text-white shadow-soft lg:grid-cols-[1fr_minmax(300px,360px)] lg:items-center">
        <div className="flex min-w-0 items-start gap-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-400 text-slate-950"
            aria-hidden="true"
          >
            <Star className="h-6 w-6 fill-current" />
          </span>
          <div className="min-w-0">
            <h2 id="featured-title" className="type-headline-sm text-white">
              Featured &amp; Trending Courses
            </h2>
            <p className="type-body-md mt-1 max-w-lg text-slate-300">
              Hand-picked by industry mentors with real-world capstone projects
              and live weekly office hours.
            </p>
          </div>
        </div>

        {course ? (
          <div className="min-w-0 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="type-label-md uppercase text-accent-400">
              {course.category?.name || course.categoryLabel || "Featured"}
            </p>
            <h3 className="type-title-md mt-1 text-white">{course.title}</h3>
            <p className="type-body-sm mt-0.5 text-slate-300">{instructorName}</p>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
              <span className="type-label-md flex items-center gap-1 tabular-nums">
                <Star className="h-3.5 w-3.5 fill-current text-accent-400" aria-hidden="true" />
                {rating.toFixed(1)}
                {ratingsCount > 0 ? (
                  <span className="sr-only">out of 5 from {ratingsCount} ratings</span>
                ) : (
                  <span className="sr-only">out of 5</span>
                )}
              </span>
              <span className="type-label-md tabular-nums">${price} USD</span>
            </div>

            <Button
              to={`/courses/${course._id}`}
              variant="accent"
              size="sm"
              className="mt-4 w-full focus-visible:ring-accent-400 focus-visible:ring-offset-slate-900 sm:w-auto"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              View course
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
