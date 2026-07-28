"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Project Alpha",
    category: "Web App",
    description: "A high-performance trading dashboard built with WebGL and React.",
  },
  {
    title: "Project Beta",
    category: "E-Commerce",
    description: "An immersive 3D shopping experience for a luxury fashion brand.",
  },
  {
    title: "Project Gamma",
    category: "Portfolio",
    description: "Award-winning creative portfolio with WebGL fluid simulations.",
  },
  {
    title: "Project Delta",
    category: "Web3",
    description: "Decentralized exchange interface with real-time data visualization.",
  },
];

export default function Projects() {
  return (
    <section className="relative z-20 bg-[#121212] px-6 py-32 md:px-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h3 className="text-4xl font-bold tracking-tight text-white mb-4">Selected Work</h3>
          <p className="text-white/50 text-lg">A showcase of recent digital experiences.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10"
            >
              {/* Subtle hover glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex h-full flex-col justify-between space-y-24">
                <div>
                  <p className="text-sm font-medium tracking-widest text-white/40 uppercase mb-2">
                    {project.category}
                  </p>
                  <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
                </div>
                
                <p className="text-white/60 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
