import styles from "@/app/styles/Dashboard.module.css";

export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div className={styles.card}>

      <h3>{title}</h3>

      <p>{value}</p>

    </div>

  );

}