import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateInstructorRefundMutation,
  useGetInstructorRefundsQuery,
  useGetRefundStatsQuery
} from '../../store/services/refundApi';
import { useGetBillingAccountQuery } from '../../store/services/billingApi';

export const useInstructorRefundRequest = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ refundType: 'financial_issue', reason: '', description: '', requestedAmount: '' });

  const [createRefund, { isLoading: isCreating }] = useCreateInstructorRefundMutation();
  const { data: refunds, isLoading: isLoadingRefunds, refetch: refetchRefunds } = useGetInstructorRefundsQuery();
  const { data: refundStats } = useGetRefundStatsQuery({ period: '30d' });
  const { data: billingData } = useGetBillingAccountQuery();

  const instructorAccount = billingData?.data;
  const owedAdminFees = instructorAccount?.owedAdminFees || 0;
  const totalAdminFeesPaid = instructorAccount?.totalAdminFeesPaid || 0;
  const maxRefundable = Math.max(0, totalAdminFeesPaid - owedAdminFees);

  useEffect(() => {
    if (maxRefundable > 0 && !formData.requestedAmount) {
      setFormData(prev => ({ ...prev, requestedAmount: maxRefundable.toFixed(2) }));
    }
  }, [maxRefundable]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.reason || !formData.requestedAmount) {
      toast.error('Please fill in all required fields');
      return;
    }
    const requestedAmount = parseFloat(formData.requestedAmount);
    if (requestedAmount <= 0) {
      toast.error('Refund amount must be greater than zero');
      return;
    }
    try {
      const refundData = {
        refundType: formData.refundType,
        reason: formData.reason,
        description: formData.description,
        requestedAmount: requestedAmount
      };
      await createRefund(refundData).unwrap();
      toast.success('Financial refund request submitted successfully');
      setShowForm(false);
      setFormData({ refundType: 'financial_issue', reason: '', description: '', requestedAmount: '' });
      refetchRefunds();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to submit refund request');
    }
  };

  const hasPendingRefund = refunds?.refunds?.some(r => r.status === 'pending') || false;

  return {
    showForm, setShowForm,
    formData, setFormData,
    isCreating,
    refunds, isLoadingRefunds, refetchRefunds,
    refundStats,
    instructorAccount,
    owedAdminFees, totalAdminFeesPaid, maxRefundable,
    handleInputChange,
    handleSubmit,
    hasPendingRefund,
  };
};
export default useInstructorRefundRequest;
