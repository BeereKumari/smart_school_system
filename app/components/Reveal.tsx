"use client"

import { motion } from "framer-motion"

interface Props {
  children: React.ReactNode
}

export default function Reveal({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}