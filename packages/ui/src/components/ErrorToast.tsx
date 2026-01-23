import { motion, Variants } from "framer-motion";

const toastVariants : Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const ErrorToast = ({
  errorMessage,
  className,
}: {
  errorMessage: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={`absolute right-2 ${className}`}
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {errorMessage}
    </motion.div>
  );
};

export default ErrorToast;