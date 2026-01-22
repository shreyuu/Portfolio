import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    // Handle toast auto-removal with useEffect
    useEffect(() => {
        if (toasts.length === 0) return;

        const timers = toasts.map((toast) =>
            setTimeout(() => {
                removeToast(toast.id);
            }, 3000)
        );

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [toasts, removeToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`px-4 py-3 rounded-lg shadow-lg min-w-[300px] ${toast.type === 'success'
                                ? 'bg-green-600'
                                : toast.type === 'error'
                                    ? 'bg-red-600'
                                    : 'bg-blue-600'
                                } text-white`}
                        >
                            <div className="flex items-center justify-between">
                                <p>{toast.message}</p>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="ml-4 text-white hover:text-gray-200"
                                    aria-label="Close notification"
                                >
                                    ✕
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};