import { Award } from "lucide-react";

const GRADUATE_STORIES = [
  {
    quote:
      "Before Mentora, I struggled to connect React concepts into full applications. After finishing Dr. Hassan’s capstone reviews, I shipped our team’s new customer portal and moved into a mid-level frontend role within four months.",
    name: "Nadia Al-Mansoor",
    role: "Frontend Engineer",
    organization: "Northstar FinTech",
  },
  {
    quote:
      "The design systems track replaced vague theory with concrete token math and accessibility audits. Our product squad adopted the exact component checklist I built during week five.",
    name: "Jonas Lindqvist",
    role: "Senior Product Designer",
    organization: "Kestrel Mobility",
  },
];

/** Outcome quotes that follow the Why Mentora showcase. */
export default function GraduateStories() {
  return (
    <section
      className="mx-auto max-w-[1440px] px-4 pb-12 sm:px-8 lg:px-16 lg:pb-14"
      aria-label="Graduate outcomes"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {GRADUATE_STORIES.map((story) => (
          <figure
            key={story.name}
            className="flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
          >
            <blockquote className="type-body-md leading-relaxed text-slate-700">
              “{story.quote}”
            </blockquote>
            <figcaption className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
              <div className="min-w-0">
                <p className="type-title-md text-slate-900">{story.name}</p>
                <p className="type-body-sm mt-0.5 text-slate-600">
                  {story.role} · {story.organization}
                </p>
              </div>
              <Award
                className="h-5 w-5 shrink-0 text-amber-500"
                aria-hidden="true"
              />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
