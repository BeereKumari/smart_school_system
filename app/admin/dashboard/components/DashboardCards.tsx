import StatsCard from "@/app/components/admin/StatsCard";
import styles from "@/app/styles/Dashboard.module.css";

import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaSchool } from "react-icons/fa";

export default function DashboardCards() {
  return (
    <div className={styles.cards}>
      <StatsCard 
        title="Total Students" 
        value="1200" 
        icon={<FaUserGraduate />} 
        className={styles.cardPrimary} 
      />

      <StatsCard 
        title="Teachers" 
        value="45" 
        icon={<FaChalkboardTeacher />} 
        className={styles.cardSecondary} 
      />

      <StatsCard 
        title="Parents" 
        value="300" 
        icon={<FaUsers />} 
        className={styles.cardAccent} 
      />

      <StatsCard 
        title="Classes" 
        value="30" 
        icon={<FaSchool />} 
        className={styles.cardLight} 
      />
    </div>
  );
}