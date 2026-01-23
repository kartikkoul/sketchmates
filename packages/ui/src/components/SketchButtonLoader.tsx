import { motion } from "framer-motion";

const SketchButtonLoader = () => {
  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" viewBox="0 0 100 100">
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="164"
          strokeDashoffset="164"
          animate={{
            strokeDashoffset: [164, 0, 164],
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </svg>
      <span className="font-medium">Creating room…</span>
    </div>
  );
};

export default SketchButtonLoader;