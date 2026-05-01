import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  images: [String], 
  author: String,
  pdf: String, // ✅ add this
  category: String,
}, { timestamps: true });

export default mongoose.model("Post", postSchema);