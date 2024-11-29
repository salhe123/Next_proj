"use client";
import { useState, useEffect } from "react";
import { use } from "react";

export default function BlogDetailPage({ params }) {
  const { id } = use(params);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://backend.abyssiniasoftware.com/api/blogs/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBlog(data.blog);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);

  if (!blog) {
    return (
      <div className="pt-24 text-center text-gray-700">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const formattedDate = new Date(blog.date).toLocaleDateString();

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4  ">
      <div className="dark:bg-gray-800 shadow-lg rounded-lg p-6 h-96 ">
        <h1 className="text-4xl font-semibold text-white">{blog.title}</h1>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span className="font-semibold text-white">{blog.category}</span>
          <span>{formattedDate}</span>
        </div>

        <p className="mt-6  leading-relaxed text-white">{blog.description}</p>

        <div className="mt-6 text-white">
          <p className="mt-4 text-white">{blog.date}</p>
        </div>
      </div>
    </div>
  );
}
