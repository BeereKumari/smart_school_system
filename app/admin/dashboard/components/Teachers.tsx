"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/DashboardTab.module.css";
import { FaChalkboardTeacher, FaUserEdit, FaTrash, FaEye, FaTimes, FaSave, FaCheck, FaExclamationTriangle, FaSearch, FaBook, FaPlus, FaMinus } from "react-icons/fa";

interface ClassAssignment {
  className: string;
  subject: string;
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [editTeacher, setEditTeacher] = useState<any>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{ show: boolean; text: string; type: "success" | "error" }>({ show: false, text: "", type: "success" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    assignedClasses: [] as ClassAssignment[]
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage({ show: true, text, type });
    setTimeout(() => setMessage({ show: false, text: "", type: "success" }), 4000);
  }

  async function fetchTeachers() {
    try {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      showMessage("Failed to load teachers", "error");
    } finally {
      setLoading(false);
    }
  }

  const filtered = teachers.filter((t: any) => {
    const searchLower = search.toLowerCase();
    const nameMatch = (t.name || "").toLowerCase().includes(searchLower);
    const emailMatch = (t.email || "").toLowerCase().includes(searchLower);
    const classMatch = t.assignedClasses?.some((a: ClassAssignment) => 
      a.className.toLowerCase().includes(searchLower) || 
      a.subject.toLowerCase().includes(searchLower)
    );
    return nameMatch || emailMatch || classMatch;
  });

  function updateClassAssignment(index: number, field: 'className' | 'subject', value: string) {
    const updated = [...form.assignedClasses];
    updated[index][field] = value;
    setForm({ ...form, assignedClasses: updated });
  }

  function addClassAssignment() {
    setForm({
      ...form,
      assignedClasses: [...form.assignedClasses, { className: "", subject: "" }]
    });
  }

  function removeClassAssignment(index: number) {
    setForm({
      ...form,
      assignedClasses: form.assignedClasses.filter((_, i) => i !== index)
    });
  }

  const handleEdit = (teacher: any) => {
    setEditTeacher(teacher);
    setForm({
      name: teacher.name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      assignedClasses: teacher.assignedClasses || []
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeacher || !editTeacher._id) {
      showMessage("Invalid teacher data", "error");
      return;
    }
    
    const teacherId = String(editTeacher._id);
    
    setSaving(true);
    try {
      const updateData = { ...form };
      updateData.assignedClasses = form.assignedClasses.filter((a: ClassAssignment) => a.className && a.subject);
      
      const res = await fetch(`/api/teachers/${teacherId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update teacher");
      
      setTeachers(prev => prev.map(t => String(t._id) === teacherId ? data : t));
      setEditTeacher(null);
      showMessage(`Teacher "${data.name}" updated successfully`, "success");
    } catch (error: any) {
      showMessage(error.message || "Failed to update teacher", "error");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTeacher || !deleteTeacher._id) return;
    
    const teacherId = String(deleteTeacher._id);
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/teachers/${teacherId}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete teacher");
      
      setTeachers(prev => prev.filter(t => String(t._id) !== teacherId));
      setDeleteTeacher(null);
      showMessage(`Teacher "${deleteTeacher.name}" deleted successfully`, "success");
    } catch (error: any) {
      showMessage(error.message || "Failed to delete teacher", "error");
    }
    setDeleting(false);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleToggleStatus = async (teacher: any) => {
    try {
      const res = await fetch(`/api/teachers/${teacher._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !teacher.isActive })
      });
      
      if (res.ok) {
        setTeachers(prev => prev.map(t => String(t._id) === String(teacher._id) ? { ...t, isActive: !t.isActive } : t));
        showMessage(`Teacher ${teacher.isActive ? "deactivated" : "activated"} successfully`, "success");
      }
    } catch (error) {
      showMessage("Failed to update status", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaChalkboardTeacher />
          Teacher Management
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
          <div className={styles.statIcon}><FaChalkboardTeacher /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Total Teachers</p>
            <p className={styles.statValue}>{teachers.length}</p>
          </div>
        </div>
      </div>

      <div className={styles.searchFilterRow}>
        <input
          type="text"
          placeholder="Search by name, email or subject..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of <strong>{teachers.length}</strong> teachers
        </span>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading teachers...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <FaChalkboardTeacher />
          <h3>No Teachers Found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Teacher ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Class & Subject</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t: any) => (
                <tr key={t._id}>
                  <td>
                    <div className={styles.studentCell}>
                      <div className={styles.studentPhotoPlaceholder}>{getInitials(t.name)}</div>
                      <div>
                        <div className={styles.studentName}>{t.name}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.studentId}>{t.teacherId || "N/A"}</span></td>
                  <td>{t.email || "N/A"}</td>
                  <td>{t.phone || "N/A"}</td>
                  <td>
                    <div className={styles.assignmentsCell}>
                      {t.assignedClasses && t.assignedClasses.length > 0 ? (
                        t.assignedClasses.slice(0, 2).map((a: ClassAssignment, i: number) => (
                          <div key={i} className={styles.assignmentMini}>
                            <span className={styles.classBadge}>{a.className}</span>
                            <span className={styles.subjectSmall}>{a.subject}</span>
                          </div>
                        ))
                      ) : (
                        <span className={styles.classBadge}>Not Assigned</span>
                      )}
                      {t.assignedClasses && t.assignedClasses.length > 2 && (
                        <span className={styles.moreCount}>+{t.assignedClasses.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View" onClick={() => setSelectedTeacher(t)}><FaEye /></button>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit" onClick={() => handleEdit(t)}><FaUserEdit /></button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete" onClick={() => setDeleteTeacher(t)}><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTeacher && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTeacher(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.formHeader}>
              <h2>Teacher Details</h2>
              <button className={styles.closeIcon} onClick={() => setSelectedTeacher(null)}>✕</button>
            </div>
            <div className={styles.modalProfile}>
              <div className={styles.modalPhotoWrapper}>
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white', fontSize: '36px', fontWeight: 700, borderRadius: '50%' }}>
                  {getInitials(selectedTeacher.name)}
                </div>
              </div>
              <h3 className={styles.modalStudentName}>{selectedTeacher.name}</h3>
              <span className={styles.modalStudentId}>{selectedTeacher.teacherId}</span>
            </div>
            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Contact Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}><span>Email</span><p>{selectedTeacher.email || "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Phone</span><p>{selectedTeacher.phone || "N/A"}</p></div>
              </div>
            </div>
            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Professional Information</h4>
              <div className={styles.modalInfoGrid} style={{ gridTemplateColumns: '1fr' }}>
                <div className={styles.modalInfoItem}>
                  <span>Class & Subject Assignments</span>
                  {selectedTeacher.assignedClasses && selectedTeacher.assignedClasses.length > 0 ? (
                    <div className={styles.teacherAssignments}>
                      {selectedTeacher.assignedClasses.map((a: ClassAssignment, i: number) => (
                        <div key={i} className={styles.assignmentDisplay}>
                          <span className={styles.classBadge}>{a.className}</span>
                          <span className={styles.subjectText}>{a.subject}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Not Assigned</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editTeacher && (
        <div className={styles.modalOverlay} onClick={() => setEditTeacher(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '540px' }}>
            <div className={styles.formHeader}>
              <h2>Edit Teacher</h2>
              <button className={styles.closeIcon} onClick={() => setEditTeacher(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Full Name *</label>
                  <input type="text" className={styles.formInput} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Enter full name" />
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
                  <label className={styles.formLabel}>Class & Subject Assignments</label>
                  <div className={styles.editAssignments}>
                    {form.assignedClasses.map((assignment, index) => (
                      <div key={index} className={styles.assignmentRow}>
                        <select 
                          value={assignment.className}
                          onChange={(e) => updateClassAssignment(index, 'className', e.target.value)}
                          className={styles.classSelect}
                        >
                          <option value="">Select Class</option>
                          <option value="Nursery">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5</option>
                          <option value="Class 6">Class 6</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                          <option value="Class 9">Class 9</option>
                          <option value="Class 10">Class 10</option>
                        </select>
                        <input 
                          type="text"
                          placeholder="Subject"
                          value={assignment.subject}
                          onChange={(e) => updateClassAssignment(index, 'subject', e.target.value)}
                          className={styles.subjectInput}
                        />
                        <button type="button" className={styles.removeAssignmentBtn} onClick={() => removeClassAssignment(index)}>
                          <FaMinus />
                        </button>
                      </div>
                    ))}
                    <button type="button" className={styles.addAssignmentBtn} onClick={addClassAssignment}>
                      <FaPlus /> Add Assignment
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setEditTeacher(null)}><FaTimes /> Cancel</button>
                <button type="submit" className={styles.saveBtn} disabled={saving}><FaSave /> {saving ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTeacher && (
        <div className={styles.modalOverlay} onClick={() => setDeleteTeacher(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '420px' }}>
            <div className={styles.formHeader}>
              <h2>Delete Teacher</h2>
              <button className={styles.closeIcon} onClick={() => setDeleteTeacher(null)}>✕</button>
            </div>
            <div className={styles.deleteContent}>
              <div className={styles.deleteIcon}><FaExclamationTriangle /></div>
              <h3 className={styles.deleteTitle}>Are you sure?</h3>
              <p className={styles.deleteText}>You are about to delete <strong>"{deleteTeacher.name}"</strong> from the database. This action cannot be undone.</p>
              <div className={styles.deleteInfo}>
                <p><strong>Teacher ID:</strong> {deleteTeacher.teacherId}</p>
                <p><strong>Assignments:</strong> {deleteTeacher.assignedClasses && deleteTeacher.assignedClasses.length > 0 ? deleteTeacher.assignedClasses.length : "None"}</p>
              </div>
            </div>
            <div className={styles.deleteActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteTeacher(null)}><FaTimes /> Cancel</button>
              <button className={styles.deleteBtnConfirm} onClick={handleDelete} disabled={deleting}><FaTrash /> {deleting ? "Deleting..." : "Delete Teacher"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
