import { CheckCircle2 } from "lucide-react";

const MENTORSHIP_IMAGE = "/images/mentora-mentorship.jpg";

const VALUE_PILLARS = [
  {
    number: "01",
    title: "Hands-on Production Projects",
    description:
      "Every module ends with a real deliverable, so you graduate with portfolio work ready for technical interviews.",
  },
  {
    number: "02",
    title: "1-on-1 Mentor Code Reviews",
    description:
      "Get written pull-request feedback and architecture critiques from practicing senior engineers and designers.",
  },
  {
    number: "03",
    title: "Verified Skill Certificates",
    description:
      "Earn shareable, project-backed credentials linked to the reviewed capstone work you complete.",
  },
];

/** Compact dark showcase adapted from the supplied Mentora landing design. */
export default function WhyMentora() {
  return (
    <section
      id="why-mentora"
      className="mx-auto max-w-[1440px] scroll-mt-[116px] px-4 py-10 sm:px-8 lg:h-[75vh] lg:min-h-[560px] lg:px-16 lg:py-8"
      aria-labelledby="why-mentora-title"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(120deg,#0F172A_0%,#1E1B4B_100%)] p-5 text-white shadow-soft sm:p-8">
        <div className="shrink-0 space-y-2 text-center">
          <p className="type-label-md text-teal-300">Built for Real Mastery</p>
          <h2
            id="why-mentora-title"
            className="type-headline-lg text-white sm:text-[2rem] sm:leading-[2.5rem] sm:tracking-[-0.025em]"
          >
            Why Learn With Mentora
          </h2>
          <p className="type-body-sm mx-auto max-w-2xl leading-relaxed text-slate-300">
            Most video courses leave you stranded at the blank-editor stage.
            Mentora pairs focused lessons with structured feedback from
            industry practitioners.
          </p>
        </div>

        <div className="mt-6 grid min-h-0 flex-1 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex h-full min-h-0 items-center justify-center">
            <img
              src={MENTORSHIP_IMAGE}
              alt="Mentor and learner reviewing architecture diagrams together"
              loading="lazy"
              decoding="async"
              className="max-h-full w-auto max-w-full rounded-2xl border border-white/10 object-contain"
            />
          </div>

          <div className="flex flex-col justify-center gap-3">
            {VALUE_PILLARS.map((pillar) => (
              <article
                key={pillar.number}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-400/15 text-teal-300">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="space-y-1">
                  <h3 className="type-title-md text-white">
                    {pillar.number}. {pillar.title}
                  </h3>
                  <p className="type-body-sm leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
