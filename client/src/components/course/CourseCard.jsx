import React, { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Clock, Heart, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../../store/slices/authSlice";
import { useLikeCourseMutation } from "../../store/services/courseApi";
import { handleApiError } from "../../utils/errorHandler";
import {
  getCourseLessonsCount,
  getCourseRating,
  getInstructorName,
} from "../../utils/coursePresentation";

const LEVEL_CLASSES = {
  Beginner: "border-blue-100 bg-blue-50 text-blue-700",
  Intermediate: "border-purple-100 bg-purple-50 text-purple-700",
  Advanced: "border-emerald-100 bg-emerald-50 text-emerald-700",
};

const DEFAULT_LEVEL_CLASS = "border-slate-100 bg-slate-50 text-slate-700";

const getBadgeClass = (badge) =>
  /top rated/i.test(badge) ? "pill-rating" : "pill-new";

const CourseCard = memo(({ course }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const [likeCourse] = useLikeCourseMutation();
  const [imageFailed, setImageFailed] = useState(false);

  const rating = getCourseRating(course);
  const likesCount =
    course?.ratingInfo?.likesCount ??
    course?.likesCount ??
    course?.likes ??
    0;
  const isLiked = course?.ratingInfo?.liked ?? course?.liked ?? false;
  const students = course?.enrolledCount ?? course?.students ?? 0;
  const instructorName = getInstructorName(course);
  const levelClass = LEVEL_CLASSES[course?.level] || DEFAULT_LEVEL_CLASS;

  const handleEnroll = useCallback(() => {
    if (!isAuthenticated || !currentUser) {
      toast.info("Please login to enroll in this course");
      navigate("/login");
      return;
    }
    if (course.enrolledStudents?.includes(currentUser._id)) {
      toast.info("Already enrolled");
      navigate(`/courses/${course._id}/learn`);
      return;
    }
    navigate(`/payment/${course._id}`);
  }, [isAuthenticated, currentUser, course._id, course.enrolledStudents, navigate]);

  const handleLike = useCallback(async () => {
    if (!isAuthenticated) {
      toast.info("Please login to like courses");
      return;
    }
    try {
      await likeCourse(course._id).unwrap();
    } catch (error) {
      handleApiError(error, { customMessage: "Failed to update like status" });
    }
  }, [isAuthenticated, likeCourse, course._id]);

  return (
    <article className="course-card group flex h-full flex-col justify-between overflow-hidden bg-white">
      <div>
        <div className="relative aspect-video overflow-hidden bg-slate-900">
          {course.imageUrl && !imageFailed ? (
            <img
              src={course.imageUrl}
              alt={`${course.title} course thumbnail`}
              className="h-full w-full object-cover opacity-85 transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-50">
              <BookOpen
                className="h-10 w-10 text-brand-300"
                aria-hidden="true"
              />
            </div>
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
            aria-hidden="true"
          />

          <span className="pill pill-category absolute left-3 top-3 uppercase shadow-xs backdrop-blur-sm">
            {course.categoryLabel || course.category?.name || "Uncategorized"}
          </span>

          {course.badge ? (
            <span
              className={`pill absolute right-3 top-3 uppercase ${getBadgeClass(course.badge)}`}
            >
              {course.badge}
            </span>
          ) : null}

          <span className="pill absolute bottom-2.5 left-3 min-h-9 bg-black/60 text-xs normal-case tracking-normal text-white backdrop-blur-sm">
            <Star
              className="h-3 w-3 fill-current text-accent-400"
              aria-hidden="true"
            />
            <span className="tabular-nums">{rating.toFixed(1)}</span>
            <span className="sr-only">out of 5</span>
          </span>

          <button
            type="button"
            onClick={handleLike}
            aria-label={isLiked ? "Unlike course" : "Like course"}
            aria-pressed={isLiked}
            className="pill absolute bottom-2.5 right-3 min-h-9 bg-black/60 px-3 text-xs normal-case tracking-normal text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Heart
              className={`h-3 w-3 text-rose-400 ${isLiked ? "fill-current" : ""}`}
              aria-hidden="true"
            />
            <span className="tabular-nums">{likesCount}</span>
          </button>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex min-w-0 items-center gap-1.5">
              <span
                className="type-label-sm flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-[9px] text-brand-700"
                aria-hidden="true"
              >
                {instructorName.charAt(0)}
              </span>
              <span className="type-label-md min-w-0 flex-1 truncate text-slate-600">
                {instructorName}
              </span>
            </div>
            <span
              className={`type-label-md shrink-0 rounded border px-2 py-0.5 ${levelClass}`}
            >
              {course.level || "All levels"}
            </span>
          </div>

          <h3 className="type-headline-sm line-clamp-2 text-slate-900 transition-colors group-hover:text-brand-600">
            <Link
              to={`/courses/${course._id}`}
              className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {course.title}
            </Link>
          </h3>

          <p className="type-body-sm line-clamp-2 text-slate-500">
            {course.description || "A practical, expert-led course."}
          </p>

          <div className="flex items-center gap-4 border-t border-slate-100 pt-1 text-ink-muted">
            <span className="type-label-md flex items-center gap-1 tabular-nums">
              <Clock className="h-3.5 w-3.5 text-accent-700" aria-hidden="true" />
              {course.duration || "Self-paced"}
            </span>
            <span className="type-label-md flex items-center gap-1 tabular-nums">
              <BookOpen
                className="h-3.5 w-3.5 text-brand-600"
                aria-hidden="true"
              />
              {getCourseLessonsCount(course)} lessons
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50 px-4 pb-4 pt-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-1.5">
            <span className="type-title-md text-slate-900 tabular-nums">
              ${course.price || 99}
            </span>
            {course.discountLabel ? (
              <span className="pill pill-rating text-xs normal-case tracking-normal">
                {course.discountLabel}
              </span>
            ) : null}
          </div>
          <div className="type-label-md mt-1 text-slate-500 tabular-nums">
            {students} enrolled
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => navigate(`/courses/${course._id}`)}
            className="type-label-md min-h-9 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Details
          </button>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleEnroll}
              className="btn-gradient-primary type-label-md min-h-9 rounded-md px-3 py-1.5"
            >
              Enroll
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
});

CourseCard.displayName = "CourseCard";

export default CourseCard;
