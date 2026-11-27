// DemoChrome — banner, role switcher, badge, and reset control for the static demo.
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronDown, RefreshCw, User, X } from "lucide-react";

import {
  getSession,
  getSwitchableUsers,
  isBannerDismissed,
  resetDemoData,
  setBannerDismissed,
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

function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(() => isBannerDismissed());

  if (isDismissed) return null;

  const handleDismiss = () => {
    setBannerDismissed(true);
    setIsDismissed(true);
  };

  return (
    <div
      role="status"
      className="relative z-[60] flex items-center justify-center gap-3 border-b border-purple-200 bg-purple-50 px-4 py-2 text-center text-xs font-medium text-purple-800 sm:text-sm"
    >
      <span>
        Demo Mode — this is a frontend-only portfolio demo. All changes are
        stored in this browser.
      </span>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss demo banner"
        className="shrink-0 rounded-full p-1 text-purple-700 transition-colors hover:bg-purple-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function DemoUserSwitcher() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const users = getSwitchableUsers();
  const [isSwitching, setIsSwitching] = useState(false);

  const selectedUserId = users.some((item) => item.id === user?._id)
    ? user._id
    : "";

  const handleChange = (event) => {
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

  return (
    <div className="fixed right-4 top-20 z-40 flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 py-1.5 pl-3 pr-2 shadow-lg backdrop-blur">
      <User className="h-4 w-4 shrink-0 text-purple-600" aria-hidden="true" />
      <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-gray-500 sm:inline">
        Demo user
      </span>
      <div className="relative">
        <select
          aria-label="Switch demo user"
          value={selectedUserId}
          onChange={handleChange}
          disabled={isSwitching}
          className="max-w-[9rem] appearance-none rounded-full border border-gray-200 bg-white py-0.5 pl-1 pr-5 text-xs font-medium text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-purple-600 disabled:opacity-60 sm:max-w-[12rem]"
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
          className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function DemoBadgeAndReset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="fixed right-4 top-12 z-40 flex items-center gap-2">
      <span className="rounded-full border border-purple-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-purple-700 shadow-sm backdrop-blur">
        Demo Mode
      </span>
      <button
        type="button"
        onClick={handleReset}
        className="flex items-center gap-1 rounded-full border border-gray-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
      >
        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
        Reset Demo Data
      </button>
    </div>
  );
}

export default function DemoChrome() {
  return (
    <>
      <DemoBanner />
      <DemoBadgeAndReset />
      <DemoUserSwitcher />
    </>
  );
}
