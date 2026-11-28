import { ArrowUpRight, CreditCard, Eye, EyeOff, Wallet } from "lucide-react";
import { useState } from "react";

import { Button, ProgressLoader, StatCard } from "../../components/common";
import {
  useGetBillingAccountQuery,
  useGetBillingTransactionsQuery,
} from "../../store/services/billingApi";

/** Instructor billing overview backed entirely by seeded demo data. */
export default function InstructorBillingPage() {
  const [showBalance, setShowBalance] = useState(true);
  const { data: accountData, isLoading: accountLoading } =
    useGetBillingAccountQuery();
  const { data: transactionData, isLoading: transactionsLoading } =
    useGetBillingTransactionsQuery({ page: 1, limit: 8 });

  if (accountLoading || transactionsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ProgressLoader isVisible message="Loading billing..." />
      </div>
    );
  }

  const account = accountData?.data?.billingAccount || {};
  const transactions = transactionData?.transactions || [];
  const balance = Number(account.balance ?? 0);

  return (
    <div className="container py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="type-label-md text-brand-700">Instructor billing</p>
          <h1 className="type-headline-md mt-2 text-ink">Earnings and account balance</h1>
          <p className="type-body-md mt-2 text-ink-soft">
            Demo payouts and transactions use seeded local data.
          </p>
        </div>
        <Button
          to="/instructor/refunds"
          variant="ghost"
          rightIcon={<ArrowUpRight className="h-4 w-4" />}
        >
          Refunds
        </Button>
      </div>

      <div className="stats-grid mt-8">
        <StatCard
          icon={Wallet}
          label="Available balance"
          value={showBalance ? `$${balance.toFixed(2)}` : "••••"}
          hint={account.isActive === false ? "Account suspended" : "Account active"}
          tone={account.isActive === false ? "warning" : "brand"}
        />
        <StatCard
          icon={CreditCard}
          label="Credit limit"
          value="Demo"
          hint="No real charges are made"
          tone="info"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Button onClick={() => setShowBalance((value) => !value)} variant="ghost" fullWidth>
          {showBalance ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
          {showBalance ? "Hide balance" : "Show balance"}
        </Button>
        <Button to="/billing" fullWidth rightIcon={<ArrowUpRight className="h-4 w-4" />}>
          Billing overview
        </Button>
      </div>

      <section className="card mt-8 overflow-hidden">
        <div className="border-b border-line p-5 sm:p-6">
          <h2 className="type-title-md text-ink">Recent transactions</h2>
        </div>
        {transactions.length ? (
          <ul className="divide-y divide-line">
            {transactions.map((transaction) => (
              <li
                key={transaction._id || transaction.id}
                className="type-body-md flex items-center justify-between gap-4 px-5 py-4 text-ink-soft sm:px-6"
              >
                <span className="min-w-0 truncate">
                  {transaction.description || transaction.type || "Demo transaction"}
                </span>
                <span className="type-label-md shrink-0 tabular-nums text-ink">
                  ${Number(transaction.amount ?? 0).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="type-body-md p-6 text-center text-ink-muted">
            No demo transactions yet.
          </p>
        )}
      </section>
    </div>
  );
}
