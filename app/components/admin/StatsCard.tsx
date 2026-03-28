import styles from "@/app/styles/Dashboard.module.css";
import { ReactNode } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

type Props = {
  title: string;
  value: string;
  className?: string;
  icon?: ReactNode;
  trend?: string;
  trendUp?: boolean;
};

export default function StatsCard({ title, value, className, icon, trend, trendUp }: Props) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          {icon}
        </div>
        {trend && (
          <div className={`${styles.cardTrend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
            {trendUp ? <FaArrowUp /> : <FaArrowDown />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardValue}>{value}</p>
    </div>
  );
}
