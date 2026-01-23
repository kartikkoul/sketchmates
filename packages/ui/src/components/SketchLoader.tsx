import { motion, Variants } from "framer-motion";

const pathVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const faintPathVariants = (delay: number): Variants => ({
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 0.25,
    transition: {
      duration: 2.4,
      ease: "easeInOut",
      delay,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const textVariants: Variants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const SketchLoader = () => {
  return (
      <div className="absolute inset-0 w-screen h-screen z-20 overflow-hidden">
        {/* Background doodles */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          fill="none"
        >
          <motion.path
            d="M20 80 C80 20, 140 140, 200 80"
            stroke="black"
            strokeWidth="1"
            variants={faintPathVariants(0)}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M250 40 Q300 120 350 40"
            stroke="black"
            strokeWidth="1"
            variants={faintPathVariants(0)}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M60 220 C120 260, 180 180, 240 220"
            stroke="black"
            strokeWidth="1"
            variants={faintPathVariants(0)}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M300 200 Q340 160 380 200"
            stroke="black"
            strokeWidth="1"
            variants={faintPathVariants(0)}
            initial="hidden"
            animate="visible"
          />
        </svg>

        {/* Foreground content */}
        <div className="relative h-screen w-screen flex flex-col items-center justify-center">
          <svg
            width="220"
            height="120"
            viewBox="0 0 220 120"
            fill="none"
            className="mb-6"
          >
            <motion.path
              d="M10 60 Q55 10 100 60 T190 60"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>

          <motion.p
            className="text-2xl md:text-base font-bold tracking-wide text-neutral-900"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Welcome, Sketchmate!!
          </motion.p>
        </div>
      </div>
  );
};

export default SketchLoader;
