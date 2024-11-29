"use client"
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Modal from './editModal';

export default function Card({ blog }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = formatDistanceToNow(new Date(blog.date), {
    addSuffix: true,
  });

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal when called
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://backend.abyssiniasoftware.com/api/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Blog deleted successfully');
        // Optionally, you can notify the user that the blog was deleted
        // or redirect them to a different page
        // window.location.reload();  // Uncomment this to reload the page after deletion
      } else {
        const result = await response.json();
        console.error('Failed to delete blog:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 h-96 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6">
        <h5 className="text-xl font-semibold text-gray-900 dark:text-white">{blog.title}</h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">{blog.description}</p>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span>Posted {formattedDate}</span>
          <span className="font-semibold text-blue-500"> #{blog.category}</span>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete} // Directly call handleDelete when Delete button is clicked
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
      {isModalOpen && <Modal blog={blog} closeModal={closeModal} />}
    </div>
  );
}
