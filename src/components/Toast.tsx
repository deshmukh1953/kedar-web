import React from 'react';

export interface ToastMessage {
  title: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#141414] border border-neutral-800 text-white px-4 py-2.5 rounded-lg shadow-xl flex items-center space-x-3 text-xs max-w-sm">
      <div className="w-2 h-2 rounded-full bg-orange-500" />
      <div className="flex-1">
        <div className="font-semibold text-white">{toast.title}</div>
        <div className="text-[11px] text-neutral-400">{toast.message}</div>
      </div>
      <button onClick={onClose} className="text-neutral-500 hover:text-white">
        &times;
      </button>
    </div>
  );
};
