import React, { useState, useRef } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8f9fb 0%, #eef0f5 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "3rem 1rem",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  container: { width: "100%", maxWidth: "680px" },
  headerLabel: {
    fontSize: "11px", fontWeight: "600", letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#7c82a0", marginBottom: "6px",
  },
  headerTitle: {
    fontSize: "26px", fontWeight: "700", color: "#1a1d2e",
    margin: "0 0 1.75rem", lineHeight: 1.2,
  },
  card: {
    background: "#ffffff", borderRadius: "16px", padding: "2rem",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
    marginBottom: "1.5rem",
  },
  fieldGroup: { marginBottom: "1.25rem" },
  label: {
    display: "block", fontSize: "11px", fontWeight: "600",
    letterSpacing: "0.09em", textTransform: "uppercase",
    color: "#7c82a0", marginBottom: "8px",
  },
  input: {
    width: "100%", padding: "12px 14px", fontSize: "15px", color: "#1a1d2e",
    background: "#f7f8fb", border: "1.5px solid #e8eaf0", borderRadius: "10px",
    outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box", fontFamily: "inherit",
  },
  textarea: {
    width: "100%", padding: "12px 14px", fontSize: "15px", color: "#1a1d2e",
    background: "#f7f8fb", border: "1.5px solid #e8eaf0", borderRadius: "10px",
    outline: "none", resize: "vertical", minHeight: "110px", lineHeight: "1.6",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box", fontFamily: "inherit",
  },
  uploadZone: {
    width: "100%", boxSizing: "border-box", border: "1.5px dashed #d0d3e8",
    borderRadius: "12px", padding: "1.25rem", display: "flex",
    alignItems: "center", gap: "14px", cursor: "pointer",
    background: "#f7f8fb", transition: "border-color 0.15s, background 0.15s",
  },
  uploadZoneActive: { borderColor: "#4f52d6", background: "#f0f0fd" },
  uploadIconWrap: {
    width: "40px", height: "40px", borderRadius: "10px",
    background: "#eeeffe", display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  uploadPrimary: { fontSize: "14px", fontWeight: "600", color: "#1a1d2e", margin: "0 0 2px" },
  uploadSecondary: { fontSize: "12px", color: "#9ba0b8", margin: 0 },
  previewGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
    gap: "8px", marginTop: "12px",
  },
  previewItem: {
    position: "relative", paddingBottom: "100%", borderRadius: "8px",
    overflow: "hidden", background: "#f0f0f5",
  },
  previewImg: {
    position: "absolute", inset: 0, width: "100%", height: "100%",
    objectFit: "cover",
  },
  removeBtn: {
    position: "absolute", top: "4px", right: "4px", width: "20px", height: "20px",
    borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "none",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: "12px", fontWeight: "700", lineHeight: 1,
  },
  footer: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", marginTop: "1.5rem",
  },
  charCount: { fontSize: "12px", color: "#aab0c4" },
  button: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: "11px 24px", fontSize: "14px", fontWeight: "600", color: "#ffffff",
    background: "#4f52d6", border: "none", borderRadius: "10px", cursor: "pointer",
    transition: "background 0.15s", letterSpacing: "0.02em", fontFamily: "inherit",
  },
  buttonDisabled: { background: "#c8cae8", cursor: "not-allowed" },
  divider: { display: "flex", alignItems: "center", gap: "12px", margin: "0.25rem 0 1.5rem" },
  dividerLine: { flex: 1, height: "1px", background: "#e8eaf0" },
  dividerText: {
    fontSize: "11px", fontWeight: "600", letterSpacing: "0.1em",
    textTransform: "uppercase", color: "#aab0c4",
  },
  postCard: {
    background: "#ffffff", borderRadius: "14px",
    boxShadow: "0 1px 8px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)",
    marginBottom: "1rem", overflow: "hidden",
  },
  postPhotoStrip: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "2px",
  },
  postPhoto: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" },
  postBody: { padding: "1.1rem 1.25rem", display: "flex", gap: "12px", alignItems: "flex-start" },
  postIndex: {
    minWidth: "30px", height: "30px", borderRadius: "8px",
    background: "#eeeffe", color: "#4f52d6", fontSize: "11px", fontWeight: "700",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  postContent: { flex: 1, minWidth: 0 },
  postTitle: { fontSize: "15px", fontWeight: "600", color: "#1a1d2e", margin: "0 0 4px", lineHeight: 1.3 },
  postDesc: { fontSize: "14px", color: "#6b7080", margin: 0, lineHeight: 1.6 },
  postMeta: { fontSize: "11px", color: "#aab0c4", marginTop: "6px" },
  emptyState: { textAlign: "center", padding: "2.5rem 1rem", color: "#aab0c4" },
  emptyText: { fontSize: "14px", margin: 0 },
};

