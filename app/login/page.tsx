import Link from "next/link";
import styles from "../styles/loginSelect.module.css";

import { FaUserShield } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export default function LoginPortal() {

  return (

    <div className={styles.container}>

      <div className={styles.header}>
        <h1>Smart School Portal</h1>
        <p>Select your role to continue</p>
      </div>

      <div className={styles.grid}>

        <Link href="/login/admin" className={styles.card}>
          <FaUserShield className={styles.icon}/>
          <h3>Admin</h3>
          <p>School Administration</p>
        </Link>

        <Link href="/login/principal" className={styles.card}>
          <FaUserTie className={styles.icon}/>
          <h3>Principal</h3>
          <p>School Management</p>
        </Link>

        <Link href="/login/teacher" className={styles.card}>
          <FaChalkboardTeacher className={styles.icon}/>
          <h3>Teacher</h3>
          <p>Academic Staff</p>
        </Link>

        <Link href="/login/student" className={styles.card}>
          <FaBookReader className={styles.icon}/>
          <h3>Student</h3>
          <p>Student Portal</p>
        </Link>

        <Link href="/login/parent" className={styles.card}>
          <FaUsers className={styles.icon}/>
          <h3>Parent</h3>
          <p>Parent Dashboard</p>
        </Link>

      </div>

    </div>

  )
}