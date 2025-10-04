import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const ctrl = new AbortController();

    fetch(POSTS_URL, { signal: ctrl.signal })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetch posts failed:", err);
        }
      });

    return () => ctrl.abort();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(start, start + postsPerPage);

  return (
    <div>
      <h2>Posts</h2>
      <ul style={{ paddingLeft: 0 }}>
        {currentPosts.map((p) => (
          <li key={p.id} style={{ listStyle: "none", marginBottom: 10 }}>
            <Link to={`/post/${p.id}`} style={{ textDecoration: "none" }}>
              <strong>{p.title}</strong>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={(p) => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
