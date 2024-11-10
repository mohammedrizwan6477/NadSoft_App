import React,{ useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

export const Notification = ({ variant = 'primary', message, onClose }) => {
  
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1050 }}>
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  </div>
  );
};
