"use client"

import { useState, useEffect } from "react"
import styles from "@/app/styles/Teachers.module.css"
import { FaChalkboardTeacher, FaUserEdit, FaTrash, FaEye, FaTimes, FaSave, FaExclamationTriangle, FaPlus, FaMinus, FaPhone, FaEnvelope, FaSearch, FaCheck, FaBan, FaLayerGroup, FaUserCircle, FaBriefcase } from "react-icons/fa"

const CLASSES = [
  "Nursery", "LKG", "UKG", 
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
]

const DEPARTMENTS = [
  "Mathematics", "Science", "English", "Hindi", "Social Studies", 
  "Physical Education", "Art & Craft", "Music", "Computer Science", 
  "Sanskrit", "Environment", "General"
]

const DESIGNATIONS = [
  "Principal", "Vice Principal", "Head Teacher", "Senior Teacher", 
  "Teacher", "Assistant Teacher", "TGT", "PRT", "PGT", "Contract Teacher", "Guest Faculty"
]

const SUBJECTS = {
  "Nursery": ["English", "Math", "Rhymes", "Drawing", "General Awareness"],
  "LKG": ["English", "Math", "Rhymes", "Drawing", "General Awareness"],
  "UKG": ["English", "Hindi", "Math", "EVS", "Drawing"],
  "Class 1": ["English", "Hindi", "Math", "EVS", "GK", "Drawing"],
  "Class 2": ["English", "Hindi", "Math", "EVS", "GK", "Drawing"],
  "Class 3": ["English", "Hindi", "Math", "EVS", "GK", "Drawing", "Computer"],
  "Class 4": ["English", "Hindi", "Math", "EVS", "GK", "Drawing", "Computer", "Sanskrit"],
  "Class 5": ["English", "Hindi", "Math", "EVS", "GK", "Drawing", "Computer", "Sanskrit"],
  "Class 6": ["English", "Hindi", "Math", "Science", "Social Science", "Sanskrit", "Computer", "Art"],
  "Class 7": ["English", "Hindi", "Math", "Science", "Social Science", "Sanskrit", "Computer", "Art"],
  "Class 8": ["English", "Hindi", "Math", "Science", "Social Science", "Sanskrit", "Computer", "Art"],
  "Class 9": ["English", "Hindi", "Math", "Science", "Social Science", "Sanskrit", "Computer"],
  "Class 10": ["English", "Hindi", "Math", "Science", "Social Science", "Sanskrit", "Computer"]
}

