import styles from "@/app/styles/Dashboard.module.css";
import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  className?: string;
  icon?: ReactNode; // ✅ NEW
};

export default function StatsCard({ title, value, className, icon }: Props) {
  return (
    <div className={`${styles.card} ${className}`}>
      
      {/* ICON */}
      <div className={styles.cardIcon}>
        {icon}
      </div>

      {/* TEXT */}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardValue}>{value}</p>

    </div>
  );
}