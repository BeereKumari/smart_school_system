"use client"

import { useState } from "react"

export default function Students() {
  const [selectedClass, setSelectedClass] = useState("All")

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Students</h2>

      {/* Filter */}
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="All">All Classes</option>
        <option value="1">Class 1</option>
        <option value="2">Class 2</option>
      </select>

      {/* Data */}
      <div className="bg-white p-4 rounded shadow">
        <p>Showing students for: {selectedClass}</p>
      </div>
    </div>
  )
}