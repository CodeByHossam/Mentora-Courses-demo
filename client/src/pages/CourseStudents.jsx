import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Mail, Calendar, BookOpen, User } from "lucide-react";
import { useGetCourseStudentsQuery } from "../store/services/courseApi";
import { ProgressLoader } from '../components/common/index.js';
import { handleApiError } from "../utils/apiErrorHandler";

const CourseStudents = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: courseData,
    isLoading,
    error,
  } = useGetCourseStudentsQuery(courseId);

  const filteredStudents = courseData?.students?.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ProgressLoader isVisible={true} message="Loading course students..." />
      </div>
    );
  }

  if (error) {
    handleApiError(error);
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error-dark mb-4">Error</h2>
          <p className="text-gray-600">
            {error.data?.message || "Failed to load course students"}
          </p>
          <button
            onClick={() => navigate("/admin/manage-courses")}
            className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/admin/manage-courses")}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-100 rounded-xl">
              <BookOpen className="w-8 h-8 text-brand-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-ink ">
                {courseData?.course?.title || "Course Students"}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and view enrolled students
              </p>
            </div>
          </div>

          {/* Course Info */}
          {courseData?.course && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-brand-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="font-semibold text-gray-900">
                      {courseData.students?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-success-dark" />
                  <div>
                    <p className="text-sm text-gray-600">Course Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      courseData.course.status === 'published' 
                        ? 'bg-success-soft text-success-dark'
                        : courseData.course.status === 'draft'
                        ? 'bg-warning-soft text-warning-dark'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {courseData.course.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-brand-600" />
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-semibold text-gray-900">
                      {new Date(courseData.course.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {!courseData?.students || courseData.students.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No Students Enrolled
              </h3>
              <p className="text-gray-500">
                This course doesn't have any enrolled students yet.
              </p>
            </div>
          ) : (
            <>
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Enrolled Students ({filteredStudents?.length || 0})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrolled Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents?.map((student, index) => (
                      <tr
                        key={student._id}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-brand-600 ring-2 ring-gray-200 flex items-center justify-center">
                              {student.avatar ? (
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={student.avatar}
                                  alt={student.name}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div className={`${student.avatar ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                                <User className="w-4 h-4 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {student._id.slice(-6)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">
                              {student.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.enrolledAt
                            ? new Date(student.enrolledAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.isActive
                              ? "bg-success-soft text-success-dark"
                              : "bg-error-soft text-error-dark"
                          }`}>
                            {student.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => navigate(`/admin/users/${student._id}/edit`)}
                              className="text-brand-600 hover:text-brand-900 hover:underline transition-colors duration-200"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => window.open(`mailto:${student.email}`, '_blank')}
                              className="text-success-dark hover:text-success-dark hover:underline transition-colors duration-200"
                            >
                              Send Email
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Summary Stats */}
        {courseData?.students && courseData.students.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-brand-50 rounded-lg">
                <div className="text-2xl font-bold text-brand-600">
                  {courseData.students.length}
                </div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
              <div className="text-center p-4 bg-success-soft rounded-lg">
                <div className="text-2xl font-bold text-success-dark">
                  {courseData.students.filter(s => s.isActive).length}
                </div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="text-center p-4 bg-brand-50 rounded-lg">
                <div className="text-2xl font-bold text-brand-600">
                  {Math.round(
                    (courseData.students.filter(s => s.isActive).length /
                      courseData.students.length) *
                      100
                  ) || 0}%
                </div>
                <div className="text-sm text-gray-600">Active Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseStudents;
