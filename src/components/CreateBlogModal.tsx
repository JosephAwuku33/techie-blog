import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../redux/hooks";
import { addPost } from "../redux/postSlice";

interface ModalProps {
  isOpen: boolean;
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


const CreateBlogModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: "",
    tags: [] as string[],
  });

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      alert("Please fill in all fields.");
      return;
    }

    const newPost = {
      id: uuidv4(), // Generate a unique UUID for the post
      title: formData.title,
      content: formData.content,
      author: formData.name,
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      tags: formData.tags.map((tag) => `#${tag}`),
    };

    dispatch(addPost(newPost));
    console.log("Form Data Submitted:", formData);
    onClose(); // Close modal on submit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed font-lexend-deca inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-30">
      <div className="p-6 m-2  bg-secondary rounded-lg shadow-2xl max-w-md w-full overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-primary font-bold">Create Blog</h2>
          <button
            onClick={onClose}
            className="bg-none"
            aria-label="Close Modal"
          >
            <IoClose size={24} color="text-primary" />
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
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-black font-semibold rounded-md hover:bg-blue-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogModal;
