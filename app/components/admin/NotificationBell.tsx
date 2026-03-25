"use client"

import { useEffect, useState } from "react"

export default function NotificationBell(){

  const [data,setData] = useState<any[]>([])
  const [open,setOpen] = useState(false)

  const fetchNotifications = async () => {
    const res = await fetch("/api/notifications?userType=admin")
    const result = await res.json()
    setData(result)
  }

  useEffect(()=>{
    fetchNotifications()
  },[])

  const unreadCount = data.filter(n=>!n.read).length

  const handleOpen = async () => {
    setOpen(!open)

    // ✅ Mark as read when opened
    if(!open){
      await fetch("/api/notifications/read", {
        method: "POST"
      })

      // update UI instantly
      setData(prev => prev.map(n => ({ ...n, read: true })))
    }
  }

  return(
    <div style={{position:"relative"}}>

      {/* 🔔 BELL */}
      <div
        onClick={handleOpen}
        style={{
          cursor:"pointer",
          fontSize:"22px",
          position:"relative"
        }}
      >
        🔔

        {/* 🔴 BADGE */}
        {unreadCount > 0 && (
          <span style={{
            position:"absolute",
            top:"-6px",
            right:"-8px",
            background:"red",
            color:"white",
            borderRadius:"50%",
            fontSize:"12px",
            padding:"2px 6px"
          }}>
            {unreadCount}
          </span>
        )}

      </div>

      {/* 📥 DROPDOWN */}
      {open && (
        <div style={{
          position:"absolute",
          right:0,
          top:"35px",
          width:"280px",
          background:"#fff",
          borderRadius:"10px",
          boxShadow:"0 6px 20px rgba(0,0,0,0.15)",
          padding:"10px",
          zIndex:100
        }}>

          <h4 style={{marginBottom:"8px"}}>Notifications</h4>

          {data.length === 0 && <p>No notifications</p>}

          {data.map(n=>(
            <div key={n._id} style={{
              padding:"8px",
              borderBottom:"1px solid #eee",
              fontSize:"14px",
              background: n.read ? "#fff" : "#fef3c7"
            }}>
              {n.message}
            </div>
          ))}

        </div>
      )}

    </div>
  )
}