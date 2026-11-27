import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetInstructorSessionsQuery,
  useStartLiveSessionMutation,
  useEndLiveSessionMutation,
  useDeleteLiveSessionMutation,
  useJoinLiveSessionMutation
} from '../../store/services/liveSessionApi';

export const useInstructorSessions = ({ courseId }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showRecordingUpload, setShowRecordingUpload] = useState(false);
  const [filter, setFilter] = useState('all');

  const { data: sessionsData, isLoading, error, refetch } = useGetInstructorSessionsQuery({
    status: filter === 'all' ? undefined : filter,
    upcoming: filter === 'upcoming' ? 'true' : undefined
  }, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  const [startSession, { isLoading: isStarting }] = useStartLiveSessionMutation();
  const [endSession, { isLoading: isEnding }] = useEndLiveSessionMutation();
  const [deleteSession, { isLoading: isDeleting }] = useDeleteLiveSessionMutation();
  const [joinSession, { isLoading: isJoining }] = useJoinLiveSessionMutation();

  const sessions = sessionsData?.data || [];

  const handleStartSession = async (sessionId) => {
    try {
      const result = await startSession(sessionId).unwrap();
      toast.success('Session started successfully! 🎉');
      if (result.data?.zoomStartUrl) window.open(result.data.zoomStartUrl, '_blank');
      refetch();
    } catch (error) {
      console.error('Error starting session:', error);
      toast.error(error?.data?.message || 'Failed to start session');
    }
  };

  const handleEndSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to end this session?')) return;
    try {
      await endSession(sessionId).unwrap();
      toast.success('Session ended successfully');
      refetch();
    } catch (error) {
      console.error('Error ending session:', error);
      toast.error(error?.data?.message || 'Failed to end session');
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this session? This action cannot be undone.')) return;
    try {
      await deleteSession(sessionId).unwrap();
      toast.success('Session deleted successfully');
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error(error?.data?.message || 'Failed to delete session');
    }
  };

  const handleJoinSession = async (sessionId) => {
    try {
      const result = await joinSession(sessionId).unwrap();
      toast.success('Joined session successfully! 🎉');
      if (result.data?.zoomJoinUrl) window.open(result.data.zoomJoinUrl, '_blank');
    } catch (error) {
      console.error('Error joining session:', error);
      toast.error(error?.data?.message || 'Failed to join session');
    }
  };

  const handleUploadRecording = (session) => {
    setSelectedSession(session);
    setShowRecordingUpload(true);
  };

  const getStatusBadge = (session) => {
    const status = session.currentStatus || session.status || 'scheduled';
    const badges = { scheduled: 'bg-brand-100 text-brand-800 border-brand-200', upcoming: 'bg-brand-100 text-brand-800 border-brand-200', live: 'bg-success-soft text-success-dark border-success-soft animate-pulse', completed: 'bg-gray-100 text-gray-800 border-gray-200', cancelled: 'bg-error-soft text-error-dark border-error-soft', ended: 'bg-brand-100 text-brand-800 border-brand-200' };
    const icons = { scheduled: '📅', upcoming: '⏰', live: '🔴', completed: '✅', cancelled: '❌', ended: '🏁' };
    return { status, badgeClass: badges[status] || badges.scheduled, icon: icons[status] || icons.scheduled };
  };

  return {
    showScheduleForm, setShowScheduleForm,
    selectedSession, setSelectedSession,
    showRecordingUpload, setShowRecordingUpload,
    filter, setFilter,
    sessions, isLoading, error, refetch,
    isStarting, isEnding, isDeleting, isJoining,
    handleStartSession, handleEndSession, handleDeleteSession, handleJoinSession, handleUploadRecording,
    getStatusBadge,
  };
};
export default useInstructorSessions;
