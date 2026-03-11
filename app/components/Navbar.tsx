"use client"
import { useEffect, useState } from "react"
import styles from "../styles/Navbar.module.css"
import Link from "next/link"

export default function Navbar() {
  const [active, setActive] = useState("about")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      sections.forEach((section) => {
        const top = section.offsetTop - 120
        const height = section.clientHeight
        if (window.scrollY >= top && window.scrollY < top + height) {
          setActive(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Smart School System</div>

      <ul className={styles.menu}>
        <li><a className={active==="about"?styles.active:""} href="#about">Who We Are</a></li>
        <li><a className={active==="vision"?styles.active:""} href="#vision">Vision</a></li>
        <li><a className={active==="management"?styles.active:""} href="#management">Management</a></li>
        <li><a className={active==="testimonials"?styles.active:""} href="#testimonials">What People Say</a></li>
        <li><a className={active==="journey"?styles.active:""} href="#journey">Why Choose Us</a></li>
        <li><a className={active==="diversity"?styles.active:""} href="#diversity">Achievements</a></li>
        <li><a className={active==="facilities"?styles.active:""}href="#facilities">Facilities</a></li>
        <li> <Link href="/admission" className={styles.active}>Admissions</Link> </li>
      </ul>

      <button className={styles.loginBtn}><Link href="/login" className="login-btn">Login</Link></button>
    </nav>
  )
}