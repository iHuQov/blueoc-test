import React from "react";

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" style={{ marginTop: 16 }}>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === current ? "page" : undefined}
          style={{
            marginRight: 6,
            padding: "6px 10px",
            borderRadius: 4,
            border: "1px solid #ddd",
            background: p === current ? "#1976d2" : "#fff",
            color: p === current ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
