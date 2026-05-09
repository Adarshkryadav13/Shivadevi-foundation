// import express from "express";
// import Post from "../models/Post.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// // GET all posts
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 });
//     res.json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET single post by slug
// router.get("/:slug", async (req, res) => {
//   try {
//     const post = await Post.findOne({ slug: req.params.slug });

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.json(post);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // CREATE post
// router.post("/", upload.array("images", 10), async (req, res) => {
//   try {
//     console.log("FILES:", req.files);
//     const slug = req.body.title
//       .toLowerCase()
//       .replace(/ /g, "-")
//       .replace(/[^\w-]+/g, "");

//     // ✅ multiple images handle
//     const images = req.files && req.files.length > 0
//       ? req.files.map(file => `/uploads/${file.filename}`)
//       : [];

//     const post = await Post.create({
//       title: req.body.title,
//       category: req.body.category,
//       slug: slug,
//       images, // ✅ NEW FIELD
//     });

//     res.json(post);
//   } catch (err) {
//     console.error("CREATE POST ERROR:", err);
    
//     res.status(500).json({ message: err.message });
//   }
// });

// export default router;

import express from "express";
import Post from "../models/Post.js";
import upload from "../middleware/upload.js";

const router = express.Router();
const normalizePost = (postDoc) => {
  const post = postDoc.toObject ? postDoc.toObject() : postDoc;
  const images = Array.isArray(post.images)
    ? post.images
    : post.images
    ? [post.images]
    : post.image
    ? [post.image]
    : [];

  return {
    ...post,
    images,
    image: post.image || images[0] || "",
  };
};

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts.map(normalizePost));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single post
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(normalizePost(post));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE post
router.post("/", upload.array("images", 10), async (req, res) => {
  try {
    console.log("FILES:", req.files);

    const slug = req.body.title
      ? req.body.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
      : "no-title";

    const images = req.files?.map(file => `/uploads/${file.filename}`) || [];

    const post = await Post.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      slug,
      images,
    });

    res.json(post);
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;