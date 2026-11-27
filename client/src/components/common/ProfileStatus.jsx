import React from "react";

const ProfileStatus = ({ user }) => {
  if (!user) return null;

  return (
    <div className="flex items-center space-x-2 text-sm">
      {/* Profile Complete Status */}
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-soft text-success-dark">
        ✅ Complete
      </span>

      {/* Account Status */}
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
        🟢 Active
      </span>

      {/* Role Badge */}
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
        👤 {user.role}
      </span>
    </div>
  );
};

export default ProfileStatus;
