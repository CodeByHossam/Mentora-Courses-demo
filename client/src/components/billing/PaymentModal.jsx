import React, { useState } from 'react';
import { Modal } from '../common';
import { X } from 'lucide-react';

// NOTE: Client-side Stripe/PayPal SDK usage is intentionally disabled.
// All card/PayPal processing is handled on the backend for future use only.
// The client pays via direct cash/bank transfer after contacting the admin or
// instructor and providing a receipt (proof of payment).

const PaymentModal = ({ isOpen, onClose, onPayment, isLoading, paymentData, title, description, suggestedAmounts, minAmount, maxAmount, amount }) => {
  const [inputAmount, setInputAmount] = useState(amount || minAmount);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await onPayment({ amount: parseFloat(inputAmount), method: 'direct' });
    } catch (err) {
      setError(err.message || 'Payment failed.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-xl p-4 sm:p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <p className="mb-4 text-sm sm:text-base text-gray-600">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedAmounts.map((amt) => (
            <button key={amt} onClick={() => setInputAmount(amt)} className={`px-4 py-2 rounded ${inputAmount === amt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              ${amt}
            </button>
          ))}
        </div>

        <input
          type="number"
          min={minAmount}
          max={maxAmount}
          value={inputAmount}
          onChange={(e) => setInputAmount(Number(e.target.value))}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />

        <p className="mb-4 text-sm text-gray-600">
          Client payments are made via direct cash/bank transfer. Please contact the
          admin or instructor and provide your receipt (proof of payment) for approval.
        </p>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : `Submit $${inputAmount} Payment`}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </Modal>
  );
};

export default PaymentModal;
