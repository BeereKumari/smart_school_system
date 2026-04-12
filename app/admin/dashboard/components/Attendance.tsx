"use client"

import { useEffect, useState } from "react"
import { FaUserGraduate, FaCalendar, FaCheck, FaTimes, FaClock, FaSearch } from "react-icons/fa"
import styles from "@/app/styles/Overview.module.css"

interface AttendanceRecord {
  _id: string
  studentId: string
  studentName: string
  class: string
  date: string
  status: "present" | "absent" | "late"
}

export default function Attendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchAttendance()
  }, [])

  const fetchAttendance = async () => {
    try {
      const res = await fetch("/api/attendance")
      if (res.ok) {
        const data = await res.json()
        setAttendance(data)
      }
    } catch (error) {
      console.error("Error fetching attendance:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAttendance = attendance.filter((record) =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <FaCheck style={{ color: "#22c55e" }} />
      case "absent": return <FaTimes style={{ color: "#ef4444" }} />
      case "late": return <span style={{ color: "#f59e0b", fontWeight: "bold" }}>L</span>
      default: return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Student Attendance</h2>
          <div style={{ position: "relative" }}>
            <FaSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "8px 12px 8px 36px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "14px", width: "200px" }}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <p>Loading attendance records...</p>
          </div>
        ) : filteredAttendance.length === 0 ? (
          <div className={styles.emptyState}>
            <FaUserGraduate className={styles.emptyIcon} />
            <p>No attendance records found</p>
          </div>
        ) : (
          <div className={styles.admissionList}>
            {filteredAttendance.map((record, index) => (
              <div 
                key={record._id} 
                className={styles.admissionCard}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={styles.admissionIcon}>
                  <FaUserGraduate />
                </div>
                <div className={styles.admissionInfo}>
                  <h3>{record.studentName}</h3>
                  <p>ID: {record.studentId} | Class: {record.class}</p>
                </div>
                <div className={styles.admissionMeta}>
                  <span className={styles.date}>
                    <FaCalendar /> {new Date(record.date).toLocaleDateString()}
                  </span>
                  <span className={`${styles.status} ${styles[record.status]}`}>
                    <FaClock /> {getStatusIcon(record.status)} {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
