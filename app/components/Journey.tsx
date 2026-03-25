"use client"

import { motion } from "framer-motion"
import styles from "../styles/journey.module.css"

export default function Journey() {
  return (
    <section id="journey" className={styles.section}>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Why Choose Our Platform
      </motion.h2>

      <div className={styles.grid}>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>Smart Administration</h3>
          <p>
            Manage students, teachers, attendance, results and academic
            activities through a centralized digital platform.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>Modern Technology</h3>
          <p>
            Our system integrates modern technologies to streamline
            communication, record keeping and institutional operations.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>Secure & Reliable</h3>
          <p>
            Built with strong security practices ensuring safe access
            to academic and administrative data.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3>Scalable Platform</h3>
          <p>
            Designed to grow with institutions, supporting schools
            and educational organizations of all sizes.
          </p>
        </motion.div>

      </div>

    </section>
  )
}