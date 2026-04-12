"use client";

import { useEffect, useState } from "react";
import styles from "@/app/styles/DashboardTab.module.css";
import { FaUsers, FaUserEdit, FaTrash, FaEye, FaTimes, FaSave, FaCheck, FaExclamationTriangle, FaUserPlus } from "react-icons/fa";

export default function Parents() {
  const [parents, setParents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedParent, setSelectedParent] = useState<any>(null);
  const [editParent, setEditParent] = useState<any>(null);
  const [deleteParent, setDeleteParent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ show: boolean; text: string; type: "success" | "error" }>({ show: false, text: "", type: "success" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: ""
  });

  useEffect(() => {
    fetchParents();
  }, []);

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage({ show: true, text, type });
    setTimeout(() => setMessage({ show: false, text: "", type: "success" }), 4000);
  }

  async function fetchParents() {
    try {
      const res = await fetch("/api/parents");
      const data = await res.json();
      setParents(data);
    } catch (error) {
      console.error("Error fetching parents:", error);
      showMessage("Failed to load parents", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/parents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add parent");
      
      setParents(prev => [data, ...prev]);
      setForm({ name: "", email: "", phone: "", studentId: "" });
      setShowForm(false);
      showMessage(`Parent "${data.name}" added successfully`, "success");
    } catch (error: any) {
      showMessage(error.message || "Failed to add parent", "error");
    }
    setSaving(false);
  }

  const filtered = parents.filter((p: any) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (parent: any) => {
    setEditParent(parent);
    setForm({
      name: parent.name || "",
      email: parent.email || "",
      phone: parent.phone || "",
      studentId: parent.studentId || ""
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editParent || !editParent._id) {
      showMessage("Invalid parent data", "error");
      return;
    }
    
    const parentId = String(editParent._id);
    
    setSaving(true);
    try {
      const res = await fetch(`/api/parents/${parentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update parent");
      
      setParents(prev => prev.map(p => String(p._id) === parentId ? data : p));
      setEditParent(null);
      showMessage(`Parent "${data.name}" updated successfully`, "success");
    } catch (error: any) {
      showMessage(error.message || "Failed to update parent", "error");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteParent || !deleteParent._id) return;
    
    const parentId = String(deleteParent._id);
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/parents/${parentId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete parent");
      
      setParents(prev => prev.filter(p => String(p._id) !== parentId));
      setDeleteParent(null);
      showMessage(`Parent "${deleteParent.name}" deleted successfully`, "success");
    } catch (error: any) {
      showMessage(error.message || "Failed to delete parent", "error");
    }
    setDeleting(false);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaUsers />
          Parent Management
        </h1>
      </div>

      {message.show && (
        <div className={`${styles.toast} ${styles[message.type]}`}>
          {message.type === "success" ? <FaCheck /> : <FaExclamationTriangle />}
          <span>{message.text}</span>
          <button className={styles.toastClose} onClick={() => setMessage({ show: false, text: "", type: "success" })}>
            <FaTimes />
          </button>
        </div>
      )}

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><FaUsers /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Total Parents</p>
            <p className={styles.statValue}>{parents.length}</p>
          </div>
        </div>
      </div>

      <div className={styles.searchFilterRow}>
        <input
          type="text"
          placeholder="Search by name or email..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of <strong>{parents.length}</strong> parents
        </span>
      </div>

      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '480px' }}>
            <div className={styles.formHeader}>
              <h2>Add New Parent</h2>
              <button className={styles.closeIcon} onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Parent Name *</label>
                  <input type="text" className={styles.formInput} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Enter parent name" />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Email Address *</label>
                  <input type="email" className={styles.formInput} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="Enter email address" />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Phone Number *</label>
                  <input type="tel" className={styles.formInput} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="Enter phone number" />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Student ID</label>
                  <input type="text" className={styles.formInput} value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} placeholder="Enter student ID" />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}><FaTimes /> Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}><FaUserPlus /> {saving ? "Adding..." : "Add Parent"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading parents...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <FaUsers />
          <h3>No Parents Found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Parent</th>
                <th>ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Student ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p._id}>
                  <td>
                    <div className={styles.studentCell}>
                      <div className={styles.studentPhotoPlaceholder} style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>{getInitials(p.name)}</div>
                      <div>
                        <div className={styles.studentName}>{p.name}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.studentId}>{p._id?.slice(-6) || "N/A"}</span></td>
                  <td>{p.email || "N/A"}</td>
                  <td>{p.phone || "N/A"}</td>
                  <td>{p.studentId || "N/A"}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View" onClick={() => setSelectedParent(p)}><FaEye /></button>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit" onClick={() => handleEdit(p)}><FaUserEdit /></button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete" onClick={() => setDeleteParent(p)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedParent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedParent(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.formHeader}>
              <h2>Parent Details</h2>
              <button className={styles.closeIcon} onClick={() => setSelectedParent(null)}>✕</button>
            </div>
            <div className={styles.modalProfile}>
              <div className={styles.modalPhotoWrapper}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white', fontSize: '36px', fontWeight: 700, borderRadius: '50%' }}>
                  {getInitials(selectedParent.name)}
                </div>
              </div>
              <h3 className={styles.modalStudentName}>{selectedParent.name}</h3>
            </div>
            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Contact Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}><span>Email</span><p>{selectedParent.email || "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Phone</span><p>{selectedParent.phone || "N/A"}</p></div>
              </div>
            </div>
            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Student Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}><span>Student ID</span><p>{selectedParent.studentId || "N/A"}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editParent && (
        <div className={styles.modalOverlay} onClick={() => setEditParent(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '540px' }}>
            <div className={styles.formHeader}>
              <h2>Edit Parent</h2>
              <button className={styles.closeIcon} onClick={() => setEditParent(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Parent Name *</label>
                  <input type="text" className={styles.formInput} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Enter parent name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input type="email" className={styles.formInput} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="Enter email address" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input type="tel" className={styles.formInput} value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="Enter phone number" />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Student ID</label>
                  <input type="text" className={styles.formInput} value={form.studentId} onChange={(e) => setForm({...form, studentId: e.target.value})} placeholder="Enter student ID" />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setEditParent(null)}><FaTimes /> Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}><FaSave /> {saving ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteParent && (
        <div className={styles.modalOverlay} onClick={() => setDeleteParent(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '420px' }}>
            <div className={styles.formHeader}>
              <h2>Delete Parent</h2>
              <button className={styles.closeIcon} onClick={() => setDeleteParent(null)}>✕</button>
            </div>
            <div className={styles.deleteContent}>
              <div className={styles.deleteIcon}><FaExclamationTriangle /></div>
              <h3 className={styles.deleteTitle}>Are you sure?</h3>
              <p className={styles.deleteText}>You are about to delete <strong>"{deleteParent.name}"</strong> from the database. This action cannot be undone.</p>
            </div>
            <div className={styles.deleteActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteParent(null)}><FaTimes /> Cancel</button>
              <button className={styles.deleteBtnConfirm} onClick={handleDelete} disabled={deleting}><FaTrash /> {deleting ? "Deleting..." : "Delete Parent"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
