"use client";

import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";

export default function TeacherDashboard(){

 const {logout,loading} = useLogout();

 return(

  <div>

   <div className={styles.header}>

    <h1 className={styles.title}>
     Teacher Dashboard
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
     My Classes
    </div>

    <div className={styles.card}>
     Attendance
    </div>

    <div className={styles.card}>
     Assignments
    </div>

   </div>

  </div>

 );
}