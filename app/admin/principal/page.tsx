"use client"

import { useEffect, useState } from "react"
import styles from "@/app/styles/principal.module.css"
import { FaUserTie, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa"

export default function Principal() {

  const [principal, setPrincipal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchPrincipal()
  }, [])

  async function fetchPrincipal() {
    try {
      const res = await fetch("/api/principal")
      const data = await res.json()
      setPrincipal(data[0] || null)
    } catch (error) {
      console.error("Error fetching principal:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      await fetch("/api/principal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      setForm({
        name: "",
        email: "",
        password: "",
        phone: ""
      })

      fetchPrincipal()
    } catch (error) {
      console.error("Error saving principal:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaUserTie style={{ marginRight: 12, color: "#f59e0b" }} />
          Principal Management
        </h1>
      </div>

      {!principal && !loading && (
        <div className={styles.formWrapper}>
          <h3 className={styles.formTitle}>Add New Principal</h3>
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
            <button type="submit" disabled={saving}>
              {saving ? "Adding..." : "+ Add Principal"}
            </button>
          </form>
        </div>
      )}

      {loading && (
        <div className={styles.formWrapper}>
          <p>Loading...</p>
        </div>
      )}

      {principal && (
        <div className={styles.principalCard}>
          <div className={styles.principalAvatar}>
            {principal.name ? principal.name.charAt(0).toUpperCase() : "P"}
          </div>

          <h3>{principal.name || "Principal"}</h3>
          <p className={styles.email}>
            <FaEnvelope style={{ marginRight: 8, fontSize: 14 }} />
            {principal.email || "N/A"}
          </p>
          <p className={styles.phone}>
            <FaPhone style={{ marginRight: 8, fontSize: 14 }} />
            {principal.phone || "N/A"}
          </p>

          <div className={styles.principalInfo}>
            <div className={styles.principalInfoItem}>
              <span>Role</span>
              <span>School Principal</span>
            </div>
            <div className={styles.principalInfoItem}>
              <span>Status</span>
              <span style={{ color: "#22c55e" }}>Active</span>
            </div>
          </div>

          <button className={styles.editBtn}>
            <FaEdit />
            Edit Principal
          </button>
        </div>
      )}
    </div>
  )
}
