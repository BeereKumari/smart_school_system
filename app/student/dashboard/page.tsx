"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";
import Link from "next/link";
import { FaBook, FaClipboardCheck, FaFileAlt, FaBookReader } from "react-icons/fa";

interface MarksData {
  subject: string;
  examName: string;
  term: string;
  marks: number;
  maxMarks: number;
  grade?: string;
}

export default function StudentDashboard() {
  const { logout, loading } = useLogout();
  const [recentMarks, setRecentMarks] = useState<MarksData[]>([]);
  const [loadingMarks, setLoadingMarks] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await fetch("/api/students/marks", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          const marksArray = data.marks || [];
          setRecentMarks(marksArray.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching marks:", error);
      } finally {
        setLoadingMarks(false);
      }
    };
    fetchMarks();
  }, []);

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 75) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const getGradeColor = (grade: string): string => {
    const colors: Record<string, string> = {
      "A+": "#22c55e",
      "A": "#84cc16",
      "B+": "#eab308",
      "B": "#f97316",
      "C": "#f59e0b",
      "D": "#ef4444",
      "F": "#dc2626",
    };
    return colors[grade] || "#6b7280";
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Student Dashboard</h1>
        <button className={styles.logoutBtn} onClick={logout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

      <div className={styles.cards}>
        <Link href="/student/subjects" className={styles.cardLink}>
          <div className={styles.card}>
            <FaBookReader className={styles.cardIcon} />
            <h3>My Subjects</h3>
            <p>View your enrolled subjects</p>
          </div>
        </Link>

        <Link href="/student/assignments" className={styles.cardLink}>
          <div className={styles.card}>
            <FaFileAlt className={styles.cardIcon} />
            <h3>Assignments</h3>
            <p>View and submit assignments</p>
          </div>
        </Link>

        <Link href="/student/attendance" className={styles.cardLink}>
          <div className={styles.card}>
            <FaClipboardCheck className={styles.cardIcon} />
            <h3>Attendance</h3>
            <p>View your attendance record</p>
          </div>
        </Link>

        <Link href="/student/marks" className={styles.cardLink}>
          <div className={styles.card}>
            <FaBook className={styles.cardIcon} />
            <h3>My Marks</h3>
            <p>View your academic performance</p>
          </div>
        </Link>
      </div>

      <div className={styles.marksSection}>
        <div className={styles.marksSectionHeader}>
          <h2><FaBook /> Recent Marks</h2>
          <Link href="/student/marks" className={styles.viewAllLink}>
            View All →
          </Link>
        </div>
        
        {loadingMarks ? (
          <div className={styles.loadingState}>Loading marks...</div>
        ) : recentMarks.length > 0 ? (
          <div className={styles.marksTable}>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Exam</th>
                  <th>Term</th>
                  <th>Marks</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {recentMarks.map((mark, index) => {
                  const percentage = Math.round((mark.marks / mark.maxMarks) * 100);
                  const grade = getGrade(percentage);
                  return (
                    <tr key={index}>
                      <td>{mark.subject}</td>
                      <td>{mark.examName}</td>
                      <td>{mark.term}</td>
                      <td>{mark.marks}/{mark.maxMarks}</td>
                      <td>{percentage}%</td>
                      <td>
                        <span 
                          className={styles.gradeBadge}
                          style={{ backgroundColor: getGradeColor(grade) }}
                        >
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>No marks available yet. Your marks will appear here once your teachers add them.</p>
          </div>
        )}
      </div>
    </div>
  );
}
