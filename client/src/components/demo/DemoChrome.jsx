// DemoChrome — thin demo bar above the main nav with a user switcher and reset control.
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
    <div className="fixed inset-x-0 top-0 z-40 h-8 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-end gap-2 px-4 text-xs text-slate-500 sm:gap-6 sm:px-8 lg:px-16">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-accent-200/80 bg-accent-50 px-2 py-0.5 text-xs font-semibold text-accent-700 sm:hidden"
            aria-label="Summer Enrollment: 20% off all bundles"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
            <span aria-hidden="true">20% off bundles</span>
          </span>

          <span className="hidden items-center gap-1.5 rounded-full border border-accent-200/80 bg-accent-50 px-2 py-0.5 text-xs font-semibold text-accent-700 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" aria-hidden="true" />
            Summer Enrollment: 20% off all bundles
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
            <User className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            <span className="hidden text-xs font-semibold uppercase tracking-wide sm:inline">
              Demo user:
            </span>
          </span>
          <div className="relative">
            <select
              aria-label="Switch demo user"
              value={selectedUserId}
              onChange={handleUserChange}
              disabled={isSwitching}
              className="max-w-[8rem] appearance-none rounded border border-slate-200 bg-slate-50 py-0.5 pl-2 pr-4 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-60 sm:max-w-[11rem]"
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
              className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
          </div>
        </div>

        <span
          className="hidden h-3 w-px bg-slate-200 sm:block"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={handleReset}
          aria-label="Reset Demo Data"
          className="flex items-center gap-1 text-slate-600 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Reset Demo Data</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </div>
    </div>
  );
}
