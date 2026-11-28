import { Button } from "../common";

const CATEGORY_ORDER = [
  "Web Development",
  "Data & AI",
  "Design",
  "Business",
  "Growth Marketing",
];

const BASE_TAB = "min-h-9 px-4 py-2";
const INACTIVE_TAB =
  "border-line bg-white text-slate-600 hover:border-brand-500 hover:text-brand-600";

export default function CategoryTabs({
  categories,
  activeCategory,
  totalCount,
  onChange,
}) {
  const knownNames = categories.map((item) => item.name);
  const extraNames = knownNames.filter(
    (name) => !CATEGORY_ORDER.includes(name),
  );
  const tabNames = [...CATEGORY_ORDER, ...extraNames].filter((name) =>
    knownNames.includes(name),
  );

  const countClass =
    activeCategory === ""
      ? "bg-white/20 text-white"
      : "bg-slate-100 text-slate-600";

  return (
    <div
      className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Filter courses by category"
    >
      <Button
        variant={activeCategory === "" ? "primary" : "ghost"}
        size="sm"
        className={`${BASE_TAB} ${activeCategory === "" ? "" : INACTIVE_TAB}`}
        aria-pressed={activeCategory === ""}
        onClick={() => onChange("")}
      >
        All Courses
        <span
          className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs tabular-nums ${countClass}`}
        >
          {totalCount}
        </span>
      </Button>

      {tabNames.map((name) => (
        <Button
          key={name}
          variant={activeCategory === name ? "primary" : "ghost"}
          size="sm"
          className={`${BASE_TAB} ${activeCategory === name ? "" : INACTIVE_TAB}`}
          aria-pressed={activeCategory === name}
          onClick={() => onChange(name)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
