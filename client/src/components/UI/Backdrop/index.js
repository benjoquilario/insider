import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { backdropVariant } from '../../../utilities/framerVariant';

const Backdrop = ({ handleClickOutside, children }) => (
  <AnimatePresence>
    <motion.div
      variants={backdropVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={handleClickOutside}
      className="fixed top-0 left-0 flex items-center justify-center w-full min-h-screen z-50 bg-gradient-to-r from-[#00000080] to-[#00000080] animate-[opacity_0.5s_ease-in-out]"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default Backdrop;
