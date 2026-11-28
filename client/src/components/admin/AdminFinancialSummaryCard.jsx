import React from "react";
import { CreditCard, Percent, Receipt, Wallet } from "lucide-react";
import { useGetAdminFinancialSummaryQuery } from "../../store/services/billingApi";
import { SkeletonGrid, StatCard } from "../common";

const AdminFinancialSummaryCard = () => {
  const { data, isLoading, isError } = useGetAdminFinancialSummaryQuery();

  if (isLoading) {
    return (
      <SkeletonGrid
        count={4}
        variant="stat"
        label="Loading payment summary"
        className="mb-6"
      />
    );
  }

  if (isError || !data?.data) return null;

  const summary = data.data;

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={Wallet}
        label="Revenue"
        value={summary.totalRevenue ?? 0}
        hint="Payments received"
      />
      <StatCard
        icon={Percent}
        label="Commission"
        value={summary.totalCommission ?? 0}
        hint="Platform share"
        tone="info"
      />
      <StatCard
        icon={CreditCard}
        label="Instructor share"
        value={summary.totalInstructorAmount ?? 0}
        hint="Paid to instructors"
        tone="success"
      />
      <StatCard
        icon={Receipt}
        label="Sales"
        value={summary.totalSales ?? 0}
        hint="Completed orders"
        tone="warning"
      />
    </div>
  );
};

export default AdminFinancialSummaryCard;
