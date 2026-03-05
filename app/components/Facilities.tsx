"use client"

import { motion } from "framer-motion"
import styles from "../styles/facilities.module.css"

export default function Facilities() {
  return (
    <section id="facilities" className={styles.section}>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Campus Facilities
      </motion.h2>

      <div className={styles.grid}>

        <motion.div className={styles.card} whileHover={{ y: -10 }}>
          <h3>📚 Smart Library</h3>
          <p>Extensive collection of academic resources and digital learning materials.</p>
        </motion.div>

        <motion.div className={styles.card} whileHover={{ y: -10 }}>
          <h3>💻 Computer Labs</h3>
          <p>Advanced computer laboratories equipped with modern technology.</p>
        </motion.div>

        <motion.div className={styles.card} whileHover={{ y: -10 }}>
          <h3>🔬 Science Laboratories</h3>
          <p>Well-equipped physics, chemistry and biology labs for practical learning.</p>
        </motion.div>

        <motion.div className={styles.card} whileHover={{ y: -10 }}>
          <h3>🏀 Sports Facilities</h3>
          <p>Indoor and outdoor sports infrastructure to promote physical fitness.</p>
        </motion.div>

        <motion.div className={styles.card} whileHover={{ y: -10 }}>
          <h3>🎓 Smart Classrooms</h3>
          <p>Technology-enabled classrooms supporting interactive learning.</p>
        </motion.div>

        <motion.div className={styles.card} whileHover={{ y: -10 }}>
          <h3>🚌 Transportation</h3>
          <p>Safe and reliable transport facilities connecting students across the city.</p>
        </motion.div>

      </div>

    </section>
  )
}