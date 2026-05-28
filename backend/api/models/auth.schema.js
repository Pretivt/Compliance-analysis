import mongoose from "mongoose";  // mongoose - Object data modelling that converts javascript into mongodb documents 
import bcrypt from "bcrypt";
const authSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

authSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword; // replacing plain password with encrypting password
  } catch (err) {
    console.log(err);
  }
});

authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Auth = mongoose.model("Auth", authSchema);


// Mongoose = manager jo:

// rules banata hai
// data organize karta hai
// galat data rokta hai