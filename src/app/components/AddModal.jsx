"use client"
import { useState } from 'react';

export default function AddModal({ closeModal, addNewBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    category: 'Health',
    date: '', // Added date field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend.abyssiniasoftware.com/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Blog added successfully:', result);
        addNewBlog(result);  // Call the function passed in the prop to update the state of the parent component
        closeModal();  // Close the modal after successful submission
      } else {
        console.error('Failed to add blog:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white shadow-lg rounded-lg shadow-black p-6 max-w-md w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Add New Blog</h3>
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
              value={newBlog.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm">Description</label>
            <textarea
              id="description"
              name="description"
              value={newBlog.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm">Category</label>
            <select
              id="category"
              name="category"
              value={newBlog.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Health">Health</option>
              <option value="Politics">Politics</option>
              <option value="Sports">Sports</option>
              <option value="News">News</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newBlog.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
