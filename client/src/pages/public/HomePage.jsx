import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

import Hero from "../../components/Hero";
import AllAccessCta from "../../components/home/AllAccessCta";
import CategoryTabs from "../../components/home/CategoryTabs";
import FeaturedBanner from "../../components/home/FeaturedBanner";
import GraduateStories from "../../components/home/GraduateStories";
import HomeCourseGrid from "../../components/home/HomeCourseGrid";
import LearningFactsStrip from "../../components/home/LearningFactsStrip";
import WhyMentora from "../../components/home/WhyMentora";
import { Button } from "../../components/common";
import { useGetCoursesQuery } from "../../store/services/courseApi";
import { getCourseRating } from "../../utils/coursePresentation";
import useCourseList from "./useCourseList";

const HOME_COURSE_COUNT = 8;
const HOME_FETCH_LIMIT = 10;

function HomePage() {
  const {
    categories,
    isLoading,
    error,
    refetch,
    filters,
    setFilters,
    paginatedCourses,
    meta,
  } = useCourseList({ limit: HOME_FETCH_LIMIT });

  // Unfiltered summary used for stable counts, the hero artifact and the
  // featured course. Filter changes never swap these marketing surfaces.
  const { data: globalData } = useGetCoursesQuery(
    { sort: "newest", limit: HOME_FETCH_LIMIT, page: 1 },
    { refetchOnMountOrArgChange: true },
  );
  const globalCourses = useMemo(() => globalData?.data ?? [], [globalData]);
  const featuredCourse = useMemo(
    () =>
      [...globalCourses].sort(
        (first, second) =>
          getCourseRating(second) - getCourseRating(first),
      )[0],
    [globalCourses],
  );

  const activeCategory = filters.category || "";
  const globalTotal =
    globalData?.meta?.total ?? globalData?.total ?? (activeCategory ? 0 : meta.total ?? 0);
  const visibleCourses = activeCategory
    ? paginatedCourses
    : paginatedCourses.slice(0, HOME_COURSE_COUNT);
  const courseNoun = visibleCourses.length === 1 ? "course" : "courses";

  const handleCategoryChange = (category) => {
    setFilters((current) => ({ ...current, category }));
  };

  return (
    <div>
      <Hero course={globalCourses[0]} />

      <FeaturedBanner course={featuredCourse} />

      <section
        className="mx-auto max-w-[1440px] scroll-mt-[116px] px-4 pb-4 pt-8 text-center sm:px-8 lg:px-16"
        id="latest-courses"
        aria-labelledby="latest-courses-title"
      >
        <div className="type-label-sm mb-2 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 uppercase text-accent-700">
          <span className="h-2 w-2 rounded-full bg-accent-500" aria-hidden="true" />
          Freshly Added This Month
        </div>
        <h2 id="latest-courses-title" className="type-headline-lg text-slate-900">
          Latest courses
        </h2>
        <p className="type-body-md mx-auto mt-2 max-w-xl text-slate-500">
          Explore practical lessons in web development, data, and design, taught
          by working experts.
        </p>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          totalCount={globalTotal}
          onChange={handleCategoryChange}
        />

        <p className="sr-only" role="status" aria-live="polite">
          {activeCategory
            ? `Showing ${visibleCourses.length} ${courseNoun} in ${activeCategory}.`
            : `Showing ${visibleCourses.length} of ${globalTotal} courses.`}
        </p>
      </section>

      <section
        className="mx-auto max-w-[1440px] scroll-mt-[116px] px-4 py-10 sm:px-8 lg:px-16"
        id="courses"
        aria-label="Course catalog preview"
      >
        <HomeCourseGrid
          courses={visibleCourses}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
          onReset={() => handleCategoryChange("")}
        />

        <div className="mt-12 text-center">
          <Button
            to="/courses"
            variant="ghost"
            rightIcon={<ArrowRight className="h-4 w-4 text-brand-600" />}
          >
            {activeCategory ? "View all courses" : `View all ${globalTotal} courses`}
          </Button>
        </div>
      </section>

      <WhyMentora />

      <GraduateStories />

      <AllAccessCta />

      <LearningFactsStrip />
    </div>
  );
}

export default HomePage;
