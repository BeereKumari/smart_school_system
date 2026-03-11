"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/AdminAdmissions.module.css";

export default function AdminAdmissions() {

  const [admissions, setAdmissions] = useState<any[]>([]);

  useEffect(() => {
    loadAdmissions();
  }, []);

  async function loadAdmissions() {

    const res = await fetch("/api/admission");

    const data = await res.json();

    console.log("Admissions Data:", data);

    setAdmissions(data);
  }

  async function approve(id:string){

    await fetch(`/api/admission/approve/${id}`,{
      method:"POST"
    });

    loadAdmissions();

  }

  return (

    <div className={styles.container}>

      <h1 className={styles.title}>Admission Requests</h1>

      <table className={styles.table}>

        <thead>
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {admissions.length === 0 ? (

            <tr>
              <td colSpan={5} style={{textAlign:"center"}}>
                No admission requests found
              </td>
            </tr>

          ) : (

            admissions.map((a)=>(
              <tr key={a._id}>

                <td>{a.studentName}</td>
                <td>{a.classApplying}</td>
                <td>{a.email}</td>
                <td>{a.status}</td>

                <td>

                  {a.status === "pending" && (
                    <button
                      className={styles.approveBtn}
                      onClick={()=>approve(a._id)}
                    >
                      Approve
                    </button>
                  )}

                </td>

              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}