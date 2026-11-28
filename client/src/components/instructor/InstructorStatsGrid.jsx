import React from "react";
import { BookOpen, DollarSign, Star, Users } from "lucide-react";
import { StatCard } from "../common";

const InstructorStatsGrid = ({
  courses,
  totalStudents,
  avgRating,
  formattedRevenue,
  revenueGrowth,
  revenueGrowthColor,
}) => {
  const ratedCourses = (courses || []).filter(
    (course) => Number(course.averageRating || course.rating || 0) > 0,
  );

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={BookOpen}
        label="Your courses"
        value={courses?.length || 0}
        hint={`${courses?.filter((course) => course.status === "published").length || 0} published`}
      />
      <StatCard
        icon={Users}
        label="Total students"
        value={totalStudents}
        hint={`Across ${courses?.length || 0} courses`}
        tone="success"
      />
      <StatCard
        icon={Star}
        label="Average rating"
        value={avgRating}
        hint={`${ratedCourses.length} rated course${ratedCourses.length === 1 ? "" : "s"}`}
        tone="warning"
      />
      <StatCard
        icon={DollarSign}
        label="This month"
        value={formattedRevenue}
        hint={<span className={revenueGrowthColor}>{revenueGrowth} from last month</span>}
        tone="info"
      />
    </div>
  );
};

export default InstructorStatsGrid;
