import React, { memo } from "react";
import useCourseList from "./useCourseList";
import { CourseCard } from "../../components/course";
import { Card, EmptyState, SkeletonGrid } from "../../components/common";
import {
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

const CourseList = memo(({ limit }) => {
  const {
    categories, isLoading, error,
    currentPage, coursesPerPage,
    filters, viewMode, setViewMode,
    allCourses, paginatedCourses, totalPages, totalCourses, meta,
    handleFilterChange, resetFilters, handlePreviousPage, handleNextPage,
  } = useCourseList({ limit });

  // The home page passes `limit`; it needs only the cards, not the catalog
  // header/filters/pagination. Rendering those here buried "Latest courses"
  // under a second heading and a full-screen wrapper.
  const compact = Boolean(limit);

  if (isLoading) {
    return (
      <div className={compact ? "py-2" : "container py-16"}>
        <SkeletonGrid count={8} label="Loading courses" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={compact ? "" : "container py-16"}>
        <div className="text-center text-error-dark" role="alert">
          <h3 className="mb-2 text-lg font-semibold">Error Loading Courses</h3>
          <p>Please try again later or contact support if the problem persists.</p>
        </div>
      </Card>
    );
  }

  if (compact) {
    if (paginatedCourses.length === 0) {
      return (
        <EmptyState
          icon={Search}
          title="No courses yet"
          description="New lessons are on the way. Check back soon."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-primary">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="card mb-6 rounded-xl p-4 sm:mb-8 sm:p-6 lg:p-8">
          <div className="text-center">
            <GraduationCap
              className="mx-auto mb-3 h-8 w-8 text-brand-600 sm:h-10 sm:w-10"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Course catalog
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-secondary">
              Explore {totalCourses} amazing courses and find your perfect learning path
            </p>
            <div className="mt-4 flex items-center justify-center space-x-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "var(--secondary)" }}
                aria-hidden="true"
              />
              <span className="text-sm text-secondary">
                {filters.search.trim() || filters.category || filters.level
                  ? `Found ${meta.total} courses`
                  : `Total Courses: ${meta.total}`}
              </span>
            </div>
          </div>
        </div>

        <div className="card mb-6 rounded-xl p-4 sm:mb-8 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <div className="max-w-md flex-1">
                <label
                  htmlFor="course-search"
                  className="mb-2 block text-sm font-medium text-ink-soft"
                >
                  Search courses
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    id="course-search"
                    name="search"
                    type="text"
                    placeholder="Search courses by title, description..."
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="w-full rounded-lg border py-3 pl-10 pr-4 transition-colors"
                    style={{ borderColor: "var(--card-border)" }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="mr-2 text-sm font-medium text-secondary">View:</span>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-brand-100 text-brand-600"
                      : "text-ink-muted hover:bg-surface-muted hover:text-ink-soft"
                  }`}
                >
                  <Grid className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`rounded-lg p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-brand-100 text-brand-600"
                      : "text-ink-muted hover:bg-surface-muted hover:text-ink-soft"
                  }`}
                >
                  <List className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="course-category"
                  className="mb-2 block text-sm font-medium text-ink-soft"
                >
                  📂 Category
                </label>
                <select
                  id="course-category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-line px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      📂 {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="course-level"
                  className="mb-2 block text-sm font-medium text-ink-soft"
                >
                  📈 Level
                </label>
                <select
                  id="course-level"
                  name="level"
                  value={filters.level}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-line px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">🌱 Beginner</option>
                  <option value="Intermediate">🚀 Intermediate</option>
                  <option value="Advanced">⚡ Advanced</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="course-sort"
                  className="mb-2 block text-sm font-medium text-ink-soft"
                >
                  🔄 Sort By
                </label>
                <select
                  id="course-sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border border-line px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="newest">🆕 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="price-asc">💰 Price: Low to High</option>
                  <option value="price-desc">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="popular">🔥 Most Popular</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {paginatedCourses.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No courses found"
            description="We couldn't find any courses matching your criteria. Try adjusting your filters or search terms."
            action={
              <button type="button" onClick={resetFilters} className="btn-primary">
                Clear Filters
              </button>
            }
          />
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {paginatedCourses.map((course) => (
              <CourseCard key={course._id} course={course} viewMode={viewMode} className="h-full" />
            ))}
          </div>
        )}

        {allCourses.length > 0 && (
          <div className="card mt-8 p-4 sm:p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="text-center text-xs text-ink-soft sm:text-left sm:text-sm">
                {totalPages === 1 ? (
                  <>
                    Showing all <span className="font-semibold">{totalCourses}</span> courses
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-semibold">
                      {(currentPage - 1) * coursesPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold">
                      {Math.min(currentPage * coursesPerPage, totalCourses)}
                    </span>{" "}
                    of <span className="font-semibold">{totalCourses}</span> courses
                  </>
                )}
              </div>
              <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  className="flex items-center rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink-soft shadow-sm transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 sm:text-sm"
                >
                  <ChevronLeft className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </button>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-xs text-ink-soft sm:text-sm">Page</span>
                  <span className="rounded-lg bg-brand-100 px-2 py-1 text-xs font-semibold text-brand-600 sm:px-3">
                    {currentPage}
                  </span>
                  <span className="text-xs text-ink-soft sm:text-sm">of {Math.max(1, totalPages)}</span>
                </div>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="flex items-center rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink-soft shadow-sm transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 sm:text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

CourseList.displayName = "CourseList";
export default CourseList;
