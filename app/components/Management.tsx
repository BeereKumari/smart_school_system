"use client"

import { motion } from "framer-motion"
import styles from "../styles/management.module.css"

export default function Management() {
  return (
    <section id="management" className={styles.managementSection}>
      
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>Leadership & Governance</h2>
      </motion.div>

      <div className={styles.managementGrid}>

        {/* Chairman */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
        >
          <div className={styles.line}></div>
          <h3>Chairman</h3>
          <p>
            The Chairman provides strategic direction and long-term vision,
            ensuring that the institution upholds the highest standards of
            academic excellence, governance, and innovation. With decades of
            experience in educational leadership, the Chairman fosters a
            culture of discipline, accountability, and global perspective.
          </p>
        </motion.div>

        {/* Academic Director */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
        >
          <div className={styles.line}></div>
          <h3>Academic Director</h3>
          <p>
            The Academic Director leads curriculum innovation, academic
            strategy, and faculty development. By integrating technology-driven
            learning methodologies, the Director ensures a holistic educational
            framework that nurtures intellectual growth and ethical leadership.
          </p>
        </motion.div>

        {/* Principal */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -12 }}
        >
          <div className={styles.line}></div>
          <h3>Principal</h3>
          <p>
            The Principal oversees daily academic operations, student
            engagement, and institutional culture. Committed to excellence,
            the Principal ensures a nurturing and disciplined environment
            that empowers students to achieve their fullest potential.
          </p>
        </motion.div>

      </div>
    </section>
  )
}