const otpStore:Record<string,{otp:string,expires:number}> = {}

export function saveOTP(email:string, otp:string){

 otpStore[email] = {
  otp,
  expires:Date.now()+10*60*1000
 }

}

export function verifyOTP(email:string,otp:string){

 const record = otpStore[email]

 if(!record) return false

 if(Date.now()>record.expires) return false

 return record.otp===otp
}