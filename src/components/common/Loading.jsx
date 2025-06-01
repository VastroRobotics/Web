import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/branding/vastro_full_logo.svg';

export default function Loading({ message = 'Loading...' }) {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#121212' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="h-8 w-auto drop-shadow-xl"
      />

      {/* Spinner */}
      <motion.div
        className="mb-4 mt-12 h-8 w-8 border-2 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />

      {/* Loading text */}
      <p className="text-sm text-white opacity-80">{message}</p>
    </motion.div>
  );
}
