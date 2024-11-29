"use client";
import { useEffect, useState } from "react";
import Card from "./components/card";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://backend.abyssiniasoftware.com/api/blogs", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => console.error("Error fetching blogs:", error)); // Handle any errors
  }, []);

  useEffect(() => {
    console.log("jb", blogs);
  }, [blogs]);

  return (
    <div className="pt-14 flex items-center justify-between mx-auto w-full min-h-screen">
      <div className="p-9 grid grid-cols-3 gap-8 w-full mx-auto">
        {blogs ? (
          blogs.map((blog) => <Card key={blog.id} blog={blog} />)
        ) : (
          <p>No blogs</p>
        )}
      </div>
    </div>
  );
}
