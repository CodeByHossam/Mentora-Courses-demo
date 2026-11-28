// Shared, display-only accessors for course cards and marketing surfaces.
// These keep copy tied to demo data instead of hardcoded names or prices.

export const getInstructorName = (course) =>
  course?.instructorDisplay ||
  course?.instructor?.displayName ||
  course?.instructor?.name ||
  "Mentora instructor";

export const getCourseRating = (course) =>
  Number(course?.ratingInfo?.averageRating ?? course?.rating ?? 0) || 0;

export const getCourseRatingsCount = (course) =>
  Number(course?.ratingInfo?.ratingsCount ?? course?.ratingsCount ?? 0) || 0;

export const getCourseLessonsCount = (course) =>
  Number(course?.lessonsCount ?? course?.lessons?.length ?? 0) || 0;

export const getCoursePrice = (course) =>
  Number(course?.price ?? 0) || 0;
