import PropTypes from "prop-types";
import { Code, Code2 as CodeXml } from "lucide-react";

// Little Rainbow signature arrangement and sizes, themed for Mentora's deep
// indigo footer and soft periwinkle accent.
export default function DeveloperSignature({ brandName = "Mentora" }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 font-sans">
      <p className="m-0 text-center text-xs font-medium leading-relaxed text-white/60 sm:text-sm">
        &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-700">
          <Code
            aria-hidden="true"
            className="h-3 w-3 text-white"
            strokeWidth={2.5}
          />
        </span>

        <p className="m-0 text-center text-xs font-normal leading-relaxed text-white/70 sm:text-sm">
          Developed by{" "}
          <a
            href="https://creovahouse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold tracking-wide text-white no-underline transition-colors hover:text-[#a5b4fc]"
          >
            Creova House
          </a>
        </p>

        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-700">
          <CodeXml
            aria-hidden="true"
            className="h-3 w-3 text-white"
            strokeWidth={2.5}
          />
        </span>
      </div>

      <p className="m-0 text-center text-[10px] font-normal leading-relaxed text-white/40">
        Web Design <span className="mx-1">·</span>
        Web Development <span className="mx-1">·</span>
        Mobile Apps
      </p>
    </div>
  );
}

DeveloperSignature.propTypes = {
  brandName: PropTypes.string,
};
