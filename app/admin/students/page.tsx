"use client";

import { useEffect, useState } from "react";
import styles from "../../styles/students.module.css";
import { 
  FaUserGraduate, 
  FaUserEdit, 
  FaTrash, 
  FaEye, 
  FaUsers,
  FaBook,
  FaUserCircle,
  FaClipboardList,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaVenusMars,
  FaUser,
  FaUserTimes,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaPrint,
  FaTimes,
  FaSave,
  FaCheck,
  FaExclamationTriangle
} from "react-icons/fa";

const CLASSES = [
  { id: "all", name: "All Classes" },
  { id: "Nursery", name: "Nursery" },
  { id: "LKG", name: "LKG" },
  { id: "UKG", name: "UKG" },
  { id: "Class 1", name: "Class 1" },
  { id: "Class 2", name: "Class 2" },
  { id: "Class 3", name: "Class 3" },
  { id: "Class 4", name: "Class 4" },
  { id: "Class 5", name: "Class 5" },
  { id: "Class 6", name: "Class 6" },
  { id: "Class 7", name: "Class 7" },
  { id: "Class 8", name: "Class 8" },
  { id: "Class 9", name: "Class 9" },
  { id: "Class 10", name: "Class 10" }
];

type StudentForm = {
  studentName: string;
  dob: string;
  gender: string;
  classApplying: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
};

type Message = {
  show: boolean;
  text: string;
  type: "success" | "error";
};

