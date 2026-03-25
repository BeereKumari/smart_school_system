import mongoose, { Schema, models, model } from "mongoose";

const PrincipalSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },


  role: {
    type: String,
    default: "principal"
  }

},
{ timestamps: true }
);

const Principal = models.Principal || model("Principal", PrincipalSchema);

export default Principal;