import { useCallback, useMemo, useState, useEffect } from 'react';

const NOTIFICATION_EVENT = "pov-notification";

export const useNotificationHandler = () => {  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info',
    isAuthError: false,
  });

  useEffect(() => {
    const handleNotification = (event) => {
      setNotification(event.detail);
    };

    window.addEventListener(NOTIFICATION_EVENT, handleNotification);
    return () => window.removeEventListener(NOTIFICATION_EVENT, handleNotification);
  }, []);

  const dispatchNotification = (newNotification) => {
    window.dispatchEvent(new CustomEvent(NOTIFICATION_EVENT, { detail: newNotification }));
  };

  const notify = useCallback((message, severity = 'info', isAuthError = false) => {
    dispatchNotification({
      open: true,
      message,
      severity,
      isAuthError,
    });
  }, []);

  const closeNotification = useCallback(() => {
    dispatchNotification({
      open: false,
      message: '',
      severity: 'info',
      isAuthError: false,
    });
  }, []); 
  
  const handleApiError = useCallback((err, customFallbackMessage = null) => {
    let message = customFallbackMessage || 'An unexpected error occurred. Please try again.';
    let isAuthError = false;

    if (err?.response) {
      const status = err.response.status;
      const data = err.response.data;

      if (status === 401 || status === 403) {
        isAuthError = true;
        message = data?.message || 'Authentication failed. Please log in again.';
      } else if (status === 404) {
        message = data?.message || 'Requested resource could not be found.';
      } else if (status === 422 || status === 400) {
        message = data?.message || data?.error || 'Invalid data provided.';
      } else if (status >= 500) {
        message = 'Server encountered an error. Please try again later.';
      } else {
        message = data?.message || message;
      }
    } else if (err?.status) {
      const status = err.status;
      if (status === 401 || status === 403) {
        isAuthError = true;
        message = 'Authentication failed. Please log in again.';
      } else if (status === 404) {
        message = 'Requested resource not found.';
      } else if (status >= 500) {
        message = 'Server encountered an error.';
      } else if (err.message) {
        message = err.message;
      }
    } else if (err?.message) {
      if (err.message.toLowerCase().includes('network') || err.message.toLowerCase().includes('failed to fetch')) {
        message = 'Network error. Please check your internet connection.';
      } else if (err?.code === 'auth/popup-closed-by-user') {
        notify('Sign-in cancelled.', 'info');
        return;
      } else {
        message = err.message;
      }
    }

    notify(message, 'error', isAuthError);
    
    if (import.meta.env.MODE !== 'production') {
      console.error('[API Error]:', err);
    }
  }, [notify]);

  return useMemo(() => ({
    notification,
    notify,
    handleApiError,
    closeNotification,
  }), [notification, notify, handleApiError, closeNotification]);
};


