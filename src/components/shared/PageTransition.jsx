import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
};

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
