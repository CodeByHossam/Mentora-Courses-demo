// Demo-only meeting placeholder. No Zoom SDK or external JS/WASM is loaded.
const ZoomMeeting = ({ meetingNumber, userName, role = 0, onMeetingEnd }) => {
  const roleLabel = role === 1 ? "Host" : "Attendee";

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-2xl" aria-hidden="true">
        🎥
      </div>
      <h2 className="text-lg font-semibold text-gray-900">Live session — demo mode</h2>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        Meeting {meetingNumber || "N/A"} for {userName || "demo user"} (
        {roleLabel}) is simulated locally. No video service is contacted.
      </p>
      <button
        type="button"
        onClick={onMeetingEnd}
        className="mt-6 rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
      >
        End Demo Meeting
      </button>
    </div>
  );
};

export default ZoomMeeting;
