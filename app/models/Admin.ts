import mongoose, {Schema, models, model} from "mongoose"

const AdminSchema = new Schema({

 name:{
  type:String,
  required:true
 },

 email:{
  type:String,
  required:true,
  unique:true
 },

 password:{
  type:String,
  required:true
 },

 role:{
  type:String,
  default:"admin"
 }

},{
 timestamps:true
})

const Admin = models.Admin || model("Admin",AdminSchema)

export default Admin