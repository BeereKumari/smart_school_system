"use client"

import { motion } from "framer-motion"
import styles from "../styles/diversity.module.css"

export default function Diversity() {
  return (
    <section id="diversity" className={styles.section}>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Academic Excellence
      </motion.h2>

      <div className={styles.grid}>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10, scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>10,000+</h3>
          <p>Students Empowered</p>
        </motion.div>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10, scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>300+</h3>
          <p>Expert Faculty</p>
        </motion.div>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10, scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>50+</h3>
          <p>Academic Programs</p>
        </motion.div>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10, scale: 1.05 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>98%</h3>
          <p>Student Success Rate</p>
        </motion.div>

      </div>

    </section>
  )
}