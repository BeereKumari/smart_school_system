import Link from "next/link";
import styles from "../styles/loginSelect.module.css";
import { FaUserShield, FaUserTie, FaChalkboardTeacher, FaBookReader, FaUsers, FaSchool, FaShieldAlt } from "react-icons/fa";

export default function LoginPortal() {
  return (
    <div className={styles.container}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgPattern}></div>
      <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>

      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <FaSchool className={styles.logoIcon} />
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <h1>Smart <span>School</span> Portal</h1>
        </div>
        <div className={styles.decorativeLine}></div>
        <p className={styles.subtitle}>Select your role to access your personalized dashboard</p>
      </div>

      <div className={styles.grid}>
        <Link href="/login/admin" className={styles.card}>
          <div className={styles.iconWrapper}>
            <FaUserShield className={styles.icon} />
          </div>
          <h3>Admin</h3>
          <p>School Administration</p>
        </Link>

        <Link href="/login/principal" className={styles.card}>
          <div className={styles.iconWrapper}>
            <FaUserTie className={styles.icon} />
          </div>
          <h3>Principal</h3>
          <p>School Management</p>
        </Link>

        <Link href="/login/teacher" className={styles.card}>
          <div className={styles.iconWrapper}>
            <FaChalkboardTeacher className={styles.icon} />
          </div>
          <h3>Teacher</h3>
          <p>Academic Staff</p>
        </Link>

        <Link href="/login/student" className={styles.card}>
          <div className={styles.iconWrapper}>
            <FaBookReader className={styles.icon} />
          </div>
          <h3>Student</h3>
          <p>Student Portal</p>
        </Link>

        <Link href="/login/parent" className={styles.card}>
          <div className={styles.iconWrapper}>
            <FaUsers className={styles.icon} />
          </div>
          <h3>Parent</h3>
          <p>Parent Dashboard</p>
        </Link>
      </div>

      <div className={styles.footer}>
        <p>Secure Login Portal | <a href="/">Back to Home</a></p>
      </div>
    </div>
  );
}
