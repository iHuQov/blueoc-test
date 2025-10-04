import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const postUrl = (id) => `https://jsonplaceholder.typicode.com/posts/${id}`;
const commentsUrl = (id) =>
  `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();

    Promise.all([
      fetch(postUrl(id), { signal: ctrl.signal }).then((r) => r.json()),
      fetch(commentsUrl(id), { signal: ctrl.signal }).then((r) => r.json()),
    ])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetch failed:", err);
        }
      });

    return () => ctrl.abort();
  }, [id]);

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Link to="/">← Back to posts</Link>
      <h2 style={{ marginTop: 12 }}>{post.title}</h2>
      <p>{post.body}</p>

      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <ul style={{ paddingLeft: 0 }}>
          {comments.map((c) => (
            <li
              key={c.id}
              style={{
                listStyle: "none",
                padding: 10,
                borderBottom: "1px solid #eee",
              }}
            >
              <strong>{c.name}</strong> <em>({c.email})</em>
              <p style={{ marginTop: 6 }}>{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
