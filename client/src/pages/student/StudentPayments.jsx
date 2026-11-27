import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Receipt,
  RefreshCw,
  ExternalLink,
  Eye,
  Search,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { useGetPaymentHistoryQuery } from "../../store/services/paymentApi";
import { selectCurrentUser } from "../../store/slices/authSlice";

const StudentPayments = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  // Fetch real payment data
  const {
    data: paymentData,
    isLoading,
    isError,
    error,
    refetch
  } = useGetPaymentHistoryQuery();

  const payments = paymentData?.data || [];

  const getStatusBadge = (status) => {
    const badges = {
      paid: { color: "bg-success-soft text-success-dark border-success-soft", icon: CheckCircle, text: "Paid" },
      completed: { color: "bg-success-soft text-success-dark border-success-soft", icon: CheckCircle, text: "Completed" },
      pending: { color: "bg-warning-soft text-warning-dark border-warning-soft", icon: Clock, text: "Pending" },
      failed: { color: "bg-error-soft text-error-dark border-error-soft", icon: AlertCircle, text: "Failed" },
      processing: { color: "bg-brand-100 text-brand-800 border-brand-200", icon: Clock, text: "Processing" }
    };

    const badge = badges[status] || badges.pending;
    const IconComponent = badge.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}>
        <IconComponent className="w-4 h-4 mr-1" />
        {badge.text}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'credit card':
        return '💳';
      case 'paypal':
        return '🅿️';
      case 'bank transfer':
        return '🏦';
      default:
        return '💰';
    }
  };

  const filteredPayments = payments.filter(payment => {
    const courseTitle = payment.course?.title || payment.courseTitle || '';
    const transactionId = payment.stripePaymentIntentId || payment.paypalOrderId || payment.transactionId || '';
    const instructor = payment.course?.instructor?.name || payment.instructor || '';

    const matchesSearch = courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && payment.status === filterStatus;
  });

  const totalPaid = payments
    .filter(p => p.status === "paid" || p.status === "completed")
    .reduce((sum, p) => sum + (p.finalAmount || p.amount), 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + (p.finalAmount || p.amount), 0);

  // Note: Download functionality removed for students - they can only view payment details
  // Admin and instructors retain download functionality in their respective pages

  const handleRetryPayment = (payment) => {
    // Redirect to payment page for the course
    if (payment.course?._id) {
      navigate(`/payment/${payment.course._id}`);
    } else {
      console.error("No course ID found for payment retry");
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-brand-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your payment history...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-brand-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-12 text-center shadow-lg">
            <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Payments
            </h3>
            <p className="text-gray-600 mb-6">
              {error?.data?.message || "Failed to load payment history. Please try again."}
            </p>
            <button
              onClick={handleRefresh}
              className="bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StudentPayments;
