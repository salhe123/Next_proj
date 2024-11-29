"use client";
import { useEffect, useState } from "react";
import Card from "./components/card";

export default function Home() {
  const [blogs, setBlogs] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetch("https://backend.abyssiniasoftware.com/api/blogs", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data); 
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className="pt-14 flex items-center justify-center mx-auto w-full min-h-screen">
      <div className="p-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center w-full min-h-[200px]">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => <Card key={blog.id} blog={blog} />)
        ) : (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-gray-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v9m0 0l3-3m-3 3l-3-3m9 6H3"
              />
            </svg>
            <p className="text-center text-xl font-semibold text-gray-500 dark:text-gray-400">
              No blogs available at the moment. Please check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
