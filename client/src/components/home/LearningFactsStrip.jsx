import { Award, BookOpen, Users } from "lucide-react";

const LEARNING_FACTS = [
  {
    icon: BookOpen,
    title: "Learn by doing",
    detail: "Short, practical lessons you can apply the same day.",
  },
  {
    icon: Users,
    title: "Guided by experts",
    detail: "Instructors who work in the field, not just teach it.",
  },
  {
    icon: Award,
    title: "Proof you finished",
    detail: "A certificate for every course you complete.",
  },
];

/** Light bridge between the dark subscription CTA and the dark footer. */
export default function LearningFactsStrip() {
  return (
    <section
      className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-16 lg:py-14"
      aria-labelledby="learning-facts-title"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="type-label-md text-brand-600">
              Why learners choose Mentora
            </p>
            <h2
              id="learning-facts-title"
              className="type-headline-sm mt-1 text-slate-900"
            >
              Practical learning, without the fluff.
            </h2>
          </div>
          <p className="type-body-sm max-w-md text-slate-500">
            A focused catalog, clear outcomes, and a pace that works around
            your week.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {LEARNING_FACTS.map(({ icon: Icon, title, detail }) => (
            <article
              key={title}
              className="flex gap-3 rounded-2xl border border-slate-100 bg-surface-muted/60 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="type-title-md text-slate-900">{title}</h3>
                <p className="type-body-sm mt-1 text-slate-500">{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
