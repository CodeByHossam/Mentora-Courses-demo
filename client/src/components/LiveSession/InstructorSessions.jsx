import React from "react";
import { toast } from "react-toastify";
import useInstructorSessions from "./useInstructorSessions";
import ScheduleSessionForm from "./ScheduleSessionForm";
import SessionRecordingUpload from "./SessionRecordingUpload";
import { Calendar, Play, Square, Trash2, Video, Users, Clock, Plus } from "lucide-react";

const InstructorSessions = ({ courseId }) => {
  const {
    showScheduleForm, setShowScheduleForm,
    selectedSession, setSelectedSession,
    showRecordingUpload, setShowRecordingUpload,
    filter, setFilter,
    sessions, isLoading, error, refetch,
    isStarting, isEnding, isDeleting, isJoining,
    handleStartSession, handleEndSession, handleDeleteSession, handleJoinSession, handleUploadRecording,
    getStatusBadge,
  } = useInstructorSessions({ courseId });

  if (isLoading) return <div className="p-4 text-center">Loading sessions...</div>;
  if (error) return <div className="p-4 text-center text-error-dark">Failed to load sessions.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Live Sessions</h3>
        <button onClick={() => setShowScheduleForm(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">
          <Plus className="w-4 h-4" /> Schedule Session
        </button>
      </div>

      <div className="flex gap-2">
        {['all', 'upcoming', 'live', 'completed', 'cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-sm ${filter === f ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No sessions found.</div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => {
            const { badgeClass, icon } = getStatusBadge(session);
            return (
              <div key={session._id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <p className="text-sm text-gray-600">{session.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(session.startTime).toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {session.duration} min</span>
                      <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {session.participants?.length || 0}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${badgeClass}`}>
                    <span className="mr-1">{icon}</span> {session.currentStatus || session.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  {(session.status === 'scheduled' || session.status === 'upcoming') && (
                    <button onClick={() => handleStartSession(session._id)} disabled={isStarting} className="flex items-center gap-1 px-3 py-1 bg-success-dark text-white rounded text-sm hover:bg-success-dark disabled:opacity-50">
                      <Play className="w-4 h-4" /> Start
                    </button>
                  )}
                  {session.status === 'live' && (
                    <button onClick={() => handleEndSession(session._id)} disabled={isEnding} className="flex items-center gap-1 px-3 py-1 bg-error-dark text-white rounded text-sm hover:bg-error-dark disabled:opacity-50">
                      <Square className="w-4 h-4" /> End
                    </button>
                  )}
                  <button onClick={() => handleJoinSession(session._id)} disabled={isJoining} className="flex items-center gap-1 px-3 py-1 bg-brand-600 text-white rounded text-sm hover:bg-brand-700 disabled:opacity-50">
                    <Video className="w-4 h-4" /> Join
                  </button>
                  <button onClick={() => handleUploadRecording(session)} className="flex items-center gap-1 px-3 py-1 bg-brand-600 text-white rounded text-sm hover:bg-brand-700">
                    <Video className="w-4 h-4" /> Recording
                  </button>
                  <button onClick={() => handleDeleteSession(session._id)} disabled={isDeleting} className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 disabled:opacity-50">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showScheduleForm && (
        <ScheduleSessionForm courseId={courseId} onClose={() => setShowScheduleForm(false)} onSuccess={refetch} />
      )}
      {showRecordingUpload && selectedSession && (
        <SessionRecordingUpload session={selectedSession} onClose={() => { setShowRecordingUpload(false); setSelectedSession(null); }} onSuccess={refetch} />
      )}
    </div>
  );
};

export default InstructorSessions;
