import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Mail, 
  Monitor, 
  DollarSign,
  Calculator,
  CreditCard,
  Percent
} from "lucide-react";
import {
  useGetAdminSettingsQuery,
  useUpdateAdminSettingsMutation,
  useUpdatePaymentSettingsMutation,
  useResetPaymentSettingsMutation,
  useTestPaymentGatewayMutation
} from "../../store/services/adminSettingsApi";

const AdminSettings = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || "general");
  
  // API hooks
  const { 
    data: adminSettingsData, 
    isLoading: isLoadingSettings, 
    error: settingsError,
    refetch: refetchSettings
  } = useGetAdminSettingsQuery();
  
  const [updateAdminSettings, { isLoading: isUpdatingSettings }] = useUpdateAdminSettingsMutation();
  const [updatePaymentSettings, { isLoading: isUpdatingPayment }] = useUpdatePaymentSettingsMutation();
  const [resetPaymentSettings, { isLoading: isResetting }] = useResetPaymentSettingsMutation();
  const [testPaymentGateway, { isLoading: isTesting }] = useTestPaymentGatewayMutation();

  // Local state for form data
  const [settings, setSettings] = useState({
    paymentSettings: {
      globalDeductionPercentage: 10,
      instructorAnnualFee: 100,
      studentAdminFee: 5,
      stripeEnabled: true,
      paypalEnabled: true,
      directTransferEnabled: true,
      minimumPaymentAmount: 5,
      currency: "USD",
      autoEnrollOnCardPayment: true,
      autoEnrollOnPaypalPayment: true,
      requireAdminApprovalForDirectTransfer: true
    },
    systemSettings: {
      siteName: "Mentora",
      siteDescription: "Professional Learning Management System",
      allowRegistration: true,
      maintenanceMode: false,
      maxFileSize: 50,
      sessionTimeout: 30,
      supportEmail: "support@Mentora.com",
      logLevel: "info",
      backupFrequency: "daily"
    },
    notificationSettings: {
      emailNotificationsEnabled: true,
      paymentNotificationsEnabled: true,
      enrollmentNotificationsEnabled: true,
      smsNotifications: false
    }
  });

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  // Legacy handler for backward compatibility
  const handleLegacySettingChange = (key, value) => {
    // Determine which section this setting belongs to
    const paymentKeys = ['globalDeductionPercentage', 'instructorAnnualFee', 'studentAdminFee', 'stripeEnabled', 'paypalEnabled', 'directTransferEnabled', 'minimumPaymentAmount', 'autoEnrollOnCardPayment', 'autoEnrollOnPaypalPayment', 'requireAdminApprovalForDirectTransfer'];
    const systemKeys = ['siteName', 'siteDescription', 'allowRegistration', 'maintenanceMode', 'maxFileSize', 'sessionTimeout', 'supportEmail'];
    const notificationKeys = ['emailNotificationsEnabled', 'paymentNotificationsEnabled', 'enrollmentNotificationsEnabled'];
    
    if (paymentKeys.includes(key)) {
      handleSettingChange('paymentSettings', key, value);
    } else if (systemKeys.includes(key)) {
      handleSettingChange('systemSettings', key, value);
    } else if (notificationKeys.includes(key)) {
      handleSettingChange('notificationSettings', key, value);
    }
  };

  // Sync API data with local state
  useEffect(() => {
    if (adminSettingsData?.data) {
      setSettings(prev => ({
        ...prev,
        ...adminSettingsData.data
      }));
    }
  }, [adminSettingsData]);

  // Debug logging
  useEffect(() => {
    if (settingsError) {
      console.error("Admin settings error:", settingsError);
    }
    if (adminSettingsData) {
      console.log("Admin settings data:", adminSettingsData);
    }
  }, [settingsError, adminSettingsData]);

  const handleSaveSettings = async () => {
    try {
      if (activeTab === "payments") {
        await updatePaymentSettings(settings.paymentSettings).unwrap();
        toast.success("Payment settings saved successfully!");
      } else {
        await updateAdminSettings(settings).unwrap();
        toast.success("Settings saved successfully!");
      }
      refetchSettings();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save settings");
      console.error("Save settings error:", error);
    }
  };

  const handleResetPaymentSettings = async () => {
    if (!window.confirm("Are you sure you want to reset payment settings to defaults? This action cannot be undone.")) {
      return;
    }

    try {
      await resetPaymentSettings().unwrap();
      toast.success("Payment settings reset to defaults!");
      refetchSettings();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset payment settings");
      console.error("Reset payment settings error:", error);
    }
  };

  const tabs = [
    { id: "general", label: "⚙️ General", icon: "⚙️" },
    { id: "payments", label: "💰 Payment & Profit", icon: "💰" },
    { id: "security", label: "🔒 Security", icon: "🔒" },
    { id: "notifications", label: "📧 Notifications", icon: "📧" },
    { id: "system", label: "🖥️ System", icon: "🖥️" }
  ];

  // Show loading state
  if (isLoadingSettings) {
    return (
      <div className="min-h-screen bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-brand-600 mb-4" />
              <p className="text-gray-600">Loading admin settings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (settingsError) {
    return (
      <div className="min-h-screen bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="bg-error-soft border border-error text-error-dark px-4 py-3 rounded mb-4">
                <p className="font-medium">Error loading admin settings</p>
                <p className="text-sm">{settingsError?.data?.message || settingsError?.message || "Unknown error"}</p>
              </div>
              <button
                onClick={() => refetchSettings()}
                className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2 inline" />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
          <p className="text-gray-600">
            Configure platform settings, payment methods, security, and notifications.
          </p>
        </header>

        {/* Tabs Navigation */}
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 mb-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-brand-600 border-b-2 border-brand-600 bg-brand-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.systemSettings.siteName}
                    onChange={(e) => handleSettingChange("systemSettings", "siteName", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                  <input
                    type="text"
                    value={settings.systemSettings.siteDescription}
                    onChange={(e) => handleSettingChange("systemSettings", "siteDescription", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    value={settings.systemSettings.supportEmail}
                    onChange={(e) => handleSettingChange("systemSettings", "supportEmail", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allow Registration</label>
                  <select
                    value={settings.systemSettings.allowRegistration ? "true" : "false"}
                    onChange={(e) => handleSettingChange("systemSettings", "allowRegistration", e.target.value === "true")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
                  <select
                    value={settings.systemSettings.maintenanceMode ? "true" : "false"}
                    onChange={(e) => handleSettingChange("systemSettings", "maintenanceMode", e.target.value === "true")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  >
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isUpdatingSettings}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdatingSettings ? "Saving..." : "Save General Settings"}
              </button>
            </div>
          )}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment & Profit Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Global Deduction Percentage (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={settings.paymentSettings.globalDeductionPercentage}
                    onChange={(e) => handleSettingChange("paymentSettings", "globalDeductionPercentage", parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructor Annual Fee</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.paymentSettings.instructorAnnualFee}
                    onChange={(e) => handleSettingChange("paymentSettings", "instructorAnnualFee", parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Admin Fee</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.paymentSettings.studentAdminFee}
                    onChange={(e) => handleSettingChange("paymentSettings", "studentAdminFee", parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payment Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={settings.paymentSettings.minimumPaymentAmount}
                    onChange={(e) => handleSettingChange("paymentSettings", "minimumPaymentAmount", parseFloat(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.paymentSettings.currency}
                    onChange={(e) => handleSettingChange("paymentSettings", "currency", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Require Admin Approval for Direct Transfers</label>
                  <select
                    value={settings.paymentSettings.requireAdminApprovalForDirectTransfer ? "true" : "false"}
                    onChange={(e) => handleSettingChange("paymentSettings", "requireAdminApprovalForDirectTransfer", e.target.value === "true")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  >
                    <option value="true">Required</option>
                    <option value="false">Not Required</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSaveSettings}
                  disabled={isUpdatingPayment}
                  className="px-6 py-2 bg-success-dark text-white rounded-lg hover:bg-success-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isUpdatingPayment ? "Saving..." : "Save Payment Settings"}
                </button>
                <button
                  onClick={handleResetPaymentSettings}
                  disabled={isResetting}
                  className="px-6 py-2 bg-error-dark text-white rounded-lg hover:bg-error-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isResetting ? "Resetting..." : "Reset to Defaults"}
                </button>
              </div>
            </div>
          )}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded border">
                    <div>
                      <p className="font-medium text-gray-900">Session Timeout</p>
                      <p className="text-sm text-gray-500">Minutes before automatic logout</p>
                    </div>
                    <input
                      type="number"
                      min="5"
                      value={settings.systemSettings.sessionTimeout}
                      onChange={(e) => handleSettingChange("systemSettings", "sessionTimeout", parseInt(e.target.value))}
                      className="w-20 border border-gray-300 rounded px-3 py-2 text-center"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded border">
                    <div>
                      <p className="font-medium text-gray-900">Max File Size</p>
                      <p className="text-sm text-gray-500">Maximum upload size in MB</p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={settings.systemSettings.maxFileSize}
                      onChange={(e) => handleSettingChange("systemSettings", "maxFileSize", parseInt(e.target.value))}
                      className="w-20 border border-gray-300 rounded px-3 py-2 text-center"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isUpdatingSettings}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdatingSettings ? "Saving..." : "Save Security Settings"}
              </button>
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Settings</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-white rounded border cursor-pointer">
                    <span>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-500">Enable email notifications for platform events</p>
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.emailNotificationsEnabled}
                      onChange={(e) => handleSettingChange("notificationSettings", "emailNotificationsEnabled", e.target.checked)}
                      className="w-5 h-5 text-brand-600 rounded border-gray-300"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-white rounded border cursor-pointer">
                    <span>
                      <p className="font-medium text-gray-900">Payment Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications for payment events</p>
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.paymentNotificationsEnabled}
                      onChange={(e) => handleSettingChange("notificationSettings", "paymentNotificationsEnabled", e.target.checked)}
                      className="w-5 h-5 text-brand-600 rounded border-gray-300"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-white rounded border cursor-pointer">
                    <span>
                      <p className="font-medium text-gray-900">Enrollment Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications for new enrollments</p>
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.enrollmentNotificationsEnabled}
                      onChange={(e) => handleSettingChange("notificationSettings", "enrollmentNotificationsEnabled", e.target.checked)}
                      className="w-5 h-5 text-brand-600 rounded border-gray-300"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-white rounded border cursor-pointer">
                    <span>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Enable SMS notifications (requires provider)</p>
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.smsNotifications}
                      onChange={(e) => handleSettingChange("notificationSettings", "smsNotifications", e.target.checked)}
                      className="w-5 h-5 text-brand-600 rounded border-gray-300"
                    />
                  </label>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isUpdatingSettings}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdatingSettings ? "Saving..." : "Save Notification Settings"}
              </button>
            </div>
          )}
          {activeTab === "system" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Settings</h2>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">System Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Platform Version</span>
                    <span className="font-medium text-gray-900">1.0.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Node Environment</span>
                    <span className="font-medium text-gray-900">Development</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Backup Frequency</span>
                    <span className="font-medium text-gray-900">{settings.systemSettings.backupFrequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Log Level</span>
                    <span className="font-medium text-gray-900">{settings.systemSettings.logLevel}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isUpdatingSettings}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isUpdatingSettings ? "Saving..." : "Save System Settings"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
