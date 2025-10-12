import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthModal = ({ isOpen, onClose, defaultMode = "login" }) => {
  const [mode, setMode] = useState(defaultMode);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Update mode when defaultMode changes
  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  if (!isOpen) {
    return null;
  }

  const handleSuccess = () => {
    onClose?.();
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  // Create modal content with guaranteed centering
  const modalContent = (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        boxSizing: 'border-box'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          zIndex: 10000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-[10000] bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {mode === "login" ? (
          <LoginForm 
            onSuccess={handleSuccess} 
            onSwitchToSignup={switchMode} 
          />
        ) : (
          <SignupForm 
            onSuccess={handleSuccess} 
            onSwitchToLogin={switchMode} 
          />
        )}
      </div>
    </div>
  );

  // Render modal in a portal at document.body level to avoid positioning issues
  return createPortal(modalContent, document.body);
};

export default AuthModal;