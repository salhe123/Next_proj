import { formatDistanceToNow } from "date-fns";

export default function Card({ blog }) {
  // Format the date to show relative time, like "2 days ago"
  const formattedDate = formatDistanceToNow(new Date(blog.date), {
    addSuffix: true,
  });

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 flex flex-col items-center h-80 justify-between pb-10 space-y-4">
        <h5 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {blog.title}
        </h5>
        <p className="text-sm line-clamp-3 tru' text-gray-500 dark:text-gray-400">
          {blog.description}
        </p>

        <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-300">
          <span>Posted {formattedDate}</span>
          <span className="font-semibold text-blue-500">#{blog.category}</span>
        </div>

        <div className="flex w-full mt-6 gap-4">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
          >
            Edit
          </a>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
