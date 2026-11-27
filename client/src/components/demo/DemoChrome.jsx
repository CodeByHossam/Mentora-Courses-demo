// DemoChrome — thin demo bar below the main nav with a user switcher and reset control.
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronDown, RefreshCw, User } from "lucide-react";

import {
  getSession,
  getSwitchableUsers,
  resetDemoData,
} from "../../services/demoStorage";
import { apiSlice } from "../../store/api/apiSlice";
import { selectCurrentUser, setCredentials, switchDemoUser } from "../../store/slices/authSlice";

const ROLE_DASHBOARD = Object.freeze({
  admin: "/admin",
  instructor: "/instructor",
  student: "/student/dashboard",
});

const USER_GROUPS = Object.freeze([
  { label: "Admin", roles: ["admin"] },
  { label: "Instructors", roles: ["instructor"] },
  { label: "Students", roles: ["student"] },
]);

export default function DemoChrome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const users = getSwitchableUsers();
  const [isSwitching, setIsSwitching] = useState(false);

  const selectedUserId = users.some((item) => item.id === user?._id)
    ? user._id
    : "";

  const handleUserChange = (event) => {
    const userId = event.target.value;
    const nextUser = users.find((item) => item.id === userId);
    if (!nextUser || userId === user?._id) return;

    setIsSwitching(true);
    try {
      dispatch(switchDemoUser(userId));
      dispatch(apiSlice.util.resetApiState());
      toast.success(`Switched to ${nextUser.name} (${nextUser.roleLabel})`);
      navigate(ROLE_DASHBOARD[nextUser.role] || "/", { replace: true });
    } catch (error) {
      toast.error(error?.message || "Could not switch demo user.");
    } finally {
      setIsSwitching(false);
    }
  };

  const handleReset = () => {
    try {
      resetDemoData();
      const session = getSession();
      dispatch(
        setCredentials({
          accessToken: session?.token,
          user: session?.user,
        }),
      );
      dispatch(apiSlice.util.resetApiState());
      toast.success("Demo data reset to the original seed.");
      navigate(ROLE_DASHBOARD.admin, { replace: true });
    } catch (error) {
      toast.error(error?.message || "Could not reset demo data.");
    }
  };

  return (
    <div className="fixed left-0 right-0 top-16 z-40 h-8 border-b border-line bg-white/95 backdrop-blur md:top-20">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-end gap-2 px-4 sm:px-6 lg:px-8 sm:gap-3">
        <User className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />
        <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:inline">
          Demo user
        </span>
        <div className="relative">
          <select
            aria-label="Switch demo user"
            value={selectedUserId}
            onChange={handleUserChange}
            disabled={isSwitching}
            className="max-w-[8rem] appearance-none rounded-full border border-gray-200 bg-white py-0.5 pl-1 pr-4 text-[11px] font-medium text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-60 sm:max-w-[11rem]"
          >
            {!selectedUserId && <option value="">Select user</option>}
            {USER_GROUPS.map((group) => {
              const groupedUsers = users.filter((item) =>
                group.roles.includes(item.role),
              );
              if (!groupedUsers.length) return null;

              return (
                <optgroup key={group.label} label={group.label}>
                  {groupedUsers.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} — {item.roleLabel}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <span className="hidden h-3 w-px bg-gray-200 sm:block" aria-hidden="true" />
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:text-[11px]"
        >
          <RefreshCw className="h-3 w-3" aria-hidden="true" />
          <span className="hidden sm:inline">Reset Demo Data</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>
    </div>
  );
}
