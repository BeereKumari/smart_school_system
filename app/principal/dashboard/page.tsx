"use client";

import styles from "@/app/styles/Dashboard.module.css";
import useLogout from "@/app/hooks/useLogout";

export default function PrincipalDashboard(){

 const {logout,loading} = useLogout();

 return(

  <div>

   <div className={styles.header}>

    <h1 className={styles.title}>
     Principal Dashboard
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
     School Overview
    </div>

    <div className={styles.card}>
     Staff Reports
    </div>

    <div className={styles.card}>
     Academic Performance
    </div>

   </div>

  </div>

 );
}