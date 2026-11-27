// Shared RTK Query core. In this demo every endpoint is answered from
// localStorage by demoBaseQuery; no HTTP client, token refresh, or cookies.
import { createApi } from "@reduxjs/toolkit/query/react";
import { demoBaseQuery } from "./demoRouter";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: demoBaseQuery,
  tagTypes: [
    "Course",
    "Progress",
    "Category",
    "User",
    "LiveSession",
    "BillingAccount",
    "BillingTransaction",
    "BillingSummary",
    "PendingTransfers",
    "Level",
    "LevelStats",
    "LevelDashboard",
    "Wishlist",
  ],
  endpoints: (builder) => ({}),
});
