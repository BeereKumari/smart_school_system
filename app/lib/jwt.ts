import jwt from "jsonwebtoken"

const JWT_SECRET = "school_secret_key"

export function generateToken(user: any) {

 return jwt.sign(
  {
   id: user._id,
   role: user.role
  },
  JWT_SECRET,
  { expiresIn: "1d" }
 )

}