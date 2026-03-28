"use client"
import Sidebar from "@/app/components/admin/Sidebar"
import styles from "@/app/styles/AdminLayout.module.css"
import { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

export default function AdminLayout({ children }: { children: React.ReactNode }) {

const [collapsed, setCollapsed] = useState(false)

return (
  <div className={styles.layout}>
    <Sidebar collapsed={collapsed} />

    <button
      className={`${styles.toggleBtn} ${collapsed ? styles.toggleCollapsed : ""}`}
      onClick={() => setCollapsed(!collapsed)}
      title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    >
      {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
    </button>

    <div className={`${styles.main} ${collapsed ? styles.mainExpanded : ""}`}>
      {children}
    </div>
  </div>
)
}
