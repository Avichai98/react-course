import React from 'react';
import './ToastHost.css';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastHostProps {
  toasts: Toast[];
  onRemoveToast: (id: string) => void;
}

export const ToastHost: React.FC<ToastHostProps> = ({ toasts, onRemoveToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type}`}
          onClick={() => onRemoveToast(toast.id)}
        >
          <span>{toast.message}</span>
          <button className="toast__close" onClick={() => onRemoveToast(toast.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
};