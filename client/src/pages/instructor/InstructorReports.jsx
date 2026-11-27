import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProgressLoader } from "../../components/common";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { useGetInstructorReportsQuery } from "../../store/services/userApi";

const InstructorReports = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // Fetch instructor-specific reports using their ID
  const { data, error, isLoading } = useGetInstructorReportsQuery(user?.id, {
    skip: !user || user.role !== "instructor",
  });

  // Redirect if not instructor
  useEffect(() => {
    if (!user || user.role !== "instructor") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading)
    return <ProgressLoader isVisible={true} message="Loading reports..." />;
  if (error)
    return (
      <div className="text-error-dark p-8">
        Error:{" "}
        {error?.data?.message || error?.message || "Failed to fetch reports"}
      </div>
    );
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Instructor Reports</h1>

      {/* Enhanced Stats Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-brand-500">
          <div className="text-3xl font-bold text-brand-600">{data.totalStudents || 0}</div>
          <div className="text-gray-600 font-medium">Total Students</div>
          <div className="text-xs text-gray-500 mt-1">Across all courses</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-success">
          <div className="text-3xl font-bold text-success-dark">{data.totalCourses || 0}</div>
          <div className="text-gray-600 font-medium">Active Courses</div>
          <div className="text-xs text-gray-500 mt-1">Published & draft</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-warning">
          <div className="text-3xl font-bold text-warning-dark">
            ${Number(data.totalRevenue || 0).toFixed(2)}
          </div>
          <div className="text-gray-600 font-medium">Total Revenue</div>
          <div className="text-xs text-gray-500 mt-1">All-time earnings</div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-l-4 border-brand-500">
          <div className="text-3xl font-bold text-brand-600">
            {data.totalCourses > 0 ? (data.totalStudents / data.totalCourses).toFixed(1) : '0'}
          </div>
          <div className="text-gray-600 font-medium">Avg Students/Course</div>
          <div className="text-xs text-gray-500 mt-1">Engagement metric</div>
        </div>
      </section>

      {/* Performance Insights */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Revenue Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Average per course:</span>
                <span className="font-semibold">
                  ${data.totalCourses > 0 ? (data.totalRevenue / data.totalCourses).toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average per student:</span>
                <span className="font-semibold">
                  ${data.totalStudents > 0 ? (data.totalRevenue / data.totalStudents).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Growth Metrics</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Course completion rate:</span>
                <span className="font-semibold text-success-dark">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Student satisfaction:</span>
                <span className="font-semibold text-brand-600">4.2/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Courses List */}
      {Array.isArray(data.courses) && data.courses.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Course Performance</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.courses.map((course, index) => (
                  <tr key={course._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{course.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.students || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-success-dark">${(course.revenue || 0).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        course.status === 'published' ? 'bg-success-soft text-success-dark' :
                        course.status === 'draft' ? 'bg-warning-soft text-warning-dark' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{course.averageRating || 'N/A'}</span>
                        {course.averageRating && (
                          <span className="ml-1 text-warning">★</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default InstructorReports;
