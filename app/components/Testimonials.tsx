"use client"

import { motion } from "framer-motion"
import styles from "../styles/testimonials.module.css"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Student",
    text: "This platform has made learning more interactive and organized. The digital tools help us manage assignments and track progress easily."
  },
  {
    name: "Priya Mehta",
    role: "Parent",
    text: "The Smart Student System keeps parents informed about academic progress and school activities. It's extremely helpful."
  },
  {
    name: "Ankit Verma",
    role: "Teacher",
    text: "Managing classes and student records has become much easier with this system. It saves time and improves efficiency."
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <h2 className={styles.heading}>What People Say</h2>

      <div className={styles.grid}>
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className={styles.card}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className={styles.text}>“{t.text}”</p>
            <h4>{t.name}</h4>
            <span>{t.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}