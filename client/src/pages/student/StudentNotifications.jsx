import React, { useState } from "react";
import {
  Bell,
  MessageSquare,
  BookOpen,
  Video,
  CreditCard,
  Award,
  Settings,
  Check,
  X,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  Send,
  Calendar,
  User
} from "lucide-react";
import {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} from "../../store/services/notificationApi";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const StudentNotifications = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  // API calls
  const { data: notificationsData, isLoading, error, refetch } = useGetNotificationsQuery({
    page,
    limit: 20,
    type: filterType === "all" ? undefined : filterType,
  });
  const { data: unreadCountData } = useGetUnreadCountQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationsData?.data || [];
  const unreadCount = unreadCountData?.data?.unreadCount || 0;

  // Handle notification actions
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead(notificationId).unwrap();
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const clearAllNotifications = async () => {
    if (window.confirm("Are you sure you want to delete all notifications? This action cannot be undone.")) {
      try {
        // Delete all notifications one by one
        const deletePromises = notifications.map(notification =>
          deleteNotification(notification._id).unwrap()
        );
        await Promise.all(deletePromises);
        toast.success("All notifications deleted");
      } catch (error) {
        toast.error("Failed to delete notifications");
      }
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId).unwrap();
      toast.success("Notification deleted");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  // Notification settings
  const [settings, setSettings] = useState({
    course: true,
    session: true,
    assignment: true,
    payment: true,
    message: true,
    email: true,
    push: false
  });

  const getNotificationIcon = (type) => {
    const iconMap = {
      message: MessageSquare,
      course_enrollment: BookOpen,
      assignment_graded: Award,
      live_session: Video,
      payment: CreditCard,
      course_update: BookOpen,
      system: Bell,
    };
    const IconComponent = iconMap[type] || Bell;
    return <IconComponent className="w-5 h-5" />;
  };

  const getNotificationColor = (color) => {
    const colors = {
      blue: "bg-brand-100 text-brand-600 border-brand-200",
      green: "bg-success-soft text-success-dark border-success-soft",
      yellow: "bg-warning-soft text-warning-dark border-warning-soft",
      purple: "bg-brand-100 text-brand-600 border-brand-200",
      red: "bg-error-soft text-error-dark border-error-soft"
    };
    return colors[color] || colors.blue;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === "unread") return !notification.isRead;
    if (filterType === "read") return notification.isRead;
    if (filterType !== "all") return notification.type === filterType;
    return true;
  });

  const handleSelectNotification = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    );
  };

  const handleMarkSelectedAsRead = async () => {
    try {
      const readPromises = selectedNotifications.map(id =>
        markAsRead(id).unwrap()
      );
      await Promise.all(readPromises);
      setSelectedNotifications([]);
      toast.success("Selected notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm("Are you sure you want to delete selected notifications?")) {
      try {
        const deletePromises = selectedNotifications.map(id =>
          deleteNotification(id).unwrap()
        );
        await Promise.all(deletePromises);
        setSelectedNotifications([]);
        toast.success("Selected notifications deleted");
      } catch (error) {
        toast.error("Failed to delete notifications");
      }
    }
  };

  const handleReply = (notification) => {
    // Only allow reply for message-type notifications
    if (notification.type === 'message' || notification.type === 'course_enrollment') {
      setReplyingTo(notification);
    }
  };

  const handleSendReply = () => {
    if (replyMessage.trim() && replyingTo) {
      // Navigate to messages page with the instructor/admin
      navigate('/student/messages', {
        state: {
          startConversation: true,
          instructorId: replyingTo.senderId || replyingTo.userId,
          message: replyMessage.trim(),
          subject: `Re: ${replyingTo.title}`
        }
      });
      setReplyMessage('');
      setReplyingTo(null);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return format(date, "MMM dd, yyyy 'at' h:mm a");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-brand-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-error-soft border border-error-soft rounded-xl p-6 text-center">
            <Bell className="w-12 h-12 text-error mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-error-dark mb-2">Error Loading Notifications</h3>
            <p className="text-error-dark mb-4">{error?.data?.message || "Failed to load notifications"}</p>
            <button
              onClick={refetch}
              className="bg-error-dark text-white px-4 py-2 rounded-lg hover:bg-error-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StudentNotifications;
