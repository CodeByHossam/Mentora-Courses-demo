const PaymentMethodUnavailable = ({
  method,
  message,
  availableMethods = [],
}) => {
  return (
    <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
      <div className="mb-4 text-4xl" aria-hidden="true">
        ⚠️
      </div>
      <h3 className="font-semibold text-yellow-800">
        {method ? `${method} Not Available` : "Payment Method Not Available"}
      </h3>

      {message ? (
        <p className="mt-2 text-sm text-yellow-700">{message}</p>
      ) : availableMethods.length > 0 ? (
        <div className="mt-3">
          <p className="mb-3 text-yellow-700">
            Please use one of the available payment methods:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {availableMethods.map((availableMethod, index) => (
              <span
                key={`${availableMethod}-${index}`}
                className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800"
              >
                {availableMethod}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-2 text-sm text-yellow-700">
          Please contact the administration for assistance.
        </p>
      )}
    </div>
  );
};

export default PaymentMethodUnavailable;
