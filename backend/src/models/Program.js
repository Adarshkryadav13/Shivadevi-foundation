import mongoose from "mongoose";
const programSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
  }, { timestamps: true });
  
  export default mongoose.model("Program", programSchema);