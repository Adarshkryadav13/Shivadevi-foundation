import { useState, useEffect } from "react";
import { adminAPI } from "../../lib/adminApi";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const MEDIA_BASE = API_BASE.startsWith("http")
  ? API_BASE.replace(/\/api\/?$/, "")
  : "http://localhost:5001";
const resolveMediaUrl = (url) =>
  !url ? "" : url.startsWith("http") ? url : `${MEDIA_BASE}${url}`;
const getPostImages = (post) =>
  Array.isArray(post.images) && post.images.length > 0
    ? post.images
    : post.image
    ? [post.image]
    : [];

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
  });

  const [preview, setPreview] = useState("");
  const [pdf, setPdf] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= FETCH POSTS =================
  const fetchPosts = async () => {
    try {
      const { data } = await adminAPI.getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ================= CREATE POST =================
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsSubmitting(true);
      const formData = new FormData();
  
      formData.append("title", form.title);
      formData.append("category", form.category);
  
      // 🔥 IMPORTANT FIX
      if (images && images.length > 0) {
        images.forEach((img) => {
          formData.append("images", img);
        });
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }
  
      if (editId) {
        await adminAPI.updatePost(editId, {
          title: form.title,
          category: form.category,
        });
      } else {
        await adminAPI.createPost(formData);
      }
  
      alert(editId ? "Post updated ✅" : "Post created ✅");
  
      // Reset
      setForm({ title: "", category: "" });
      setImages([]); // ✅ FIXED
      setPdf(null);
      setPreview("");
      setEditId(null);
  
      fetchPosts();
  
    } catch (err) {
      console.error(err);
      alert("Failed to create post ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= DELETE POST =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await adminAPI.deletePost(id);
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
      
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setForm({
      title: post.title || "",
      category: post.category || "",
    });
    setImages([]);
    setPdf(null);
    setPreview("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
        color: "#0f172a",
      }}
    >
      <h1 style={{ marginBottom: "16px" }}>Manage Posts</h1>
      {editId && (
        <p style={{ marginTop: "-6px", marginBottom: "16px", color: "#0f766e", fontSize: "14px", fontWeight: 600 }}>
          Editing post. Update title/category and click "Update Post".
        </p>
      )}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "28px",
          border: "1px solid #e2e8f0",
          background: "#ffffff",
          borderRadius: "12px",
          padding: "18px",
          display: "grid",
          gap: "12px",
        }}
      >
        <label style={{ fontWeight: 600, fontSize: "14px" }}>
          Title
          <input
            type="text"
            placeholder="Post title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
            style={{
              marginTop: "6px",
              width: "100%",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "14px",
            }}
          />
        </label>

        <label style={{ fontWeight: 600, fontSize: "14px" }}>
          Category
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
            style={{
              marginTop: "6px",
              width: "100%",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "10px 12px",
              fontSize: "14px",
              background: "#fff",
            }}
          >
            <option value="">Select Category</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
            <option value="Water">Water</option>
            <option value="Blood Donation">Blood Donation</option>
            <option value="Stories">Stories</option>
            <option value="Reports">Reports</option>
            <option value="flood relief ">flood relief </option>
            <option value="Plantation">Tree Plantation</option>
            <option value="Free Health Checkup Camp"> Free health checkup camp</option>
            <option value="Bird Feeder"> Bird Feeder</option>
          </select>
        </label>

        <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
          <label style={{ fontWeight: 600, fontSize: "14px" }}>
            Upload Images
            <input
              type="file"
              multiple
              onChange={(e) => {
                const selected = [...e.target.files];
                setImages(selected);
                setPreview(selected[0] ? URL.createObjectURL(selected[0]) : "");
              }}
              style={{ marginTop: "6px", width: "100%" }}
            />
          </label>

          <label style={{ fontWeight: 600, fontSize: "14px" }}>
            Upload PDF (optional)
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              style={{ marginTop: "6px", width: "100%" }}
            />
          </label>
        </div>

        {(preview || images.length > 0 || pdf) && (
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              background: "#f8fafc",
              padding: "12px",
            }}
          >
            {preview && (
              <img
                src={preview}
                alt="preview"
                width="140"
                style={{ borderRadius: "8px", display: "block", marginBottom: "8px" }}
              />
            )}
            {images.length > 0 && (
              <p style={{ margin: 0, fontSize: "13px", color: "#334155" }}>
                {images.length} image(s) selected
              </p>
            )}
            {pdf && (
              <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#334155" }}>
                PDF: {pdf.name}
              </p>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="M-btn"
            type="submit"
            disabled={isSubmitting}
            style={{ width: "fit-content", opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? (editId ? "Updating..." : "Creating...") : (editId ? "Update Post" : "Create Post")}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ title: "", category: "" });
                setImages([]);
                setPdf(null);
                setPreview("");
              }}
              style={{ padding: "8px 12px" }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ================= POSTS LIST ================= */}
      <h2 style={{ marginBottom: "12px" }}>All Posts</h2>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        (() => {
          const postImages = getPostImages(post);
          return (
        <div
          key={post._id}
          style={{
            border: "1px solid #e2e8f0",
            padding: "14px",
            marginBottom: "12px",
            borderRadius: "12px",
            background: "#ffffff",
          }}
        >
          <h3 style={{ margin: "0 0 6px" }}>{post.title}</h3>
          <p style={{ margin: "0 0 12px", color: "#334155" }}>
            <strong>Category:</strong> {post.category || "N/A"}
          </p>

          {postImages.length > 0 ? (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
    {postImages.map((img, i) => (
      <img
        key={i}
        src={resolveMediaUrl(img)}
        alt="post"
        style={{
          width: "90px",
          height: "90px",
          objectFit: "cover",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      />
    ))}
  </div>
) : (
  <p style={{ color: "#64748b", marginBottom: "12px" }}>No Image</p>
)}

          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => handleEdit(post)} style={{ padding: "8px 12px" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(post._id)} style={{ padding: "8px 12px" }}>
              Delete
            </button>
          </div>
        </div>
          );
        })()
      ))}
    </div>
  );
}