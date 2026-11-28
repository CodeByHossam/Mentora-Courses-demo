import { ArrowRight } from "lucide-react";

import { Button } from "../common";

export default function AllAccessCta() {
  return (
    <section
      className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-16"
      aria-labelledby="all-access-title"
    >
      <div className="flex flex-col items-center justify-between gap-8 rounded-3xl border border-white/10 bg-[linear-gradient(120deg,#0F172A_0%,#1E1B4B_100%)] p-8 text-white shadow-soft sm:p-12 lg:flex-row">
        <div className="max-w-xl space-y-3 text-center lg:text-left">
          <span className="type-label-md inline-flex items-center gap-1.5 rounded-full bg-accent-400 px-3 py-1 text-slate-950">
            <span aria-hidden="true">✦</span> Mentora All-Access Pass
          </span>
          <h2 id="all-access-title" className="type-headline-md text-white">
            Level up your career with unlimited course access
          </h2>
          <p className="type-body-md text-slate-300">
            Subscribe today to unlock all courses, private community discord,
            and weekly mentor code reviews.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              to="/register"
              variant="accent"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="focus-visible:ring-accent-400 focus-visible:ring-offset-slate-900"
            >
              Start 7-Day Free Trial
            </Button>
            <Button
              to="/courses"
              variant="ghost"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white focus-visible:ring-accent-400 focus-visible:ring-offset-slate-900"
            >
              Browse all courses
            </Button>
          </div>
          <p className="type-body-sm mt-3 text-slate-400 sm:text-center">
            7 days free. Choose a plan before the trial ends to continue.
          </p>
        </div>
      </div>
    </section>
  );
}
