"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);

  // Section 3: 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 h-[500vh] w-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex items-center p-8 md:p-24 overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
              My Name.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide uppercase">
              Creative Developer.
            </p>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex items-center justify-start p-12 md:p-24 pointer-events-auto"
        >
          <h2 className="text-4xl md:text-7xl max-w-2xl font-semibold tracking-tight text-white leading-tight">
            I build digital experiences.
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex items-center justify-end p-12 md:p-24 pointer-events-auto"
        >
          <h2 className="text-4xl md:text-7xl max-w-2xl font-semibold tracking-tight text-white text-right leading-tight">
            Bridging design and engineering.
          </h2>
        </motion.div>
        
      </div>
    </div>
  );
}
