import mongoose from "mongoose"

const AdmissionSchema = new mongoose.Schema({

studentName:String,
dob:String,
gender:String,
classApplying:String,

fatherName:String,
motherName:String,

phone:String,
email:String,

createdAt:{
type:Date,
default:Date.now
}

})

export default mongoose.models.Admission ||
mongoose.model("Admission", AdmissionSchema, "admissions")