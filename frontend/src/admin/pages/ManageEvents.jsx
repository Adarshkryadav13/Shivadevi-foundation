import { useState, useEffect } from "react";
import { adminAPI } from "../../lib/adminApi";
import { getApiBase, resolveMediaUrl } from "../../lib/siteConfig.js";

const API_BASE = getApiBase();


export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    time: "",
    location: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= FETCH EVENTS =================
  const fetchEvents = async () => {
    try {
      const res = await adminAPI.getEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    const files = [...e.target.files];
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.endDate && form.startDate && new Date(form.endDate) < new Date(form.startDate)) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      // Backward compatibility for servers that still expect `date`.
      if (form.startDate) {
        formData.append("date", form.startDate);
      }

      images.forEach((img) => {
        formData.append("images", img);
      });

      if (editId) {
        await adminAPI.updateEvent(editId, formData);
      } else {
        await adminAPI.createEvent(formData);
      }

      alert(editId ? "Event updated ✅" : "Event created ✅");

      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        time: "",
        location: "",
        category: "",
      });

      setImages([]);
      setPreview([]);
      setEditId(null);

      fetchEvents();

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err?.response?.data?.error || "Failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await adminAPI.deleteEvent(id);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setForm({
      title: event.title || "",
      description: event.description || "",
      startDate: (event.startDate || event.date) ? String(event.startDate || event.date).slice(0, 10) : "",
      endDate: event.endDate ? String(event.endDate).slice(0, 10) : "",
      time: event.time || "",
      location: event.location || "",
      category: event.category || "",
    });
    setImages([]);
    setPreview(event.images?.map((img) => resolveMediaUrl(img)) || []);
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
      <h2 style={{ marginBottom: "14px" }}>Manage Events</h2>
      {editId && (
        <p style={{ marginTop: "-6px", marginBottom: "16px", color: "#0f766e", fontSize: "14px", fontWeight: 600 }}>
          Editing event. Update details and click "Update Event".
        </p>
      )}

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          background: "#fff",
          padding: "16px",
          marginBottom: "24px",
          display: "grid",
          gap: "12px",
        }}
      >
        <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Title
            <input
              name="title"
              placeholder="Event title"
              value={form.title}
              onChange={handleChange}
              required
              style={{
                marginTop: "6px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </label>

          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Category
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              style={{
                marginTop: "6px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </label>
        </div>

        <label style={{ fontSize: "14px", fontWeight: 600 }}>
          Description
          <textarea
            name="description"
            placeholder="Write event details..."
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{
              marginTop: "6px",
              width: "100%",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "10px 12px",
              resize: "vertical",
            }}
          />
        </label>

        <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Start Date
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              style={{
                marginTop: "6px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </label>

          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            End Date
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              min={form.startDate || undefined}
              onChange={handleChange}
              style={{
                marginTop: "6px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </label>

          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Time
            <input
              name="time"
              placeholder="10:00 AM"
              value={form.time}
              onChange={handleChange}
              style={{
                marginTop: "6px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </label>

          <label style={{ fontSize: "14px", fontWeight: 600 }}>
            Location
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              style={{
                marginTop: "6px",
                width: "100%",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            />
          </label>
        </div>

        <label style={{ fontSize: "14px", fontWeight: 600 }}>
          Upload Images
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ marginTop: "6px", width: "100%" }}
          />
        </label>

        {/* IMAGE PREVIEW */}
        {preview.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              padding: "10px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
            }}
          >
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                width="90"
                height="90"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "fit-content",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              background: "#0f766e",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? (editId ? "Updating..." : "Creating...") : (editId ? "Update Event" : "Create Event")}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({
                  title: "",
                  description: "",
                  startDate: "",
                  endDate: "",
                  time: "",
                  location: "",
                  category: "",
                });
                setImages([]);
                setPreview([]);
              }}
              style={{
                width: "fit-content",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                background: "#fff",
                color: "#334155",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ================= EVENT LIST ================= */}
      <div style={{ display: "grid", gap: "20px" }}>
        {events.map((event) => (
          <div
            key={event._id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "12px",
              background: "#fff",
            }}
          >

            {event.images?.[0] && (
              <img
                src={resolveMediaUrl(event.images[0])}
                alt="event"
                width="220"
                style={{ borderRadius: "8px", marginBottom: "8px", width: "min(100%, 220px)", height: "auto" }}
              />
            )}

            <h3 style={{ margin: "0 0 6px" }}>{event.title}</h3>
            {event.description && <p style={{ margin: "0 0 8px" }}>{event.description}</p>}
            {event.location && (
              <p style={{ margin: "0 0 4px", color: "#334155" }}>
                <strong>Location:</strong> {event.location}
              </p>
            )}
            <p style={{ margin: "0 0 10px", color: "#334155" }}>
              <strong>Date:</strong>{" "}
              {event.startDate || event.date
                ? `${new Date(event.startDate || event.date).toDateString()}${
                    event.endDate ? ` - ${new Date(event.endDate).toDateString()}` : ""
                  }`
                : "TBD"}
              {event.time ? ` • ${event.time}` : ""}
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => handleEdit(event)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #bfdbfe",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #fecaca",
                  background: "#fef2f2",
                  color: "#b91c1c",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
