"use client";

import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";

export default function StudentDashboard(){

 const {logout,loading} = useLogout();

 return(

  <div>

   <div className={styles.header}>

    <h1 className={styles.title}>
     Student Dashboard
    </h1>

    <button
     className={styles.logoutBtn}
     onClick={logout}
    >
     {loading ? "Logging out..." : "Logout"}
    </button>

   </div>

   <div className={styles.cards}>

    <div className={styles.card}>
     My Subjects
    </div>

    <div className={styles.card}>
     Assignments
    </div>

    <div className={styles.card}>
     Attendance
    </div>

   </div>

  </div>

 );
}