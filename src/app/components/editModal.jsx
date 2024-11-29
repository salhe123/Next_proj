"use client"
import { useState, useEffect } from 'react';

export default function EditModal({ blog, closeModal }) {
  const [updatedBlog, setUpdatedBlog] = useState(blog);

  useEffect(() => {
    setUpdatedBlog(blog);  // Set initial blog data when modal is opened
  }, [blog]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backend.abyssiniasoftware.com/api/blogs/${updatedBlog.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Blog updated successfully:', result);
        closeModal(); 
      } else {
        console.error('Failed to update blog:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-70" onClick={closeModal}></div>

      <div className="relative bg-gray-300 shadow-lg rounded-lg p-6 max-w-md w-full z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Blog</h3>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-900"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none" stroke="currentColor">
              <path d="M1 1L7 7M7 7l6-6M7 7l6 6" strokeWidth="2" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={updatedBlog.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm">Description</label>
            <textarea
              id="description"
              name="description"
              value={updatedBlog.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm">Category</label>
            <select
              id="category"
              name="category"
              value={updatedBlog.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Health">Health</option>
              <option value="Politics">Politics</option>
              <option value="Sports">Sports</option>
              <option value="News">News</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
