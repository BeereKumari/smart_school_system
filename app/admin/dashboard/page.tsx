"use client";

import { useEffect, useState } from "react";
import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";
import NotificationBell from "@/app/components/admin/NotificationBell";
import DashboardCards from "./components/DashboardCards";
import QuickActions from "./components/QuickActions";
import Overview from "./components/Overview";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Parents from "./components/Parents";
import Attendance from "./components/Attendance";
import Announcements from "@/app/components/admin/Announcements";
import { FaHome, FaSignOutAlt, FaCalendarAlt, FaClock, FaBook } from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  const { logout, loading } = useLogout();
  type TabType = "Overview" | "Teachers" | "Students" | "Attendance" | "Marks" | "Parents" | "Announcements";
  const tabs: TabType[] = ["Overview", "Teachers", "Students", "Attendance", "Marks", "Parents", "Announcements"];
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime ? currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "";
//  comment
  const formattedTime = currentTime ? currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }) : "";

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.breadcrumb}>
            <FaHome className={styles.breadcrumbIcon} />
            <span>Admin Dashboard</span>
          </div>
          <h1 className={styles.title}>Welcome Back, Administrator</h1>
          <p className={styles.subtitle}>Here's what's happening at Smart School today.</p>
        </div>

        <div className={styles.headerRight}>
          {mounted && currentTime && (
            <div className={styles.dateTimeBox}>
              <div className={styles.dateBox}>
                <FaCalendarAlt className={styles.dateIcon} />
                <span>{formattedDate}</span>
              </div>
              <div className={styles.timeBox}>
                <FaClock className={styles.timeIcon} />
                <span>{formattedTime}</span>
              </div>
            </div>
          )}

          <div className={styles.notificationWrapper}>
            <NotificationBell />
          </div>

          <button 
            className={styles.logoutBtn} 
            onClick={logout}
            disabled={loading}
          >
            <FaSignOutAlt />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </header>

      <div className={styles.tabsContainer}>
        {tabs.map((tab: TabType, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab)}
            className={
              activeTab === tab
                ? `${styles.tabBtn} ${styles.activeTab}`
                : styles.tabBtn
            }
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === "Overview" && (
          <>
            <DashboardCards />
            <QuickActions />
            <Overview />
          </>
        )}

        {activeTab === "Students" && (
          <div className={styles.sectionFade}>
            <Students />
          </div>
        )}

        {activeTab === "Attendance" && (
          <div className={styles.sectionFade}>
            <Attendance />
          </div>
        )}

        {activeTab === "Marks" && (
          <div className={styles.sectionFade}>
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <FaBook style={{ fontSize: '48px', color: '#f59e0b', marginBottom: '16px' }} />
              <h2 style={{ margin: '0 0 12px 0', color: '#1e3a5f' }}>Marks Management</h2>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>View and manage student examination marks</p>
              <Link 
                href="/admin/marks" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
              >
                <FaBook /> Open Marks Management
              </Link>
            </div>
          </div>
        )}

        {activeTab === "Teachers" && (
          <div className={styles.sectionFade}>
            <Teachers />
          </div>
        )}

        {activeTab === "Parents" && (
          <div className={styles.sectionFade}>
            <Parents />
          </div>
        )}

        {activeTab === "Announcements" && (
          <div className={styles.sectionFade}>
            <Announcements />
          </div>
        )}
      </div>
    </div>
  );
}
