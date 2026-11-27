import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Hero from "../../components/Hero";
import CourseList from "./CourseList";

function HomePage() {
  return (
    <main>
      <Hero />

      {/* ===== Recent courses ===== */}
      <section
        className="relative w-full bg-primary py-12 sm:py-16 md:py-20 lg:py-24"
        aria-label="Recent courses"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Latest courses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
              Explore practical lessons in web development, data, and design,
              taught by working experts.
            </p>
          </div>

          <CourseList limit={9} />

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold"
            >
              View all courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
