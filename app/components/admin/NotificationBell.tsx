"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { FaBell, FaUserGraduate, FaArrowRight, FaCheck, FaClock, FaUser, FaEnvelope } from "react-icons/fa"
import styles from "@/app/styles/NotificationBell.module.css"

export default function NotificationBell() {
  const [data, setData] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = typeof window !== "undefined" ? useRouter() : null

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications?userType=admin")
      const result = await res.json()
      setData(result)
      setHasUnread(result.some((n: any) => !n.read))
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const unreadCount = data.filter(n => !n.read).length

  const handleOpen = async () => {
    setOpen(!open)

    if (!open && unreadCount > 0) {
      await fetch("/api/notifications/read", {
        method: "POST"
      })
      setData(prev => prev.map(n => ({ ...n, read: true })))
      setHasUnread(false)
    }
  }

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await fetch(`/api/notifications/${notification._id}`, {
        method: "POST"
      })
      setData(prev => prev.map(n => 
        n._id === notification._id ? { ...n, read: true } : n
      ))
      const stillUnread = data.filter(n => !n.read && n._id !== notification._id).length > 0
      setHasUnread(stillUnread)
    }
    
    if (notification.type === "admission" || notification.message.toLowerCase().includes("admission")) {
      if (router) {
        router.push("/admin/admissions")
      } else {
        window.location.href = "/admin/admissions"
      }
    }
    setOpen(false)
  }

  const getNotificationIcon = (notification: any) => {
    if (notification.type === "admission" || notification.message.toLowerCase().includes("admission")) {
      return <FaUserGraduate />
    }
    return <FaBell />
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const handleViewAll = () => {
    if (router) {
      router.push("/admin/admissions")
    } else {
      window.location.href = "/admin/admissions"
    }
    setOpen(false)
  }

  if (!mounted) {
    return (
      <div className={styles.container}>
        <button className={styles.bellButton} aria-label="Notifications">
          <FaBell className={styles.bellIcon} />
        </button>
      </div>
    )
  }

  const admissionNotifications = data.filter(n => n.type === "admission" || n.message.toLowerCase().includes("admission"))
  const otherNotifications = data.filter(n => n.type !== "admission" && !n.message.toLowerCase().includes("admission"))

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={`${styles.bellButton} ${hasUnread ? styles.hasUnread : ""}`}
        onClick={handleOpen}
        aria-label="Notifications"
      >
        <FaBell className={styles.bellIcon} />
        {hasUnread && <span className={styles.redDot}></span>}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.headerLeft}>
              <h4>Notifications</h4>
              {unreadCount > 0 && (
                <span className={styles.unreadBadge}>{unreadCount}</span>
              )}
            </div>
            {unreadCount > 0 && (
              <button className={styles.markAllRead} onClick={handleOpen}>
                <FaCheck /> Mark all read
              </button>
            )}
          </div>

          <div className={styles.dropdownBody}>
            {data.length === 0 ? (
              <div className={styles.emptyState}>
                <FaBell className={styles.emptyIcon} />
                <p>No notifications</p>
                <span>You're all caught up!</span>
              </div>
            ) : (
              <>
                {admissionNotifications.length > 0 && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <FaUserGraduate />
                      <span>Admission Requests</span>
                      <span className={styles.sectionBadge}>{admissionNotifications.filter(n => !n.read).length} new</span>
                    </div>
                    {admissionNotifications.slice(0, 4).map((n, index) => (
                      <div 
                        key={n._id} 
                        className={`${styles.notificationItem} ${styles.admissionItem} ${!n.read ? styles.unread : ""}`}
                        onClick={() => handleNotificationClick(n)}
                      >
                        <div className={styles.notificationIcon}>
                          <FaUserGraduate />
                        </div>
                        <div className={styles.notificationContent}>
                          <p className={styles.notificationTitle}>New Admission Request</p>
                          <p className={styles.notificationMessage}>
                            {n.message.replace("New admission request from ", "")}
                          </p>
                          <div className={styles.notificationMeta}>
                            <span className={styles.metaItem}>
                              <FaClock /> {getTimeAgo(n.createdAt)}
                            </span>
                            <span className={`${styles.status} ${!n.read ? styles.statusNew : styles.statusSeen}`}>
                              {!n.read ? "New" : "Seen"}
                            </span>
                          </div>
                        </div>
                        <div className={styles.notificationArrow}>
                          <FaArrowRight />
                        </div>
                        {!n.read && <span className={styles.unreadDot}></span>}
                      </div>
                    ))}
                    {admissionNotifications.length > 4 && (
                      <button className={styles.viewMoreBtn} onClick={handleViewAll}>
                        View all {admissionNotifications.length} requests <FaArrowRight />
                      </button>
                    )}
                  </div>
                )}

                {otherNotifications.length > 0 && (
                  <div className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <FaBell />
                      <span>Other Notifications</span>
                    </div>
                    {otherNotifications.slice(0, 3).map((n, index) => (
                      <div 
                        key={n._id} 
                        className={`${styles.notificationItem} ${!n.read ? styles.unread : ""}`}
                        onClick={() => handleNotificationClick(n)}
                      >
                        <div className={styles.notificationIcon}>
                          <FaBell />
                        </div>
                        <div className={styles.notificationContent}>
                          <p className={styles.notificationMessage}>{n.message}</p>
                          <div className={styles.notificationMeta}>
                            <span className={styles.metaItem}>
                              <FaClock /> {getTimeAgo(n.createdAt)}
                            </span>
                          </div>
                        </div>
                        {!n.read && <span className={styles.unreadDot}></span>}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {data.length > 0 && (
            <div className={styles.dropdownFooter}>
              <button className={styles.viewAllBtn} onClick={handleViewAll}>
                <FaUserGraduate /> View All Admissions
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
