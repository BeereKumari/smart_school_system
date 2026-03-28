"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaUserGraduate, FaClock, FaArrowRight, FaCheck, FaTimes } from "react-icons/fa"
import styles from "@/app/styles/Overview.module.css"

interface RecentAdmission {
  _id: string
  studentName: string
  classApplying: string
  status: string
  createdAt: string
}

export default function Overview() {
  const [recentAdmissions, setRecentAdmissions] = useState<RecentAdmission[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchRecentAdmissions()
  }, [])

  const fetchRecentAdmissions = async () => {
    try {
      const res = await fetch("/api/admission")
      const data = await res.json()
      setRecentAdmissions(data.slice(0, 5))
    } catch (error) {
      console.error("Error fetching recent admissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Admission Requests</h2>
          <button className={styles.viewAllBtn} onClick={() => router.push("/admin/admissions")}>
            View All <FaArrowRight />
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <p>Loading recent admissions...</p>
          </div>
        ) : recentAdmissions.length === 0 ? (
          <div className={styles.emptyState}>
            <FaUserGraduate className={styles.emptyIcon} />
            <p>No recent admission requests</p>
          </div>
        ) : (
          <div className={styles.admissionList}>
            {recentAdmissions.map((admission, index) => (
              <div 
                key={admission._id} 
                className={styles.admissionCard}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => router.push("/admin/admissions")}
              >
                <div className={styles.admissionIcon}>
                  <FaUserGraduate />
                </div>
                <div className={styles.admissionInfo}>
                  <h3>{admission.studentName}</h3>
                  <p>Class: {admission.classApplying}</p>
                </div>
                <div className={styles.admissionMeta}>
                  <span className={`${styles.status} ${styles[admission.status]}`}>
                    {admission.status === "pending" && <FaClock />}
                    {admission.status === "approved" && <FaCheck />}
                    {admission.status === "declined" && <FaTimes />}
                    {admission.status}
                  </span>
                  <span className={styles.time}>
                    <FaClock /> {getTimeAgo(admission.createdAt)}
                  </span>
                </div>
                <div className={styles.arrow}>
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
