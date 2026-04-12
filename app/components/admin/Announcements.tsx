"use client"

import { useEffect, useState } from "react"
import { FaBullhorn, FaCalendar, FaUser, FaBell } from "react-icons/fa"
import styles from "@/app/styles/Overview.module.css"

interface Announcement {
  _id: string
  title: string
  message: string
  priority: "low" | "medium" | "high"
  createdAt: string
  createdBy: string
  expiresAt?: string
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/announcements")
      if (res.ok) {
        const data = await res.json()
        setAnnouncements(data)
      }
    } catch (error) {
      console.error("Error fetching announcements:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "#ef4444"
      case "medium": return "#f59e0b"
      case "low": return "#22c55e"
      default: return "#64748b"
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>School Announcements</h2>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <p>Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className={styles.emptyState}>
            <FaBullhorn className={styles.emptyIcon} />
            <p>No announcements at this time</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {announcements.map((announcement, index) => (
              <div
                key={announcement._id}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  animation: `fadeIn 0.3s ease ${index * 100}ms both`
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${getPriorityColor(announcement.priority)}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaBullhorn style={{ color: getPriorityColor(announcement.priority) }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, color: "#1e3a5f", fontSize: "16px" }}>{announcement.title}</h3>
                    <span style={{
                      fontSize: "12px",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: `${getPriorityColor(announcement.priority)}15`,
                      color: getPriorityColor(announcement.priority),
                      fontWeight: "600"
                    }}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p style={{ color: "#64748b", marginBottom: "12px", lineHeight: "1.6" }}>{announcement.message}</p>
                <div style={{ display: "flex", gap: "20px", fontSize: "13px", color: "#94a3b8" }}>
                  <span><FaUser /> {announcement.createdBy}</span>
                  <span><FaCalendar /> {new Date(announcement.createdAt).toLocaleDateString()}</span>
                  {announcement.expiresAt && (
                    <span><FaBell /> Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
