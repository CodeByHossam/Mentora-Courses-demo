import React, { useState } from 'react';
import { Gift, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

const GiftCardPaymentForm = ({ 
  course, 
  giftCardBalance, 
  onPaymentSubmit, 
  isLoading 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const coursePrice = course?.price || 0;
  const remainingBalance = giftCardBalance - coursePrice;
  const canAfford = giftCardBalance >= coursePrice;

  const handleGiftCardPayment = async () => {
    if (!canAfford) {
      return;
    }

    setIsProcessing(true);
    try {
      await onPaymentSubmit({
        paymentMethod: 'gift_card',
        courseId: course._id,
        amount: coursePrice,
        giftCardBalance,
        remainingBalance
      });
    } catch (error) {
      console.error('Gift card payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Gift className="h-6 w-6 text-success-dark mr-3" />
        <h3 className="text-lg font-semibold text-gray-900">Pay with Gift Card Balance</h3>
      </div>

      {/* Balance Summary */}
      <div className="bg-success-soft border border-success-soft rounded-lg p-4 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-success-dark">Your Gift Card Balance:</span>
            <span className="text-lg font-bold text-success-dark">${giftCardBalance.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Course Price:</span>
            <span className="text-lg font-semibold text-gray-900">-${coursePrice.toFixed(2)}</span>
          </div>
          
          <hr className="border-success-soft" />
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-success-dark">Remaining Balance:</span>
            <span className={`text-lg font-bold ${remainingBalance >= 0 ? 'text-success-dark' : 'text-error-dark'}`}>
              ${remainingBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-brand-800">
            <p className="font-medium mb-1">Instant Enrollment</p>
            <ul className="space-y-1 text-brand-700">
              <li>• No payment processing fees</li>
              <li>• Immediate course access</li>
              <li>• No transaction records needed</li>
              {remainingBalance > 0 && (
                <li>• New gift card created for remaining ${remainingBalance.toFixed(2)}</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Insufficient Balance Warning */}
      {!canAfford && (
        <div className="bg-error-soft border border-error-soft rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-error-dark mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-error-dark">
              <p className="font-medium mb-1">Insufficient Balance</p>
              <p>You need ${(coursePrice - giftCardBalance).toFixed(2)} more to purchase this course.</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Button */}
      <button
        onClick={handleGiftCardPayment}
        disabled={!canAfford || isProcessing || isLoading}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
          canAfford && !isProcessing && !isLoading
            ? 'bg-success-dark hover:bg-success-dark text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isProcessing || isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            {canAfford ? `Pay $${coursePrice.toFixed(2)} with Gift Card` : 'Insufficient Balance'}
          </>
        )}
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-500 text-center mt-4">
        By using your gift card balance, you agree to our terms of service. 
        This transaction will enroll you immediately in the course.
      </p>
    </div>
  );
};

export default GiftCardPaymentForm;
