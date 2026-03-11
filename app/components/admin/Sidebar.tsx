"use client";

import Link from "next/link";
//import styles from "@/styles/AdminSidebar.module.css";
import styles from "@/app/styles/AdminSidebar.module.css";

export default function Sidebar(){

  return(

    <aside className={styles.sidebar}>

      <h2 className={styles.logo}>Smart School</h2>

      <nav>

        <Link href="/admin/dashboard">Dashboard</Link>

        <Link href="/admin/admissions">Admissions</Link>

        <Link href="/admin/students">Students</Link>

        <Link href="/admin/teachers">Teachers</Link>

        <Link href="/admin/principal">Principal</Link>

      </nav>

    </aside>

  )

}