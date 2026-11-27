import React from "react";

const AdminDashboardFinancial = ({ adminAccount, billingLoading, recentTransactions }) => {
  return (
    <>

        {/* 💰 Admin Financial Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-success-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.656 0-3 .895-3 2s1.344 2 3 2 3 .895 3 2-1.344 2-3 2m0-8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            💰 Platform Financial Overview
          </h2>

          {billingLoading ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-12 w-12"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Platform Revenue */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-success">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-success-soft rounded-lg">
                    <svg className="w-6 h-6 text-success-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-success-dark bg-success-soft px-2 py-1 rounded-full">
                    REVENUE
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Revenue</h3>
                <p className="text-2xl font-bold text-success-dark">
                  ${adminAccount?.totalRevenue?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total admin fees collected</p>
              </div>

              {/* Total Payouts Paid */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-warning">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-warning-soft rounded-lg">
                    <svg className="w-6 h-6 text-warning-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-warning-dark bg-warning-soft px-2 py-1 rounded-full">
                    PAID OUT
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructor Payouts</h3>
                <p className="text-2xl font-bold text-warning-dark">
                  ${adminAccount?.totalInstructorPayouts?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total paid to instructors</p>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-brand-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-brand-100 rounded-lg">
                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                    MONTHLY
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Balance</h3>
                <p className="text-2xl font-bold text-brand-600">
                  ${adminAccount?.platformBalance?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-500 mt-1">Revenue minus payouts</p>
              </div>

              {/* Total Transactions */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-brand-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-brand-100 rounded-lg">
                    <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full">
                    ACTIVITY
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions</h3>
                <p className="text-2xl font-bold text-brand-600">
                  {recentTransactions?.length?.toLocaleString() || adminAccount?.statistics?.totalTransactions?.toLocaleString() || '0'}
                </p>
                <p className="text-sm text-gray-500 mt-1">Total platform transactions</p>
              </div>
            </div>
          )}

          {/* Recent Financial Activity */}
          {recentTransactions.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Financial Activity
              </h3>
              <div className="space-y-3">
                {recentTransactions.slice(0, 5).map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        transaction.type === 'credit' ? 'bg-success-soft' : 'bg-error-soft'
                      }`}>
                        <svg className={`w-4 h-4 ${
                          transaction.type === 'credit' ? 'text-success-dark' : 'text-error-dark'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                            transaction.type === 'credit'
                              ? "M12 6v6m0 0v6m0-6h6m-6 0H6"
                              : "M20 12H4"
                          } />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-success-dark' : 'text-error-dark'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a href="/admin/payment-reports" className="text-brand-600 hover:text-brand-800 font-medium">
                  View All Financial Reports →
                </a>
              </div>
            </div>
          )}
        </section>
    </>
  );
};

export default AdminDashboardFinancial;
