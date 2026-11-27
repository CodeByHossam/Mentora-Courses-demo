// Demo card-payment placeholder. The static demo never loads a card SDK.
const StripePaymentForm = ({ course, onInitiate, loading }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onInitiate?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">Card payment — demo only</h3>
        <p className="text-sm text-gray-600">
          Card details are not collected in this frontend-only demo. Submit to
          simulate a payment request locally.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${course?.finalPrice ?? 0}`}
      </button>
    </form>
  );
};

export default StripePaymentForm;
