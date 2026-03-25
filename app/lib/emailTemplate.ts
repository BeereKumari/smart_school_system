export function generateEmailTemplate(otp: string) {
  return `
  <div style="font-family:Arial;background:#f4f6f8;padding:20px">
    
    <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.1)">
      
      <h2 style="text-align:center;color:#2563eb">
        Smart School System
      </h2>

      <p>Your OTP for password reset is:</p>

      <div style="text-align:center;margin:20px 0">
        <span style="font-size:24px;font-weight:bold;background:#2563eb;color:white;padding:10px 20px;border-radius:6px">
          ${otp}
        </span>
      </div>

      <p style="color:gray">
        This OTP will expire in 10 minutes.
      </p>

      <p style="font-size:12px;color:#888">
        If you did not request this, ignore this email.
      </p>

    </div>
  </div>
  `;
}

export function approvalTemplate(name: string) {
  return `
  <div style="font-family:Arial;background:#f4f6f8;padding:20px">

    <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.1)">

      <h2 style="text-align:center;color:#16a34a">
        🎉 Admission Approved
      </h2>

      <p>Dear Parent,</p>

      <p>
        We are happy to inform you that 
        <strong>${name}</strong>'s admission has been approved.
      </p>

      <div style="text-align:center;margin:20px 0">
        <span style="background:#16a34a;color:white;padding:10px 20px;border-radius:6px">
          Approved Successfully
        </span>
      </div>

      <p>Welcome to Smart School System 🚀</p>

    </div>
  </div>
  `;
}

export function declineTemplate(name: string) {
  return `
  <div style="font-family:Arial;background:#f4f6f8;padding:20px">

    <div style="max-width:500px;margin:auto;background:white;padding:20px;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.1)">

      <h2 style="text-align:center;color:#ef4444">
        ❌ Admission Declined
      </h2>

      <p>Dear Parent,</p>

      <p>
        We regret to inform you that 
        <strong>${name}</strong>'s admission has been declined.
      </p>

      <p>Please contact school administration for more details.</p>

    </div>
  </div>
  `;
}

export function adminTemplate(name: string) {
  return `
  <div style="font-family:Arial;padding:20px">

    <h2 style="color:#2563eb">
      📥 New Admission Request
    </h2>

    <p>
      <strong>${name}</strong> has applied for admission.
    </p>

  </div>
  `;
}


 