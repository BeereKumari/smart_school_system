"use client"

import { motion } from "framer-motion"
import styles from "../styles/Hero.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.glassBox}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>Smart Digital School System</h1>

        <p>
          A modern academic platform designed to manage students,
          faculty, curriculum and institutional growth seamlessly.
        </p>

        <motion.a
          href="#about"
          className={styles.button}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Campus
        </motion.a>
      </motion.div>
    </section>
  )
}