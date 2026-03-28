"use client"

import { useEffect, useState } from "react"
import StatsCard from "@/app/components/admin/StatsCard";
import styles from "@/app/styles/Dashboard.module.css";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaSchool, FaClipboardList } from "react-icons/fa";

interface Stats {
  students: number;
  teachers: number;
  parents: number;
  classes: number;
  pendingAdmissions: number;
}

export default function DashboardCards() {
  const [stats, setStats] = useState<Stats>({
    students: 0,
    teachers: 0,
    parents: 0,
    classes: 0,
    pendingAdmissions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.cards}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.cardSkeleton}>
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonValue}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.cards}>
      <StatsCard 
        title="Total Students" 
        value={stats.students.toString()} 
        icon={<FaUserGraduate />}
        trend="+12% from last month"
        trendUp={true}
      />

      <StatsCard 
        title="Teachers" 
        value={stats.teachers.toString()} 
        icon={<FaChalkboardTeacher />}
        trend="All active"
        trendUp={true}
      />

      <StatsCard 
        title="Parents" 
        value={stats.parents.toString()} 
        icon={<FaUsers />}
        trend="Connected"
        trendUp={true}
      />

      <StatsCard 
        title="Classes" 
        value={stats.classes.toString()} 
        icon={<FaSchool />}
        trend={`${stats.pendingAdmissions} pending`}
        trendUp={stats.pendingAdmissions > 0}
      />
    </div>
  );
}
