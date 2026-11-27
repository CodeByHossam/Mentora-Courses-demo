import React, { useState } from "react";
import { useGetStudentSessionsQuery } from "../../store/services/liveSessionApi";
import {
  Calendar,
  Clock,
  Video,
  BookOpen,
  User,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter
} from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from "date-fns";

const StudentSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState("week"); // week, month
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: sessionsData, isLoading, error, refetch } = useGetStudentSessionsQuery();
  const sessions = sessionsData?.data || [];

  // Get week dates
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Filter sessions based on status
  const filteredSessions = sessions.filter(session => {
    if (filterStatus === "all") return true;
    if (filterStatus === "upcoming") return session.status === "scheduled" || session.status === "ready_to_start";
    if (filterStatus === "live") return session.status === "live";
    if (filterStatus === "completed") return session.status === "completed" || session.status === "ended";
    return true;
  });

  // Group sessions by date
  const sessionsByDate = filteredSessions.reduce((acc, session) => {
    const sessionDate = format(new Date(session.scheduledDateTime), "yyyy-MM-dd");
    if (!acc[sessionDate]) {
      acc[sessionDate] = [];
    }
    acc[sessionDate].push(session);
    return acc;
  }, {});

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
      case "ready_to_start":
        return "bg-brand-100 text-brand-800 border-brand-200";
      case "live":
        return "bg-success-soft text-success-dark border-success-soft";
      case "completed":
      case "ended":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-error-soft text-error-dark border-error-soft";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "live":
        return "🔴";
      case "scheduled":
      case "ready_to_start":
        return "📅";
      case "completed":
      case "ended":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📅";
    }
  };

  const navigateWeek = (direction) => {
    if (direction === "prev") {
      setCurrentWeek(subWeeks(currentWeek, 1));
    } else {
      setCurrentWeek(addWeeks(currentWeek, 1));
    }
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-7 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-error-soft border border-error-soft rounded-xl p-6 text-center">
            <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-error-dark mb-2">Error Loading Schedule</h3>
            <p className="text-error-dark mb-4">{error?.data?.message || "Failed to load schedule"}</p>
            <button
              onClick={refetch}
              className="bg-error-dark text-white px-4 py-2 rounded-lg hover:bg-error-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StudentSchedule;
