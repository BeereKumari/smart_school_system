"use client"

import styles from "@/app/styles/AdminSidebar.module.css";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  FaThLarge, 
  FaUserTie, 
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSchool
} from "react-icons/fa";

type SidebarProps = {
  collapsed: boolean
}

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaThLarge },
  { href: "/admin/admissions", label: "Admissions", icon: FaClipboardList },
  { href: "/admin/principal", label: "Principal", icon: FaUserTie },
]

export default function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <FaSchool />
        </div>
        {!collapsed && (
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Smart School</span>
            <span className={styles.logoSubtitle}>Admin Portal</span>
          </div>
        )}
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          {!collapsed && <span className={styles.navLabel}>Main Menu</span>}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                title={collapsed ? item.label : ""}
              >
                <span className={styles.navIcon}>
                  <Icon />
                </span>
                {!collapsed && <span className={styles.navText}>{item.label}</span>}
                {isActive && <span className={styles.activeIndicator}></span>}
              </Link>
            )
          })}
        </div>

        <div className={styles.navSection}>
          {!collapsed && <span className={styles.navLabel}>Settings</span>}
          <Link 
            href="/admin/settings" 
            className={styles.navItem}
            title={collapsed ? "Settings" : ""}
          >
            <span className={styles.navIcon}>
              <FaCog />
            </span>
            {!collapsed && <span className={styles.navText}>Settings</span>}
          </Link>
        </div>
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.adminInfo}>
          <div className={styles.adminAvatar}>
            <span>A</span>
          </div>
          {!collapsed && (
            <div className={styles.adminDetails}>
              <span className={styles.adminName}>Administrator</span>
              <span className={styles.adminRole}>Super Admin</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
