"use client";

import { useState } from "react";
import styles from "../../styles/loginPortal.module.css";
import { FaLock, FaKey, FaUser, FaIdCard, FaPhone } from "react-icons/fa";

interface Field {
  name: string;
  type: string;
  placeholder: string;
}

export default function LoginForm({
  role,
  fields
}: {
  role: string;
  fields: Field[];
}) {

  const [form, setForm] = useState<Record<string, string>>({});

  function handleChange(name: string, value: string) {
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/auth/login/${role}-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = `/${role}/dashboard`;
    } else {
      alert(data.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgPattern}></div>
      <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
      <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>

      <div className={styles.right}>
        <div className={styles.loginBox}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map((f) => (
              <input
                key={f.name}
                type={f.type}
                placeholder={f.placeholder}
                required
                value={form[f.name] || ""}
                onChange={(e) => handleChange(f.name, e.target.value)}
              />
            ))}

            <button type="submit">Sign In</button>

            <div className={styles.links}>
              <a href="/login/forgot-password">Forgot Password?</a>
            </div>
          </form>

          <div className={styles.help}>
            <a href="/login">← Back to Portal Selection</a>
          </div>
        </div>
      </div>
    </div>
  );
}
