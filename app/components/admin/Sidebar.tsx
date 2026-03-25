"use client"

import styles from "@/app/styles/AdminSidebar.module.css";
import Link from "next/link"


type SidebarProps = {
  collapsed: boolean
}

export default function Sidebar({ collapsed }: SidebarProps) {

  return (

    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>

      <h2 className={styles.logo}>Smart School</h2>

      <nav className={styles.nav}>

        <Link href="/admin/dashboard">Dashboard</Link>

        <Link href="/admin/admissions">Admissions</Link>

        <Link href="/admin/students">Students</Link>

        <Link href="/admin/teachers">Teachers</Link>

        <Link href="/admin/principal">Principal</Link>

      </nav>

    </div>

  )

}










       