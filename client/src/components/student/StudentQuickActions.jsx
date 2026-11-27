import { useNavigate } from "react-router-dom";
import { Award, BookOpen, Play, TrendingUp, Video } from "lucide-react";

const StudentQuickActions = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-success" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/courses")}
            className="bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Browse Courses
          </button>
          <button
            onClick={() => navigate("/student/courses")}
            className="bg-success hover:bg-success-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Continue Learning
          </button>
          <button
            onClick={() => navigate("/student/live-sessions")}
            className="bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <Video className="w-5 h-5 mr-2" />
            Live Sessions
          </button>
          <button
            onClick={() => navigate("/student/certificates")}
            className="bg-warning hover:bg-warning-dark text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <Award className="w-5 h-5 mr-2" />
            Certificates
          </button>
        </div>
      </div>

    </>
  );
};

export default StudentQuickActions;
