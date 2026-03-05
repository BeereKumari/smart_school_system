"use client"

import { motion } from "framer-motion"
import styles from "../styles/section.module.css"

export default function About() {
  return (
    <section id="about" className={styles.aboutSection}>

      <div className={styles.aboutContainer}>

        {/* Image Animation */}
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <img src="/teacher.jpg" alt="Classroom" />
        </motion.div>

        {/* Text Animation */}
        <motion.div
          className={styles.textWrapper}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <h2>Who We Are</h2>
          <p>
            In today’s dynamic global environment, education must go beyond
            traditional textbooks. Smart Student System integrates academic
            excellence with digital transformation, ensuring innovation,
            leadership and holistic development for every learner.
          </p>

          <p>
            Our institution is dedicated to shaping responsible citizens,
            fostering creativity, and building a future-ready academic
            ecosystem that empowers students to excel globally.
          </p>
        </motion.div>

      </div>

    </section>
  )
}