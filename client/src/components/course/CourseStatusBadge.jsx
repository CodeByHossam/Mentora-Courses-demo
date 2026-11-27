import React from "react";

const CourseStatusBadge = ({ status, size = "sm", showIcon = true }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "published":
        return {
          label: "Published",
          icon: "✅",
          bgColor: "bg-success-soft",
          textColor: "text-success-dark",
          borderColor: "border-success-soft"
        };
      case "draft":
        return {
          label: "Draft",
          icon: "📝",
          bgColor: "bg-warning-soft",
          textColor: "text-warning-dark",
          borderColor: "border-warning-soft"
        };
      case "archived":
        return {
          label: "Archived",
          icon: "📦",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-200"
        };
      default:
        return {
          label: "Draft",
          icon: "📝",
          bgColor: "bg-warning-soft",
          textColor: "text-warning-dark",
          borderColor: "border-warning-soft"
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses[size]}`}
    >
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </span>
  );
};

export default CourseStatusBadge;
