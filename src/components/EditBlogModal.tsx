import React, { useState } from "react";
import { BlogData } from "../data/blogData";
import { IoClose } from "react-icons/io5";
import { updatePost } from "../redux/postSlice";
import { useAppDispatch } from "../redux/hooks";

interface ModalProps {
  post: BlogData;
  postId: string;
  onClose: () => void;
}

const categoryOptions = [
  "Software",
  "DevOps",
  "Cloud Computing",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Blockchain",
  "Mobile Development",
];

const EditBlogModal: React.FC<ModalProps> = ({ post, postId, onClose }) => {
  const [formData, setFormData] = useState({
    name: post.author || "", // Initialize with post data
    title: post.title || "", // Initialize with post data
    content: post.content || "", // Initialize with post data
    tags: [] as string[], // Initialize with selected post tags
  });

  const dispatch = useAppDispatch();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tag selection
  const handleCategoryChange = (category: string) => {
    const tags = formData.tags.includes(category)
      ? formData.tags.filter((tag) => tag !== category)
      : [...formData.tags, category];

    // Ensure only 1 or 2 tags are selected
    if (tags.length <= 2) {
      setFormData((prev) => ({ ...prev, tags }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.tags.length < 1 || formData.tags.length > 2) {
      alert("Please select at least 1 and no more than 2 categories.");
      return;
    }

    if (
      formData.content === "" ||
      formData.name === "" ||
      formData.title === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Create the updated post object
    const updatedPost: BlogData = {
      ...post,
      author: formData.name,
      title: formData.title,
      content: formData.content,
      date: new Date().toISOString().split("T")[0],
      tags: formData.tags.map((tag) => `#${tag}`),
    };

    // Dispatch the updatePost action
    dispatch(updatePost({ id: postId, post: updatedPost }));

    onClose();
  };

  return (
    <div className="fixed font-lexend-deca inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-bold">Edit Blog</h2>
          <button
            onClick={onClose}
            className="bg-none"
            aria-label="Close Modal"
          >
            <IoClose size={24} color="#6EEB83" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name of Author
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title of Blog
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>

          {/* Select Options for Blog Categories */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white"
            >
              Select Categories
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`px-3 py-1 rounded-md text-xs border ${
                    formData.tags.includes(category)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Select a minimum of 1 and a maximum of 2 categories.
            </p>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-white"
            >
              Content/Blog Description
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            {/* Update Button */}
            <button
              className="bg-primary text-black px-4 py-2 rounded-md"
              type="submit" // Make it part of the form submission
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
