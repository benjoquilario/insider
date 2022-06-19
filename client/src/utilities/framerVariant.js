export const backdropVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export const modalVariant = {
  hidden: {
    y: '-10%',
    transition: { type: 'spring', ease: 'easeOut', duration: 0.3 },
  },
  visible: {
    y: 0,
    transition: { type: 'spring', ease: 'easeOut', duration: 0.3 },
  },
};

export const formVariant = {};
