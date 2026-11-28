import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetCoursesQuery } from "../../store/services/courseApi";
import { useGetCategoriesQuery } from "../../store/services/categoryApi";
import { selectCurrentUser } from "../../store/slices/authSlice";

export const useCourseList = ({ limit } = {}) => {
  const user = useSelector(selectCurrentUser);
  const { data: categoriesData, error: categoriesError } = useGetCategoriesQuery();
  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    level: "",
    sort: "newest",
  });
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(filters.search), 500);
    return () => clearTimeout(handler);
  }, [filters.search]);

  // All filtering happens in the demo API so the returned courses and meta.total
  // always describe the same result set.
  const memoizedQueryParams = useMemo(() => {
    const params = {
      sort: filters.sort,
      limit: limit || coursesPerPage,
      page: limit ? 1 : currentPage,
    };
    if (debouncedSearch.trim()) params.search = debouncedSearch;
    if (filters.category) params.category = filters.category;
    if (filters.level) params.level = filters.level;
    return params;
  }, [
    filters.sort,
    filters.category,
    filters.level,
    debouncedSearch,
    limit,
    coursesPerPage,
    currentPage,
  ]);

  const { data: response, isLoading, error, refetch } = useGetCoursesQuery(
    memoizedQueryParams,
    { refetchOnMountOrArgChange: true },
  );
  const allCourses = useMemo(() => response?.data ?? [], [response]);
  // Demo envelopes spread pagination fields at the top level; keep support for
  // a nested `meta` envelope in case the API is swapped for a real backend.
  const meta = response?.meta ?? response ?? { page: 1, pages: 1, total: 0 };

  useEffect(() => {
    if (error) console.error("Course list failed to load", error);
    if (categoriesError) console.error("Categories failed to load", categoriesError);
  }, [error, categoriesError]);

  const paginatedCourses = allCourses;
  const totalPages = limit ? 1 : meta.pages;
  const totalCourses = meta.total;

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((previous) => ({ ...previous, [name]: value }));
    if (!limit) setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ search: "", category: "", level: "", sort: "newest" });
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((previous) => previous - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((previous) => previous + 1);
  };

  return {
    user,
    categories,
    isLoading,
    error,
    refetch,
    currentPage,
    setCurrentPage,
    coursesPerPage,
    filters,
    setFilters,
    debouncedSearch,
    viewMode,
    setViewMode,
    allCourses,
    paginatedCourses,
    totalPages,
    totalCourses,
    meta,
    handleFilterChange,
    resetFilters,
    handlePreviousPage,
    handleNextPage,
    limit,
  };
};

export default useCourseList;
