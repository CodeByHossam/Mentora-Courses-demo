import React from "react";
import { Award, BookOpen, Clock, Video } from "lucide-react";
import { StatCard } from "../common";

const StudentSummaryCards = ({
  isLoadingCourses,
  enrolledCourses,
  upcomingSessionsCount,
  pendingRequestsCount,
}) => (
  <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
    <StatCard
      icon={BookOpen}
      label="Enrolled courses"
      value={isLoadingCourses ? "…" : enrolledCourses?.length ?? 0}
      hint="Active learning"
      loading={isLoadingCourses}
    />
    <StatCard
      icon={Video}
      label="Live sessions"
      value={upcomingSessionsCount}
      hint="Upcoming"
      tone="info"
    />
    <StatCard
      icon={Clock}
      label="Pending requests"
      value={pendingRequestsCount}
      hint="Awaiting approval"
      tone="warning"
    />
    <StatCard
      icon={Award}
      label="Certificates"
      value="-"
      hint="Earned"
      tone="success"
    />
  </div>
);

export default StudentSummaryCards;
