"use client";

import { useRouter } from "next/navigation";
import StatsCard from "@/app/components/admin/StatsCard";
import styles from "@/app/styles/Dashboard.module.css";

export default function AdminDashboard() {

  const router = useRouter();

  async function handleLogout() {

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");

  }

  return (

    <div>

      {/* HEADER */}

      <div className={styles.header}>

        <h1 className={styles.title}>Admin Dashboard</h1>

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* DASHBOARD CARDS */}

      <div className={styles.cards}>

        <StatsCard title="Total Students" value="1200" />

        <StatsCard title="Teachers" value="45" />

        <StatsCard title="Pending Admissions" value="12" />

        <StatsCard title="Classes" value="30" />

      </div>

    </div>

  );

}