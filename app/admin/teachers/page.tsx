"use client"

import { useState, useEffect } from "react"
import styles from "@/app/styles/Teachers.module.css"
import { FaChalkboardTeacher, FaUserEdit, FaTrash, FaEye } from "react-icons/fa"

export default function Teachers() {

  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subject: ""
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchTeachers()
  }, [])

  async function fetchTeachers() {
    try {
      const res = await fetch("/api/teachers")
      const data = await res.json()
      setTeachers(data)
    } catch (error) {
      console.error("Error fetching teachers:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        subject: ""
      })

      fetchTeachers()
    } catch (error) {
      console.error("Error adding teacher:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaChalkboardTeacher style={{ marginRight: 12, color: "#f59e0b" }} />
          Teacher Management
        </h1>
      </div>

      <div className={styles.formWrapper}>
        <h3 className={styles.formTitle}>Add New Teacher</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            placeholder="Full Name" 
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input 
            placeholder="Email Address" 
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input 
            placeholder="Password" 
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <input 
            placeholder="Phone Number" 
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input 
            placeholder="Subject Specialization" 
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "+ Add Teacher"}
          </button>
        </form>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <p>Loading teachers...</p>
        </div>
      ) : teachers.length === 0 ? (
        <div className={styles.emptyState}>
          <FaChalkboardTeacher className={styles.emptyIcon} />
          <p>No teachers found</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((t: any) => (
                <tr key={t._id}>
                  <td>
                    <span className={styles.teacherId}>{t.teacherId || "N/A"}</span>
                  </td>
                  <td>{t.name || "N/A"}</td>
                  <td>{t.email || "N/A"}</td>
                  <td>{t.phone || "N/A"}</td>
                  <td>
                    <span className={styles.subject}>{t.subject || "N/A"}</span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View">
                        <FaEye />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit">
                        <FaUserEdit />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