interface ClassAssignment {
  className: string;
  subject: string;
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ show: boolean; text: string; type: "success" | "error" }>({ show: false, text: "", type: "success" })
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [editTeacher, setEditTeacher] = useState<any>(null)
  const [deleteTeacher, setDeleteTeacher] = useState<any>(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    qualification: "",
    specialization: "",
    experience: "",
    department: "",
    designation: "Teacher",
    joiningDate: "",
    assignedClasses: [] as ClassAssignment[],
    sendCredentials: true,
    notes: ""
  })

  const [bulkAssignMode, setBulkAssignMode] = useState(false)
  const [selectedBulkClasses, setSelectedBulkClasses] = useState<string[]>([])
  const [selectedBulkSubjects, setSelectedBulkSubjects] = useState<string[]>([])

  useEffect(() => {
    fetchTeachers()
  }, [])

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage({ show: true, text, type })
    setTimeout(() => setMessage({ show: false, text: "", type: "success" }), 5000)
  }

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

  const filteredTeachers = teachers.filter((t: any) => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      (t.name || "").toLowerCase().includes(searchLower) ||
      (t.email || "").toLowerCase().includes(searchLower) ||
      (t.teacherId || "").toLowerCase().includes(searchLower) ||
      (t.department || "").toLowerCase().includes(searchLower) ||
      (t.designation || "").toLowerCase().includes(searchLower) ||
      t.assignedClasses?.some((a: ClassAssignment) => 
        a.className.toLowerCase().includes(searchLower) || 
        a.subject.toLowerCase().includes(searchLower)
      )
    
    const matchesDepartment = !filterDepartment || t.department === filterDepartment
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && t.isActive) || 
      (filterStatus === "inactive" && !t.isActive)
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  function addClassAssignment() {
    setForm({
      ...form,
      assignedClasses: [...form.assignedClasses, { className: "", subject: "" }]
    })
  }

  function removeClassAssignment(index: number) {
    setForm({
      ...form,
      assignedClasses: form.assignedClasses.filter((_, i) => i !== index)
    })
  }

  function updateClassAssignment(index: number, field: 'className' | 'subject', value: string) {
    const updated = [...form.assignedClasses]
    updated[index][field] = value
    setForm({ ...form, assignedClasses: updated })
  }

  function getAvailableSubjectsForClass(className: string): string[] {
    return SUBJECTS[className as keyof typeof SUBJECTS] || []
  }

  function handleBulkAssign() {
    if (selectedBulkClasses.length === 0 || selectedBulkSubjects.length === 0) {
      showMessage("Please select at least one class and one subject", "error")
      return
    }

    const newAssignments: ClassAssignment[] = []
    selectedBulkClasses.forEach(cls => {
      selectedBulkSubjects.forEach(subj => {
        if (!form.assignedClasses.some(a => a.className === cls && a.subject === subj)) {
          newAssignments.push({ className: cls, subject: subj })
        }
      })
    })

    setForm({
      ...form,
      assignedClasses: [...form.assignedClasses, ...newAssignments]
    })
    setBulkAssignMode(false)
    setSelectedBulkClasses([])
    setSelectedBulkSubjects([])
    showMessage(`Added ${newAssignments.length} class-subject combinations`, "success")
  }

  function clearAllAssignments() {
    setForm({ ...form, assignedClasses: [] })
  }

  function selectAllClasses() {
    if (selectedBulkClasses.length === CLASSES.length) {
      setSelectedBulkClasses([])
    } else {
      setSelectedBulkClasses([...CLASSES])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const teacherData = {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        qualification: form.qualification,
        specialization: form.specialization,
        experience: parseInt(form.experience) || 0,
        department: form.department,
        designation: form.designation,
        joiningDate: form.joiningDate,
        assignedClasses: form.assignedClasses.filter(a => a.className && a.subject),
        sendCredentials: form.sendCredentials,
        notes: form.notes
      }
      
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData)
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to add teacher")
      }

      resetForm()
      setShowAddModal(false)
      fetchTeachers()
      
      const classCount = teacherData.assignedClasses.length
      showMessage(
        `Teacher "${data.name}" (ID: ${data.teacherId}) added successfully with ${classCount} class assignment${classCount !== 1 ? 's' : ''}. ${form.sendCredentials ? 'Login credentials sent to email.' : ''}`, 
        "success"
      )
    } catch (error: any) {
      showMessage(error.message || "Error adding teacher", "error")
    } finally {
      setSaving(false)
    }
  }

  function resetForm() {
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      qualification: "",
      specialization: "",
      experience: "",
      department: "",
      designation: "Teacher",
      joiningDate: "",
      assignedClasses: [],
      sendCredentials: true,
      notes: ""
    })
  }

  const handleEdit = (teacher: any) => {
    setEditTeacher(teacher)
    setForm({
      name: teacher.name || "",
      email: teacher.email || "",
      password: "",
      phone: teacher.phone || "",
      gender: teacher.gender || "",
      dateOfBirth: teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toISOString().split('T')[0] : "",
      qualification: teacher.qualification || "",
      specialization: teacher.specialization || "",
      experience: teacher.experience?.toString() || "",
      department: teacher.department || "",
      designation: teacher.designation || "Teacher",
      joiningDate: teacher.joiningDate ? new Date(teacher.joiningDate).toISOString().split('T')[0] : "",
      assignedClasses: teacher.assignedClasses || [],
      sendCredentials: false,
      notes: teacher.notes || ""
    })
  }

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editTeacher || !editTeacher._id) return

    setSaving(true)
    try {
      const updateData: Record<string, any> = {
        name: form.name,
        phone: form.phone,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        qualification: form.qualification,
        specialization: form.specialization,
        experience: parseInt(form.experience) || 0,
        department: form.department,
        designation: form.designation,
        joiningDate: form.joiningDate,
        assignedClasses: form.assignedClasses.filter((a: ClassAssignment) => a.className && a.subject),
        notes: form.notes
      }

      if (form.password) {
        updateData.password = form.password
      }

      const res = await fetch(`/api/teachers/${editTeacher._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to update teacher")

      setTeachers(prev => prev.map(t => String(t._id) === String(editTeacher._id) ? data : t))
      setEditTeacher(null)
      showMessage(`Teacher "${data.name}" updated successfully`, "success")
    } catch (error: any) {
      showMessage(error.message || "Error updating teacher", "error")
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!deleteTeacher || !deleteTeacher._id) return

    setDeleting(true)
    try {
      const res = await fetch(`/api/teachers/${deleteTeacher._id}`, { method: "DELETE" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Failed to delete teacher")

      setTeachers(prev => prev.filter(t => String(t._id) !== String(deleteTeacher._id)))
      setDeleteTeacher(null)
      showMessage(`Teacher "${deleteTeacher.name}" deleted successfully`, "success")
    } catch (error: any) {
      showMessage(error.message || "Error deleting teacher", "error")
    }
    setDeleting(false)
  }

  const handleToggleStatus = async (teacher: any) => {
    try {
      const res = await fetch(`/api/teachers/${teacher._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !teacher.isActive })
      })
      
      if (res.ok) {
        setTeachers(prev => prev.map(t => String(t._id) === String(teacher._id) ? { ...t, isActive: !t.isActive } : t))
        showMessage(`Teacher ${teacher.isActive ? "deactivated" : "activated"} successfully`, "success")
      }
    } catch (error) {
      showMessage("Failed to update status", "error")
    }
  }

  const getInitials = (name: string) => {
    if (!name) return "?"
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  }

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      "Mathematics": "#3b82f6",
      "Science": "#10b981",
      "English": "#8b5cf6",
      "Hindi": "#f59e0b",
      "Social Science": "#06b6d4",
      "Computer": "#6366f1",
      "Sanskrit": "#ec4899"
    }
    return colors[subject] || "#64748b"
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaChalkboardTeacher style={{ marginRight: 12, color: "#f59e0b" }} />
          Teacher Management
        </h1>
        <button className={styles.addNewBtn} onClick={() => { resetForm(); setShowAddModal(true) }}>
          <FaPlus /> Add New Teacher
        </button>
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

      <div className={styles.filtersRow}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search teachers by name, email, ID, department, subject..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className={styles.filterSelect}
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select 
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <span className={styles.resultCount}>
          Showing <strong>{filteredTeachers.length}</strong> of <strong>{teachers.length}</strong> teachers
        </span>
      </div>

      {loading ? (
        <div className={styles.emptyState}>
          <p>Loading teachers...</p>
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className={styles.emptyState}>
          <FaChalkboardTeacher className={styles.emptyIcon} />
          <p>No teachers found</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Teacher ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Class & Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((t: any) => (
                <tr key={t._id}>
                  <td>
                    <div className={styles.teacherCell}>
                      <div className={styles.teacherAvatar} style={{ background: t.isActive !== false ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : '#94a3b8' }}>
                        {getInitials(t.name)}
                      </div>
                      <div>
                        <div className={styles.teacherName}>{t.name}</div>
                        <div className={styles.teacherEmail}>{t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={styles.teacherIdBadge}>{t.teacherId || "N/A"}</span></td>
                  <td>{t.department || "-"}</td>
                  <td>{t.designation || "Teacher"}</td>
                  <td>
                    <div className={styles.assignmentsCell}>
                      {t.assignedClasses && t.assignedClasses.length > 0 ? (
                        <>
                          {t.assignedClasses.slice(0, 2).map((a: ClassAssignment, i: number) => (
                            <span key={i} className={styles.assignmentBadge} style={{ borderLeftColor: getSubjectColor(a.subject) }}>
                              <span className={styles.classBadge}>{a.className}</span>
                              <span className={styles.subjectBadge} style={{ background: getSubjectColor(a.subject) }}>{a.subject}</span>
                            </span>
                          ))}
                          {t.assignedClasses.length > 2 && (
                            <span className={styles.moreCount}>+{t.assignedClasses.length - 2} more</span>
                          )}
                        </>
                      ) : (
                        <span className={styles.notAssigned}>Not Assigned</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button 
                      className={`${styles.statusBadge} ${t.isActive !== false ? styles.statusActive : styles.statusInactive}`}
                      onClick={() => handleToggleStatus(t)}
                    >
                      {t.isActive !== false ? <><FaCheck /> Active</> : <><FaBan /> Inactive</>}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View" onClick={() => setSelectedTeacher(t)}>
                        <FaEye />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.editBtn}`} title="Edit" onClick={() => handleEdit(t)}>
                        <FaUserEdit />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete" onClick={() => setDeleteTeacher(t)}>
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

      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.addModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.addModalHeader}>
              <h2><FaUserCircle /> Add New Teacher</h2>
              <button className={styles.closeIcon} onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <form className={styles.addForm} onSubmit={handleSubmit}>
              <div className={styles.formSection}>
                <h3><FaUserCircle /> Personal Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required placeholder="Enter full name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Gender</label>
                    <select value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Date of Birth</label>
                    <input type="date" value={form.dateOfBirth} onChange={(e) => setForm({...form, dateOfBirth: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3><FaEnvelope /> Contact Information</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required placeholder="teacher@school.com" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Phone Number *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3><FaBriefcase /> Professional Details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Qualification *</label>
                    <input type="text" value={form.qualification} onChange={(e) => setForm({...form, qualification: e.target.value})} required placeholder="B.Ed, M.Sc, B.A etc." />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Specialization</label>
                    <input type="text" value={form.specialization} onChange={(e) => setForm({...form, specialization: e.target.value})} placeholder="Subject specialization" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Experience (Years)</label>
                    <input type="number" value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} min="0" placeholder="0" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Department</label>
                    <select value={form.department} onChange={(e) => setForm({...form, department: e.target.value})}>
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Designation</label>
                    <select value={form.designation} onChange={(e) => setForm({...form, designation: e.target.value})}>
                      {DESIGNATIONS.map(desig => (
                        <option key={desig} value={desig}>{desig}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Joining Date</label>
                    <input type="date" value={form.joiningDate} onChange={(e) => setForm({...form, joiningDate: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3><FaLayerGroup /> Class & Subject Assignment</h3>
                
                <div className={styles.bulkAssignSection}>
                  <div className={styles.bulkAssignHeader}>
                    <h4>Quick Bulk Assign</h4>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={bulkAssignMode} onChange={(e) => setBulkAssignMode(e.target.checked)} />
                      <span>Enable Bulk Mode</span>
                    </label>
                  </div>
                  
                  {bulkAssignMode && (
                    <div className={styles.bulkAssignContent}>
                      <div className={styles.bulkAssignGroup}>
                        <label>Select Classes ({selectedBulkClasses.length} selected)</label>
                        <div className={styles.checkboxGrid}>
                          <label className={styles.checkboxItem}>
                            <input type="checkbox" checked={selectedBulkClasses.length === CLASSES.length} onChange={selectAllClasses} />
                            <span>Select All</span>
                          </label>
                          {CLASSES.map(cls => (
                            <label key={cls} className={styles.checkboxItem}>
                              <input 
                                type="checkbox" 
                                checked={selectedBulkClasses.includes(cls)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedBulkClasses([...selectedBulkClasses, cls])
                                  } else {
                                    setSelectedBulkClasses(selectedBulkClasses.filter(c => c !== cls))
                                  }
                                }}
                              />
                              <span>{cls}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className={styles.bulkAssignGroup}>
                        <label>Select Subjects ({selectedBulkSubjects.length} selected)</label>
                        <div className={styles.checkboxGrid}>
                          {["Mathematics", "Science", "English", "Hindi", "Social Science", "Computer", "Sanskrit"].map(subj => (
                            <label key={subj} className={styles.checkboxItem}>
                              <input 
                                type="checkbox" 
                                checked={selectedBulkSubjects.includes(subj)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedBulkSubjects([...selectedBulkSubjects, subj])
                                  } else {
                                    setSelectedBulkSubjects(selectedBulkSubjects.filter(s => s !== subj))
                                  }
                                }}
                              />
                              <span>{subj}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <button type="button" className={styles.bulkAssignBtn} onClick={handleBulkAssign}>
                        <FaPlus /> Add Selected Combinations
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.classAssignmentsSection}>
                  <div className={styles.sectionHeader}>
                    <span>Individual Assignments ({form.assignedClasses.length})</span>
                    <div>
                      <button type="button" className={styles.clearAllBtn} onClick={clearAllAssignments}>
                        Clear All
                      </button>
                      <button type="button" className={styles.addAssignmentBtn} onClick={addClassAssignment}>
                        <FaPlus /> Add Individual
                      </button>
                    </div>
                  </div>
                  
                  {form.assignedClasses.length === 0 ? (
                    <p className={styles.noAssignments}>No classes assigned yet. Use bulk mode or add individually.</p>
                  ) : (
                    form.assignedClasses.map((assignment, index) => (
                      <div key={index} className={styles.assignmentRow}>
                        <select 
                          value={assignment.className}
                          onChange={(e) => updateClassAssignment(index, 'className', e.target.value)}
                          className={styles.classSelect}
                        >
                          <option value="">Select Class</option>
                          {CLASSES.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                        <select 
                          value={assignment.subject}
                          onChange={(e) => updateClassAssignment(index, 'subject', e.target.value)}
                          className={styles.classSelect}
                        >
                          <option value="">Select Subject</option>
                          {assignment.className && getAvailableSubjectsForClass(assignment.className).map(subj => (
                            <option key={subj} value={subj}>{subj}</option>
                          ))}
                          {!assignment.className && ["Mathematics", "Science", "English", "Hindi", "Social Science", "Computer", "Sanskrit"].map(subj => (
                            <option key={subj} value={subj}>{subj}</option>
                          ))}
                        </select>
                        <button type="button" className={styles.removeAssignmentBtn} onClick={() => removeClassAssignment(index)}>
                          <FaMinus />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.formGroup} style={{ marginTop: '20px' }}>
                  <label>Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} placeholder="Additional notes about the teacher..." rows={2} />
                </div>
              </div>

              <div className={styles.credentialsSection}>
                <div className={styles.credentialsRow}>
                  <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label>Password *</label>
                    <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required placeholder="Enter login password" />
                  </div>
                  <div className={styles.formGroup} style={{ flex: 1 }}>
                    <label>Send Credentials via Email</label>
                    <label className={styles.toggle}>
                      <input type="checkbox" checked={form.sendCredentials} onChange={(e) => setForm({...form, sendCredentials: e.target.checked})} />
                      <span>{form.sendCredentials ? "Yes, send login details to teacher" : "No, will inform manually"}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={saving}>
                  <FaSave /> {saving ? "Adding Teacher..." : "Add Teacher"}
                </button>
              </div>
            </form>
          </div>
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
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedTeacher.isActive !== false ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)', color: 'white', fontSize: '36px', fontWeight: 700, borderRadius: '50%' }}>
                  {getInitials(selectedTeacher.name)}
                </div>
              </div>
              <h3 className={styles.modalStudentName}>{selectedTeacher.name}</h3>
              <span className={styles.modalStudentId}>{selectedTeacher.teacherId}</span>
              <span className={`${styles.statusBadge} ${selectedTeacher.isActive !== false ? styles.statusActive : styles.statusInactive}`}>
                {selectedTeacher.isActive !== false ? "Active" : "Inactive"}
              </span>
            </div>
            
            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Professional Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}><span>Designation</span><p>{selectedTeacher.designation || "Teacher"}</p></div>
                <div className={styles.modalInfoItem}><span>Department</span><p>{selectedTeacher.department || "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Qualification</span><p>{selectedTeacher.qualification || "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Experience</span><p>{selectedTeacher.experience ? `${selectedTeacher.experience} Years` : "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Joining Date</span><p>{selectedTeacher.joiningDate ? new Date(selectedTeacher.joiningDate).toLocaleDateString() : "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Specialization</span><p>{selectedTeacher.specialization || "N/A"}</p></div>
              </div>
            </div>

            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Contact Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}><span>Email</span><p>{selectedTeacher.email || "N/A"}</p></div>
                <div className={styles.modalInfoItem}><span>Phone</span><p>{selectedTeacher.phone || "N/A"}</p></div>
              </div>
            </div>

            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Class & Subject Assignments</h4>
              <div className={styles.modalInfoGrid} style={{ gridTemplateColumns: '1fr' }}>
                <div className={styles.modalInfoItem}>
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
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '600px' }}>
            <div className={styles.formHeader}>
              <h2>Edit Teacher</h2>
              <button className={styles.closeIcon} onClick={() => setEditTeacher(null)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Full Name *</label>
                  <input type="text" className={styles.formInput} value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input type="email" className={styles.formInput} value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input type="tel" className={styles.formInput} value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Gender</label>
                  <select className={styles.formInput} value={form.gender} onChange={(e) => setForm({...form, gender: e.target.value})}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date of Birth</label>
                  <input type="date" className={styles.formInput} value={form.dateOfBirth} onChange={(e) => setForm({...form, dateOfBirth: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Qualification</label>
                  <input type="text" className={styles.formInput} value={form.qualification} onChange={(e) => setForm({...form, qualification: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Specialization</label>
                  <input type="text" className={styles.formInput} value={form.specialization} onChange={(e) => setForm({...form, specialization: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Experience (Years)</label>
                  <input type="number" className={styles.formInput} value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Department</label>
                  <select className={styles.formInput} value={form.department} onChange={(e) => setForm({...form, department: e.target.value})}>
                    <option value="">Select</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Designation</label>
                  <select className={styles.formInput} value={form.designation} onChange={(e) => setForm({...form, designation: e.target.value})}>
                    {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Joining Date</label>
                  <input type="date" className={styles.formInput} value={form.joiningDate} onChange={(e) => setForm({...form, joiningDate: e.target.value})} />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Class & Subject Assignments</label>
                  <div className={styles.editAssignments}>
                    {form.assignedClasses.map((assignment, index) => (
                      <div key={index} className={styles.assignmentRow}>
                        <select value={assignment.className} onChange={(e) => updateClassAssignment(index, 'className', e.target.value)} className={styles.classSelect}>
                          <option value="">Select Class</option>
                          {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                        </select>
                        <select value={assignment.subject} onChange={(e) => updateClassAssignment(index, 'subject', e.target.value)} className={styles.classSelect}>
                          <option value="">Select Subject</option>
                          {assignment.className && getAvailableSubjectsForClass(assignment.className).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button type="button" className={styles.removeAssignmentBtn} onClick={() => removeClassAssignment(index)}><FaMinus /></button>
                      </div>
                    ))}
                    <button type="button" className={styles.addAssignmentBtn} onClick={addClassAssignment}><FaPlus /> Add</button>
                  </div>
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>New Password (leave blank to keep)</label>
                  <input type="password" className={styles.formInput} value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Enter new password" />
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
                <p><strong>Department:</strong> {deleteTeacher.department || "N/A"}</p>
                <p><strong>Assignments:</strong> {deleteTeacher.assignedClasses?.length || 0}</p>
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
  )
}
