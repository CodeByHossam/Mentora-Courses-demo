/**
 * Site-wide navigation with role-based links, notifications and profile menu.
 */
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BookOpen,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Menu,
  User,
  UserPlus,
  X,
} from "lucide-react";

import {
  selectIsAuthenticated,
  selectCurrentUser,
} from "../../store/slices/authSlice";
import { useLogoutMutation } from "../../store/services/authApi";
import { Button, NotificationBell } from "../common";

const BASE_NAV_ITEMS = [
  { label: "Home", to: "/", icon: Home, isPrimary: true },
  { label: "Courses", to: "/courses", icon: BookOpen, isPrimary: true },
  { label: "Contact", to: "/contact", icon: Mail },
  { label: "About", to: "/about", icon: Info },
  { label: "Help", to: "/help", icon: HelpCircle },
];

const getDashboardPath = (role) => {
  if (role === "admin") return "/admin";
  if (role === "instructor") return "/instructor";
  return "/student/dashboard";
};

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

const navItemClass = (isActive) =>
  `nav-link whitespace-nowrap ${
    isActive
      ? "bg-brand-50 text-brand-700"
      : "text-slate-600 hover:text-brand-600"
  }`;

function NavItem({ item, isActive, onClick, className = "" }) {
  const Icon = item.icon;
  return (
    <li className={className}>
      <Link
        to={item.to}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
        className={navItemClass(isActive)}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {item.label}
      </Link>
    </li>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const profileRef = useRef(null);
  const profileToggleRef = useRef(null);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!profileOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setProfileOpen(false);
      profileToggleRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [profileOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusableItems = () =>
      Array.from(
        menuRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    getFocusableItems()[0]?.focus();

    const handleMenuKeys = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const items = getFocusableItems();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeys);
    return () => {
      document.removeEventListener("keydown", handleMenuKeys);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setProfileOpen(false);
      setMenuOpen(false);
      navigate("/login");
      toast.success("Logout successful!");
    } catch (error) {
      toast.error(error?.message || "Could not log out.");
    }
  };

  const navItems = isAuthenticated
    ? [
        ...BASE_NAV_ITEMS,
        {
          label: "Dashboard",
          to: getDashboardPath(user?.role),
          icon: LayoutDashboard,
          isPrimary: true,
        },
      ]
    : BASE_NAV_ITEMS;

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-16">
      <Link
        to="/"
        onClick={closeMenu}
        className="group flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-md shadow-brand-500/25 transition group-hover:bg-brand-700">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          <span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-white"
            aria-hidden="true"
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="type-headline-sm block text-slate-900">
            Mentora
          </span>
          <span className="type-label-sm mt-0.5 block uppercase text-accent-700">
            Learning Hub
          </span>
        </span>
      </Link>

      <ul className="hidden items-center gap-1 lg:flex lg:gap-3">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={isActive(item.to)}
            onClick={closeMenu}
            className={item.isPrimary ? "" : "hidden xl:list-item"}
          />
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <NotificationBell className="rounded-full text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" />

            <div
              className="relative flex items-center gap-2 border-l border-slate-200 pl-4"
              ref={profileRef}
              id="profile-menu"
            >
              <button
                type="button"
                ref={profileToggleRef}
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-controls="profile-menu-options"
                aria-label={profileOpen ? "Close profile menu" : "Open profile menu"}
                className="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="type-label-md flex h-8 w-8 items-center justify-center rounded-full border border-brand-200 bg-brand-100 text-brand-800">
                  {getInitials(user?.name)}
                </span>
                <span className="type-label-lg hidden text-slate-700 lg:inline">
                  {user?.name || "Profile"}
                </span>
              </button>

              {profileOpen ? (
                <div
                  className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                  id="profile-menu-options"
                >
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <div className="hidden items-center gap-2 lg:flex">
            <Button to="/login" size="sm" leftIcon={<LogIn className="h-4 w-4" />}>
              Login
            </Button>
            <Button
              to="/register"
              variant="ghost"
              size="sm"
              className="text-slate-700"
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Sign Up
            </Button>
          </div>
        )}

        <button
          type="button"
          ref={menuToggleRef}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative z-50 flex h-9 w-9 items-center justify-center rounded-md p-1 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-200 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={isActive(item.to)}
              onClick={closeMenu}
            />
          ))}
          {!isAuthenticated ? (
            <>
              <li>
                <Button
                  to="/login"
                  size="sm"
                  onClick={closeMenu}
                  leftIcon={<LogIn className="h-4 w-4" />}
                >
                  Login
                </Button>
              </li>
              <li>
                <Button
                  to="/register"
                  variant="ghost"
                  size="sm"
                  className="text-slate-700"
                  onClick={closeMenu}
                  leftIcon={<UserPlus className="h-4 w-4" />}
                >
                  Sign Up
                </Button>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
