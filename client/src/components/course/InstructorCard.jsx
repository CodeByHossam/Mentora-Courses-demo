import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";

const InstructorCard = ({ instructor }) => {
  const [imageFailed, setImageFailed] = useState(false);

  if (!instructor) return null;

  const sanitizedBio = DOMPurify.sanitize(instructor.bio || "No bio available.");
  const trimmedBio =
    sanitizedBio.length > 120 ? `${sanitizedBio.substring(0, 120)}...` : sanitizedBio;

  return (
    <article className="group card card-hover flex h-full flex-col overflow-hidden p-0">
      <Link
        to={`/instructor/${encodeURIComponent(instructor._id)}`}
        className="flex flex-1 flex-col rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
      >
        <div className="card-media relative aspect-[4/3] w-full shrink-0">
          {instructor.avatar && !imageFailed ? (
            <img
              src={instructor.avatar}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-brand-50">
              <GraduationCap className="h-10 w-10 text-brand-400" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold leading-snug text-ink">
            {instructor.name}
          </h3>
          <p
            className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft"
            dangerouslySetInnerHTML={{ __html: trimmedBio }}
          />
          <span className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand-700">
            View profile
            <ArrowRight
              className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
};

InstructorCard.propTypes = {
  instructor: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

export default memo(InstructorCard);
