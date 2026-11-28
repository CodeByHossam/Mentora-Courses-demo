import { AlertCircle, RotateCcw, Search } from "lucide-react";

import { Button, Card, EmptyState, SkeletonGrid } from "../common";
import FeaturedCourseCard from "./FeaturedCourseCard";

export default function HomeCourseGrid({ courses, isLoading, error, onRetry, onReset }) {
  if (isLoading) {
    return (
      <SkeletonGrid
        count={8}
        label="Loading courses"
        className="lg:grid-cols-4"
      />
    );
  }

  if (error) {
    return (
      <Card className="mx-auto max-w-xl text-center" role="alert">
        <AlertCircle
          className="mx-auto mb-3 h-8 w-8 text-error-dark"
          aria-hidden="true"
        />
        <h3 className="type-headline-sm text-ink">Courses unavailable</h3>
        <p className="type-body-md mt-2 text-ink-soft">
          We could not load the catalog. Please try again.
        </p>
        <div className="mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (courses.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No courses in this category yet"
        description="Choose another category to keep exploring."
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Reset filter
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {courses.map((course) => (
        <FeaturedCourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
