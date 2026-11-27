// Demo-only payment modal. No card SDK, token, or external request is used.
import { useState } from "react";
import { Modal } from './common/index.js';
import { X } from "lucide-react";

const PaymentModal = ({
  isOpen,
  onClose,
  onPayment,
  isLoading,
  title,
  description,
  suggestedAmounts = [],
  minAmount = 0,
  maxAmount,
  amount,
}) => {
  const [inputAmount, setInputAmount] = useState(amount || minAmount);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await onPayment({ amount: Number(inputAmount), method: "direct" });
    } catch (paymentError) {
      setError(paymentError?.message || "Demo payment failed.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full rounded-xl bg-white p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close payment dialog">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600 sm:text-base">{description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedAmounts.map((suggestedAmount) => (
            <button
              key={suggestedAmount}
              type="button"
              onClick={() => setInputAmount(suggestedAmount)}
              className={`rounded px-4 py-2 ${
                inputAmount === suggestedAmount
                  ? "bg-brand-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              ${suggestedAmount}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min={minAmount}
            max={maxAmount}
            value={inputAmount}
            onChange={(event) => setInputAmount(Number(event.target.value))}
            className="mb-4 w-full rounded border border-gray-300 px-3 py-2"
            aria-label="Payment amount"
          />

          <p className="mb-4 text-sm text-gray-600">
            Demo mode: card processing is simulated. No payment gateway is contacted.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-success-dark py-2 text-white hover:bg-success-dark disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : `Submit $${inputAmount} Payment`}
          </button>
        </form>

        {error && <p className="mt-2 text-error-dark">{error}</p>}
      </div>
    </Modal>
  );
};

export default PaymentModal;
