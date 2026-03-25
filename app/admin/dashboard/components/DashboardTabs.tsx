"use client";

import { useEffect, useState } from "react";
import StatsCard from "@/app/components/admin/StatsCard";
import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";
import NotificationBell from "@/app/components/admin/NotificationBell";

// ✅ Import tab components
import Overview from "./Overview";
import Students from "./Students";
import Teachers from "./Teachers";
import Parents from "./Parents";

export default function AdminDashboard() {
  const { logout, loading } = useLogout();

  // ✅ NOTIFICATIONS STATE (kept for bell usage if needed later)
  const [notifications, setNotifications] = useState<any[]>([]);

  // ✅ TAB STATE
  const [activeTab, setActiveTab] = useState("Overview");

  // ✅ FETCH NOTIFICATIONS
  useEffect(() => {
    fetch("/api/notifications?userType=admin")
      .then((res) => res.json())
      .then(setNotifications);
  }, []);

  const tabs = ["Overview", "Teachers", "Students", "Parents"];

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* 🔔 NOTIFICATION BELL */}
          <NotificationBell />

          {/* LOGOUT BUTTON */}
          <button className={styles.logoutBtn} onClick={logout}>
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          background: "#fff",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
              background:
                activeTab === tab ? "#0d9488" : "transparent",
              color: activeTab === tab ? "#fff" : "#555",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab)
                e.currentTarget.style.background = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab)
                e.currentTarget.style.background = "transparent";
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= OVERVIEW CARDS ================= */}
      {activeTab === "Overview" && (
        <>
          <div className={styles.cards}>
            <StatsCard title="Total Students" value="1200" />
            <StatsCard title="Teachers" value="45" />
            <StatsCard title="Parents" value="300" />
            <StatsCard title="Classes" value="30" />
          </div>

          {/* Extra Overview Section */}
          <div style={{ marginTop: "20px" }}>
            <Overview />
          </div>
        </>
      )}

      {/* ================= OTHER SECTIONS ================= */}
      {activeTab === "Students" && <Students />}
      {activeTab === "Teachers" && <Teachers />}
      {activeTab === "Parents" && <Parents />}
    </div>
  );
}