const focusBorder = { borderColor: "#4f52d6", boxShadow: "0 0 0 3px rgba(79,82,214,0.12)" };

function PostItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [items, setItems] = useState([]);
  const [titleFocus, setTitleFocus] = useState(false);
  const [descFocus, setDescFocus] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const canSubmit = title.trim() && description.trim();

  const addFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotos((prev) => [...prev, { url: e.target.result, name: file.name }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setItems([
      {
        title: title.trim(),
        description: description.trim(),
        photos: [...photos],
        postedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      ...items,
    ]);
    setTitle("");
    setDescription("");
    setPhotos([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSubmit();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <p style={styles.headerLabel}>Content Board</p>
        <h1 style={styles.headerTitle}>Post an Item</h1>

        <div style={styles.card}>
          {/* Title */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Title</label>
            <input
              style={{ ...styles.input, ...(titleFocus ? focusBorder : {}) }}
              type="text"
              placeholder="Give your item a clear, descriptive title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setTitleFocus(true)}
              onBlur={() => setTitleFocus(false)}
              onKeyDown={handleKeyDown}
              maxLength={80}
            />
          </div>

          {/* Description */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={{ ...styles.textarea, ...(descFocus ? focusBorder : {}) }}
              placeholder="Describe your item in detail…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setDescFocus(true)}
              onBlur={() => setDescFocus(false)}
              onKeyDown={handleKeyDown}
              maxLength={500}
            />
          </div>

          {/* Photo Upload */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              Photos{" "}
              <span style={{ color: "#c0c4d8", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                — optional
              </span>
            </label>
            <div
              style={{ ...styles.uploadZone, ...(dragging ? styles.uploadZoneActive : {}) }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <div style={styles.uploadIconWrap}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f52d6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <p style={styles.uploadPrimary}>Click or drag photos here</p>
                <p style={styles.uploadSecondary}>PNG, JPG, WEBP — up to 10 images</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={(e) => addFiles(e.target.files)}
            />
            {photos.length > 0 && (
              <div style={styles.previewGrid}>
                {photos.map((photo, i) => (
                  <div key={i} style={styles.previewItem}>
                    <img src={photo.url} alt={photo.name} style={styles.previewImg} />
                    <button style={styles.removeBtn} onClick={() => removePhoto(i)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <span style={styles.charCount}>
              {description.length > 0 ? `${description.length} / 500` : "⌘ + Enter to submit"}
            </span>
            <button
              style={{ ...styles.button, ...(canSubmit ? {} : styles.buttonDisabled) }}
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              Publish Item
            </button>
          </div>
        </div>

        {/* Divider */}
        {items.length > 0 && (
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>{items.length} {items.length === 1 ? "item" : "items"}</span>
            <div style={styles.dividerLine} />
          </div>
        )}

        {/* Posted Items */}
        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Your posted items will appear here</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} style={styles.postCard}>
              {item.photos.length > 0 && (
                <div style={styles.postPhotoStrip}>
                  {item.photos.map((photo, pi) => (
                    <img key={pi} src={photo.url} alt={photo.name} style={styles.postPhoto} />
                  ))}
                </div>
              )}
              <div style={styles.postBody}>
                <div style={styles.postIndex}>{items.length - index}</div>
                <div style={styles.postContent}>
                  <p style={styles.postTitle}>{item.title}</p>
                  <p style={styles.postDesc}>{item.description}</p>
                  <p style={styles.postMeta}>
                    Posted at {item.postedAt}
                    {item.photos.length > 0 && ` · ${item.photos.length} photo${item.photos.length > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostItem;