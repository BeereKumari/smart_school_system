"use client";

import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";

export default function ParentDashboard(){

 const {logout,loading} = useLogout();

 return(

  <div>

   <div className={styles.header}>

    <h1 className={styles.title}>
     Parent Dashboard
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
     Child Performance
    </div>

    <div className={styles.card}>
     Attendance Report
    </div>

    <div className={styles.card}>
     School Notices
    </div>

   </div>

  </div>

 );
}