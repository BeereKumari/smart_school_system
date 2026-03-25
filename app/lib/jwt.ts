import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(
 process.env.JWT_SECRET || "smart_school_secret"
)

export async function generateToken(payload:any){

 return await new SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("1d")
  .sign(secret)

}

export async function verifyToken(token:string){

 try{

  const { payload } = await jwtVerify(token, secret)

  return payload

 }

 catch(err){

  console.log("JWT VERIFY ERROR:",err)

  return null

 }

}