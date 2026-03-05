"use client"

import { motion } from "framer-motion"
import styles from "../styles/section.module.css"

export default function Vision() {
  return (
    <section id="vision" className={styles.sectionAlt}>
      
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Vision & Mission</h2>
      </motion.div>

      <div className={styles.cards}>

        {/* Vision Card */}
        <motion.div
          className={styles.visionCard}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Our Vision</h3>
          <p>
            To become a globally recognized educational institution that 
            nurtures intellectual curiosity, ethical leadership, and 
            innovation-driven learning. We envision a future where every 
            student is empowered to excel academically and contribute 
            meaningfully to society.
          </p>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          className={styles.visionCard}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
        >
          <h3>Our Mission</h3>
          <p>
            To deliver high-quality, technology-enabled education through 
            innovative curriculum design, student-centric learning approaches, 
            and strong institutional values. We are committed to fostering 
            integrity, excellence, and inclusivity in every aspect of learning.
          </p>
        </motion.div>

      </div>
    </section>
  )
}