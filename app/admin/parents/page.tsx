"use client"

import { useEffect, useState } from "react"
import styles from "@/app/styles/parents.module.css"
import { FaUserPlus, FaSearch, FaUserEdit, FaTrash, FaEye, FaUsers } from "react-icons/fa"

export default function Parents() {
  const [parents, setParents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: ""
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchParents()
  }, [])

  async function fetchParents() {
    try {
      const res = await fetch("/api/parents")
      const data = await res.json()
      setParents(data)
    } catch (error) {
      console.error("Error fetching parents:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      await fetch("/api/parents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      setForm({
        name: "",
        email: "",
        phone: "",
        studentId: ""
      })
      setShowForm(false)
      fetchParents()
    } catch (error) {
      console.error("Error adding parent:", error)
    } finally {
      setSaving(false)
    }
  }

  const filtered = parents.filter((p: any) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.email || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaUsers style={{ marginRight: 12, color: "#f59e0b" }} />
          Parent Management
        </h1>
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          <FaUserPlus style={{ marginRight: 8 }} />
          Add Parent
        </button>
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search by name or email..."
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className={styles.formOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.formTitle}>Add New Parent</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Parent Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Student ID"
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              />
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={saving}>
                  {saving ? "Adding..." : "Add Parent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <p>Loading parents...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <FaUsers className={styles.emptyIcon} />
          <p>No parents found</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Student ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p._id}>
                  <td><span className={styles.parentId}>{p._id.slice(-6)}</span></td>
                  <td>{p.name || "N/A"}</td>
                  <td>{p.email || "N/A"}</td>
                  <td>{p.phone || "N/A"}</td>
                  <td>{p.studentId || "N/A"}</td>
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
