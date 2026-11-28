import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Heart, Star } from "lucide-react";
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
  getCoursePrice,
  getCourseRating,
  getCourseRatingsCount,
  getInstructorName,
} from "../../utils/coursePresentation";

/** Editorial course card used by the homepage featured grid. */
const FeaturedCourseCard = memo(({ course }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);
  const [likeCourse] = useLikeCourseMutation();
  const [imageFailed, setImageFailed] = useState(false);

  const instructorName = getInstructorName(course);
  const rating = getCourseRating(course);
  const ratingsCount = getCourseRatingsCount(course);
  const lessonsCount = getCourseLessonsCount(course);
  const price = getCoursePrice(course);
  const originalPrice = Number(course?.originalPrice ?? 0) || 0;
  const categoryLabel = course?.categoryLabel || course?.category?.name || "Course";
  const likesCount =
    course?.ratingInfo?.likesCount ?? course?.likesCount ?? course?.likes ?? 0;
  const isLiked = course?.ratingInfo?.liked ?? course?.liked ?? false;
  const detailPath = `/courses/${course._id}`;

  const handleLike = async () => {
    if (!isAuthenticated || !currentUser) {
      toast.info("Please login to like courses");
      navigate("/login");
      return;
    }
    try {
      await likeCourse(course._id).unwrap();
    } catch (error) {
      handleApiError(error, { customMessage: "Failed to update like status" });
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-150 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {course.imageUrl && !imageFailed ? (
          <img
            src={course.imageUrl}
            alt={`${course.title} course thumbnail`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-50">
            <BookOpen className="h-10 w-10 text-brand-300" aria-hidden="true" />
          </div>
        )}

        <button
          type="button"
          onClick={handleLike}
          aria-label={isLiked ? "Unlike course" : "Like course"}
          aria-pressed={isLiked}
          className="absolute right-3 top-3 flex min-h-9 items-center gap-1 rounded-full bg-white/90 px-2.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <Heart
            className={`h-3.5 w-3.5 text-rose-500 ${isLiked ? "fill-current" : ""}`}
            aria-hidden="true"
          />
          <span className="tabular-nums">{likesCount}</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex min-w-0 items-center gap-1.5 overflow-hidden whitespace-nowrap text-[11px] font-medium text-slate-500">
          <span className="truncate font-semibold text-teal-700">
            {categoryLabel}
          </span>
          <span aria-hidden="true">·</span>
          <span>{course.duration || "Self-paced"}</span>
          <span aria-hidden="true">·</span>
          <span>{course.level || "All levels"}</span>
        </div>

        <h3 className="type-title-md line-clamp-2 leading-snug text-slate-900 transition-colors group-hover:text-brand-600">
          <Link
            to={detailPath}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {course.title}
          </Link>
        </h3>

        <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 tabular-nums">
          <Star
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            aria-hidden="true"
          />
          {rating.toFixed(1)}
          {ratingsCount > 0 ? (
            <span className="sr-only">out of 5 from {ratingsCount} ratings</span>
          ) : (
            <span className="sr-only">out of 5</span>
          )}
        </div>

        <p className="type-body-sm line-clamp-2 leading-snug text-slate-500">
          {course.description || "A practical, expert-led course."}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-slate-100 pt-2">
          <div className="min-w-0">
            <p className="type-label-md leading-tight text-slate-900">
              {instructorName}
            </p>
            <p className="type-body-sm leading-tight text-slate-500 tabular-nums">
              {lessonsCount} lessons
            </p>
            <p className="type-title-md mt-0.5 font-bold leading-tight text-slate-900 tabular-nums">
              {originalPrice > price ? (
                <span className="mr-1.5 type-body-sm text-slate-400 line-through">
                  ${originalPrice}
                </span>
              ) : null}
              ${price}
            </p>
          </div>

          <Link
            to={detailPath}
            className="type-label-md inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1.5 text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <span>View syllabus</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
});

FeaturedCourseCard.displayName = "FeaturedCourseCard";

export default FeaturedCourseCard;
