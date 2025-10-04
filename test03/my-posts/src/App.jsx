import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

export default function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: 20 }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Posts App</h1>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}
