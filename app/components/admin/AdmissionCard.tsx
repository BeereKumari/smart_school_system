"use client"

import styles from "./AdmissionCard.module.css"
import { useState } from "react"

type Props = {
  admission: any
  onApprove: (id: string) => void
}

export default function AdmissionCard({ admission, onApprove }: Props) {

  const [approved, setApproved] = useState(admission.status === "approved")

  const handleApprove = () => {
    onApprove(admission._id)
    setApproved(true)
  }

  return (

    <div className={styles.card}>

      <div className={styles.header}>
        <h2>{admission.name}</h2>
        <span className={styles.classTag}>
          Class {admission.class}
        </span>
      </div>

      <div className={styles.details}>

        <p><strong>Email:</strong> {admission.email}</p>
        <p><strong>Phone:</strong> {admission.phone}</p>
        <p><strong>Address:</strong> {admission.address}</p>

        <p className={styles.date}>
          Applied on {new Date(admission.createdAt).toDateString()}
        </p>

      </div>

      <div className={styles.actions}>

        {approved ? (

          <button className={styles.approvedBtn}>
            ✔ Approved
          </button>

        ) : (

          <button
            className={styles.approveBtn}
            onClick={handleApprove}
          >
            Approve Admission
          </button>

        )}

      </div>

    </div>

  )
}