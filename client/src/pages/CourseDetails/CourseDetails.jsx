import { ArrowRight, BookOpen, Check, Clock, Star, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Button, ProgressLoader } from "../../components/common";
import {
  getCourseLessonsCount,
  getCoursePrice,
  getCourseRating,
  getCourseRatingsCount,
  getInstructorName,
} from "../../utils/coursePresentation";
import { useGetCourseQuery } from "../../store/services/courseApi";
import { useGetLessonsQuery } from "../../store/services/lessonApi";

/** Demo-backed course detail page built from the shared design system. */
export default function CourseDetails() {
  const { courseId } = useParams();
  const { data: course, isLoading, isError } = useGetCourseQuery(courseId);
  const { data: lessons = [] } = useGetLessonsQuery(
    { courseId },
    { skip: !courseId },
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ProgressLoader isVisible message="Loading course details..." />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="container section flex min-h-[60vh] items-center justify-center">
        <div className="card max-w-lg p-8 text-center">
          <h1 className="type-headline-md text-ink">Course not found</h1>
          <p className="type-body-md mt-3 text-ink-soft">
            This demo course is not in the seeded catalog. Browse the catalog to
            find another course.
          </p>
          <Button to="/courses" className="mt-6" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Browse courses
          </Button>
        </div>
      </div>
    );
  }

  const price = getCoursePrice(course);
  const originalPrice = Number(course.originalPrice ?? 0) || 0;
  const rating = getCourseRating(course);
  const ratingsCount = getCourseRatingsCount(course);
  const instructor = getInstructorName(course);
  const lessonCount = getCourseLessonsCount(course) || lessons.length;
  const image = course.imageUrl || course.thumbnail;

  return (
    <div className="container py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="type-label-md text-ink-muted">
        <Link to="/courses" className="rounded-sm hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          Courses
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-ink-soft">{course.categoryLabel || course.category?.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="type-label-md inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-brand-700">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {course.categoryLabel || course.category?.name || "Course"}
          </div>
          <h1 className="type-headline-lg mt-4 text-ink">{course.title}</h1>
          <p className="type-body-lg mt-4 max-w-2xl text-ink-soft">
            {course.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-ink-muted">
            <span className="pill pill-rating">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {rating.toFixed(1)} ({ratingsCount})
            </span>
            <span className="type-label-md inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" aria-hidden="true" />
              {course.enrolledCount || course.students || 0} learners
            </span>
            <span className="type-label-md inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {course.duration || "Self-paced"}
            </span>
            <span className="type-label-md">By {instructor}</span>
          </div>

          <div className="card mt-8">
            <h2 className="type-title-md text-ink">What you will learn</h2>
            <ul className="type-body-md mt-4 grid gap-3 text-ink-soft sm:grid-cols-2">
              {(course.whatYouWillLearn || []).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="type-headline-sm text-ink">Course lessons</h2>
            <ol className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
              {lessons.length ? (
                lessons.map((lesson, index) => (
                  <li
                    key={lesson._id || lesson.id}
                    className="type-body-md flex items-center justify-between gap-4 px-4 py-3 text-ink-soft"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="type-label-md flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 tabular-nums">
                        {index + 1}
                      </span>
                      <span className="truncate">{lesson.title}</span>
                    </span>
                    <span className="type-label-sm shrink-0 text-ink-muted tabular-nums">
                      {lesson.duration || "Preview"}
                    </span>
                  </li>
                ))
              ) : (
                <li className="type-body-md px-4 py-6 text-center text-ink-muted">
                  {lessonCount} lessons are available in this demo course.
                </li>
              )}
            </ol>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="card overflow-hidden">
            <img
              src={image}
              alt=""
              className="h-56 w-full object-cover"
              loading="eager"
            />
            <div className="p-6">
              <div className="flex items-end gap-2">
                <span className="type-headline-sm text-ink">${price}</span>
                {originalPrice > price ? (
                  <span className="type-body-sm pb-1 text-ink-muted line-through">
                    ${originalPrice}
                  </span>
                ) : null}
              </div>
              <p className="type-body-sm mt-1 text-ink-muted">
                One-time access · {lessonCount} lessons · {course.level || "All levels"}
              </p>

              <div className="mt-5 grid gap-3">
                <Button
                  to={`/courses/${courseId}/enroll`}
                  variant="accent"
                  fullWidth
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Enroll now
                </Button>
                <Button
                  to={`/courses/${courseId}/learn`}
                  variant="ghost"
                  fullWidth
                  leftIcon={<BookOpen className="h-4 w-4" />}
                >
                  Start learning
                </Button>
              </div>

              <p className="type-body-sm mt-4 text-center text-ink-muted">
                Demo enrollment and payments use seeded local data.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
