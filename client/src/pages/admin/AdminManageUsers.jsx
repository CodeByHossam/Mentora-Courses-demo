import React, { useState, useEffect } from "react";
import { Trash2, User } from "lucide-react";

import { handleApiError, handleApiSuccess } from "../../utils/apiErrorHandler"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserActiveStateMutation,
  useUpdateUserVerificationStateMutation,
} from "../../store/services/userApi";
import { ProgressLoader } from "../../components/common";
import { useConfirm } from "../../hooks/useConfirm";

const AdminManageUsers = () => {
  const { confirm, ConfirmationModalWrapper } = useConfirm();
  const navigate = useNavigate();

  // States for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // States to track loading for user actions (delete/update)
  const [actionLoadingUserId, setActionLoadingUserId] = useState(null);

  // Fetch users
  const { data: users, isLoading, error } = useGetUsersQuery();

  // Mutations
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserMutation();
  const [updateUserActiveState] = useUpdateUserActiveStateMutation();
  const [updateUserVerificationState] = useUpdateUserVerificationStateMutation();

  // Debounce search input to reduce filter computations
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter users based on debounced search term and role filter
  const filteredUsers =
    users?.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    }) || [];

  // Handle user deletion with loading and error handling
  const handleDeleteUser = async (userId) => {
    const confirmed = await confirm({
      title: "Delete User",
      message: "Are you sure you want to delete this user?",
    });

    if (!confirmed) return;
    if (confirmed) {
      setActionLoadingUserId(userId);
      try {
        await deleteUser(userId).unwrap();
        handleApiSuccess("User deleted successfully");
      } catch (err) {
        handleApiError(err);
      } finally {
        setActionLoadingUserId(null);
      }
    }
  };

  // Handle role update with loading and error handling
  const handleRoleChange = async (userId, newRole) => {
    setActionLoadingUserId(userId);
    try {
      await updateUserRole({ id:userId, body:{role: newRole} }).unwrap();
      handleApiSuccess("User role updated successfully");
    } catch (err) {
      handleApiError(err);
    } finally {
      setActionLoadingUserId(null);
    }
  };

  // Handle active state toggle
  const handleActiveStateChange = async (userId, isActive) => {
    setActionLoadingUserId(userId);
    try {
      await updateUserActiveState({ userId, isActive }).unwrap();
      handleApiSuccess(`User ${isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      handleApiError(err);
    } finally {
      setActionLoadingUserId(null);
    }
  };

  // Handle verification state toggle
  const handleVerificationStateChange = async (userId, isVerified) => {
    setActionLoadingUserId(userId);
    try {
      await updateUserVerificationState({ userId, isVerified }).unwrap();
      handleApiSuccess(`User ${isVerified ? 'verified' : 'unverified'} successfully`);
    } catch (err) {
      handleApiError(err);
    } finally {
      setActionLoadingUserId(null);
    }
  };

  // Show spinner while fetching users
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ProgressLoader isVisible={true} message="Loading users..." />
      </div>
    );
  }

  // Show error message if fetching users fails
if (error) {
  handleApiError(error);
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-600">
          {error.data?.message || "Failed to load users"}
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <div className="mb-4 flex gap-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2 w-full max-w-md"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All roles</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {filteredUsers.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u._id || u.id}>
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteUser(u._id || u.id)}
                        disabled={actionLoadingUserId === (u._id || u.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ConfirmationModalWrapper />
    </div>
  );
};

export default AdminManageUsers;