export default function Students() {

  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeClass, setActiveClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [deleteStudent, setDeleteStudent] = useState<any>(null);
  const [addStudent, setAddStudent] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoErrors, setPhotoErrors] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<Message>({ show: false, text: "", type: "success" });
  const itemsPerPage = 10;

  const [form, setForm] = useState<StudentForm>({
    studentName: "",
    dob: "",
    gender: "",
    classApplying: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: ""
  });

  const [addForm, setAddForm] = useState<StudentForm>({
    studentName: "",
    dob: "",
    gender: "",
    classApplying: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage({ show: true, text, type });
    setTimeout(() => {
      setMessage({ show: false, text: "", type: "success" });
    }, 4000);
  }

  async function fetchStudents() {
    try {
      const res = await fetch("/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    }
    catch (error) {
      console.error("Fetch students error:", error);
      showMessage("Failed to load students", "error");
    } finally {
      setLoading(false);
    }
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!addForm.studentName || !addForm.fatherName || !addForm.classApplying) {
      showMessage("Please fill in all required fields", "error");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add student");
      }

      setStudents(prev => [data, ...prev]);
      setAddStudent(false);
      setAddForm({
        studentName: "",
        dob: "",
        gender: "",
        classApplying: "",
        fatherName: "",
        motherName: "",
        phone: "",
        email: ""
      });
      showMessage(`Student "${data.studentName}" added successfully!`, "success");
    } catch (error: any) {
      console.error("Add student error:", error);
      showMessage(error.message || "Failed to add student. Please try again.", "error");
    }
    setSaving(false);
  };

  const getClassCount = (className: string) => {
    if (className === "all") return students.length;
    return students.filter(s => s.classApplying === className).length;
  };

  const filtered = students.filter((s: any) => {
    const matchesClass = activeClass === "all" || s.classApplying === activeClass;
    const matchesSearch = 
      (s.studentName || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.studentId || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.fatherName || "").toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filtered.slice(startIndex, startIndex + itemsPerPage);

  const nurseryTo5 = students.filter(s => 
    ["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"].includes(s.classApplying)
  ).length;
  
  const class6To10 = students.filter(s => 
    ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].includes(s.classApplying)
  ).length;

  const activeStudents = students.filter(s => s.status === "active").length;

  const handleDelete = async () => {
    if (!deleteStudent || !deleteStudent._id) {
      showMessage("Invalid student data", "error");
      return;
    }
    setDeleting(true);
    try {
      const res = await fetch(`/api/students/${deleteStudent._id}`, {
        method: "DELETE"
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete student");
      }
      
      setStudents(prev => prev.filter(s => s._id !== deleteStudent._id));
      setDeleteStudent(null);
      showMessage(`Student "${deleteStudent.studentName}" deleted successfully`, "success");
    } catch (error: any) {
      console.error("Delete error:", error);
      showMessage(error.message || "Failed to delete student. Please try again.", "error");
    }
    setDeleting(false);
  };

  const handleStatusChange = async (studentId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }
      
      setStudents(prev => prev.map(s => 
        s._id === studentId ? data : s
      ));
      if (selectedStudent?._id === studentId) {
        setSelectedStudent(data);
      }
      showMessage(`Student ${newStatus === "active" ? "activated" : "deactivated"} successfully`, "success");
    } catch (error: any) {
      console.error("Status update error:", error);
      showMessage(error.message || "Failed to update status", "error");
    }
  };

  const handleEdit = (student: any) => {
    setEditStudent(student);
    setForm({
      studentName: student.studentName || "",
      dob: student.dob || "",
      gender: student.gender || "",
      classApplying: student.classApplying || "",
      fatherName: student.fatherName || "",
      motherName: student.motherName || "",
      phone: student.phone || "",
      email: student.email || ""
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStudent || !editStudent._id) {
      showMessage("Invalid student data", "error");
      return;
    }
    
    setSaving(true);
    try {
      const studentId = String(editStudent._id);
      const url = `/api/students/${studentId}`;
      
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      const data = await res.json();
      console.log("Update response:", res.status, data);
      
      if (!res.ok) {
        throw new Error(data.message || "Failed to update student");
      }
      
      setStudents(prev => prev.map(s => 
        s._id === editStudent._id ? data : s
      ));
      setEditStudent(null);
      showMessage(`Student "${data.studentName}" updated successfully`, "success");
    } catch (error: any) {
      console.error("Update error:", error);
      showMessage(error.message || "Failed to update student. Please try again.", "error");
    }
    setSaving(false);
  };

  const handleExport = () => {
    const headers = ["Student ID", "Name", "Class", "Gender", "DOB", "Father Name", "Mother Name", "Email", "Phone", "Status"];
    const csvData = filtered.map(s => [
      s.studentId || "",
      s.studentName || "",
      s.classApplying || "",
      s.gender || "",
      s.dob || "",
      s.fatherName || "",
      s.motherName || "",
      s.email || "",
      s.phone || "",
      s.status || "active"
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showMessage("Student data exported successfully", "success");
  };

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Student List - ${new Date().toLocaleDateString()}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1e3a5f; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background: #1e3a5f; color: white; }
            tr:nth-child(even) { background: #f8f9fa; }
            .status-active { color: green; }
            .status-inactive { color: red; }
          </style>
        </head>
        <body>
          <h1>Student List</h1>
          <p>Total Students: ${filtered.length} | Generated: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Father</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(s => `
                <tr>
                  <td>${s.studentId || "N/A"}</td>
                  <td>${s.studentName || "N/A"}</td>
                  <td>${s.classApplying || "N/A"}</td>
                  <td>${s.fatherName || "N/A"}</td>
                  <td>${s.email || "N/A"}</td>
                  <td>${s.phone || "N/A"}</td>
                  <td class="status-${s.status || 'active'}">${s.status || "active"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className={styles.container}>
      
      {/* Header */}
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          <FaUserGraduate />
          Student Management
        </h1>
      </div>

      {/* Message Toast */}
      {message.show && (
        <div className={`${styles.toast} ${styles[message.type]}`}>
          {message.type === "success" ? <FaCheck /> : <FaExclamationTriangle />}
          <span>{message.text}</span>
          <button className={styles.toastClose} onClick={() => setMessage({ show: false, text: "", type: "success" })}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <div 
          className={`${styles.statCard} ${activeClass === "all" ? styles.active : ""}`}
          onClick={() => { setActiveClass("all"); setCurrentPage(1); }}
        >
          <div className={styles.statIcon}><FaUsers /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Total</p>
            <p className={styles.statValue}>{students.length}</p>
          </div>
        </div>

        <div 
          className={`${styles.statCard} ${activeClass === "primary" ? styles.active : ""}`}
          onClick={() => { setActiveClass("primary"); setCurrentPage(1); }}
        >
          <div className={styles.statIcon}><FaBook /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Nursery-5</p>
            <p className={styles.statValue}>{nurseryTo5}</p>
          </div>
        </div>

        <div 
          className={`${styles.statCard} ${activeClass === "middle" ? styles.active : ""}`}
          onClick={() => { setActiveClass("middle"); setCurrentPage(1); }}
        >
          <div className={styles.statIcon}><FaClipboardList /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Class 6-10</p>
            <p className={styles.statValue}>{class6To10}</p>
          </div>
        </div>

        <div 
          className={`${styles.statCard} ${activeClass === "active" ? styles.active : ""}`}
          onClick={() => { setActiveClass("active"); setCurrentPage(1); }}
        >
          <div className={styles.statIcon}><FaUserCircle /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Active</p>
            <p className={styles.statValue}>{activeStudents}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><FaUserTimes /></div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>Inactive</p>
            <p className={styles.statValue}>{students.length - activeStudents}</p>
          </div>
        </div>
      </div>

      {/* Class Filter */}
      <div className={styles.classFilterSection}>
        <label className={styles.filterLabel}>Filter by Class</label>
        <div className={styles.classFilters}>
          {CLASSES.map((cls) => (
            <button
              key={cls.id}
              className={`${styles.classFilterBtn} ${activeClass === cls.id ? styles.active : ""}`}
              onClick={() => { setActiveClass(cls.id); setCurrentPage(1); }}
            >
              {cls.name}
              {cls.id !== "all" && (
                <span className={styles.classCount}>{getClassCount(cls.id)}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchFilterRow}>
        <input
          type="text"
          placeholder="Search by name, ID, email or parent name..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
        <span className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading students...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <FaUserGraduate />
          <h3>No Students Found</h3>
          <p>
            {search || activeClass !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Add your first student to get started"}
          </p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>
              <FaUsers /> All Students
            </span>
            <div className={styles.tableActions}>
              <button className={styles.tableActionBtn} onClick={handleExport}>
                <FaDownload /> Export CSV
              </button>
              <button className={styles.tableActionBtn} onClick={handlePrint}>
                <FaPrint /> Print
              </button>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Student</th>
                <th>Student ID</th>
                <th>Class</th>
                <th>Gender</th>
                <th>Father Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.map((s) => (
                <tr key={s._id}>
                  <td>
                    <div className={styles.studentCell}>
                      {s.studentPhoto && !photoErrors[s._id] ? (
                        <img 
                          src={s.studentPhoto} 
                          className={styles.studentPhotoSmall} 
                          alt={s.studentName}
                          onError={() => setPhotoErrors(prev => ({ ...prev, [s._id]: true }))}
                        />
                      ) : (
                        <div className={styles.studentPhotoPlaceholder}>
                          {getInitials(s.studentName)}
                        </div>
                      )}
                      <div>
                        <div className={styles.studentName}>{s.studentName}</div>
                        <div className={styles.studentEmail}>{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.studentId}>{s.studentId || "N/A"}</span>
                  </td>
                  <td>
                    <span className={styles.classBadge}>
                      <FaBook /> {s.classApplying || "N/A"}
                    </span>
                  </td>
                  <td>{s.gender || "N/A"}</td>
                  <td>{s.fatherName || "N/A"}</td>
                  <td>{s.phone || "N/A"}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${s.status === "active" ? styles.active : styles.inactive}`}>
                      {s.status || "active"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={`${styles.actionBtn} ${styles.viewBtn}`} 
                        title="View Details"
                        onClick={() => { setSelectedStudent(s); }}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.editBtn}`} 
                        title="Edit Student"
                        onClick={() => handleEdit(s)}
                      >
                        <FaUserEdit />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                        title="Delete Student"
                        onClick={() => setDeleteStudent(s)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.tableFooter}>
            <span className={styles.paginationInfo}>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} entries
            </span>
            <div className={styles.pagination}>
              <button 
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button 
                  key={page}
                  className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button 
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {selectedStudent && (
        <div className={styles.modalOverlay} onClick={() => setSelectedStudent(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()}>
            
            <div className={styles.formHeader}>
              <h2>Student Details</h2>
              <button className={styles.closeIcon} onClick={() => setSelectedStudent(null)}>✕</button>
            </div>

            <div className={styles.modalProfile}>
              <div className={styles.modalPhotoWrapper}>
                {selectedStudent.studentPhoto && !photoErrors[selectedStudent._id] ? (
                  <img 
                    src={selectedStudent.studentPhoto} 
                    className={styles.modalStudentPhoto}
                    alt={selectedStudent.studentName}
                    onError={() => setPhotoErrors(prev => ({ ...prev, [selectedStudent._id]: true }))}
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%)',
                    color: 'white',
                    fontSize: '36px',
                    fontWeight: 700,
                    borderRadius: '50%'
                  }}>
                    {getInitials(selectedStudent.studentName)}
                  </div>
                )}
              </div>
              <h3 className={styles.modalStudentName}>{selectedStudent.studentName}</h3>
              <span className={styles.modalStudentId}>{selectedStudent.studentId}</span>
            </div>

            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Personal Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}>
                  <span>Date of Birth</span>
                  <p>{selectedStudent.dob || "N/A"}</p>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Gender</span>
                  <p>{selectedStudent.gender || "N/A"}</p>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Class</span>
                  <p>{selectedStudent.classApplying || "N/A"}</p>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Status</span>
                  <p style={{ textTransform: "capitalize" }}>{selectedStudent.status || "active"}</p>
                </div>
              </div>
            </div>

            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Parent Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}>
                  <span>Father's Name</span>
                  <p>{selectedStudent.fatherName || "N/A"}</p>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Mother's Name</span>
                  <p>{selectedStudent.motherName || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className={styles.modalInfoSection}>
              <h4 className={styles.modalInfoTitle}>Contact Information</h4>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}>
                  <span>Email</span>
                  <p>{selectedStudent.email || "N/A"}</p>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Phone</span>
                  <p>{selectedStudent.phone || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.modalBtnSecondary} onClick={() => handleEdit(selectedStudent)}>
                <FaUserEdit /> Edit
              </button>
              <button 
                className={styles.modalBtnPrimary}
                onClick={() => handleStatusChange(selectedStudent._id, selectedStudent.status === "active" ? "inactive" : "active")}
              >
                {selectedStudent.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editStudent && (
        <div className={styles.modalOverlay} onClick={() => setEditStudent(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '540px' }}>
            
            <div className={styles.formHeader}>
              <h2>Edit Student</h2>
              <button className={styles.closeIcon} onClick={() => setEditStudent(null)}>✕</button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.formLabel}>Student Name *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={form.studentName}
                    onChange={(e) => setForm({...form, studentName: e.target.value})}
                    required
                    placeholder="Enter student name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Date of Birth</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={form.dob}
                    onChange={(e) => setForm({...form, dob: e.target.value})}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Gender</label>
                  <select
                    className={styles.formInput}
                    value={form.gender}
                    onChange={(e) => setForm({...form, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Class *</label>
                  <select
                    className={styles.formInput}
                    value={form.classApplying}
                    onChange={(e) => setForm({...form, classApplying: e.target.value})}
                    required
                  >
                    <option value="">Select Class</option>
                    {CLASSES.filter(c => c.id !== "all").map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Father's Name *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={form.fatherName}
                    onChange={(e) => setForm({...form, fatherName: e.target.value})}
                    required
                    placeholder="Enter father's name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Mother's Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={form.motherName}
                    onChange={(e) => setForm({...form, motherName: e.target.value})}
                    placeholder="Enter mother's name"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    className={styles.formInput}
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Phone</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setEditStudent(null)}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  <FaSave /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteStudent && (
        <div className={styles.modalOverlay} onClick={() => setDeleteStudent(null)}>
          <div className={styles.formModal} onClick={(e) => e.stopPropagation()} style={{ width: '420px' }}>
            
            <div className={styles.formHeader}>
              <h2>Delete Student</h2>
              <button className={styles.closeIcon} onClick={() => setDeleteStudent(null)}>✕</button>
            </div>
            
            <div className={styles.deleteContent}>
              <div className={styles.deleteIcon}>
                <FaExclamationTriangle />
              </div>
              
              <h3 className={styles.deleteTitle}>Are you sure?</h3>
              <p className={styles.deleteText}>
                You are about to delete <strong>"{deleteStudent.studentName}"</strong> from the database. 
                This action cannot be undone.
              </p>
              
              <div className={styles.deleteInfo}>
                <p><strong>Student ID:</strong> {deleteStudent.studentId}</p>
                <p><strong>Class:</strong> {deleteStudent.classApplying}</p>
              </div>
            </div>

            <div className={styles.deleteActions}>
              <button 
                className={styles.cancelBtn}
                onClick={() => setDeleteStudent(null)}
              >
                <FaTimes /> Cancel
              </button>
              <button 
                className={styles.deleteBtn}
                onClick={handleDelete}
                disabled={deleting}
              >
                <FaTrash /> {deleting ? "Deleting..." : "Delete Student"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
